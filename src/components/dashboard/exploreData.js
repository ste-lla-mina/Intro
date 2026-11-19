import {
  Code2, HeartPulse, LineChart, ChefHat, Sprout, Palette, Wrench, GraduationCap, Scale, Microscope,
  Terminal, BarChart3, PenTool, Stethoscope, Globe, Brain, Rocket, Megaphone, Cake, Tractor,
  Brush, Camera, Music, Scissors, Zap, BookOpen, Baby, Briefcase, FlaskConical, Leaf,
} from "lucide-react";

// Link helpers: search pages never go stale, so new roadmaps use them. Swap in exact course URLs anytime.
const q = encodeURIComponent;
const coursera = (s) => ({ label: "Coursera courses", url: `https://www.coursera.org/search?query=${q(s)}` });
const edx = (s) => ({ label: "edX courses", url: `https://www.edx.org/search?q=${q(s)}` });
const alison = (s) => ({ label: "Free courses on Alison", url: `https://alison.com/courses?query=${q(s)}` });
const youtube = (s) => ({ label: "Watch on YouTube", url: `https://www.youtube.com/results?search_query=${q(s)}` });
const link = (label, url) => ({ label, url });

export const FIELDS = [
  /* ───────────── TECH ───────────── */
  {
    id: "tech", name: "Tech", icon: Code2,
    blurb: "Shape the digital world through software, data and design.",
    subcategories: [
      {
        id: "software-eng", name: "Software Engineering", icon: Terminal,
        overview: "Software engineers design, build and maintain the apps behind everything from social media to banking. It is creative problem-solving through code.",
        time: "6–12 months of learning", cost: "Mostly free",
        skills: ["HTML & CSS", "JavaScript", "Git & GitHub", "React or Python"],
        steps: [
          { title: "Learn the foundations", desc: "Start with HTML, CSS and JavaScript, the building blocks of every website. Give yourself 6 to 8 weeks and build something small every day.", links: [link("FreeCodeCamp Responsive Web Design", "https://www.freecodecamp.org/learn/2022/responsive-web-design/"), link("The Odin Project", "https://www.theodinproject.com/")] },
          { title: "Build real projects", desc: "A portfolio page, a calculator, a weather app. Real projects beat tutorials because they force you to think independently.", links: [link("Frontend Mentor challenges", "https://www.frontendmentor.io/"), link("JavaScript 30 (free)", "https://javascript30.com/")] },
          { title: "Learn a framework", desc: "Pick React for the web or Node.js for servers, and use Git and GitHub daily. These are the most in-demand tools for junior developers.", links: [link("React official docs", "https://react.dev/learn"), link("CS50 Web Programming on edX", "https://www.edx.org/learn/web-development/harvard-university-cs50-s-web-programming-with-python-and-javascript")] },
          { title: "Apply and keep building", desc: "Polish your GitHub profile, write a clear CV and apply for internships or junior roles. Hackathons build your network and confidence fast.", links: [link("GitHub Student Pack", "https://education.github.com/pack"), link("Devpost hackathons", "https://devpost.com/")] },
        ],
        opportunities: [
          { name: "Google Africa Developer Scholarship", org: "Google / Andela", url: "https://andela.com/gads/" },
          { name: "Outreachy Open Source Internship", org: "Outreachy", url: "https://www.outreachy.org/" },
          { name: "She Code Africa", org: "She Code Africa", url: "https://shecodeafrica.org/" },
        ],
      },
      {
        id: "data-science", name: "Data Science", icon: BarChart3,
        overview: "Data scientists turn raw numbers into insights that help organisations decide better. It blends statistics, coding and storytelling.",
        time: "8–14 months of learning", cost: "Mostly free",
        skills: ["Python", "Statistics", "SQL", "Data Visualisation"],
        steps: [
          { title: "Build your maths foundation", desc: "Statistics and probability are your best friends. Focus on averages, distributions and basic algebra. Khan Academy makes it free and visual.", links: [link("Khan Academy Statistics", "https://www.khanacademy.org/math/statistics-probability")] },
          { title: "Learn Python for data", desc: "Python is the language of data science. Start with the basics, then move on to NumPy and Pandas for working with data.", links: [link("Python for Everybody (audit free)", "https://www.coursera.org/specializations/python"), link("Kaggle Python course", "https://www.kaggle.com/learn/python")] },
          { title: "Work on real datasets", desc: "Kaggle has thousands of free datasets. Pick a problem you care about, like health, food or climate, and explore the numbers.", links: [link("Kaggle datasets", "https://www.kaggle.com/datasets")] },
          { title: "Learn SQL and visualisation", desc: "SQL pulls data from databases, and Tableau Public turns tables into dashboards people can understand.", links: [link("Mode SQL tutorial", "https://mode.com/sql-tutorial/"), link("Tableau Public training", "https://public.tableau.com/en-us/s/resources")] },
          { title: "Earn a certificate and apply", desc: "A Google or IBM data certificate is globally recognised and shows employers you have tested skills.", links: [link("Google Data Analytics", "https://grow.google/certificates/data-analytics/"), link("IBM Data Science", "https://www.coursera.org/professional-certificates/ibm-data-science")] },
        ],
        opportunities: [
          { name: "Zindi Africa Competitions", org: "Zindi", url: "https://zindi.africa/" },
          { name: "Women in Data Science", org: "Stanford WiDS", url: "https://www.widsconference.org/" },
          { name: "Data Science Nigeria Bootcamp", org: "DSN", url: "https://www.datasciencenigeria.org/" },
        ],
      },
      {
        id: "ui-ux", name: "UI/UX Design", icon: PenTool,
        overview: "UI/UX designers craft the look, feel and flow of digital products. If you love people and purposeful design, this career fits.",
        time: "4–8 months of learning", cost: "Free to low cost",
        skills: ["Visual Design", "User Research", "Wireframing", "Prototyping"],
        steps: [
          { title: "Understand design principles", desc: "Learn typography, colour, layout and hierarchy. You do not need art school, only curiosity.", links: [link("Google UX Design Certificate", "https://www.coursera.org/professional-certificates/google-ux-design"), link("Canva Design School", "https://www.canva.com/designschool/")] },
          { title: "Master Figma", desc: "Figma is the industry-standard tool and free for students. Build three screens from scratch: a login page, a dashboard and a mobile app.", links: [link("Figma tutorials", "https://www.figma.com/resources/learn-design/")] },
          { title: "Do user research", desc: "Great UX starts with real needs. Interview five people about a problem, then design exactly what you heard.", links: [link("UX research methods", "https://www.nngroup.com/articles/which-ux-research-methods/")] },
          { title: "Build a portfolio", desc: "Three solid, well-documented case studies beat twenty rushed mockups. Show the problem, your process and the final result.", links: [link("Behance", "https://www.behance.net/"), link("UXfolio", "https://uxfol.io/")] },
          { title: "Land a role", desc: "Apply for junior or intern design roles, many of them remote. A free mentor can sharpen your portfolio first.", links: [link("Dribbble jobs", "https://dribbble.com/jobs"), link("ADPList free mentorship", "https://adplist.org/")] },
        ],
        opportunities: [
          { name: "Google UX Design Certificate", org: "Google", url: "https://grow.google/certificates/ux-design/" },
          { name: "Adobe Creative Residency", org: "Adobe", url: "https://www.adobe.com/about-adobe/creative-residency.html" },
        ],
      },
    ],
  },

  /* ───────────── HEALTH ───────────── */
  {
    id: "health", name: "Health", icon: HeartPulse,
    blurb: "Care for people, communities and whole systems of wellbeing.",
    subcategories: [
      {
        id: "nursing", name: "Nursing", icon: Stethoscope,
        overview: "Nurses are the heartbeat of healthcare, giving care, comfort and critical medical support every day.",
        time: "3–4 years (diploma or degree)", cost: "Varies, scholarships available",
        skills: ["Patient Care", "Biology & Anatomy", "Communication", "Empathy"],
        steps: [
          { title: "Strengthen your sciences", desc: "Biology, chemistry and basic anatomy are your foundation. The stronger they are, the easier nursing school becomes.", links: [link("Khan Academy Biology", "https://www.khanacademy.org/science/ap-biology"), link("Anatomy & Physiology (OpenStax)", "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction")] },
          { title: "Research nursing programmes", desc: "Look for accredited nursing schools in your country. Many offer bursaries for girls and women.", links: [link("WHO nursing and midwifery", "https://www.who.int/teams/health-workforce/nursing-and-midwifery"), link("Alison healthcare courses", "https://alison.com/courses/healthcare")] },
          { title: "Volunteer at a clinic", desc: "Volunteering shows commitment, gives you real perspective and builds your network early.", links: [link("OpenWHO health courses", "https://openwho.org/")] },
          { title: "Complete clinical placements", desc: "Hands-on ward hours are where you become a nurse. Paediatrics, surgery and community health each teach something unique.", links: [link("Nurse.org career resources", "https://nurse.org/resources/")] },
          { title: "Register and specialise", desc: "Register with your national nursing council, then consider ICU, midwifery, community or mental health nursing.", links: [link("International Council of Nurses", "https://www.icn.ch/")] },
        ],
        opportunities: [
          { name: "Johnson & Johnson Nursing", org: "J&J Foundation", url: "https://nursing.jnj.com/" },
          { name: "WHO Africa", org: "WHO Africa", url: "https://www.afro.who.int/" },
        ],
      },
      {
        id: "public-health", name: "Public Health", icon: Globe,
        overview: "Public health professionals protect whole communities by designing campaigns, analysing data and building systems that prevent disease.",
        time: "4–6 years (degree + practice)", cost: "Mostly subsidised",
        skills: ["Epidemiology", "Health Communication", "Research & Data", "Policy Analysis"],
        steps: [
          { title: "Build a science and social foundation", desc: "Public health sits between science and society. You need biology, statistics and an understanding of how systems work.", links: [link("Intro to Public Health", "https://www.coursera.org/learn/public-health"), link("Khan Academy Statistics", "https://www.khanacademy.org/math/statistics-probability")] },
          { title: "Study a related degree", desc: "Public health, community health, epidemiology or environmental health are the most direct routes, and scholarships are common.", links: [link("edX public health", "https://www.edx.org/learn/public-health")] },
          { title: "Intern at a health organisation", desc: "WHO, UNICEF and local health ministries take interns. Even a short placement lifts your CV.", links: [link("WHO internships", "https://www.who.int/careers/internships"), link("UNICEF internships", "https://www.unicef.org/careers/internships")] },
          { title: "Learn health data tools", desc: "Data is the language of public health. Practise with R, Python or SPSS; Excel used well will carry you far early on.", links: [link("R for public health", "https://www.coursera.org/learn/r-public-health")] },
          { title: "Pursue a postgrad or specialist role", desc: "A Masters in Public Health opens doors globally and is often funded. Target WHO, health ministries or NGOs.", links: [link("Find an MPH", "https://www.findamasters.com/masters-degrees/course-results/?Keywords=public+health")] },
        ],
        opportunities: [
          { name: "UNICEF Young Professionals", org: "UNICEF", url: "https://www.unicef.org/careers/young-professionals-programme" },
          { name: "CDC Global Health Careers", org: "CDC", url: "https://www.cdc.gov/globalhealth/careers/" },
        ],
      },
      {
        id: "mental-health", name: "Mental Health & Counselling", icon: Brain,
        overview: "Mental health professionals support people through emotional and social challenges, in one of healthcare's fastest-growing fields.",
        time: "4–6 years (degree + supervised hours)", cost: "Varies, bursaries available",
        skills: ["Active Listening", "Empathy", "Psychology", "Ethical Practice"],
        steps: [
          { title: "Study psychology foundations", desc: "Learn developmental, cognitive and social psychology. Understanding how people think and feel is the core of this work.", links: [link("Intro to Psychology (Yale)", "https://www.coursera.org/learn/introduction-psychology")] },
          { title: "Pursue a psychology degree", desc: "A BSc in Psychology or Social Work is the standard first step, and many universities offer bursaries for women in health sciences.", links: [link("Alison mental health courses", "https://alison.com/courses/mental-health"), link("FutureLearn mental health", "https://www.futurelearn.com/subjects/psychology-and-mental-health-courses")] },
          { title: "Get supervised clinical hours", desc: "Hours under a qualified supervisor are needed for licensure, in hospitals, schools, NGOs or community centres.", links: [link("Mental Health Africa", "https://www.mentalhealthafrica.org/")] },
          { title: "Specialise and register", desc: "Choose trauma, grief, adolescent mental health or addiction, then register with your national psychology board.", links: [link("Mental Health Innovation Network", "https://www.mhinnovation.net/")] },
        ],
        opportunities: [
          { name: "Wellcome Mental Health Awards", org: "Wellcome Trust", url: "https://wellcome.org/grant-funding/schemes/mental-health-awards" },
          { name: "Mental Health Innovation Network", org: "WHO", url: "https://www.mhinnovation.net/" },
        ],
      },
    ],
  },

  /* ───────────── BUSINESS ───────────── */
  {
    id: "business", name: "Business", icon: LineChart,
    blurb: "Start, run and grow ventures that solve real problems.",
    subcategories: [
      {
        id: "entrepreneurship", name: "Entrepreneurship", icon: Rocket,
        overview: "Entrepreneurs spot problems and build businesses that solve them, from a market stall to a growing company.",
        time: "3–12 months to launch", cost: "Low, start with what you have",
        skills: ["Problem Solving", "Basic Finance", "Selling", "Resilience"],
        steps: [
          { title: "Spot a real problem", desc: "Talk to ten people about a daily frustration. The best ideas start with listening, not inventing.", links: [youtube("how to validate a business idea")] },
          { title: "Test a simple version", desc: "Sell a small version to your first customers before building more. Their feedback is worth more than any plan.", links: [alison("entrepreneurship")] },
          { title: "Learn money basics", desc: "Track your costs, set prices that leave a profit and keep business money separate from personal money.", links: [link("Khan Academy finance", "https://www.khanacademy.org/economics-finance-domain")] },
          { title: "Find funding and mentors", desc: "Pitch competitions, grants and incubators can fund you, and a mentor shortens the learning curve.", links: [coursera("startup funding")] },
        ],
        opportunities: [
          { name: "Entrepreneurship Programme", org: "Tony Elumelu Foundation", url: "https://www.tefconnect.com/" },
          { name: "Young African Leaders Network", org: "YALI", url: "https://yali.state.gov/" },
        ],
      },
      {
        id: "digital-marketing", name: "Digital Marketing", icon: Megaphone,
        overview: "Digital marketers help brands reach people through social media, content, search and email.",
        time: "3–6 months", cost: "Mostly free",
        skills: ["Content Creation", "Social Media", "Analytics", "Writing"],
        steps: [
          { title: "Learn marketing basics", desc: "Understand audiences, messages and channels. Free courses cover the essentials in a few weeks.", links: [link("Google Digital Garage", "https://learndigital.withgoogle.com/digitalgarage")] },
          { title: "Practise on a real page", desc: "Run social media for a small local business or a school club. Real posts teach faster than theory.", links: [youtube("social media marketing for beginners")] },
          { title: "Learn analytics and ads", desc: "Learn to read numbers, test what works and run small paid campaigns.", links: [link("HubSpot Academy", "https://academy.hubspot.com/"), coursera("digital marketing analytics")] },
          { title: "Build a portfolio and find clients", desc: "Show three results you achieved, then offer your services to local businesses or freelance platforms.", links: [link("Upwork", "https://www.upwork.com/")] },
        ],
        opportunities: [
          { name: "Google Digital Garage", org: "Google", url: "https://learndigital.withgoogle.com/digitalgarage" },
          { name: "HubSpot Academy Certifications", org: "HubSpot", url: "https://academy.hubspot.com/" },
        ],
      },
    ],
  },

  /* ───────────── CULINARY ARTS ───────────── */
  {
    id: "culinary", name: "Culinary Arts", icon: ChefHat,
    blurb: "Cook, bake and build food businesses people love.",
    subcategories: [
      {
        id: "professional-cooking", name: "Professional Cooking", icon: ChefHat,
        overview: "Professional cooks run kitchens in restaurants, hotels and catering companies, turning ingredients into memorable meals.",
        time: "6–24 months", cost: "Low to medium",
        skills: ["Knife Skills", "Food Safety", "Time Management", "Menu Planning"],
        steps: [
          { title: "Master kitchen basics", desc: "Learn knife skills, hygiene and safe food handling. Every great cook starts here.", links: [alison("food safety"), youtube("basic knife skills")] },
          { title: "Learn core techniques", desc: "Practise stocks, sauces, sautéing and grilling until they feel natural.", links: [youtube("cooking techniques for beginners")] },
          { title: "Train in a real kitchen", desc: "Apprenticeships at hotels and restaurants teach speed, teamwork and pressure like no classroom can.", links: [alison("hospitality")] },
          { title: "Specialise and grow", desc: "Choose a cuisine, catering or your own food business, and keep learning from every chef you meet.", links: [coursera("culinary arts")] },
        ],
        opportunities: [
          { name: "Culinary scholarships", org: "Le Cordon Bleu", url: "https://www.cordonbleu.edu/" },
          { name: "WorldSkills Competitions", org: "WorldSkills", url: "https://worldskills.org/" },
        ],
      },
      {
        id: "baking-pastry", name: "Baking & Pastry", icon: Cake,
        overview: "Bakers and pastry chefs create breads, cakes and desserts. It mixes science with artistry and has strong local demand.",
        time: "4–12 months", cost: "Low",
        skills: ["Precise Measuring", "Dough Handling", "Decorating", "Pricing"],
        steps: [
          { title: "Learn the science of baking", desc: "Understand how flour, yeast, eggs and heat work together. Precision is everything in baking.", links: [alison("baking")] },
          { title: "Practise the staples", desc: "Bake bread, sponge cakes and simple pastries every week and note what changes the result.", links: [youtube("baking for beginners")] },
          { title: "Learn decorating and presentation", desc: "Icing, piping and neat finishing make your bakes look as good as they taste.", links: [youtube("cake decorating basics")] },
          { title: "Start selling", desc: "Take orders from friends, local events and social media. Price to cover ingredients, time and profit.", links: [coursera("food business")] },
        ],
        opportunities: [
          { name: "Culinary Institute scholarships", org: "Culinary Institute of America", url: "https://www.ciachef.edu/" },
          { name: "Entrepreneurship Programme", org: "Tony Elumelu Foundation", url: "https://www.tefconnect.com/" },
        ],
      },
    ],
  },

  /* ───────────── AGRICULTURE ───────────── */
  {
    id: "agriculture", name: "Agriculture", icon: Sprout,
    blurb: "Grow food, protect land and power modern farming.",
    subcategories: [
      {
        id: "sustainable-farming", name: "Sustainable Farming", icon: Sprout,
        overview: "Modern farmers grow more food with less water and land by caring for soil and planting smartly.",
        time: "6–12 months to start", cost: "Low, mostly free training",
        skills: ["Soil Health", "Crop Planning", "Water Management", "Pest Control"],
        steps: [
          { title: "Learn soil and crops", desc: "Understand what grows best in your district and why healthy soil is the base of every harvest.", links: [link("FAO eLearning Academy", "https://elearning.fao.org/")] },
          { title: "Try water-saving methods", desc: "Drip irrigation, mulching and composting save water and raise yields on small plots.", links: [youtube("drip irrigation for smallholder farmers")] },
          { title: "Start a small plot", desc: "Practise on a school garden or family plot and keep records of what you planted, spent and harvested.", links: [coursera("sustainable agriculture")] },
          { title: "Join a cooperative", desc: "Cooperatives share tools, training and markets, and make it easier to sell at better prices.", links: [alison("agriculture")] },
        ],
        opportunities: [
          { name: "Farmer training programmes", org: "One Acre Fund", url: "https://oneacre.org/" },
          { name: "Agricultural transformation in Africa", org: "AGRA", url: "https://agra.org/" },
        ],
      },
      {
        id: "agribusiness", name: "Agribusiness & Agri-Tech", icon: Tractor,
        overview: "Agribusiness links farms to markets, while agri-tech uses sensors, apps and data to help farmers earn more.",
        time: "6–18 months", cost: "Low to medium",
        skills: ["Market Analysis", "Farm Records", "Data Basics", "Supply Chains"],
        steps: [
          { title: "Understand value chains", desc: "See how food travels from farm to buyer and where money is made or lost on the way.", links: [coursera("agribusiness")] },
          { title: "Learn farm data and tools", desc: "Explore sensors, mobile apps and record-keeping tools that help farmers decide with facts.", links: [edx("agriculture technology")] },
          { title: "Intern with a cooperative or agri-startup", desc: "Hands-on experience shows you real challenges, from storage losses to market prices.", links: [alison("agribusiness")] },
          { title: "Launch or join an agri venture", desc: "Processing, packaging and delivery businesses add value to what farmers grow.", links: [youtube("agribusiness ideas")] },
        ],
        opportunities: [
          { name: "Scholars Program", org: "Mastercard Foundation", url: "https://mastercardfdn.org/all/scholars/" },
          { name: "Food and Agriculture Organization", org: "FAO", url: "https://www.fao.org/" },
        ],
      },
    ],
  },

  /* ───────────── CREATIVE ARTS ───────────── */
  {
    id: "creative", name: "Creative Arts", icon: Palette,
    blurb: "Design, film, write and build culture through art.",
    subcategories: [
      {
        id: "graphic-design", name: "Graphic Design", icon: Brush,
        overview: "Graphic designers communicate ideas visually for brands, campaigns, packaging and digital media. It is one of the most accessible creative careers.",
        time: "4–8 months to entry level", cost: "Low, mostly free tools",
        skills: ["Composition", "Typography", "Colour Theory", "Branding"],
        steps: [
          { title: "Learn design fundamentals", desc: "Spacing, alignment, contrast, repetition and proximity separate polished work from amateur work.", links: [link("Canva Design School", "https://www.canva.com/designschool/"), link("Graphic Design Basics", "https://www.coursera.org/learn/fundamentals-of-graphic-design")] },
          { title: "Master a design tool", desc: "Start with Canva to build confidence, then move to Illustrator or Figma. Daily practice beats any course.", links: [link("Adobe Express", "https://www.adobe.com/express/"), link("Figma tutorials", "https://www.figma.com/resources/learn-design/")] },
          { title: "Build five portfolio pieces", desc: "Design a logo, a poster, a social media kit, a packaging mockup and a brand identity, and document your process.", links: [link("Behance", "https://www.behance.net/")] },
          { title: "Land freelance clients", desc: "Start with local small businesses who need affordable design, then grow through Instagram and freelance platforms.", links: [link("Fiverr", "https://www.fiverr.com/"), link("Upwork design jobs", "https://www.upwork.com/freelance-jobs/graphic-design/")] },
        ],
        opportunities: [
          { name: "New Blood Awards", org: "D&AD", url: "https://www.dandad.org/en/d-ad-new-blood-awards/" },
          { name: "She Leads Africa", org: "She Leads Africa", url: "https://sheleadsafrica.org/" },
        ],
      },
      {
        id: "photography-film", name: "Photography & Film", icon: Camera,
        overview: "Photographers and filmmakers capture truth, beauty and stories. Many professionals started with just a smartphone.",
        time: "6–18 months to work professionally", cost: "Low to medium",
        skills: ["Composition", "Lighting", "Storytelling", "Editing"],
        steps: [
          { title: "Learn composition", desc: "Rule of thirds, leading lines, framing and light direction. Practise on your phone first.", links: [link("Alison photography course", "https://alison.com/course/digital-photography-for-beginners")] },
          { title: "Understand light and exposure", desc: "ISO, aperture and shutter speed are photography's grammar. Master them and any camera becomes powerful.", links: [link("Exposure triangle guide", "https://digital-photography-school.com/understanding-exposure-triangle/")] },
          { title: "Learn editing software", desc: "Lightroom Mobile is free for photos and DaVinci Resolve is completely free for video. Both are industry standards.", links: [link("DaVinci Resolve", "https://www.blackmagicdesign.com/products/davinciresolve")] },
          { title: "Build a portfolio and get paid", desc: "Shoot three to five personal projects, then take paid work such as events, local brands or stock photography.", links: [link("Shutterstock contributors", "https://www.shutterstock.com/become-a-contributor")] },
        ],
        opportunities: [
          { name: "World Press Photo", org: "World Press Photo", url: "https://worldpressphoto.org/" },
          { name: "African Women in Media", org: "AWiM", url: "https://www.africanwomeninmedia.com/" },
        ],
      },
      {
        id: "music-production", name: "Music Production", icon: Music,
        overview: "Music producers craft the sound behind hit records, film scores and podcasts. It is part art, part engineering.",
        time: "1–3 years to steady income", cost: "Low to medium",
        skills: ["Music Theory", "Beat Making", "Mixing", "Sound Design"],
        steps: [
          { title: "Learn music theory", desc: "Scales, chords and rhythm. You do not need sheet music, but knowing why notes sound good together changes everything.", links: [link("Musictheory.net", "https://www.musictheory.net/")] },
          { title: "Pick a DAW and make beats", desc: "GarageBand is free on Apple devices and FL Studio has a free trial. Make something every day, even 30 seconds.", links: [link("FL Studio trial", "https://www.image-line.com/")] },
          { title: "Study mixing fundamentals", desc: "EQ, compression and reverb are the three tools every producer must understand.", links: [link("Mixing Audio (Berklee)", "https://www.coursera.org/learn/mixing-audio")] },
          { title: "Release and collaborate", desc: "Distribute your music to streaming platforms, sell beats and work with artists and content creators.", links: [link("DistroKid", "https://distrokid.com/"), link("BeatStars", "https://www.beatstars.com/")] },
        ],
        opportunities: [
          { name: "Creative Economy Grants", org: "HEVA Fund", url: "https://hevafund.com/" },
          { name: "Music development programmes", org: "PRS Foundation", url: "https://prsfoundation.com/" },
        ],
      },
    ],
  },

  /* ───────────── TRADES ───────────── */
  {
    id: "trades", name: "Trades", icon: Wrench,
    blurb: "Build, wire and craft with skills every community needs.",
    subcategories: [
      {
        id: "tailoring-fashion", name: "Tailoring & Fashion", icon: Scissors,
        overview: "Tailors and fashion designers turn fabric into clothing, from school uniforms to runway pieces.",
        time: "6–18 months", cost: "Low",
        skills: ["Sewing", "Pattern Making", "Measuring", "Customer Service"],
        steps: [
          { title: "Learn sewing basics", desc: "Threading, stitches, seams and using a machine safely. Start with simple items like pillow covers and skirts.", links: [youtube("sewing for beginners")] },
          { title: "Practise patterns and fitting", desc: "Learn to take measurements, draft patterns and adjust a fit so clothes look and feel right.", links: [alison("fashion design")] },
          { title: "Build a small collection", desc: "Make five to ten finished pieces and photograph them well. This becomes your portfolio.", links: [coursera("fashion design")] },
          { title: "Start taking orders", desc: "Begin with family, friends and school events, then grow through social media and word of mouth.", links: [youtube("how to start a tailoring business")] },
        ],
        opportunities: [
          { name: "Skills competitions", org: "WorldSkills", url: "https://worldskills.org/" },
          { name: "Entrepreneurship Programme", org: "Tony Elumelu Foundation", url: "https://www.tefconnect.com/" },
        ],
      },
      {
        id: "electrical-solar", name: "Electrical & Solar", icon: Zap,
        overview: "Electricians and solar technicians wire homes, businesses and off-grid power systems, a growing field as energy access expands.",
        time: "1–2 years of training", cost: "Low to medium, TVET bursaries exist",
        skills: ["Wiring", "Safety", "Circuit Diagrams", "Problem Solving"],
        steps: [
          { title: "Learn electrical basics", desc: "Understand voltage, current and circuits. Safety rules come first, always.", links: [link("Khan Academy electrical engineering", "https://www.khanacademy.org/science/electrical-engineering")] },
          { title: "Get certified at a TVET school", desc: "A recognised vocational certificate opens doors to employers and lets you work legally.", links: [alison("electrical")] },
          { title: "Apprentice on site", desc: "Work beside an experienced electrician. Real wiring jobs teach speed, neatness and safe habits.", links: [youtube("electrician apprenticeship what to expect")] },
          { title: "Specialise in solar and start your workshop", desc: "Solar installation is in high demand. Once experienced, you can run your own installation business.", links: [coursera("solar energy")] },
        ],
        opportunities: [
          { name: "Women solar entrepreneurs", org: "Solar Sister", url: "https://solarsister.org/" },
          { name: "Skills competitions", org: "WorldSkills", url: "https://worldskills.org/" },
        ],
      },
    ],
  },

  /* ───────────── EDUCATION ───────────── */
  {
    id: "education", name: "Education", icon: GraduationCap,
    blurb: "Teach, coach and shape how young people learn.",
    subcategories: [
      {
        id: "teaching", name: "Teaching", icon: BookOpen,
        overview: "Teachers shape how young people think and learn. It is one of the most respected and stable careers.",
        time: "3–4 years", cost: "Varies, bursaries available",
        skills: ["Lesson Planning", "Communication", "Patience", "Classroom Management"],
        steps: [
          { title: "Choose your subject and level", desc: "Pick the subject you could explain with joy, and decide whether you prefer primary or secondary learners.", links: [link("Khan Academy", "https://www.khanacademy.org/")] },
          { title: "Study teaching methods", desc: "Learn lesson planning, assessment and how to keep a class engaged and calm.", links: [coursera("teaching methods")] },
          { title: "Practise by tutoring", desc: "Tutor classmates or lead a study club. Explaining ideas out loud is the best teaching practice.", links: [edx("education")] },
          { title: "Qualify and apply", desc: "Complete your teaching qualification, register with the education authority and apply to schools.", links: [youtube("how to become a teacher")] },
        ],
        opportunities: [
          { name: "Commonwealth Scholarships", org: "Commonwealth Scholarship Commission", url: "https://cscuk.fcdo.gov.uk/" },
          { name: "Volunteer teaching placements", org: "VSO", url: "https://www.vsointernational.org/" },
        ],
      },
      {
        id: "early-childhood", name: "Early Childhood", icon: Baby,
        overview: "Early childhood educators guide children aged 0 to 8 through play, language and first lessons, which shapes how they learn for life.",
        time: "1–3 years", cost: "Low to medium",
        skills: ["Child Development", "Storytelling", "Patience", "First Aid"],
        steps: [
          { title: "Learn child development", desc: "Understand how children grow, think and feel from birth to age eight.", links: [coursera("child development")] },
          { title: "Get a certificate or diploma", desc: "A recognised qualification in early childhood education builds trust with parents and employers.", links: [alison("early childhood education")] },
          { title: "Volunteer at a nursery", desc: "Spend time in a daycare or nursery to see daily routines, play-based learning and parent communication.", links: [youtube("early childhood education activities")] },
          { title: "Join or open a learning centre", desc: "Work in a centre first, then consider starting your own community nursery or play group.", links: [edx("early childhood")] },
        ],
        opportunities: [
          { name: "Education careers", org: "UNICEF", url: "https://www.unicef.org/careers" },
          { name: "Child-focused programmes", org: "Save the Children", url: "https://www.savethechildren.org/" },
        ],
      },
    ],
  },

  /* ───────────── LAW ───────────── */
  {
    id: "law", name: "Law", icon: Scale,
    blurb: "Defend rights, guide organisations and shape fair systems.",
    subcategories: [
      {
        id: "human-rights", name: "Human Rights Law", icon: Scale,
        overview: "Human rights lawyers defend people's rights, from legal aid clinics to international courts.",
        time: "5–7 years (degree + bar training)", cost: "Varies, scholarships widely available",
        skills: ["Research", "Argument", "Writing", "Empathy"],
        steps: [
          { title: "Build reading and speaking skills", desc: "Read widely, debate and write clearly. Law rewards people who can argue a point calmly.", links: [youtube("debate for beginners")] },
          { title: "Study law", desc: "Compare university law programmes and look for bursaries aimed at girls and women.", links: [coursera("human rights law"), edx("law")] },
          { title: "Intern at a legal aid clinic", desc: "See real cases up close, help with research and meet lawyers who can mentor you.", links: [alison("law")] },
          { title: "Qualify and specialise", desc: "Complete bar or practical training, then focus on areas like women's rights, refugee law or criminal defence.", links: [youtube("how to become a human rights lawyer")] },
        ],
        opportunities: [
          { name: "Chevening Scholarships", org: "UK Government", url: "https://www.chevening.org/" },
          { name: "Women's rights work", org: "UN Women", url: "https://www.unwomen.org/" },
        ],
      },
      {
        id: "corporate-law", name: "Business & Corporate Law", icon: Briefcase,
        overview: "Corporate lawyers help companies and startups with contracts, ownership and compliance.",
        time: "5–7 years", cost: "Varies",
        skills: ["Contracts", "Negotiation", "Attention to Detail", "Business Sense"],
        steps: [
          { title: "Learn how businesses work", desc: "Understand ownership, contracts and how companies make decisions before you study the law around them.", links: [coursera("business law")] },
          { title: "Study law", desc: "Take a law degree with business, commercial or contract modules where possible.", links: [edx("business law")] },
          { title: "Intern at a firm or company", desc: "Law firms and company legal departments take interns who can research and draft carefully.", links: [youtube("corporate lawyer day in the life")] },
          { title: "Specialise", desc: "Choose startups, intellectual property, tax or international trade and build expertise in one area.", links: [coursera("intellectual property")] },
        ],
        opportunities: [
          { name: "Mandela Rhodes Scholarships", org: "Mandela Rhodes Foundation", url: "https://www.mandelarhodes.org/" },
          { name: "Commonwealth Scholarships", org: "CSC", url: "https://cscuk.fcdo.gov.uk/" },
        ],
      },
    ],
  },

  /* ───────────── SCIENCE ───────────── */
  {
    id: "science", name: "Science", icon: Microscope,
    blurb: "Ask big questions and discover how the world works.",
    subcategories: [
      {
        id: "lab-research", name: "Laboratory Research", icon: FlaskConical,
        overview: "Researchers run experiments to discover new medicines, materials and ideas.",
        time: "4–8 years (degree + postgraduate)", cost: "Varies, many fully funded",
        skills: ["Experiment Design", "Data Analysis", "Lab Safety", "Scientific Writing"],
        steps: [
          { title: "Love the questions", desc: "Join a science club or fair and keep asking why. Curiosity is your most important tool.", links: [link("Khan Academy Science", "https://www.khanacademy.org/science")] },
          { title: "Study a science degree", desc: "Biology, chemistry or physics each lead to research. Pick the one that excites you most.", links: [edx("biology")] },
          { title: "Join a research team", desc: "Apply for lab assistant roles or student research projects to learn real methods early.", links: [coursera("research methods")] },
          { title: "Publish and specialise", desc: "Write up your work, present at conferences and consider a funded masters or PhD.", links: [youtube("how to write a scientific paper")] },
        ],
        opportunities: [
          { name: "For Women in Science", org: "L'Oréal-UNESCO", url: "https://www.forwomeninscience.com/" },
          { name: "Women in science fellowships", org: "OWSD", url: "https://owsd.net/" },
        ],
      },
      {
        id: "environmental-science", name: "Environmental Science", icon: Leaf,
        overview: "Environmental scientists protect water, land and climate through research, monitoring and policy.",
        time: "4–6 years", cost: "Varies",
        skills: ["Field Research", "Data Analysis", "Climate Knowledge", "Reporting"],
        steps: [
          { title: "Learn earth and climate basics", desc: "Understand ecosystems, water cycles and how human activity changes the climate.", links: [coursera("climate change")] },
          { title: "Study environmental science", desc: "A degree in environmental science, geography or related fields opens research and policy roles.", links: [edx("environmental science")] },
          { title: "Gain field experience", desc: "Volunteer with conservation groups or help monitor water and soil in your community.", links: [youtube("environmental fieldwork")] },
          { title: "Specialise", desc: "Focus on water, climate, wildlife or sustainability and work for NGOs, governments or research institutes.", links: [alison("environment")] },
        ],
        opportunities: [
          { name: "Environment careers", org: "UN Environment Programme", url: "https://www.unep.org/" },
          { name: "Conservation careers", org: "WWF", url: "https://www.worldwildlife.org/" },
        ],
      },
    ],
  },
];