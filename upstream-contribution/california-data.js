/*
===============================================================================
CALIFORNIA DOUGHNUT ECONOMICS DATA
===============================================================================

This file contains comprehensive data for California across all dimensions of 
Kate Raworth's Doughnut Economics framework. It serves as both functional data 
AND complete documentation of the doughnut methodology.

WHAT IS DOUGHNUT ECONOMICS?
---------------------------
The Doughnut Economics model defines a "safe and just operating space for humanity"
bounded by two rings:

1. SOCIAL FOUNDATION (Inner Ring): 12 categories covering basic human needs that 
   no one should fall below. When people lack access to food, housing, healthcare, 
   education, etc., they fall into the "social shortfall" hole in the center.

2. ECOLOGICAL CEILING (Outer Ring): 9 categories covering planetary boundaries 
   that humanity should not overshoot. When we exceed these limits (climate change, 
   biodiversity loss, etc.), we break through the ecological ceiling.

The DOUGHNUT is the sweet spot between these rings - where all people can thrive 
within planetary means.

LEVEL SCALE METHODOLOGY (-100 to 150)
--------------------------------------
This visualization uses a standardized scale where:

FOR SOCIAL FOUNDATION (inner ring):
• NEGATIVE values = GOOD (thriving, meeting needs)
  -100 = Fully meeting social foundation (no shortfall)
  -50 = Strong performance 
  0 = At threshold
• POSITIVE values = BAD (shortfall, unmet needs)  
  +50 = Moderate shortfall
  +100 = Severe shortfall
  +150 = Critical shortfall

FOR ECOLOGICAL CEILING (outer ring):
• NEGATIVE values = GOOD (within planetary boundaries)
  -100 = Well within ecological limits
  -50 = Sustainable performance
  0 = At planetary boundary
• POSITIVE values = BAD (ecological overshoot)
  +50 = Moderate overshoot  
  +100 = Severe overshoot
  +150 = Critical overshoot

HOW PERCENTAGES CONVERT TO LEVELS:
If CalDEC reports "40% shortfall in housing", this becomes level +50 
(proportional mapping of 40% shortfall to the +0 to +100 scale)

DATA SOURCE & METHODOLOGY:
--------------------------
Source: Aritza & Kraus-Polk et al., 2025. "The California Doughnut Snapshot and Report"
California Doughnut Economics Collaborative (CalDEC)
Published on Zenodo: https://zenodo.org/records/17540639

The CalDEC report analyzed California across all 42 standard doughnut indicators,
finding that 100% of social indicators are in shortfall and 89% of ecological 
indicators are in overshoot - indicating California is far outside the safe 
and just operating space.

HOW TO ADAPT THIS FOR YOUR CITY:
---------------------------------
1. Replace "California" with your city name throughout
2. Gather data for the same 42 indicators (or as many as available)
3. Calculate shortfall/overshoot percentages relative to targets
4. Map percentages to the -100 to 150 level scale
5. Update all source citations and URLs
6. Customize the context and actions for local relevance

*/

const CALIFORNIA_DOUGHNUT_DATA = {
    // BASIC METADATA: Information about this doughnut portrait
    name: "California Doughnut Economics Snapshot",        // Display name for the visualization
    year: 2025,                                            // Year of data compilation
    description: "State of California across 42 social and ecological indicators",  // Brief description
    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",  // Academic citation
    sourceUrl: "https://zenodo.org/records/17540639",      // URL to the primary data source
    
    /*
    ========================================================================
    SOCIAL FOUNDATION (Inner Ring) - 12 Categories, 24 Indicators
    ========================================================================
    
    The social foundation represents the minimum standards of living that 
    no person should fall below. These are basic human rights and needs.
    
    CALIFORNIA'S SOCIAL FOUNDATION STATUS: 100% in shortfall
    Every single social indicator shows California is failing to meet 
    basic needs for all residents - despite being the world's 5th largest 
    economy, millions of Californians lack adequate housing, healthcare, 
    food security, education, and other essentials.
    
    THE 12 STANDARD SOCIAL FOUNDATION CATEGORIES:
    1. Food - access to adequate, affordable, nutritious food
    2. Health - healthcare access, outcomes, life expectancy  
    3. Education - learning opportunities, skills, knowledge
    4. Income & Work - decent work, living wages, economic security
    5. Water & Sanitation - clean water access, sanitation facilities
    6. Energy - clean, affordable, reliable energy access
    7. Networks - social connections, internet access, community
    8. Housing - adequate, affordable, secure shelter
    9. Gender Equality - equal rights, opportunities, treatment
    10. Social Equity - fair distribution of resources and opportunities
    11. Political Voice - democratic participation, representation
    12. Peace & Justice - safety, security, fair legal systems
    
    INDICATOR STRUCTURE EXPLAINED:
    Each indicator contains these fields:
    • name: Short descriptive name for the indicator
    • level: Numeric level (-100 to +150, positive = bad for social)
    • indicator: Specific metric being measured  
    • value: The actual measured value (number, percentage, description)
    • year: Year the data was collected
    • shortfall: Percentage shortfall below target (for social indicators)
    • context: 1-2 sentences explaining what this means and why it matters
    • source: Name of the organization or report providing the data
    • sourceUrl: Direct link to the data source
    • citation: Full academic citation
    • actions: Array of specific actions individuals can take
    */
    social: [
        /*
         * CONNECTIVITY & TRANSPORT
         * 
         * WHY THIS MATTERS: In the 21st century, access to transportation and 
         * communication networks is fundamental to participating in society. 
         * Without reliable internet and transit, people are excluded from jobs, 
         * education, healthcare, and social connections.
         * 
         * WHAT WE MEASURE: Physical mobility (public transit access) and digital 
         * connectivity (broadband internet access). Both are essential infrastructure 
         * for a just society.
         * 
         * CALIFORNIA'S CHALLENGE: Despite being a tech capital, significant digital 
         * divides persist, and many communities lack adequate public transportation.
         */
        {
            category: "Connectivity & Transport",
            indicators: [
                {
                    name: "Broadband Access",                           // Short name for this indicator
                    level: 25,                                          // Level on -100 to +150 scale (17% shortfall = +25)
                    indicator: "Broadband shortfall",                   // The specific metric measured
                    value: "17%",                                       // The actual measured shortfall percentage
                    year: 2025,                                         // Year this data was collected
                    shortfall: "17%",                                   // Percentage below target (17% of CA lacks adequate broadband)
                    context: "Digital divide persists across California, with rural and low-income communities disproportionately affected by inadequate internet access.", // Why this matters
                    source: "CalDEC California Doughnut Report",        // Organization that provided this data
                    sourceUrl: "https://zenodo.org/records/17540639",   // Direct link to access the data
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.", // Full citation
                    actions: [                                          // Specific actions people can take
                        "Support municipal broadband initiatives in your community",
                        "Advocate for digital equity programs and affordable internet access", 
                        "Donate devices to local digital inclusion programs"
                    ]
                },
                {
                    name: "Public Transit Access",                      // Second indicator in this category  
                    level: 50,                                          // Level: 40% shortfall = +50 on our scale
                    indicator: "Transit shortfall",                     // Measuring lack of adequate public transit
                    value: "40%",                                       // 40% of Californians lack good transit access
                    year: 2025,                                         // Data year
                    shortfall: "40%",                                   // 40% below target (universal transit access)
                    context: "Many Californians lack adequate public transportation options, limiting mobility and increasing car dependence.", // Social justice impact
                    source: "CalDEC California Doughnut Report",        
                    sourceUrl: "https://zenodo.org/records/17540639",   
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [                                          // Individual actions for transit equity
                        "Use public transit when available to support system expansion",
                        "Advocate for transit funding and improved service in your area",
                        "Support transit-oriented development policies"
                    ]
                }
            ],
            // CATEGORY-LEVEL ACTIONS: Broader systemic changes needed for connectivity & transport
            actions: [
                "Advocate for infrastructure investments that connect communities",
                "Support policies that expand equitable access to transportation and communication"
            ]
        },
        /*
         * EDUCATION
         * 
         * WHY THIS MATTERS: Education is fundamental to human development and 
         * social mobility. It's not just about literacy and numeracy - it's about 
         * developing critical thinking, creativity, and the skills needed to 
         * participate fully in society and the economy.
         * 
         * WHAT WE MEASURE: Educational access, quality, and outcomes across the 
         * lifespan. This includes basic literacy, educational attainment, and 
         * financial barriers that prevent educational access.
         * 
         * CALIFORNIA'S CHALLENGE: Despite having world-class universities, 
         * California has significant educational inequities and student debt 
         * burdens that limit access and opportunity.
         */
        {
            category: "Education",
            indicators: [
                {
                    name: "Literacy",
                    level: 35,  // 28% shortfall
                    indicator: "Literacy shortfall",
                    value: "28%",
                    year: 2025,
                    shortfall: "28%",
                    context: "Educational disparities continue to affect California students, with literacy gaps particularly impacting low-income and minority communities.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Volunteer as a tutor in local schools or literacy programs",
                        "Support funding for public education and early childhood programs",
                        "Advocate for smaller class sizes and more reading specialists"
                    ]
                },
                {
                    name: "Student Debt Burden",
                    level: 60,  // 46% shortfall
                    indicator: "Student loan debt shortfall",
                    value: "46%",
                    year: 2025,
                    shortfall: "46%",
                    context: "High student debt burdens limit economic mobility and life opportunities for California's young adults.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support student loan forgiveness and debt relief programs",
                        "Advocate for affordable higher education and community college funding",
                        "Promote financial literacy education in schools"
                    ]
                }
            ],
            actions: [
                "Support equitable education funding and student debt relief",
                "Volunteer in schools and advocate for educational opportunities for all"
            ]
        },
        {
            category: "Energy",
            indicators: [
                {
                    name: "Energy Burden",
                    level: 30,  // 20% shortfall
                    indicator: "Energy burden shortfall",
                    value: "20%",
                    year: 2025,
                    shortfall: "20%",
                    context: "Many California households spend too much of their income on energy costs, creating financial stress and limiting other opportunities.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support low-income energy assistance programs",
                        "Advocate for utility rate reform and solar equity programs",
                        "Promote energy efficiency retrofits for affordable housing"
                    ]
                },
                {
                    name: "Energy Reliability",
                    level: 15,  // 7% shortfall
                    indicator: "Reliability shortfall",
                    value: "7%",
                    year: 2025,
                    shortfall: "7%",
                    context: "Power outages and grid instability affect California communities, with particular impacts on vulnerable populations.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support grid modernization and renewable energy storage",
                        "Advocate for community resilience hubs and backup power",
                        "Promote distributed energy resources and microgrids"
                    ]
                }
            ],
            actions: [
                "Support energy justice initiatives and clean energy access",
                "Advocate for grid reliability and affordable energy for all"
            ]
        },
        {
            category: "Equity",
            indicators: [
                {
                    name: "Racial Equity",
                    level: 50,  // 40% shortfall
                    indicator: "Racial equity shortfall",
                    value: "40%",
                    year: 2025,
                    shortfall: "40%",
                    context: "Persistent racial disparities in California across wealth, health, education, and criminal justice systems require systemic change.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support organizations working for racial justice and equity",
                        "Advocate for policies that address systemic racism",
                        "Educate yourself and others about racial equity issues"
                    ]
                },
                {
                    name: "Gender Pay Equity",
                    level: 20,  // 13% shortfall
                    indicator: "Gender pay gap shortfall",
                    value: "13%",
                    year: 2025,
                    shortfall: "13%",
                    context: "Women in California still earn less than men for equivalent work, with wider gaps for women of color.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support pay transparency and equal pay legislation",
                        "Advocate for family-friendly workplace policies",
                        "Support women-owned businesses and leadership programs"
                    ]
                }
            ],
            actions: [
                "Work to dismantle systemic inequalities across all dimensions",
                "Support policies and organizations advancing equity and inclusion"
            ]
        },
        {
            category: "Food",
            indicators: [
                {
                    name: "Food Security",
                    level: 20,  // ~11% shortfall
                    indicator: "Food insecurity shortfall",
                    value: "~11%",
                    year: 2025,
                    shortfall: "~11%",
                    context: "Food insecurity affects millions of Californians despite the state's abundant agricultural production.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Donate to and volunteer at local food banks",
                        "Support policies to expand CalFresh/SNAP access",
                        "Advocate for living wages that enable food security"
                    ]
                },
                {
                    name: "Nutritious Diet Access",
                    level: 55,  // ~41% shortfall
                    indicator: "Vegetable consumption shortfall",
                    value: "~41%",
                    year: 2025,
                    shortfall: "~41%",
                    context: "Many Californians lack access to affordable, nutritious foods, particularly fresh fruits and vegetables.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support community gardens and farm-to-school programs",
                        "Advocate for healthy food access in underserved communities",
                        "Choose locally grown, sustainable produce when possible"
                    ]
                }
            ],
            actions: [
                "Support food security programs and sustainable agriculture",
                "Advocate for equitable access to healthy, affordable food"
            ]
        },
        {
            category: "Health",
            indicators: [
                {
                    name: "Life Expectancy",
                    level: 40,  // ~32% shortfall
                    indicator: "Life expectancy shortfall",
                    value: "~32%",
                    year: 2025,
                    shortfall: "~32%",
                    context: "Health disparities across California communities result in significant differences in life expectancy and health outcomes.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support community health centers and public health programs",
                        "Advocate for environmental health improvements",
                        "Promote policies that address social determinants of health"
                    ]
                },
                {
                    name: "Healthcare Affordability",
                    level: 70,  // ~53% shortfall
                    indicator: "Healthcare affordability shortfall",
                    value: "~53%",
                    year: 2025,
                    shortfall: "~53%",
                    context: "High healthcare costs prevent many Californians from accessing necessary medical care and treatments.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support universal healthcare initiatives",
                        "Advocate for prescription drug cost controls",
                        "Help neighbors navigate health insurance enrollment"
                    ]
                }
            ],
            actions: [
                "Support universal healthcare and health equity initiatives",
                "Advocate for affordable care and health justice"
            ]
        },
        /*
         * HOUSING
         * 
         * WHY THIS MATTERS: Stable, affordable housing is a fundamental human right 
         * and the foundation for health, education, and economic opportunity. Without 
         * secure housing, families cannot thrive - children struggle in school, adults 
         * can't maintain steady employment, and health suffers.
         * 
         * WHAT WE MEASURE: Housing affordability (% of income spent on housing) and 
         * housing security (homelessness rates). The UN defines affordable housing 
         * as <30% of income - anything above that is "cost burdened."
         * 
         * CALIFORNIA'S CRISIS: California has both the highest housing costs and 
         * largest homeless population in the nation. This represents a complete 
         * failure of the housing system - a social foundation collapse affecting 
         * millions of residents across income levels.
         */
        {
            category: "Housing",
            indicators: [
                {
                    name: "Housing Cost Burden",                        // Critical affordability measure
                    level: 75,                                          // 55% shortfall = severe crisis level
                    indicator: "Housing cost burden shortfall",         // % of people spending >30% income on housing
                    value: "~55%",                                      // 55% of Californians are cost-burdened
                    year: 2025,
                    shortfall: "~55%",                                  // This means 55% spend >30% income on housing
                    context: "California's housing affordability crisis forces many residents to spend excessive amounts of income on housing costs.", // The human cost
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [                                          // Housing justice actions
                        "Support affordable housing development and preservation",
                        "Advocate for tenant protections and rent stabilization",
                        "Promote inclusive zoning and housing policies"
                    ]
                },
                {
                    name: "Homelessness",                               // Most extreme housing insecurity
                    level: 45,                                          // 36% shortfall = severe crisis  
                    indicator: "Homelessness shortfall",                // Gap between current homelessness and zero
                    value: "~36%",                                      // 36% gap in achieving functional zero homelessness
                    year: 2025,
                    shortfall: "~36%",                                  // Measures distance from eliminating homelessness
                    context: "California has the nation's largest unhoused population, requiring comprehensive housing and supportive services.", // National shame metric
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [                                          // Direct service + advocacy actions
                        "Support homeless services and housing-first programs",
                        "Volunteer at local shelters and service organizations", 
                        "Advocate for mental health and addiction treatment services"
                    ]
                }
            ],
            // HOUSING CATEGORY ACTIONS: Systemic changes needed to fix the housing crisis
            actions: [
                "Support housing justice and policies for affordable homes",
                "Work to end homelessness through comprehensive solutions"
            ]
        },
        {
            category: "Income & Work",
            indicators: [
                {
                    name: "Poverty",
                    level: 25,  // ~15% shortfall
                    indicator: "Poverty shortfall",
                    value: "~15%",
                    year: 2025,
                    shortfall: "~15%",
                    context: "Despite California's wealth, millions of residents struggle with poverty due to high costs of living and inadequate wages.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support anti-poverty programs and direct cash assistance",
                        "Advocate for living wage policies and worker rights",
                        "Support job training and workforce development programs"
                    ]
                },
                {
                    name: "Unemployment",
                    level: 15,  // ~9% shortfall (U-6)
                    indicator: "Unemployment (U-6) shortfall",
                    value: "~9%",
                    year: 2025,
                    shortfall: "~9%",
                    context: "Broader unemployment measures show underemployment and labor market challenges across California.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support workforce development and job training programs",
                        "Advocate for quality job creation and economic development",
                        "Promote worker cooperatives and employee ownership"
                    ]
                }
            ],
            actions: [
                "Support economic policies that provide good jobs for all",
                "Advocate for worker rights and economic justice"
            ]
        },
        {
            category: "Peace & Justice",
            indicators: [
                {
                    name: "Public Safety",
                    level: 45,  // ~36% shortfall
                    indicator: "Violent crime shortfall",
                    value: "~36%",
                    year: 2025,
                    shortfall: "~36%",
                    context: "Violence impacts communities across California, requiring comprehensive prevention and community safety approaches.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support community-based violence prevention programs",
                        "Advocate for restorative justice and police reform",
                        "Promote youth development and mentorship programs"
                    ]
                },
                {
                    name: "Police Accountability",
                    level: 85,  // ~65% shortfall
                    indicator: "Police scorecard shortfall",
                    value: "~65%",
                    year: 2025,
                    shortfall: "~65%",
                    context: "Police accountability measures show significant gaps in oversight, transparency, and community trust.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support police oversight and accountability measures",
                        "Advocate for community policing and reform initiatives",
                        "Engage in local public safety and justice discussions"
                    ]
                }
            ],
            actions: [
                "Work for community safety and criminal justice reform",
                "Support accountability and healing-centered approaches to justice"
            ]
        },
        {
            category: "Political Voice",
            indicators: [
                {
                    name: "Voter Turnout",
                    level: 50,  // ~40% shortfall
                    indicator: "Voter turnout shortfall",
                    value: "~40%",
                    year: 2025,
                    shortfall: "~40%",
                    context: "Many Californians are not participating in democratic processes, limiting representative governance.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Register to vote and encourage others to participate",
                        "Support voter education and engagement programs",
                        "Advocate for accessible voting and civic engagement"
                    ]
                },
                {
                    name: "Voter Registration",
                    level: 25,  // ~16% shortfall
                    indicator: "Voter registration shortfall",
                    value: "~16%",
                    year: 2025,
                    shortfall: "~16%",
                    context: "Significant portions of eligible Californians remain unregistered to vote, limiting democratic participation.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Volunteer for voter registration drives",
                        "Support automatic voter registration initiatives",
                        "Help community members navigate the registration process"
                    ]
                }
            ],
            actions: [
                "Strengthen democratic participation and civic engagement",
                "Support voter rights and accessible democracy"
            ]
        },
        {
            category: "Social Cohesion",
            indicators: [
                {
                    name: "Income Inequality",
                    level: 35,  // ~26% shortfall
                    indicator: "Income inequality shortfall",
                    value: "~26%",
                    year: 2025,
                    shortfall: "~26%",
                    context: "California has among the highest income inequality in the nation, undermining social cohesion and opportunity.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support progressive tax policies and wealth redistribution",
                        "Advocate for worker ownership and cooperative businesses",
                        "Promote policies that strengthen the middle class"
                    ]
                },
                {
                    name: "Community Wellbeing",
                    level: 35,  // ~26% shortfall
                    indicator: "Unhappiness shortfall",
                    value: "~26%",
                    year: 2025,
                    shortfall: "~26%",
                    context: "Mental health challenges and social disconnection affect community wellbeing across California.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support mental health services and community programs",
                        "Build connections and social support in your community",
                        "Advocate for policies that promote social wellbeing"
                    ]
                }
            ],
            actions: [
                "Build community connections and support social solidarity",
                "Work to reduce inequality and promote shared prosperity"
            ]
        },
        {
            category: "Water & Sanitation",
            indicators: [
                {
                    name: "Water System Access",
                    level: 5,  // ~2% shortfall
                    indicator: "Water system shortfall",
                    value: "~2%",
                    year: 2025,
                    shortfall: "~2%",
                    context: "Most Californians have access to safe water systems, though quality and affordability challenges remain.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support water infrastructure investments and maintenance",
                        "Advocate for safe, affordable water access for all communities",
                        "Promote water conservation and sustainable management"
                    ]
                },
                {
                    name: "Sanitation Access",
                    level: 30,  // ~23% shortfall
                    indicator: "Sanitation shortfall",
                    value: "~23%",
                    year: 2025,
                    shortfall: "~23%",
                    context: "Sanitation challenges particularly affect rural communities, farmworkers, and unhoused populations.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support sanitation infrastructure for underserved communities",
                        "Advocate for dignified facilities in all neighborhoods",
                        "Support services for unhoused populations"
                    ]
                }
            ],
            actions: [
                "Ensure access to safe water and sanitation for all",
                "Support infrastructure investments in underserved communities"
            ]
        }
    ],
    
    /*
    ========================================================================
    ECOLOGICAL CEILING (Outer Ring) - 9 Categories, 18 Indicators  
    ========================================================================
    
    The ecological ceiling represents planetary boundaries that humanity 
    must not overshoot to maintain a stable, liveable Earth system. These 
    are biophysical limits beyond which we risk irreversible environmental 
    damage and civilizational collapse.
    
    CALIFORNIA'S ECOLOGICAL STATUS: 89% in overshoot
    California is breaking through nearly all planetary boundaries, 
    consuming resources and generating pollution at rates that are 
    fundamentally unsustainable. If the whole world lived like California, 
    we would need 3.5+ Earths.
    
    THE 9 PLANETARY BOUNDARIES:
    1. Climate Change - greenhouse gas emissions destabilizing climate
    2. Biodiversity Loss - species extinction beyond natural rates
    3. Nitrogen & Phosphorus Cycles - nutrient pollution disrupting ecosystems  
    4. Ocean Acidification - CO2 absorption changing ocean chemistry
    5. Land Use Change - conversion of natural ecosystems 
    6. Freshwater Use - depletion of water resources beyond renewal rates
    7. Ozone Layer Depletion - destruction of stratospheric ozone protection
    8. Atmospheric Aerosol Loading - air pollution affecting climate/health
    9. Chemical Pollution - toxic substances accumulating in environment
    
    ECOLOGICAL INDICATOR STRUCTURE:
    For ecological indicators, the fields are:
    • overshoot: Percentage beyond planetary boundary (instead of shortfall)
    • level: Positive values = bad (overshoot), negative = good (within limits)
    • context: Explains environmental impact and why this boundary matters
    • actions: Steps to reduce ecological overshoot
    
    All other fields (source, citation, etc.) work the same as social indicators.
    
    OVERSHOOT EXAMPLES:
    • "60% overshoot" means we're 60% above the safe planetary boundary
    • This becomes level +80 on our visualization scale  
    • "Within limits" would be negative levels (green visualization)
    */
    ecological: [
        {
            category: "Air Pollution",
            indicators: [
                {
                    name: "Ozone (O3)",
                    level: 80,  // ~60% overshoot
                    indicator: "O3 overshoot",
                    value: "~60%",
                    year: 2025,
                    overshoot: "~60%",
                    context: "Ground-level ozone pollution remains above healthy standards across much of California, particularly in inland valleys.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Reduce vehicle emissions by driving less and choosing clean transportation",
                        "Support policies to reduce industrial air pollution",
                        "Advocate for air quality monitoring and enforcement"
                    ]
                },
                {
                    name: "Fine Particles (PM2.5)",
                    level: 80,  // ~60% overshoot
                    indicator: "PM2.5 overshoot",
                    value: "~60%",
                    year: 2025,
                    overshoot: "~60%",
                    context: "Fine particulate matter pollution causes significant health impacts, with wildfire smoke increasingly contributing to air quality problems.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support wildfire prevention and forest management",
                        "Reduce personal contributions to air pollution",
                        "Use air purifiers during poor air quality days"
                    ]
                }
            ],
            actions: [
                "Reduce transportation emissions and support clean air policies",
                "Advocate for comprehensive air quality improvements"
            ]
        },
        {
            category: "Biodiversity Loss",
            indicators: [
                {
                    name: "Habitat Protection",
                    level: 70,  // ~50% overshoot (unprotected areas)
                    indicator: "Unprotected area overshoot",
                    value: "~50%",
                    year: 2025,
                    overshoot: "~50%",
                    context: "California's biodiversity faces significant pressure from development, agriculture, and climate change, requiring expanded habitat protection.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support 30x30 habitat conservation goals",
                        "Advocate for wildlife corridors and ecosystem connectivity",
                        "Volunteer for habitat restoration projects"
                    ]
                },
                {
                    name: "Species Conservation",
                    level: 100,  // High risk
                    indicator: "Species at risk (high)",
                    value: "High",
                    year: 2025,
                    overshoot: "High risk",
                    context: "Many California species face extinction risk from habitat loss, climate change, and human impacts.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support endangered species protection and recovery programs",
                        "Create wildlife-friendly gardens and landscapes",
                        "Advocate for stronger environmental protections"
                    ]
                }
            ],
            actions: [
                "Protect and restore California's unique biodiversity",
                "Support conservation programs and sustainable land use"
            ]
        },
        {
            category: "Chemical Pollution",
            indicators: [
                {
                    name: "Toxic Pesticides",
                    level: 85,  // ~65% overshoot
                    indicator: "Toxic pesticides overshoot",
                    value: "~65%",
                    year: 2025,
                    overshoot: "~65%",
                    context: "California's intensive agriculture relies heavily on pesticides, creating environmental and health risks for farmworkers and communities.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Choose organic and sustainably grown produce",
                        "Support farmworker health and safety protections",
                        "Advocate for pesticide reduction and alternative pest management"
                    ]
                },
                {
                    name: "Toxic Releases",
                    level: 20,  // ~13% overshoot
                    indicator: "Toxic releases overshoot",
                    value: "~13%",
                    year: 2025,
                    overshoot: "~13%",
                    context: "Industrial toxic releases continue to impact California communities, particularly disadvantaged areas.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support pollution prevention and cleaner production",
                        "Advocate for environmental justice in industrial areas",
                        "Promote green chemistry and safer alternatives"
                    ]
                }
            ],
            actions: [
                "Reduce chemical pollution and support safer alternatives",
                "Advocate for environmental justice and worker protection"
            ]
        },
        /*
         * CLIMATE CHANGE - The Most Critical Planetary Boundary
         * 
         * WHY THIS MATTERS: Climate change is the defining challenge of our time. 
         * Rising greenhouse gas concentrations are destabilizing the global climate 
         * system, causing sea level rise, extreme weather, ecosystem collapse, and 
         * threatening civilization itself. Scientists agree we have less than a decade 
         * to dramatically reduce emissions to avoid catastrophic impacts.
         * 
         * PLANETARY BOUNDARY: 350 ppm CO2 (we're at 420+ ppm) or roughly 2.3 tons 
         * CO2 per person per year globally. California's per capita emissions are 
         * still ~4+ tons - nearly double the safe level.
         * 
         * WHAT WE MEASURE: Per capita greenhouse gas emissions and clean energy 
         * transition progress. Even "clean" California is massively overshooting 
         * the climate boundary.
         * 
         * CALIFORNIA'S CHALLENGE: Despite leadership on climate policy, California's 
         * consumption-based emissions remain far too high. We must decarbonize 
         * transportation, buildings, and consumption urgently.
         */
        {
            category: "Climate Change",
            indicators: [
                {
                    name: "Per Capita Emissions",                       // Critical climate indicator
                    level: 75,                                          // Major overshoot - emergency level
                    indicator: "GHG per capita overshoot",              // Emissions above sustainable level (2.3 tons/year)
                    value: "Overshoot",                                 // Qualitative assessment (could be "4.2 tons CO2/year")
                    year: 2025,
                    overshoot: "Above sustainable levels",              // For ecological indicators, we measure overshoot not shortfall
                    context: "California's per capita greenhouse gas emissions remain above sustainable levels despite progress in reducing total emissions.", // The urgency
                    source: "CalDEC California Doughnut Report", 
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [                                          // Personal decarbonization actions
                        "Reduce personal carbon footprint through transportation, energy, and consumption choices",
                        "Support renewable energy development and electrification", 
                        "Advocate for ambitious climate policies and carbon pricing"
                    ]
                },
                {
                    name: "Clean Electricity",                          // Energy transition indicator
                    level: 60,                                          // Still significant overshoot - too much fossil fuel
                    indicator: "Non-renewable electricity overshoot",   // % of electricity still from fossil sources
                    value: "Overshoot",                                 // Qualitative (could be "35% fossil electricity")
                    year: 2025,
                    overshoot: "Still too dependent on fossil fuels",   // Gap from 100% renewable target
                    context: "California's electricity grid still relies partially on fossil fuels, requiring faster transition to 100% renewable energy.", // Why this matters
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639", 
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [                                          // Clean energy actions
                        "Choose renewable energy options from your utility",
                        "Install solar panels and battery storage where feasible",
                        "Support policies for 100% clean electricity"
                    ]
                }
            ],
            // CLIMATE CATEGORY ACTIONS: Systemic decarbonization needed
            actions: [
                "Take urgent action to reduce greenhouse gas emissions",
                "Support renewable energy transition and climate policies"
            ]
        },
        {
            category: "Freshwater Use",
            indicators: [
                {
                    name: "Groundwater Overdraft",
                    level: 85,  // ~63% overshoot
                    indicator: "Groundwater overshoot",
                    value: "~63%",
                    year: 2025,
                    overshoot: "~63%",
                    context: "California continues to overdraft groundwater resources, depleting aquifers faster than they can recharge.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Conserve water in homes, gardens, and businesses",
                        "Support sustainable groundwater management policies",
                        "Promote water recycling and reuse programs"
                    ]
                },
                {
                    name: "Water Footprint",
                    level: 70,  // ~52% overshoot
                    indicator: "Water footprint overshoot",
                    value: "~52%",
                    year: 2025,
                    overshoot: "~52%",
                    context: "California's total water consumption, including embedded water in goods and food, exceeds sustainable levels.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Choose foods and products with lower water footprints",
                        "Support water-efficient agriculture and industry",
                        "Advocate for comprehensive water use accounting"
                    ]
                }
            ],
            actions: [
                "Dramatically reduce water consumption and improve efficiency",
                "Support sustainable water management and conservation"
            ]
        },
        {
            category: "Land-Use Change",
            indicators: [
                {
                    name: "Forest Protection",
                    level: 40,  // ~28% overshoot
                    indicator: "Forest cover overshoot",
                    value: "~28%",
                    year: 2025,
                    overshoot: "~28%",
                    context: "California continues to lose forest cover to development, agriculture, and wildfires faster than sustainable rates.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support reforestation and forest restoration programs",
                        "Advocate for sustainable forest management practices",
                        "Reduce paper consumption and choose recycled products"
                    ]
                },
                {
                    name: "Ecological Footprint",
                    level: 150,  // ~351% overshoot (extreme)
                    indicator: "Ecological footprint overshoot",
                    value: "~351%",
                    year: 2025,
                    overshoot: "~351%",
                    context: "California's consumption requires 3.5 times the biologically productive land available within the state, indicating massive ecological overshoot.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Dramatically reduce consumption and embrace circular economy principles",
                        "Choose local, sustainable products and services",
                        "Support policies for degrowth and sustainable living"
                    ]
                }
            ],
            actions: [
                "Protect remaining natural lands and restore damaged ecosystems",
                "Dramatically reduce ecological footprint through sustainable consumption"
            ]
        },
        {
            category: "Nitrogen & Phosphorus",
            indicators: [
                {
                    name: "Nitrogen Loading",
                    level: 100,  // Nitrogen leached overshoot
                    indicator: "Nitrogen leached overshoot",
                    value: "Overshoot",
                    year: 2025,
                    overshoot: "Above sustainable levels",
                    context: "Excess nitrogen from agriculture contaminates California's groundwater and contributes to pollution in waterways.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support sustainable agriculture and reduced fertilizer use",
                        "Choose organic produce and support regenerative farming",
                        "Advocate for agricultural pollution prevention"
                    ]
                },
                {
                    name: "Eutrophication",
                    level: 150,  // Very high, ~520%+ overshoot
                    indicator: "Eutrophication overshoot (very high, ~520%+)",
                    value: "~520%+",
                    year: 2025,
                    overshoot: "~520%+",
                    context: "Severe eutrophication threatens California's freshwater and coastal ecosystems from nutrient pollution runoff.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support watershed protection and restoration programs",
                        "Reduce fertilizer and chemical runoff from landscapes",
                        "Advocate for agricultural nutrient management policies"
                    ]
                }
            ],
            actions: [
                "Dramatically reduce nutrient pollution from agriculture and urban sources",
                "Support sustainable farming and watershed protection"
            ]
        },
        {
            category: "Ocean Acidification",
            indicators: [
                {
                    name: "Ocean pH",
                    level: 120,  // ~91% overshoot
                    indicator: "pH change overshoot",
                    value: "~91%",
                    year: 2025,
                    overshoot: "~91%",
                    context: "California's coastal waters are experiencing significant acidification from CO2 absorption, threatening marine ecosystems.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Reduce carbon emissions that drive ocean acidification",
                        "Support marine protected areas and ecosystem restoration",
                        "Advocate for global climate action and ocean protection"
                    ]
                },
                {
                    name: "Sulfur Emissions",
                    level: 150,  // SO2-eq footprint overshoot (~500%+)
                    indicator: "SO2-eq footprint overshoot (~500%+)",
                    value: "~500%+",
                    year: 2025,
                    overshoot: "~500%+",
                    context: "Massive sulfur dioxide equivalent emissions contribute to acid rain and ocean acidification impacts.",
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [
                        "Support clean energy transition to reduce sulfur emissions",
                        "Advocate for industrial pollution controls",
                        "Choose products and services with lower environmental impacts"
                    ]
                }
            ],
            actions: [
                "Address climate change to reduce ocean acidification",
                "Support marine ecosystem protection and restoration"
            ]
        },
        /*
         * OZONE LAYER DEPLETION - A Success Story!
         * 
         * WHY THIS MATTERS: The stratospheric ozone layer protects all life on Earth 
         * from harmful ultraviolet radiation. In the 1980s, scientists discovered that 
         * human-made chemicals (CFCs, halons) were creating an "ozone hole" that could 
         * have led to ecological catastrophe and massive increases in skin cancer.
         * 
         * THE PLANETARY BOUNDARY: Maintaining stratospheric ozone concentrations above 
         * 276 Dobson Units globally (the threshold for ecosystem protection).
         * 
         * THE SUCCESS: The 1987 Montreal Protocol is humanity's most successful 
         * environmental treaty. By phasing out ozone-depleting substances globally, 
         * we've put the ozone layer on track to full recovery by ~2066.
         * 
         * WHAT THIS PROVES: Humanity CAN solve global environmental crises when we 
         * act decisively based on science. The ozone success shows what's possible 
         * for climate change and other planetary boundaries.
         * 
         * CALIFORNIA'S STATUS: Within planetary boundary (level 0) - one of the only 
         * green ecological indicators in this entire dataset!
         */
        {
            category: "Ozone Depletion", 
            indicators: [
                {
                    name: "Ozone-Depleting Substances",                 // Tracking the phase-out success
                    level: 0,                                           // Level 0 = at boundary (sustainable!)
                    indicator: "ODS (recovering)",                      // ODS = Ozone-Depleting Substances
                    value: "~0%",                                       // Minimal overshoot - recovery in progress
                    year: 2025,
                    overshoot: "~0% (recovering)",                      // This is GOOD news - recovery happening
                    context: "Ozone-depleting substances are being phased out successfully under the Montreal Protocol, showing positive recovery.", // The success story
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639", 
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [                                          // Actions to maintain the success
                        "Properly dispose of old refrigeration equipment",
                        "Choose ozone-friendly alternatives for cooling and chemicals",
                        "Support continued implementation of the Montreal Protocol"
                    ]
                },
                {
                    name: "Stratospheric Ozone",                        // The actual ozone layer measurement
                    level: 0,                                           // Near threshold = sustainable (for now)
                    indicator: "Ozone layer (near threshold)",          // Tracking recovery progress
                    value: "~0%",                                       // At the safe boundary
                    year: 2025,
                    overshoot: "~0% (near threshold)",                  // Right at the sustainability threshold
                    context: "The ozone layer is recovering well and approaching normal levels thanks to international cooperation.", // Proof that global cooperation works
                    source: "CalDEC California Doughnut Report",
                    sourceUrl: "https://zenodo.org/records/17540639",
                    citation: "Aritza & Kraus-Polk et al., 2025. The California Doughnut Snapshot and Report. CalDEC/Zenodo.",
                    actions: [                                          // Actions to secure the recovery
                        "Continue supporting ozone-friendly technologies", 
                        "Maintain vigilance against ozone-depleting substances",
                        "Use this success as a model for other environmental challenges" // Key lesson!
                    ]
                }
            ],
            // OZONE CATEGORY ACTIONS: Maintaining success and learning lessons
            actions: [
                "Continue progress on ozone layer protection",
                "Apply Montreal Protocol lessons to other environmental challenges" // This is crucial!
            ]
        }
    ]
};

/*
===============================================================================
HOW TO USE THIS DATA STRUCTURE FOR YOUR OWN CITY/REGION
===============================================================================

This California dataset serves as a complete template for creating doughnut 
economics portraits for any city, region, or country. Here's how to adapt it:

STEP 1: GATHER YOUR DATA
------------------------
For each of the 21 doughnut categories (12 social + 9 ecological), you need:
• Current performance data (numbers, percentages, descriptions)
• Targets or thresholds to compare against (what's "good enough"?)
• Sources and citations for credibility
• Year the data was collected

Not every city will have data for all 42 indicators - that's OK! Start with 
what you have and mark missing data as level: "NaN" (not a number).

STEP 2: CALCULATE SHORTFALLS AND OVERSHOOTS
--------------------------------------------
Social Foundation: How far below targets are you?
• Example: If 40% of people are food insecure and target is 0%, shortfall = 40%

Ecological Ceiling: How far above planetary boundaries are you?  
• Example: If per capita emissions are 8 tons and target is 2 tons, overshoot = 300%

STEP 3: MAP TO VISUALIZATION LEVELS (-100 to +150)
--------------------------------------------------
• Social shortfalls map to positive levels: 40% shortfall = level +40-50
• Ecological overshoots map to positive levels: 300% overshoot = level +150
• Good performance maps to negative levels: meeting targets = level -50 to 0
• Unknown data: level: "NaN" (shows as gray in visualization)

STEP 4: CUSTOMIZE CONTEXT AND ACTIONS
--------------------------------------
• Context: Explain what this indicator means for YOUR community
• Actions: List specific steps people in YOUR community can take
• Sources: Use LOCAL data sources when possible for credibility

STEP 5: UPDATE METADATA
-----------------------
• Change name, description, year, citation to match your data
• Update sourceUrl to point to your actual data sources
• Customize the introduction text in your HTML file

EXAMPLE CITY DATA STRUCTURE:
----------------------------
const YOUR_CITY_DOUGHNUT_DATA = {
    name: "Your City Doughnut Economics Portrait",
    year: 2025,
    description: "Brief description of your city/region",
    citation: "Your research team, 2025. Your City Doughnut Report.",
    sourceUrl: "https://your-data-source.org",
    
    social: [
        {
            category: "Food", // One of the 12 standard categories
            indicators: [
                {
                    name: "Food Security",                    // Descriptive name
                    level: 30,                               // +30 = moderate shortfall
                    indicator: "Food insecurity rate",       // Specific metric
                    value: "15%",                           // Actual measured value
                    year: 2024,                             // When measured
                    shortfall: "15%",                       // Gap from 0% target
                    context: "Food insecurity affects X% of residents, concentrated in Y neighborhoods...",
                    source: "Your City Food Bank Survey 2024",
                    sourceUrl: "https://your-source.org/data",
                    citation: "Full academic citation here",
                    actions: [                              // Local actions people can take
                        "Donate to [Your City] Food Bank",
                        "Support [Local Policy] for food access",
                        "Volunteer at [Local Program Name]"
                    ]
                }
                // Add more indicators in this category
            ],
            actions: [
                "Category-wide actions for food security in your city"
            ]
        }
        // Add all 12 social categories (even if some have missing data)
    ],
    
    ecological: [
        {
            category: "Climate Change", // One of the 9 standard categories
            indicators: [
                {
                    name: "Per Capita Emissions",
                    level: 60,                               // +60 = major overshoot
                    indicator: "GHG emissions per capita", 
                    value: "6.2 tons CO2/year",            // Your local emissions
                    year: 2023,
                    overshoot: "170%",                      // 6.2 vs 2.3 target = 170% above
                    context: "Your city's per capita emissions are X% above the global sustainable level...",
                    source: "Your City Climate Inventory 2023",
                    sourceUrl: "https://your-climate-data.org",
                    citation: "Your city climate report citation",
                    actions: [                              // Local climate actions
                        "Ride [Your City Transit System]",
                        "Switch to [Local Clean Energy Utility]",
                        "Support [Local Climate Policy]"
                    ]
                }
                // Add more climate indicators
            ],
            actions: [
                "Category-wide climate actions for your city"
            ]
        }
        // Add all 9 ecological categories
    ]
};

DATA QUALITY TIPS:
------------------
• Always cite your sources - credibility is crucial
• Include uncertainty when data is incomplete or estimated  
• Use local organizations as sources when possible
• Engage community stakeholders to validate your indicators
• Document your methodology for calculating shortfalls/overshoots
• Update regularly as new data becomes available

COMMON PITFALLS:
---------------
• Don't invent data - mark missing indicators as "NaN"
• Don't use state/national data if city data exists
• Don't forget to convert percentages to the visualization scale
• Don't skip the context explanations - they're crucial for public understanding
• Don't use only government sources - include community organization data

Remember: The goal is not a perfect dataset, but an honest assessment 
that sparks community conversation and action toward a thriving city 
within planetary boundaries.
*/

// Export for use in other modules (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CALIFORNIA_DOUGHNUT_DATA;
}