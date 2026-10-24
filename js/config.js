/**
 * Portfolio Data Configuration - Rachit Verma
 * Centralized data file - tailored for B.Tech CSE (Data Science) undergraduate.
 */

const PORTFOLIO_DATA = {
  // Personal Info
  profile: {
    name: "Rachit Verma",
    preferredName: "Rachit",
    title: "B.Tech CSE (Data Science) Undergraduate | Aspiring Software Engineer",
    roles: [
      "B.Tech CSE (Data Science) Student",
      "DSA in C++ Enthusiast",
      "JavaScript & TypeScript Developer",
      "Aspiring Software Engineer"
    ],
    bio: "Undergraduate Computer Science & Engineering student specializing in Data Science. Strong foundational command of Data Structures and Algorithms in C++, coupled with hands-on modern web development using JavaScript and TypeScript. Passionate about writing clean, optimized code and eager to contribute to software development and data engineering roles.",
    tagline: "Dedicated to mastering Data Structures, C++, modern JavaScript, and Data Science.",
    status: {
      available: true,
      text: "Actively seeking Software Engineering & Data Science Internships"
    },
    location: "India / Open to Remote & Relocation",
    email: "vermarachit854@gmail.com",
    phone: "+91 8429886364",
    avatar: "assets/avatar.svg",
    resumeUrl: "#resume-modal",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "mailto:vermarachit854@gmail.com",
      leetcode: "https://leetcode.com"
    }
  },

  // Key Highlights / Student Stats
  stats: [
    { label: "Degree Program", value: "B.Tech", icon: "rocket" },
    { label: "Specialization", value: "Data Sci", icon: "cpu" },
    { label: "Core Focus", value: "DSA in C++", icon: "code" },
    { label: "Availability", value: "Immediate", icon: "clock" }
  ],

  // Core Pillars / Highlights
  pillars: [
    {
      icon: "code",
      title: "Data Structures & Algorithms (C++)",
      description: "Solid theoretical and practical grasp of arrays, linked lists, trees, graphs, sorting, searching, and STL with an emphasis on time and space complexity."
    },
    {
      icon: "layers",
      title: "Modern JavaScript & TypeScript",
      description: "Developing responsive, interactive web interfaces and modular client-side logic utilizing modern ESNext features, async workflows, and type safety."
    },
    {
      icon: "cpu",
      title: "Data Science & Analytical Thinking",
      description: "Academic coursework and practical foundation in exploratory data analysis, statistics, mathematical modeling, and pattern discovery."
    },
    {
      icon: "zap",
      title: "Fast Learner & Team Player",
      description: "Quick to grasp new technologies, frameworks, and methodologies. Ready to jump into team environments and take on challenging software tasks."
    }
  ],

  // Skills Matrix with Categories & Proficiency Levels
  skills: [
    // Core Programming & DSA
    { name: "C++ & STL", category: "backend", level: 88, icon: "code", tags: ["DSA", "STL", "OOP", "Pointers", "Memory"] },
    { name: "Data Structures & Algorithms", category: "backend", level: 86, icon: "code", tags: ["Arrays", "Trees", "Graphs", "Recursion", "Sorting"] },
    { name: "JavaScript (ES6+)", category: "frontend", level: 85, icon: "code", tags: ["Async/Await", "DOM", "Fetch API", "Event Loop"] },
    { name: "TypeScript", category: "frontend", level: 80, icon: "code", tags: ["Type Safety", "Interfaces", "Generics"] },
    
    // Web Technologies
    { name: "HTML5 & CSS3", category: "frontend", level: 90, icon: "layers", tags: ["Flexbox", "CSS Grid", "Responsive Design", "Semantic HTML"] },
    { name: "Web Development Fundamentals", category: "frontend", level: 82, icon: "layers", tags: ["Client-Server", "HTTP", "JSON", "APIs"] },

    // Data Science & Foundations
    { name: "Data Science Foundations", category: "ai", level: 78, icon: "cpu", tags: ["Statistics", "EDA", "Data Cleaning", "Analytics"] },
    { name: "Python Basics", category: "ai", level: 75, icon: "terminal", tags: ["Data Structures", "Scripting", "Libraries"] },
    
    // Tools & Databases
    { name: "SQL & Relational Databases", category: "tools", level: 80, icon: "database", tags: ["Queries", "Joins", "Schema Design", "CRUD"] },
    { name: "Git & GitHub", category: "tools", level: 82, icon: "git-commit", tags: ["Version Control", "Commits", "Branches", "Pull Requests"] },
    { name: "Object-Oriented Programming (OOP)", category: "tools", level: 88, icon: "cpu", tags: ["Encapsulation", "Inheritance", "Polymorphism"] },
    { name: "Problem Solving & Logic", category: "tools", level: 85, icon: "zap", tags: ["Analytical Thinking", "Debugging", "Algorithms"] }
  ],

  // Academic & Hands-On Learning Projects
  projects: [
    {
      id: "dsa-cpp-suite",
      title: "Data Structures & Algorithm Implementations in C++",
      subtitle: "Comprehensive C++ Repository of Core Algorithms & Data Structures",
      category: "tools",
      featured: true,
      badge: "Core Project / Academic",
      description: "A robust collection of clean, well-commented C++ implementations covering Arrays, Linked Lists, Stacks, Queues, Binary Trees, Graph traversals, and Sorting algorithms with time complexity analysis.",
      longDescription: "Engineered to build mastery in computer science fundamentals. Each data structure is implemented from scratch using object-oriented C++ and Standard Template Library (STL). Includes unit test drivers, benchmark comparisons, and edge-case validations.",
      tech: ["C++", "STL", "Object-Oriented Programming", "Algorithms", "GDB Debugger"],
      metrics: ["50+ algorithm implementations", "Zero memory leaks verified", "O(1) to O(N log N) optimizations"],
      architecture: "Modular C++ header files and source implementations with modular testing harnesses for benchmarking performance across different input sizes.",
      liveUrl: "https://github.com/vermarachit854",
      githubUrl: "https://github.com/vermarachit854",
      thumbnailGradient: "from-blue-600 via-indigo-600 to-cyan-500",
      accentColor: "#3b82f6"
    },
    {
      id: "interactive-dev-portfolio",
      title: "Interactive Personal Portfolio Website",
      subtitle: "Modern Responsive Developer Showcase with Canvas & Terminal",
      category: "fullstack",
      featured: true,
      badge: "Web Development",
      description: "A fast, fully responsive personal portfolio website engineered with vanilla JavaScript, TypeScript conventions, modern CSS3 animations, and an interactive particle network canvas.",
      longDescription: "Created to showcase technical profile, skills, and coding coursework. Features multi-theme switching (Dark & Light modes), Web Audio API sound effects, an interactive Easter-Egg CLI terminal sandbox, and live filterable skill matrix.",
      tech: ["JavaScript (ES6+)", "TypeScript", "HTML5 Canvas", "CSS3 Custom Properties"],
      metrics: ["100% responsive across mobile & desktop", "60 FPS Canvas background", "Zero external npm dependencies"],
      architecture: "Lightweight, modular client-side architecture with separated configuration layer, canvas rendering pipeline, and state-driven DOM updates.",
      liveUrl: "https://vermarachit854.github.io",
      githubUrl: "https://github.com/vermarachit854",
      thumbnailGradient: "from-emerald-500 via-teal-600 to-cyan-600",
      accentColor: "#10b981"
    },
    {
      id: "data-science-eda",
      title: "Exploratory Data Analysis & Analytics Lab",
      subtitle: "Statistical Analysis & Pattern Discovery on Real-World Datasets",
      category: "ai",
      featured: true,
      badge: "Data Science Specialization",
      description: "Academic data science exploration project focusing on data cleaning, descriptive statistics, outlier detection, and correlation analysis across structured datasets.",
      longDescription: "Part of the B.Tech Data Science specialization curriculum. Analyzes multi-dimensional datasets to uncover meaningful business insights, visualize distributions, and prepare data pipelines for predictive modeling.",
      tech: ["Python", "Data Analysis", "SQL", "Statistics", "Exploratory Analysis"],
      metrics: ["Cleaned & normalized raw data", "Statistical correlation mapping", "Data visualization graphs"],
      architecture: "Iterative analytical pipeline: Data ingestion -> Cleaning & handling null values -> Exploratory Statistical Analysis -> Insight Reporting.",
      liveUrl: "https://github.com/vermarachit854",
      githubUrl: "https://github.com/vermarachit854",
      thumbnailGradient: "from-purple-600 via-violet-700 to-indigo-800",
      accentColor: "#8b5cf6"
    },
    {
      id: "ts-task-manager",
      title: "TypeScript Task & Productivity Manager",
      subtitle: "Type-Safe Client-Side Web Application",
      category: "fullstack",
      featured: false,
      badge: "Learning Project",
      description: "A structured, type-safe web application for managing tasks, study schedules, and coding goals with localStorage persistence and interactive filtering.",
      longDescription: "Built to practice TypeScript type definitions, interfaces, generics, and DOM event handling. Features priority tagging, deadline warnings, and smooth animations.",
      tech: ["TypeScript", "JavaScript", "HTML5", "CSS3", "Local Storage API"],
      metrics: ["Strict TypeScript compilation", "Instant load time", "Zero runtime type errors"],
      architecture: "State management pattern using TypeScript interfaces and custom event listeners with persistent local storage serialization.",
      liveUrl: "https://github.com/vermarachit854",
      githubUrl: "https://github.com/vermarachit854",
      thumbnailGradient: "from-cyan-500 via-blue-600 to-indigo-700",
      accentColor: "#06b6d4"
    }
  ],

  // Academic Journey & Hands-On Practice Timeline
  experience: [
    {
      role: "B.Tech in Computer Science & Engineering (Data Science)",
      company: "Undergraduate Degree Program",
      duration: "Present",
      location: "India",
      type: "Full-Time Student",
      description: "Pursuing Bachelor of Technology with intensive specialization in Data Science, core software engineering principles, and applied computer science.",
      highlights: [
        "Rigorous coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems (DBMS), and Computer Networks.",
        "Deep diving into Data Science subjects: Probability & Statistics, Exploratory Data Analysis, and Data Mining.",
        "Active participation in coding contests, departmental technical clubs, and peer programming sessions.",
        "Maintaining strong academic performance with focused hands-on practical lab implementations."
      ],
      skills: ["C++", "DSA", "Data Science", "SQL", "OOP", "DBMS"]
    },
    {
      role: "Self-Directed DSA & Problem Solving Practice",
      company: "Competitive Coding & Problem Solving",
      duration: "Ongoing",
      location: "Self-Paced / Online",
      type: "Continuous Practice",
      description: "Actively solving algorithmic challenges in C++ on platforms like LeetCode and HackerRank to hone problem-solving ability.",
      highlights: [
        "Solved numerous problems focusing on two-pointer techniques, sliding window, recursion, trees, and dynamic programming.",
        "Refactoring code for optimal time (O(N), O(log N)) and space efficiency.",
        "Practicing writing clean, readable code under timed constraints to prepare for technical interview rounds."
      ],
      skills: ["C++", "Data Structures", "Algorithms", "Problem Solving", "Time Complexity"]
    },
    {
      role: "Web Development & Frontend Exploration",
      company: "Hands-on Learning & Building",
      duration: "Ongoing",
      location: "Personal Projects",
      type: "Self-Learning",
      description: "Building interactive, responsive web applications using JavaScript and TypeScript to understand frontend architecture.",
      highlights: [
        "Mastered core JavaScript ES6+ features including promises, async/await, closures, and the event loop.",
        "Adopted TypeScript for type safety, interfaces, and clean component-driven design.",
        "Built responsive, accessible interfaces utilizing modern CSS3 and Canvas APIs."
      ],
      skills: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Git", "GitHub"]
    }
  ],

  // Education & Academic Credentials
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (Specialization: Data Science)",
      institution: "Undergraduate Degree",
      period: "Currently Pursuing",
      grade: "Active Student",
      details: "Comprehensive coursework in Data Structures, Algorithms in C++, Data Science, Database Management Systems, and Object-Oriented Design."
    }
  ],

  certifications: [
    {
      title: "Data Structures & Algorithms in C++",
      issuer: "Technical Learning & Problem Solving",
      year: "Active",
      badge: "code"
    },
    {
      title: "Data Science & Analytical Foundations",
      issuer: "Academic Specialization Track",
      year: "Active",
      badge: "ai"
    },
    {
      title: "Modern JavaScript & TypeScript Fundamentals",
      issuer: "Frontend Development Practice",
      year: "Active",
      badge: "meta"
    }
  ],

  // Endorsements & Peer / Academic Recommendations
  testimonials: [
    {
      quote: "Rachit exhibits great curiosity and determination when tackling complex data structures and algorithmic puzzles. His consistent practice in C++ and enthusiasm for data science make him a promising upcoming software engineer.",
      name: "Academic Mentor",
      role: "Department of Computer Science & Engineering",
      company: "Academic Faculty",
      avatar: "assets/avatar-1.svg"
    },
    {
      quote: "Working alongside Rachit on technical assignments is always a pleasure. He has a solid grasp of core C++ and JavaScript concepts and approaches coding problems with methodical analytical thinking.",
      name: "Engineering Peer",
      role: "CSE Data Science Student",
      company: "Technical Study Group",
      avatar: "assets/avatar-2.svg"
    },
    {
      quote: "Rachit's dedication to mastering software fundamentals—from memory and pointers in C++ to interactive web applications in TypeScript—shows remarkable discipline and growth potential.",
      name: "Project Collaborator",
      role: "Peer Developer",
      company: "Coding Community",
      avatar: "assets/avatar-3.svg"
    }
  ]
};

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
