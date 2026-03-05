# California Doughnut Interactive Example

This contribution adds an interactive California doughnut economics visualization to the [doughnut-economics-graph](https://github.com/flodskum/doughnut-economics-graph) project, demonstrating how to enhance the basic doughnut chart with real-world data and user interaction features.

## What This Contribution Adds

### 1. **Interactive Detail Panel** (`doughnut-interactive.js`)
- **Click-to-expand detail panel** that slides in from the right
- **Enhanced hover tooltips** with indicator previews
- **Color-coded segments** based on performance levels (green = thriving, red = critical)
- **Full backward compatibility** with the original `doughnut.js` API
- **Mobile responsive design** with touch support

### 2. **Real California Data** (`california-data.js`)
- **42 comprehensive indicators** from the CalDEC California Doughnut Report (2025)
- **24 social foundation indicators** across 12 categories (100% in shortfall)
- **18 ecological ceiling indicators** across 9 categories (89% in overshoot)
- **Complete metadata** including sources, citations, context, and actionable steps
- **Structured data format** that other cities can easily adapt

### 3. **Self-Contained Demo** (`california-example.html`)
- **Production-ready example** showing the enhanced visualization
- **Dark theme design** optimized for data visualization
- **Mobile responsive layout** that works on all screen sizes
- **Complete integration** of data, visualization, and interactivity
- **No build tools required** — works directly in any modern browser

## How to Use the Interactive Features

### Basic Interaction
1. **Hover** over any segment to see a tooltip with key information
2. **Click** any segment to open the detailed side panel
3. **Close** the panel by clicking the X, pressing Escape, or clicking outside

### Detail Panel Features
- **Current Status**: Shows the indicator value and shortfall/overshoot percentage
- **Context**: Explains what the data means and why it matters
- **Personal Actions**: Specific steps individuals can take to improve this indicator
- **Category Actions**: Broader systemic actions for the whole category
- **Data Source**: Full citation and link to original research

### Color Coding System
- 🟢 **Dark Green**: Thriving / Within planetary boundaries
- 🟢 **Green**: Good performance
- 🟡 **Yellow-Green**: Near threshold
- 🟡 **Yellow**: Concerning / Approaching limits
- 🟠 **Orange**: Shortfall / Overshoot
- 🔴 **Red**: Severe shortfall / Critical overshoot
- ⚪ **Gray**: Data not available

## Data Sources and Citations

### Primary Source
**Aritza & Kraus-Polk et al., 2025. "The California Doughnut Snapshot and Report." California Doughnut Economics Collaborative (CalDEC). Published on Zenodo.**
- **DOI/URL**: https://zenodo.org/records/17540639
- **Report Type**: Comprehensive state-level doughnut economics assessment
- **Indicators**: 42 total (24 social, 18 ecological)
- **Geographic Scope**: California state-level data
- **Year**: 2025 data compilation

### Data Quality Standards
- Every indicator includes **source citation** and **year**
- **Shortfall/overshoot percentages** match the original CalDEC report
- **Context explanations** provide accessible interpretation of technical data
- **Actionable steps** connect data to individual and policy responses

### Level Scale Methodology
The visualization uses a -100 to 150 scale where:
- **Social Foundation**: Negative values = thriving, positive values = shortfall (bad)
- **Ecological Ceiling**: Negative values = within limits, positive values = overshoot (bad)
- **Mapping**: Percentages from the CalDEC report are mapped to proportional levels

## How Other Cities Can Create Their Own

This California example serves as a **template and methodology** for other cities to create their own doughnut economics visualizations.

### Step 1: Gather Data
Follow the doughnut economics framework:
- **12 Social Foundation Categories**: Food, Health, Education, Income & Work, Water & Sanitation, Energy, Networks, Housing, Gender Equality, Social Equity, Political Voice, Peace & Justice
- **9 Ecological Ceiling Categories**: Climate Change, Ocean Acidification, Chemical Pollution, Nitrogen & Phosphorus Loading, Freshwater Withdrawals, Land Conversion, Biodiversity Loss, Air Pollution, Ozone Layer Depletion

### Step 2: Structure Your Data

Here's the complete, annotated data structure showing exactly what each field means and how to use it:

```javascript
const YOUR_CITY_DOUGHNUT_DATA = {
    // =====================================================================
    // DATASET METADATA - Information about this doughnut portrait
    // =====================================================================
    name: "Your City Doughnut Economics",           // Display name shown in visualization
    year: 2025,                                     // Year when data was compiled  
    description: "Description of your city/region", // Brief description for subtitle
    citation: "Your data source citation",         // Primary academic/report citation
    sourceUrl: "https://your-data-source.org",     // URL to main data source
    
    // =====================================================================
    // SOCIAL FOUNDATION - Inner ring (12 categories, basic human needs)
    // =====================================================================
    social: [
        {
            // REQUIRED: One of the 12 standard doughnut categories
            // Options: "Food", "Health", "Education", "Income & Work", 
            //         "Water & Sanitation", "Energy", "Networks", "Housing",
            //         "Gender Equality", "Social Equity", "Political Voice", "Peace & Justice"
            category: "Food",
            
            // Array of 1-3 indicators per category (California has 24 total across 12 categories)
            indicators: [
                {
                    // REQUIRED FIELDS:
                    name: "Food Security",                    // Short, clear name for the indicator
                    level: 30,                               // CRITICAL: Number from -100 to +150
                                                            // Positive = BAD (shortfall), Negative = GOOD (thriving)
                                                            // Examples: +50 = moderate shortfall, +100 = severe shortfall
                    
                    // DESCRIPTIVE FIELDS:
                    indicator: "Food insecurity rate",       // Specific metric being measured
                    value: "15% of residents",              // The actual measured value (can be %, number, description)
                    year: 2024,                             // Year this data was collected
                    shortfall: "15%",                       // For social: percentage below target (target is usually 0%)
                    
                    // EXPLANATORY FIELDS:
                    context: "Food insecurity affects 15% of residents, concentrated in low-income neighborhoods with limited grocery access.",
                    // ^ 1-2 sentences explaining what this means for your community and why it matters
                    
                    // SOURCE FIELDS (crucial for credibility):
                    source: "Your City Food Bank Annual Survey 2024",        // Organization/report name
                    sourceUrl: "https://your-food-bank.org/hunger-report",   // Direct link to data
                    citation: "Smith, J. et al., 2024. Your City Hunger Assessment. Your City Food Bank.", // Academic citation
                    
                    // ACTION FIELDS:
                    actions: [                              // 2-4 specific actions people in YOUR city can take
                        "Donate to [Your City] Food Bank at [local-food-bank.org]",
                        "Support [Local Policy Name] for corner store healthy food incentives", 
                        "Volunteer at [Local Organization] weekend food distribution"
                        // Make these SPECIFIC to your city - include actual organization names, policies, websites
                    ]
                },
                
                // OPTIONAL: Second indicator in this category
                {
                    name: "Nutrition Access",
                    level: 45,                              // Different level than first indicator
                    indicator: "Healthy food access",
                    value: "3 food deserts",
                    year: 2024,
                    shortfall: "30%",                       // Can be different metric than first indicator
                    context: "Three neighborhoods qualify as food deserts with limited fresh produce access.",
                    source: "Your City Health Department GIS Analysis",
                    sourceUrl: "https://health.yourcity.gov/food-access", 
                    citation: "Your City Health Dept., 2024. Food Access Mapping Report.",
                    actions: [
                        "Shop at [Local Farmers Market] to support local food systems",
                        "Advocate for mobile markets in underserved neighborhoods"
                    ]
                }
                // You can have 1-3 indicators per category (California averages 2 per category)
            ],
            
            // CATEGORY-LEVEL ACTIONS: Broader systemic changes needed for this whole category  
            actions: [
                "Support universal basic income pilot to address root causes of food insecurity",
                "Advocate for zoning changes that allow urban agriculture and community gardens"
                // These should be bigger-picture actions that address the whole category
            ]
        },
        
        // REPEAT FOR ALL 12 SOCIAL CATEGORIES
        // Even if you don't have data for a category, include it with level: "NaN"
        {
            category: "Housing",
            indicators: [
                {
                    name: "Housing Cost Burden",
                    level: "NaN",                           // Use "NaN" when data is not available
                    indicator: "Rent burden rate",          // Still describe what you WOULD measure
                    value: "Data not available",            // Be honest about data gaps
                    year: null,                            // null for unknown year
                    shortfall: "Unknown",                  // Unknown gap
                    context: "Housing cost data is not publicly available for our city, representing a transparency issue.",
                    source: "Data gap identified",
                    sourceUrl: null,
                    citation: "No data source available", 
                    actions: [
                        "Advocate for city government to collect and publish housing cost data",
                        "Support tenant organizations gathering rent data through surveys"
                    ]
                }
            ],
            actions: [
                "Demand housing data transparency from city government"
            ]
        }
        // ... continue for all 12 social categories
    ],
    
    // =====================================================================
    // ECOLOGICAL CEILING - Outer ring (9 categories, planetary boundaries) 
    // =====================================================================
    ecological: [
        {
            // REQUIRED: One of the 9 planetary boundary categories
            // Options: "Climate Change", "Biodiversity Loss", "Nitrogen & Phosphorus", 
            //         "Ocean Acidification", "Land-Use Change", "Freshwater Use",
            //         "Ozone Depletion", "Atmospheric Aerosol Loading", "Chemical Pollution"
            category: "Climate Change",
            
            indicators: [
                {
                    // ECOLOGICAL INDICATORS work similarly but with key differences:
                    name: "Per Capita Emissions",
                    level: 75,                              // Positive = BAD (overshoot), Negative = GOOD (within limits)
                    indicator: "GHG emissions per capita",
                    value: "8.5 tons CO2/person/year",     // Your city's actual emissions
                    year: 2023,
                    overshoot: "270%",                      // For ecological: percentage ABOVE planetary boundary
                                                           // (8.5 tons vs ~2.3 ton target = 270% overshoot)
                    
                    context: "Our city's per capita emissions are 270% above the global sustainable level, requiring immediate decarbonization.",
                    source: "Your City Climate Action Plan 2023",
                    sourceUrl: "https://yourcity.gov/climate-inventory",
                    citation: "Your City Environmental Dept., 2023. GHG Emissions Inventory.",
                    actions: [
                        "Switch to [Your Clean Energy Utility] renewable energy program",
                        "Use [Your City Transit] instead of driving when possible",
                        "Support [Local Climate Policy] for building electrification"
                    ]
                }
            ],
            actions: [
                "Support emergency climate action to reach carbon neutrality by 2030",
                "Advocate for fossil fuel infrastructure phase-out"
            ]
        }
        // ... continue for all 9 ecological categories
    ]
};

// =====================================================================
// LEVEL SCALE QUICK REFERENCE
// =====================================================================
// 
// SOCIAL FOUNDATION (inner ring):
// -100 = Fully meeting needs (everyone has enough)
// -50  = Strong performance  
// 0    = At threshold
// +25  = Moderate shortfall (some people lack basic needs)
// +50  = Significant shortfall 
// +100 = Severe shortfall (crisis level)
// +150 = Critical shortfall (emergency level)
//
// ECOLOGICAL CEILING (outer ring):  
// -100 = Well within planetary boundary
// -50  = Sustainable performance
// 0    = At planetary boundary  
// +25  = Moderate overshoot (exceeding safe limits)
// +50  = Significant overshoot
// +100 = Severe overshoot (dangerous level) 
// +150 = Critical overshoot (catastrophic level)
//
// "NaN" = Data not available (shows as gray)
```

### Key Data Structure Rules:

1. **Categories must match the standard 21 doughnut categories** (12 social + 9 ecological)
2. **Levels must be numbers between -100 and +150** (or "NaN" for missing data)
3. **Positive levels = bad, negative levels = good** for both social and ecological
4. **Actions must be specific to your city** - include real organization names, policies, websites
5. **Sources must be credible and cited** - local government, universities, nonprofits preferred
6. **Context must explain local relevance** - why does this indicator matter to your community?

### Step 3: Copy and Customize Files
1. **Copy** `doughnut-interactive.js` (no changes needed)
2. **Adapt** `california-data.js` with your city's data
3. **Customize** `california-example.html`:
   - Change title: "Your City Doughnut Economics Snapshot"
   - Update subtitle with your data source
   - Modify overview statistics
   - Update footer citation

### Step 4: Test and Deploy
1. **Test locally**: Open the HTML file directly in your browser
2. **Verify data**: Check that all segments are clickable and show correct information
3. **Mobile test**: Ensure responsive design works on phones and tablets
4. **Deploy**: Host on any web server (GitHub Pages, Netlify, etc.)

### Data Collection Tips
- **Start with available data**: Use census, municipal reports, environmental monitoring
- **Calculate shortfalls**: Compare current performance to established targets
- **Include uncertainty**: Use "Data not available" for missing indicators
- **Local context**: Adapt global thresholds to local conditions where appropriate
- **Community input**: Engage local stakeholders to validate indicators and thresholds

## Technical Requirements

### Browser Compatibility
- **Modern browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile browsers**: iOS Safari 12+, Android Chrome 60+
- **Canvas support**: HTML5 Canvas required (universally supported)
- **ES6 features**: Uses modern JavaScript (no IE support)

### Dependencies
- **None**: Completely self-contained, no external libraries
- **File size**: ~100KB total for all files
- **Network**: No network requests after initial load

### Hosting
- **Static hosting**: Works with any static file server
- **CDN**: Can be served from content delivery networks
- **Local**: Opens directly from file system (`file://` protocol)
- **HTTPS**: Secure hosting recommended for production

## Integration with Upstream Project

This contribution is designed to **complement, not replace** the original doughnut-economics-graph project:

### Backward Compatibility
- All original `Doughnut` class methods continue to work
- Existing projects can upgrade without code changes
- Original simple example still functions as before

### Extension Points
- `InteractiveDoughnut` extends the base `Doughnut` class
- New features are opt-in through the enhanced constructor
- Color coding and interactivity can be disabled for simple use cases

### File Organization
```
doughnut-economics-graph/
├── doughnut.js                    # Original simple version
├── doughnut.html                  # Original demo
├── examples/
│   ├── california/
│   │   ├── california-data.js     # This contribution
│   │   ├── doughnut-interactive.js
│   │   ├── california-example.html
│   │   └── README.md
│   └── [other-cities]/
│       └── [similar structure]
└── README.md
```

## Future Enhancements

This contribution opens the door for additional features:

### Visualization Enhancements
- **Comparison mode**: Side-by-side city comparisons
- **Time series**: Animation showing progress over time
- **Alternative layouts**: Bar charts, radar charts for different data views
- **Accessibility**: Screen reader support, keyboard navigation

### Data Features
- **Data validation**: Automated checking of data completeness and format
- **Export options**: CSV, JSON, image export functionality
- **API integration**: Dynamic data loading from REST APIs
- **Collaborative editing**: Multi-user data entry and validation

### Interactivity
- **Search and filter**: Find specific indicators quickly
- **Storytelling mode**: Guided tours through the data
- **Sharing**: Deep linking to specific indicators
- **Embedding**: Widget version for other websites

## Contributing

To contribute your own city data or enhancements:

1. **Fork** the upstream repository
2. **Create** a new directory under `examples/your-city/`
3. **Follow** this California example structure
4. **Test** thoroughly on mobile and desktop
5. **Document** your data sources and methodology
6. **Submit** a pull request with clear description

## License

This contribution maintains the same **MIT License** as the original project, ensuring it remains free and open for all cities to use, modify, and redistribute.

---

**Questions or need help adapting this for your city?** Open an issue in the upstream repository or contact the doughnut economics community for support.