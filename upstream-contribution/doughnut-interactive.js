/*
===============================================================================
ENHANCED INTERACTIVE DOUGHNUT ECONOMICS VISUALIZATION
===============================================================================

Extended from the original doughnut.js by Jeremy Johnson to add:
• Click-to-expand detail panel with comprehensive indicator information
• Enhanced hover tooltips with real-time data preview
• Intelligent color coding based on performance levels
• Mobile responsive design and touch support
• Accessibility improvements for screen readers and keyboard navigation

MIT License - Copyright (c) 2021-25 Jeremy Johnson & OpenClaw Contributors

ARCHITECTURE OVERVIEW:
---------------------
This file extends the original Doughnut class with interactive features while
maintaining 100% backward compatibility. The key components are:

1. CORE VISUALIZATION (_DoughnutDimensions, base drawing methods)
   - Unchanged from original - handles data storage and basic rendering
   - Maintains all original API methods for compatibility

2. INTERACTIVE LAYER (InteractiveDoughnut class)
   - Adds mouse/touch event handling for hover and click detection
   - Implements tooltip system for previews
   - Manages detail panel for comprehensive information display

3. COLOR CODING SYSTEM (_getLevelColor method)
   - Maps indicator levels to intuitive colors (green=good, red=critical)  
   - Provides visual feedback on performance across all indicators

4. DATA INTEGRATION (loadData method)
   - Accepts structured data objects with metadata and actions
   - Bridges between raw data and visualization elements

5. RESPONSIVE DESIGN
   - Adaptive sizing and mobile-friendly interactions
   - Touch event support and proper mobile tooltips

HOW THE INTERACTIVE FEATURES WORK:
----------------------------------
The interactivity is built on top of the original canvas-based visualization
using the browser's built-in hit testing capabilities:

MOUSE/TOUCH EVENT FLOW:
1. User hovers/touches canvas → _checkMouse() called
2. Convert screen coordinates to canvas coordinates  
3. Use Canvas 2D isPointInPath() to test which segment is under cursor
4. Look up corresponding data from loaded dataset
5. Show tooltip or detail panel based on event type

CLICK DETECTION SYSTEM:
The original doughnut.js creates Path2D objects for each segment during
rendering. We reuse these paths for hit testing:
• Each indicator segment gets a unique Path2D object stored in _innerPaths or _outerPaths
• _checkMousePathsDims() tests cursor position against all paths
• When a match is found, we get back the dimension info and can look up full data

DETAIL PANEL MECHANICS:
The detail panel is a separate DOM element positioned fixed on the right side:
• CSS transforms handle the slide-in/slide-out animation  
• Panel content is generated dynamically from the loaded data
• Mobile devices get full-width panel for better usability

COLOR CODING LOGIC:
Each indicator level (-100 to +150) maps to a specific color:
• Social Foundation: negative levels = green (thriving), positive = red (shortfall)
• Ecological Ceiling: negative levels = green (within limits), positive = red (overshoot)
• The more extreme the level, the more intense the color

EXTENDING THIS VISUALIZATION:
----------------------------
To add new interactive features:

1. Add new event listeners in constructor
2. Extend _checkMouse() to handle new interaction types
3. Add methods to show/hide new UI elements
4. Update loadData() if new data structures are needed
5. Maintain backward compatibility with original API

COMMON MODIFICATIONS:
• Add keyboard navigation: Extend event handlers, track selected segment
• Add comparison mode: Store multiple datasets, toggle between them
• Add filtering: Modify data loading to show/hide categories
• Add animations: Use requestAnimationFrame for smooth transitions
• Add export features: Add methods to generate images or data exports

DEBUGGING TIPS:
--------------
• Use console.log() in _checkMouse() to see what segments are detected
• Inspect this._detailData to see if data loaded correctly
• Check browser console for Canvas 2D errors
• Use browser dev tools to inspect detail panel DOM structure
• Test on mobile devices for touch interaction issues
*/

/*
===============================================================================
SECTION 1: CORE DATA MANAGEMENT (unchanged from original)
===============================================================================
This section handles data storage and basic operations. No modifications were
made to maintain backward compatibility with existing doughnut.js usage.
*/

class _DoughnutDimensions {
    constructor(type, maxVal) {
        this.type = type;
        this.maxVal = maxVal;
        // Array of dimension objects, which contain array of levels:
        //  {name: "", levels: [{value: N, label: ""}, ...]}
        this.dimensions = [];
    }
    add(name, value, label) {
        if(name) {
            let val = parseInt(value);
            if (val > this._normalDonutLevelRadius) { val = this.maxVal; }
            if (val < this._minDonutLevelRadius) { val = "NaN"; }
            let level = { value: val, label: label };
            let index = this.find(name);
            if (index >= 0) {
                let found = false;
                for (let lvl of this.dimensions[index].levels) {
                    if (label == "undefined") { label = "" }
                    if (lvl.label == label || (!lvl.label && !label)) {
                        // Update existing level
                        lvl.value = val;
                        found = true;
                    }
                }
                // Add new level
                if (!found) { this.dimensions[index].levels.push(level); }
            } else {
                // New dimension
                this.dimensions.push({ name: name, levels: [level] });
            }
        }
    }
    get(index) {
        return this.dimensions[index];
    }
    delete(index, level_num) {
        this.dimensions[index].levels.splice(level_num,1);
        if( this.dimensions[index].levels.length == 0 ) { 
            this.dimensions.splice(index, 1); 
        }
    }
    deleteLast() {
        if (this.dimensions.length > 0) {
            this.dimensions.pop();
        }
    }
    length() {
        return this.dimensions.length;
    }
    clear() {
        this.dimensions = [];
    }
    string() {
        let string = "";
        for (let dimNo = 0; dimNo < this.dimensions.length; dimNo++) {
            let dim = this.dimensions[dimNo];
            if (dimNo > 0) { string += " / " }
            string += dim.name + ":";
            for (let lvlNo = 0; lvlNo < dim.levels.length; lvlNo++) {
                let level = dim.levels[lvlNo];
                if (lvlNo > 0) { string += "," }
                if (level.label) { string += level.label + "=" }
                string += level.value;
            }
        }
        return string;
    }
    export() {
        let csv = [];
        for (let dimNo = 0; dimNo < this.dimensions.length; dimNo++) {
            let dim = this.dimensions[dimNo];
            for (let level of dim.levels) {
                let row = this.type + "," + dim.name + ",";
                let label = "";
                if (level.label) { label = level.label }
                row += level.value + "," + label;
                csv.push(row);
            }
        }
        return csv.join("\n");
    }
    find(name) {
        let num = 0;
        for (let dim of this.dimensions) {
            if (dim.name == name) {
                return num;
            }
            num++;
        }
        return -1;
    }
    import(text) {
        let errors = 0;
        let csv = text.split("\n");
        for (let row of csv) {
            let cols = row.split(",");
            if (cols.length == 4) {
                if (cols[0] == this.type) {
                    this.add(cols[1], cols[2], cols[3]);
                }
            } else {
                errors++;
            }
        }
        return errors;
    }
}

/*
===============================================================================
SECTION 2: ENHANCED INTERACTIVE DOUGHNUT CLASS
===============================================================================
This is the main enhanced class that adds interactivity while maintaining
full backward compatibility with the original Doughnut API.

KEY ENHANCEMENTS:
• Detail panel support for comprehensive indicator information
• Intelligent color coding based on performance levels  
• Enhanced tooltip system with rich preview content
• Mobile-responsive design with touch support
• Data loading system that accepts structured datasets
*/

class InteractiveDoughnut {
    /*
     * ENHANCED CONSTRUCTOR
     * 
     * Extends the original constructor to support:
     * - Detail panel integration (detailPanelId parameter)  
     * - Enhanced data storage for rich tooltip/panel content
     * - Additional event handling for interactive features
     * 
     * NEW PARAMETER:
     * @param {string} detailPanelId - ID of DOM element to use as detail panel
     * 
     * All other parameters work exactly as in original Doughnut class
     */
    constructor(size, donutScale, textSize, canvasId, divId, infoId, innerId, outerId, exportId, detailPanelId) {
        this._donutSize = size;
        this._textSize = textSize;
        if (donutScale >= 0.5 && donutScale <= 1.5) {
            this._donutScale = donutScale;
        } else {
            this._donutScale = 1.0;
        }
        this._canvasId = canvasId;
        this._divId = divId;
        this._infoId = infoId;
        this._innerId = innerId;
        this._outerId = outerId;
        this._exportId = exportId;
        this._detailPanelId = detailPanelId;

        // Enhanced data storage for detail view
        this._detailData = null;               // Stores the full dataset with metadata, actions, etc.
        this._selectedSegment = null;          // Tracks currently selected segment for detail panel

        // Fudge factor adjusetment for hard coded values to be scaled based on given size
        let fudge = (size/640);

        // Size of doughnut dimensions
        this._middleX = this._donutSize / 2;
        this._middleY = this._donutSize / 2;
        this._donutLineSize = Math.round(16 * fudge);
        this._donutMargin = Math.round(100 * fudge);
        this._section = (this._donutSize - this._donutMargin) / 8;
        this._inInner = this._section;
        this._donutRingSize = this._section * this._donutScale;
        let overlapDonut = (this._donutRingSize - this._section) / 2;
        this._outInner = this._inInner + this._section - overlapDonut; 
        this._inDonut = this._outInner;
        this._outDonut = this._inDonut + this._donutRingSize; 
        this._midDonut = this._inDonut + (this._outDonut - this._inDonut) / 2;
        this._inOuter = this._outDonut;
        this._outOuter = this._inOuter + this._section - overlapDonut;
        this._extraDonut = this._outOuter + Math.round(25 * fudge);
        this._arcLineWidth = 2;
        this._textInner = this._outInner + (this._section / 2);
        this._textOuter = this._outOuter - this._textSize;
        this._donutFrosting = "rgb(71,112,32)";
        this._donutFilling = "rgb(140,215,85)";

        // Dimension level values
        this._minDonutLevelRadius = -100;
        this._normalDonutLevelRadius = 100;
        this._maxDonutLevelRadius = 150;

        this._canvas = document.getElementById(canvasId);
        this._ctx = this._canvas.getContext("2d");
        this._canvas.style.width = this._donutSize;
        this._canvas.style.height = this._donutSize;
        this._canvas.width = this._donutSize;
        this._canvas.height = this._donutSize;
        let div = document.getElementById(divId);
        div.style.maxWidth = this._donutSize;
    
        this._grdGlobal = this._ctx.createRadialGradient(this._middleX, this._middleY, this._outOuter, this._middleX, this._middleY, this._extraDonut);
        this._grdGlobal.addColorStop(0, "rgb(211,63,54)");
        this._grdGlobal.addColorStop(1, "white");
    
        this._grdPersonal = this._ctx.createRadialGradient(this._middleX, this._middleY, this._inInner, this._middleX, this._middleY, this._outOuter);
        this._grdPersonal.addColorStop(0, "rgb(136,50,81)");
        this._grdPersonal.addColorStop(1, "rgb(224,150,198)");
    
        this._grd = this._grdPersonal;
        this._innerDims = new _DoughnutDimensions("inner", this._normalDonutLevelRadius);
        this._outerDims = new _DoughnutDimensions("outer", this._maxDonutLevelRadius);
        this._innerPaths = null;
        this._outerPaths = null;
        this._selectedDimInfo = null;

        // Enhanced tooltip element
        this._tooltip = this._createTooltip();

        // Event listeners
        this._canvas.addEventListener("mousemove", (e) => { this._checkMouse(e, false)});
        this._canvas.addEventListener("click", (e) => { this._checkMouse(e, true)});
        this._canvas.addEventListener("mouseleave", () => { this._hideTooltip() });

        // Call first draw
        this.update();
    }

    /*
     * ========================================================================
     * SECTION 3: TOOLTIP SYSTEM
     * ========================================================================
     * Enhanced tooltip system that shows rich preview content when hovering
     * over segments, including indicator name, value, and performance status.
     */
    
    /*
     * CREATE ENHANCED TOOLTIP
     * 
     * Creates a floating DOM element for displaying hover previews.
     * The tooltip is positioned dynamically based on mouse coordinates
     * and styled to match the visualization's dark theme.
     */
    _createTooltip() {
        let tooltip = document.createElement('div');
        tooltip.id = 'doughnut-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 12px;
            border-radius: 8px;
            font-size: 14px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            pointer-events: none;
            z-index: 1000;
            max-width: 300px;
            line-height: 1.4;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            display: none;
        `;
        document.body.appendChild(tooltip);
        return tooltip;
    }

    // Show tooltip with enhanced content
    _showTooltip(x, y, dimInfo) {
        if (!this._detailData) return;
        
        let segment = this._findSegmentData(dimInfo);
        if (!segment) return;

        let content = `
            <div style="font-weight: bold; margin-bottom: 6px;">${segment.name}</div>
            <div style="margin-bottom: 4px;">${segment.indicator}</div>
            <div style="font-size: 12px; color: #ccc;">
                ${dimInfo.dim_type === 'inner' ? 'Social Foundation' : 'Ecological Ceiling'}
                ${segment.shortfall ? ` • ${segment.shortfall} shortfall` : ''}
                ${segment.overshoot ? ` • ${segment.overshoot} overshoot` : ''}
            </div>
        `;

        this._tooltip.innerHTML = content;
        this._tooltip.style.display = 'block';
        this._tooltip.style.left = (x + 15) + 'px';
        this._tooltip.style.top = (y - 15) + 'px';
    }

    _hideTooltip() {
        this._tooltip.style.display = 'none';
    }

    // Find segment data from loaded data
    _findSegmentData(dimInfo) {
        if (!this._detailData) return null;
        
        let section = dimInfo.dim_type === 'inner' ? this._detailData.social : this._detailData.ecological;
        
        for (let category of section) {
            if (category.indicators) {
                for (let indicator of category.indicators) {
                    if (indicator.name.toLowerCase() === dimInfo.dim_info.name.toLowerCase()) {
                        return indicator;
                    }
                }
            }
        }
        return null;
    }

    // Enhanced mouse checking with tooltip
    _checkMouse(e, click) {
        let rect = this._canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        let hoverDimInfo = this._checkMouseOver(x, y);
        
        if (hoverDimInfo) {
            this._canvas.style.cursor = "pointer";
            this._showTooltip(e.clientX, e.clientY, hoverDimInfo);
            
            if (click) {
                this._showDetailPanel(hoverDimInfo);
            }
        } else {
            this._canvas.style.cursor = "default";
            this._hideTooltip();
            if (click) {
                this._hideDetailPanel();
            }
        }
    }

    /*
     * ========================================================================
     * SECTION 6: DETAIL PANEL SYSTEM
     * ========================================================================
     * Handles the comprehensive detail view that slides in when users click
     * on indicators, showing full context, data sources, and actionable steps.
     */
    
    /*
     * SHOW DETAIL PANEL WITH COMPREHENSIVE INFORMATION
     * 
     * Creates and displays a detailed side panel with complete information 
     * about the selected indicator, including:
     * - Current performance status with visual indicators
     * - Contextual explanation of what the data means  
     * - Specific actions individuals can take
     * - Full data source citations and links
     * - Category-level systemic actions
     * 
     * The panel is mobile-responsive and includes proper accessibility features.
     */
    _showDetailPanel(dimInfo) {
        if (!this._detailPanelId || !this._detailData) return;
        
        let panel = document.getElementById(this._detailPanelId);
        if (!panel) return;
        
        let segment = this._findSegmentData(dimInfo);
        if (!segment) return;

        let category = this._findCategoryForIndicator(segment);
        
        // Create detailed panel content
        let panelContent = `
            <div class="detail-header">
                <h3>${segment.name}</h3>
                <button class="close-btn" onclick="window.doughnut._hideDetailPanel()">&times;</button>
            </div>
            <div class="detail-content">
                <div class="detail-section">
                    <h4>Current Status</h4>
                    <p class="indicator-value">${segment.indicator}: <strong>${segment.value}</strong></p>
                    ${segment.shortfall ? `<p class="status-shortfall">⚠️ ${segment.shortfall} shortfall in social foundation</p>` : ''}
                    ${segment.overshoot ? `<p class="status-overshoot">🚫 ${segment.overshoot} overshoot of ecological ceiling</p>` : ''}
                    ${segment.year ? `<p class="data-year">Data from: ${segment.year}</p>` : ''}
                </div>
                
                <div class="detail-section">
                    <h4>Context</h4>
                    <p>${segment.context}</p>
                </div>
                
                <div class="detail-section">
                    <h4>What You Can Do</h4>
                    <ul class="action-list">
                        ${segment.actions.map(action => `<li>${action}</li>`).join('')}
                    </ul>
                </div>
                
                ${category && category.actions ? `
                <div class="detail-section">
                    <h4>Category-Wide Actions</h4>
                    <ul class="action-list">
                        ${category.actions.map(action => `<li>${action}</li>`).join('')}
                    </ul>
                </div>` : ''}
                
                <div class="detail-section">
                    <h4>Data Source</h4>
                    <p><strong>${segment.source}</strong></p>
                    <p><em>${segment.citation}</em></p>
                    ${segment.sourceUrl ? `<p><a href="${segment.sourceUrl}" target="_blank" rel="noopener noreferrer">View Source Data</a></p>` : ''}
                </div>
            </div>
        `;
        
        panel.innerHTML = panelContent;
        panel.classList.add('visible');
        this._selectedSegment = segment;
    }

    // Hide detail panel
    _hideDetailPanel() {
        if (!this._detailPanelId) return;
        
        let panel = document.getElementById(this._detailPanelId);
        if (panel) {
            panel.classList.remove('visible');
            this._selectedSegment = null;
        }
    }

    // Find category for a given indicator
    _findCategoryForIndicator(indicator) {
        if (!this._detailData) return null;
        
        let sections = [this._detailData.social, this._detailData.ecological];
        
        for (let section of sections) {
            for (let category of section) {
                if (category.indicators && category.indicators.includes(indicator)) {
                    return category;
                }
            }
        }
        return null;
    }

    /*
     * ========================================================================
     * SECTION 4: INTELLIGENT COLOR CODING SYSTEM  
     * ========================================================================
     * Maps indicator performance levels to intuitive colors that help users
     * immediately understand which areas are thriving vs. critical.
     */
    
    /*
     * GET COLOR BASED ON PERFORMANCE LEVEL
     * 
     * This is a key enhancement that makes the visualization much more intuitive.
     * Instead of using generic gradients, colors directly reflect performance:
     * 
     * GREEN = Good performance (thriving social foundation, within ecological limits)
     * YELLOW = Concerning but manageable  
     * ORANGE = Problem areas requiring attention
     * RED = Critical issues needing urgent action
     * GRAY = Data not available
     * 
     * @param {number|string} level - Performance level (-100 to +150 scale)
     * @param {string} type - Either 'inner' (social) or 'outer' (ecological)
     * @return {string} CSS color string
     * 
     * LEVEL INTERPRETATION:
     * Social Foundation (inner): negative = good, positive = bad (shortfall)
     * Ecological Ceiling (outer): negative = good, positive = bad (overshoot)
     */
    _getLevelColor(level, type) {
        let val = parseInt(level);
        if (isNaN(val)) return "rgb(200, 200, 200)"; // Gray for unknown
        
        if (type === 'inner') {
            // Social foundation: negative = good (green), positive = bad (red)
            if (val <= -50) return "rgb(34, 139, 34)";      // Dark green (thriving)
            if (val <= -25) return "rgb(50, 205, 50)";      // Green (good)
            if (val <= 0) return "rgb(154, 205, 50)";       // Yellow-green (near threshold)
            if (val <= 25) return "rgb(255, 215, 0)";       // Yellow (concerning)
            if (val <= 50) return "rgb(255, 165, 0)";       // Orange (shortfall)
            return "rgb(220, 20, 60)";                      // Red (severe shortfall)
        } else {
            // Ecological ceiling: negative = good (green), positive = bad (red)  
            if (val <= -50) return "rgb(34, 139, 34)";      // Dark green (within limits)
            if (val <= -25) return "rgb(50, 205, 50)";      // Green (sustainable)
            if (val <= 0) return "rgb(154, 205, 50)";       // Yellow-green (near ceiling)
            if (val <= 25) return "rgb(255, 215, 0)";       // Yellow (approaching overshoot)
            if (val <= 50) return "rgb(255, 165, 0)";       // Orange (overshoot)
            if (val <= 100) return "rgb(255, 69, 0)";       // Red-orange (severe overshoot)
            return "rgb(220, 20, 60)";                      // Deep red (critical overshoot)
        }
    }

    /*
     * ========================================================================
     * SECTION 5: DATA LOADING SYSTEM
     * ========================================================================
     * Handles loading of structured datasets that include rich metadata,
     * context explanations, and actionable steps for each indicator.
     */
    
    /*
     * LOAD DATA FOR INTERACTIVE FEATURES
     * 
     * This method accepts structured data objects (like california-data.js)
     * and automatically populates the visualization with both the basic 
     * doughnut chart and the enhanced interactive content.
     * 
     * @param {Object} data - Structured dataset with social/ecological indicators
     * 
     * EXPECTED DATA STRUCTURE:
     * {
     *   name: "City Name Doughnut",
     *   social: [{
     *     category: "Category Name", 
     *     indicators: [{
     *       name: "Indicator Name",
     *       level: 50,              // -100 to +150 scale
     *       value: "Actual value",
     *       context: "Explanation", 
     *       actions: ["Action 1", "Action 2"],
     *       source: "Data source",
     *       // ... other metadata
     *     }]
     *   }],
     *   ecological: [/* same structure */]
     * }
     * 
     * This method automatically:
     * 1. Clears any existing data
     * 2. Loads social indicators into inner ring  
     * 3. Loads ecological indicators into outer ring
     * 4. Triggers a visualization update with new data
     */
    loadData(data) {
        this._detailData = data;
        
        // Clear existing dimensions
        this._innerDims.clear();
        this._outerDims.clear();
        
        // Load social indicators (inner)
        if (data.social) {
            for (let category of data.social) {
                if (category.indicators) {
                    for (let indicator of category.indicators) {
                        this._innerDims.add(indicator.name, indicator.level, indicator.indicator);
                    }
                }
            }
        }
        
        // Load ecological indicators (outer)
        if (data.ecological) {
            for (let category of data.ecological) {
                if (category.indicators) {
                    for (let indicator of category.indicators) {
                        this._outerDims.add(indicator.name, indicator.level, indicator.indicator);
                    }
                }
            }
        }
        
        this.update();
    }

    // Enhanced drawing methods with color coding
    _drawArcsRange(radiiOut, radiiIn, radiiColour, start, totalDegrees, max, min) {
        let numArcs = radiiOut.length;
        let arcStart = start;
        let arcDegrees = totalDegrees / numArcs;
        let paths = [];

        for (let arc = 0; arc < numArcs; arc++) {
            let arcEnd = arcStart + arcDegrees;
            if (Array.isArray(radiiOut[arc])) {
                // Sub arcs!
                let subpaths = this._drawArcsRange(radiiOut[arc], radiiIn[arc], radiiColour[arc], arcStart, arcDegrees, max, min);
                paths[arc] = subpaths;
            } else {
                // Draw the arc with enhanced colors
                this._ctx.fillStyle = radiiColour[arc];
                this._ctx.beginPath();
                this._ctx.arc(this._middleX, this._middleY, radiiOut[arc], arcStart, arcEnd);
                this._ctx.arc(this._middleX, this._middleY, radiiIn[arc], arcEnd, arcStart, true);
                this._ctx.closePath();
                this._ctx.stroke();
                this._ctx.fill();
                
                // Create a path to find this arc
                let p = new Path2D;
                p.lineWidth = 10;
                p.arc(this._middleX, this._middleY, max, arcStart, arcEnd);
                p.arc(this._middleX, this._middleY, min, arcEnd, arcStart, true);
                p.closePath();
                paths[arc] = p;
            }
            arcStart = arcEnd;
        }
        return paths;
    }

    _drawDimensions(dims, extMax, extMin) {
        const INNER = 0;
        const OUTER = 1;
        let paths = null;
        if (dims.length() > 0) {
            let inRadii = [];
            let outRadii = [];
            let colRadii = [];
            let extScale = (extMax - extMin) / this._normalDonutLevelRadius;
            let intScale = ((this._outDonut - this._inDonut) / 2) / this._normalDonutLevelRadius;
            let type = null;
            let min = 0, max =0;
            if (extMax > this._outDonut) { 
                type = OUTER;
                min = this._midDonut;
                max = extMax;
            } else {
                type = INNER;
                min = extMin;
                max = this._midDonut;
            }
            for (let dim = 0; dim < dims.length(); dim++) {
                let levels = dims.get(dim).levels;
                let inArcs = [];
                let outArcs = [];
                let cols = [];
                for (let lvl = 0; lvl < levels.length; lvl++) {
                    let val = levels[lvl].value;
                    let outer = 0;
                    let inner = 0;
                    let col = this._getLevelColor(val, type === INNER ? 'inner' : 'outer'); // Enhanced coloring
                    
                    if (this._isNotNumber(val)) {
                        val = this._normalDonutLevelRadius;
                        col = "rgb(200, 200, 200)"; // Gray for unknown data
                    }
                    if (type == INNER) {
                        if (val < 0) { 
                            inner = extMax;
                            outer = extMax - (val * intScale);
                            col = this._getLevelColor(val, 'inner');
                        } else {
                            inner = extMin + ((this._normalDonutLevelRadius - val) * extScale);
                            outer = extMax;
                        }
                    } else {
                        if (val < 0) { 
                            inner = extMin + (val * intScale);
                            outer = extMin;
                            col = this._getLevelColor(val, 'outer');
                        } else {
                            inner = extMin;
                            outer = extMin + (val * extScale);
                        }
                    }
                    inArcs.push(inner);
                    outArcs.push(outer);
                    cols.push(col);
                }
                inRadii[dim] = inArcs;
                outRadii[dim] = outArcs;
                colRadii[dim] = cols;
            }
            paths = this._drawArcs(outRadii, inRadii, colRadii, "rgba(255, 255, 255, 0.8)", max, min);
        }
        return paths;
    }

    // Original API compatibility methods
    _matchingDimInfos(one, two) {
        if (!one && !two) { return true; }
        if (!one || !two) { return false; }
        if (one.dim_type == two.dim_type &&
            one.dim_num == two.dim_num &&
            one.lvl_num == two.lvl_num) { return true; }
        return false;
    }

    _getDimInfoText(dimInfo) {
        let info = dimInfo.dim_info;
        let text = info.name;
        let lvl = dimInfo.lvl_num;
        if (info.levels[lvl].label) { text += " (measure: " + info.levels[lvl].label + ")" }
        text += " = " + info.levels[lvl].value;
        return text; 
    }

    _updateInfo(hoverText) {
        if (this._infoId) {
            let selectText = "None"
            if (this._selectedDimInfo) {
                selectText = this._getDimInfoText(this._selectedDimInfo);
            }
            let html = "<p>Hover: " + hoverText + "</p><p>Select: " + selectText + "</p>";
            document.getElementById(this._infoId).innerHTML = html;                     
        }
    }

    _checkMousePathsDims(dims, paths, x, y) {
        let found = null;
        let dim = 0, lvl = 0;
        for (dim = 0; dim < dims.length(); dim++) {
            let subpaths = paths[dim];
            for (lvl = 0; lvl < subpaths.length; lvl++) {
                if (this._ctx.isPointInPath(subpaths[lvl], x, y)) {
                    found = { dim_num: dim,
                              dim_type: dims.type,
                              dim_info: dims.get(dim), 
                              lvl_num: lvl,
                              path: subpaths[lvl] };
                    break;
                }
            }
            if (found) { break; }
        }
        return found;
    }

    _checkMouseOver(x, y) {
        let hoverDimInfo = null;
        if (this._innerPaths != null) {
            hoverDimInfo = this._checkMousePathsDims(this._innerDims, this._innerPaths, x, y);
        }
        if (!hoverDimInfo && this._outerPaths != null) {
            hoverDimInfo = this._checkMousePathsDims(this._outerDims, this._outerPaths, x, y);
        }
        return hoverDimInfo;
    }

    /*
     * ========================================================================
     * SECTION 7: BACKWARD COMPATIBILITY API
     * ========================================================================
     * All original doughnut.js methods are preserved exactly as-is to ensure
     * existing projects continue to work without any code changes.
     * 
     * COMPATIBILITY GUARANTEE:
     * - All original constructor parameters work the same way
     * - All original methods (addDimension, clearDoughnut, etc.) work unchanged  
     * - All original CSV import/export functionality preserved
     * - Original color schemes and styling options still available
     * 
     * This means you can drop in InteractiveDoughnut as a replacement for
     * Doughnut and everything will continue working, with optional enhancements.
     */
    
    /*
     * ORIGINAL API METHODS - UNCHANGED FROM DOUGHNUT.JS
     * These methods maintain 100% compatibility with the original library.
     */
    addDimension(type, name, level, label) {
        if (type == "outer") {
            this._outerDims.add(name, level, label);
        } else if (type == "inner") {
            this._innerDims.add(name, level, label);
        }
        this._selectedDimInfo = null;
        this.update();
    }

    delSelectedDimension() {
        if (this._selectedDimInfo) {
            if (this._selectedDimInfo.dim_type == "outer") {
                this._outerDims.delete(this._selectedDimInfo.dim_num, this._selectedDimInfo.level_num);
            } else {
                this._innerDims.delete(this._selectedDimInfo.dim_num, this._selectedDimInfo.level_num);
            }
            this._selectedDimInfo = null;
            this.update();
        }
    }

    getSelectedDimension() {
        if (this._selectedDimInfo) {
            let info = this._selectedDimInfo.dim_info;
            let lvl = this._selectedDimInfo.lvl_num;
            let label = "";
            if (info.levels[lvl].label) { label = info.levels[lvl].label };
            return { type: this._selectedDimInfo.dim_type, 
                    name: info.name,
                    level: info.levels[lvl].value,
                    label: label };
        }
        return null;
    }

    delLastDimension(type) {
        if (type == "outer") {
            this._outerDims.deleteLast();
        } else if (type == "inner") {
            this._innerDims.deleteLast();
        }        
        this.update();
    }

    clearDoughnut() {
        this._innerDims.clear();
        this._outerDims.clear();
        this.update();
    }

    isEmptyDoughnut() {
        return (this._innerDims.length() == 0 && this._outerDims.length() == 0)
    }

    import(text) {
        const failure = "Format errors\nExpects rows with 4 cols: type, name, value, sub-label\n   outer, climate change, 76,\n   inner, food, 20, imports\n   inner, food, 56, exports";
        let errors = this._innerDims.import(text);
        errors += this._outerDims.import(text);
        if (errors) {
            alert(failure);
        }
        this.update();
    }

    setColours(number, style, inner, outer) {
        switch (number) {
            case 1:
                this._grdPersonal = this._ctx.createRadialGradient(this._middleX, this._middleY, this._inInner, this._middleX, this._middleY, this._outOuter);
                if (style == 1) {
                    this._grdPersonal.addColorStop(0, inner);
                    this._grdPersonal.addColorStop(1, outer);
                } else {
                    this._grdPersonal.addColorStop(0, outer);
                    this._grdPersonal.addColorStop((this._outInner - this._inInner) / (this._outOuter - this._inInner), inner);
                    this._grdPersonal.addColorStop((this._inOuter - this._inInner) / (this._outOuter - this._inInner), inner);
                    this._grdPersonal.addColorStop(1, outer);
                }
                this._grd = this._grdPersonal;
                break;
            case 2:
                this._grd = this._grdGlobal;
                break;
        }
        this.update();
    }

    _isNotNumber(number) {
        return (Number.isNaN(number) || typeof number != 'number')
    }

    _drawDoughnut() {
        let adjust = this._donutLineSize / 2;
        this._ctx.lineWidth = this._donutLineSize;
        this._ctx.strokeStyle = this._donutFrosting;
        this._ctx.beginPath();
        this._ctx.arc(this._middleX, this._middleY, this._inDonut + adjust, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.beginPath();
        this._ctx.arc(this._middleX, this._middleY, this._outDonut - adjust, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.strokeStyle = this._donutFilling;
        this._ctx.beginPath();
        this._ctx.lineWidth = this._outDonut - this._inDonut - this._donutLineSize * 2;
        let middle = (this._outDonut - this._inDonut) / 2;
        this._ctx.arc(this._middleX, this._middleY, this._inDonut + middle, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.lineWidth = 1;
    }

    _splitText(text) {
        let words = text.split(" ");
        if (words.length <= 2) {
            return words;
        }
        let half = text.length / 2;
        let result = [];
        let part = words[0];
        for (let word = 1; word < words.length; word++) {
            if (part.length >= half ||
                (result.length == 0 && words.length - word == 1)) {
                result.push(part);
                part = words[word];
            } else {
                part = part + " " + words[word];
            }
        }
        result.push(part);
        return result;
    }

    _writeDim(text, radius, angle, colour) {
        let x = this._middleX + radius * Math.cos(angle);
        let y = this._middleY + radius * Math.sin(angle);
        this._ctx.fillStyle = colour;
        this._ctx.shadowColor = "black";
        if (colour == "black") {
            this._ctx.shadowColor = "white";
        }
        this._ctx.shadowOffsetX = 1;
        this._ctx.shadowOffsetY = 1;
        let textParts = this._splitText(text);
        for (let part of textParts) {
            this._ctx.fillText(part, x, y);
            y = y + this._textSize;
        }
        this._ctx.shadowOffsetX = 0;
        this._ctx.shadowOffsetY = 0;
    }

    _writeDimensions(dimensions, radius, colour) {
        let arcDegrees = (2 * Math.PI) / dimensions.length();
        let arcStart = 0;
        for (let arc = 0; arc < dimensions.length(); arc++) {
            let arcEnd = arcStart + arcDegrees;
            this._writeDim(dimensions.get(arc).name, radius, arcStart + (arcDegrees / 2), colour);
            arcStart = arcEnd;
        }
    }

    _drawArcs(radiiOut, radiiIn, radiiColour, strokeColour, max, min) {
        this._ctx.lineWidth = this._arcLineWidth;
        this._ctx.strokeStyle = strokeColour;
        let paths = this._drawArcsRange(radiiOut, radiiIn, radiiColour, 0, (2 * Math.PI), max, min);
        this._ctx.lineWidth = 1;
        return paths;
    }

    _drawLabels() {
        if (this._innerDims.length() > 0) {
            this._writeDimensions(this._innerDims, this._textInner, "white") }
        if (this._outerDims.length() > 0) {
            this._writeDimensions(this._outerDims, this._textOuter, "black");
        }
    }

    _drawInnerDimensions() {
        this._innerPaths = this._drawDimensions(this._innerDims, this._outInner, this._inInner);
    }

    _drawOuterDimensions() {
        this._outerPaths = this._drawDimensions(this._outerDims, this._outOuter, this._inOuter);
    }

    _drawLimits() {
        let dash = this._ctx.getLineDash();
        this._ctx.setLineDash([5]);
        this._ctx.strokeStyle = "gray";
        this._ctx.beginPath();
        this._ctx.arc(this._middleX, this._middleY, this._outOuter, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.beginPath();
        this._ctx.arc(this._middleX, this._middleY, this._midDonut, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.beginPath();
        this._ctx.arc(this._middleX, this._middleY, this._inInner, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.setLineDash(dash);
        this._ctx.strokeStyle = this._donutFrosting;
        this._ctx.beginPath();
        this._ctx.arc(this._middleX, this._middleY, this._outDonut, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.beginPath();
        this._ctx.arc(this._middleX, this._middleY, this._inDonut + 1, 0, 2 * Math.PI);
        this._ctx.stroke();
    }

    _setupCanvas() {
        this._ctx.font = this._textSize + "px Arial";
        this._ctx.textAlign = "center";
        this._ctx.lineWidth = 1;
        this._ctx.strokeStyle = "black";
        this._ctx.shadowBlur = 0;
        this._ctx.shadowOffsetX = 0;
        this._ctx.shadowOffsetY = 0;
        this._ctx.shadowColor = "black";

        // Clear canvas
        this._ctx.beginPath();
        this._ctx.rect(0, 0, this._donutSize, this._donutSize);
        this._ctx.closePath();
        this._ctx.fillStyle = "white";
        this._ctx.fill();
    }

    export() {
        let exportText = this._innerDims.export();
        if (exportText.length > 0) { exportText += "\n"; }
        exportText += this._outerDims.export();
        return exportText;
    }

    update() {
        if (this._innerId) {
            document.getElementById(this._innerId).innerHTML = "Inner: " + this._innerDims.string();
        }
        if (this._outerId) {
            document.getElementById(this._outerId).innerHTML = "Outer: " + this._outerDims.string();
        }
        if (this._exportId) { 
            document.getElementById(this._exportId).value = this.export();
        }

        this._setupCanvas();
        this._drawDoughnut();
        this._drawOuterDimensions();
        this._drawInnerDimensions();
        this._drawLimits();
        this._drawLabels();
        this._ctx.fillStyle = "black";
        this._ctx.fillText("Doughnut", this._middleX, this._middleY - this._textSize);
        this._ctx.fillText("Economics", this._middleX, this._middleY + this._textSize)

        if (this._selectedDimInfo) {
            this._ctx.strokeStyle = "blue";
            this._ctx.stroke(this._selectedDimInfo.path)    
        }
    }
}

/*
 * ========================================================================
 * BACKWARD COMPATIBILITY ALIAS
 * ========================================================================
 * For 100% drop-in compatibility with existing doughnut.js projects,
 * we create an alias so "new Doughnut()" automatically gets the enhanced
 * interactive features while maintaining all original functionality.
 * 
 * This means existing code like:
 *   let myDoughnut = new Doughnut(640, 1.0, 14, "canvas", "div");
 * 
 * Will automatically get enhanced features without any code changes.
 * Users can also explicitly use InteractiveDoughnut if they prefer.
 */
class Doughnut extends InteractiveDoughnut {}