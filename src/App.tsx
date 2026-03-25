/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Trophy, 
  FileText, 
  Send,
  ChevronRight,
  ChevronLeft,
  User,
  Cpu,
  Database,
  Globe,
  Layout,
  MessageSquare,
  Utensils,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

// --- Types ---

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  features?: string[];
  github?: string;
  demo?: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface Certificate {
  name: string;
  issuer: string;
  date?: string;
  link?: string;
}

interface Achievement {
  title: string;
  description: string;
  date: string;
  icon?: React.ReactNode;
  organization?: string;
  link?: string;
}

interface Internship {
  organization: string;
  program: string;
  duration: string;
  shortDescription: string;
  longDescription: string[];
}

// --- Data ---

const RESUME_LINK = "https://drive.google.com/file/d/1MbQhLGQjMJZ9fEizluZDAB-SFVr3IOhj/view?usp=drive_link";
const RESUME_DOWNLOAD_LINK = "https://drive.google.com/uc?export=download&id=1MbQhLGQjMJZ9fEizluZDAB-SFVr3IOhj";

const PROJECTS: Project[] = [
  {
    title: "Anime Store",
    description: "A full-stack e-commerce platform designed for anime enthusiasts, featuring a modern UI and seamless user experience.",
    date: "Feb' 2026",
    features: ["Product catalog", "User authentication", "Shopping cart functionality", "Responsive design"],
    github: "https://github.com/TheHKJ04/Anime-Store",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800",
    tags: ["Python","Django","HTML","CSS","JS"],
    demo: "#"
  },
  {
    title: "Student Dropout Analysis using Machine Learning",
    description: "Built a machine learning pipeline using Logistic Regression, Random Forest, and Decision Trees to predict student dropout risk with ~91% accuracy.",
    date: "Dec' 2025",
    features: ["Data preprocessing", "Model training", "Feature importance visualization", "Dropout trend analysis"],
    github: "https://github.com/TheHKJ04/Student-Dropout-Analysis-using-Machine-Learning",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["Python","Pandas","Numpy","Scikit-learn","Matplotlib","Seaborn","XGBoost"],
    demo: "#"
  },
  {
    title: "Efficient Page Replacement Algorithm Simulator",
    description: "A Python simulator implementing FIFO, LRU, and Optimal page replacement algorithms with visualizations.",
    date: "Mar' 2025",
    features: ["Memory frame simulation", "Page fault and hit ratio analysis", "Algorithm comparison charts"],
    github: "https://github.com/TheHKJ04/Efficient-Page-Replacement-Algorithm-Simulator",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tags: ["Python","Matplotlib","Tkinter"],
    demo: "#"
  },
  {
    title: "BookMyShow",
    description: "A data analysis application that explores movie trends, ratings, and booking data using Python's data science stack.",
    date: "Nov' 2024",
    features: ["Data cleaning and preprocessing", "Exploratory Data Analysis (EDA)", "Visualizing movie trends and ratings", "Statistical insights from booking data"],
    github: "https://github.com/TheHKJ04/BookMyShow-App",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800",
    tags: ["Python","Pandas","Matplotlib"],
    demo: "#"
  }
];

const EDUCATION: Education[] = [
  {
    degree: "B.Tech Computer Science and Engineering (Specialization in AI and ML)",
    institution: "Lovely Professional University, Phagwara, Punjab",
    year: "Aug' 2023 - Present",
    description: "Focusing on Full Stack Development and Machine Learning.Completed Summer Training at Cipher School (July 2025) focused on Product Management."
  },
  {
    degree: "Intermediate",
    institution: "St. Anselm's Sr. Sec. School, Nagaur, Rajasthan",
    year: "Apr' 2021 - Mar' 2022",
    description: "Completed with 84% marks(PCMB)."
  },
  {
    degree: "Matriculation",
    institution: "St. Anselm's Sr. Sec. School, Nagaur, Rajasthan",
    year: "Apr' 2019 - Mar' 2020",
    description: "Completed with 88% marks."
  }
];

const SKILLS = {
  // technical: [
  //   { name: "Python", level: 90, icon: <Code2 size={16} /> },
  //   { name: "C++", level: 81, icon: <Code2 size={16} /> },
  //   { name: "Django", level: 72, icon: <Cpu size={16} /> },
  //   { name: "SQL", level: 81, icon: <Database size={16} /> },
  //   { name: "Pandas", level: 90, icon: <Database size={16} /> },
  //   { name: "Numpy/SciPy", level: 81, icon: <Database size={16} /> },
  //   { name: "Matplotlib", level: 81, icon: <Database size={16} /> },
  //   { name: "Scikit-learn", level: 72, icon: <Cpu size={16} /> }
  //   // { name: "Git / GitHub", level: 90, icon: <Globe size={16} /> },
  // ],


  Languages: [
        { name: "Python", level: 90 },
        { name: "C++", level: 81 },
        { name: "C", level: 81 },
        { name: "Java", level: 72 },
        { name: "JavaScript", level: 72 },
        // { name: "SQL", level: 85 },
        // { name: "R", level: 70 },
        // { name: "Swift", level: 65 },
        // { name: "Bash", level: 75 },
        // { name: "Kotlin", level: 60 }
      ],


  // technologies: [
  //       { name: "Machine Learning", level: 85 },
  //       { name: "Deep Learning (DL)", level: 80 },
  //       { name: "Natural Language Processing (NLP)", level: 75 },
  //       { name: "Computer Vision (CV)", level: 70 },
  //       { name: "Generative Artificial Intelligence(AGI)", level: 70 },
  //       { name: "Data Science & Visualisation", level: 90 },
  //       { name: "Big Data & Analytics", level: 90 },
  //     ],


  "Libraries_&_frameworks":[
        { name: "Pandas", level: 90 },
        { name: "NumPy/SciPy", level: 81 },
        { name: "Matplotlib", level: 81 },
        { name: "Seaborn", level: 72 },
        { name: "Scikit-learn", level: 63 },
        // { name: "TensorFlow", level: 75 },
        // { name: "Keras", level: 75 },
        // { name: "PyTorch", level: 70 },
        // { name: "NLTK", level: 75 },
        // { name: "Hugging Face", level: 75 },
        // { name: "LangChain", level: 75 },
        { name: "Tkinter", level: 72 },
        { name: "Django/Flask", level: 90 },
        // { name: "FastAPI", level: 80 },
        // { name: "React.js", level: 80 },
        // { name: "Node.js", level: 75 },
        // { name: "Express.js", level: 75 },
        // { name: "Tailwind CSS", level: 85 },
        // { name: "Bootstrap", level: 80 }
      ], 


  "tools_&_Plateforms":[
        { name: "GitHub", level: 90 },
        { name: "Git", level: 81 },
        { name: "Docker", level: 72 },
        { name: "Kubernetes", level: 63 },
        // { name: "AWS", level: 65 },
        // { name: "Terraform", level: 60 },
        // { name: "Jenkins", level: 65 },
        // { name: "Ansible", level: 60 },
        // { name: "Prometheus", level: 65 },
        // { name: "Grafana", level: 65 },
        { name: "Jira", level: 81 },
        { name: "Postman", level: 90 },
        { name: "Selenium", level: 90 },
        { name: "Figma", level: 81 },
        { name: "AutoCAD", level: 63 },
        // { name: "Packet Tracer", level: 70 },
        // { name: "Proteus", level: 65 },
        // { name: "Arduino", level: 75 },
        // { name: "Google Colab", level: 90 },
        // { name: "Vercel", level: 80 },
        // { name: "Replit", level: 85 },
        // { name: "Streamlit", level: 85 }
      ],


  // data_&_AI_tools:[
    // { name: "Tableau", level: 75 },
        // { name: "Power BI", level: 75 },
        // { name: "Apache Spark", level: 70 },
        // { name: "Hadoop", level: 65 },
        // { name: "Airflow", level: 60 },
        // { name: "MLflow", level: 70 },
        // { name: "Hugging Face", level: 80 },
        // { name: "Snowflake", level: 65 },
        // { name: "Kafka", level: 65 },
        // { name: "Flink", level: 60 },
        // { name: "Streamlit", level: 85 },
        // { name: "LangChain", level: 80 },
        // { name: "FastAPI", level: 75 },
        // { name: "Advanced Excel with AI", level: 85 }
  // ],


  databases:[
    { name: "MySQL", level: 90 },
    { name: "PostgreSQL", level: 81 },
    // { name: "MongoDB", level: 75 },
  ],


  nonTechnical: [
    { name: "Project Management", level: 81 },
    { name: "Problem-Solving", level: 90 },
    { name: "Collaboration", level: 72 },
    { name: "Leadership", level: 81 },
    { name: "Empathy", level: 90 }

  ]
};

const CERTIFICATES: Certificate[] = [
    { name: "Generative AI Certifications",
      issuer: "Infosys Springboard", 
      date:"Aug' 2025", 
      link:"https://drive.google.com/file/d/17RqIFLufbLPW1LIreSXNzXH537EFWlVJ/view?usp=sharing"  
    },
    { name: "Product Management", 
      issuer: "Cipher School", 
      date:"Jul' 2025", 
      link:"https://drive.google.com/file/d/1-1_So3-SDiGa3tS5sB4FuYgTxtE68EBG/view?usp=sharing"  
    },
    { name: "Java Programming", 
      issuer: "LPU|IamNeo", 
      date:"May' 2025", 
      link:"https://drive.google.com/file/d/153jUU2XIjCyH_6hWSSdrgFpNUk5bA98T/view?usp=sharing"
    },
    { name: "Data Structures & Algorithms (C++)", 
      issuer: "Cipher School", 
      date:"Nov' 2024", 
      link:"https://drive.google.com/file/d/1Nkv1q3hwjsRAyMCGnjQW6tLGz4p7nq-x/view?usp=drive_link"  
    },
    { name: "Computer Networking", 
      issuer: "Google", 
      date:"Sep' 2024", 
      link:"https://drive.google.com/file/d/1jWw8i-Area0FMfdVT5BFYbT_h5s-BF7m/view?usp=drive_link" 
    },
    { name: "Data Analytics Essentials", 
      issuer: "Cisco", 
      date:"Mar' 2024", 
      link:"https://drive.google.com/file/d/1xPzXo5R9EK7-W51-REF6b-552mE39dsp/view?usp=drive_link"  
    }
];

const ACHIEVEMENTS: Achievement[] = [
  {
      title: "Dean's Top 10%",
      organization: "LPU",
      description: "Among the top performing students",
      date: "Jan' 2026 - Present",
      icon: <GraduationCap size={32} />
    },
  {
      title: "Advisory Member",
      organization: "Student Academic Advisory Committee – LPU",
      description: "Helping improve academic curriculum.",
      date: "Apr' 2025 - Present",
      icon: <GraduationCap size={32} />
    },
    {
      title: "Student Placement Coordinator",
      organization: "LPU",
      description: "Coordinated 25+ placement drives and workshops.",
      date: "Sep' 2024 - May' 2025",
      icon: <Briefcase size={32} />
    },
    {
      title: "Hostel Mess Student Representative",
      organization: "LPU",
      description: "Improved student meal plan and satisfaction.",
      date: "Oct' 2023 - May' 2024",
      icon: <Utensils size={32} />
    },
    {
      title: "2nd Runner Up",
      organization: "Alien Quiz Quacks (LPU)",
      description: "Achievement in quiz competition.",
      date: "Feb' 2024",
      icon: <Trophy size={32} />
    }
];

const INTERNSHIPS: Internship[] = [
  {
    organization: "Cipher School",
    program: "Summer Training",
    duration: "Jul' 2025",
    shortDescription: "Completed intensive training focused on Product Management, learning about product lifecycle, market research, and user-centric design through hands-on case studies and strategic analysis.",
    longDescription: [
      "Completed a Summer Training program at Cipher School focused on strengthening core Product Management fundamentals and building a structured understanding of the product development lifecycle.",
      "Participated in workshops and case studies, solving multiple product-related challenges and improving strategic thinking and user empathy.",
      "Engaged in hands-on sessions, applying concepts of market research, competitor analysis, and creating user personas for real-world scenarios.",
      "Improved problem-solving ability, communication efficiency, and strategic proficiency through consistent practice and project-based learning in a product context."
    ]
  }
];

// --- AI Service ---

const getAIResponse = async (message: string, history: { role: string, parts: { text: string }[] }[]) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return "I'm sorry, but the AI Assistant is not configured yet. Please set the `GEMINI_API_KEY` in the environment variables (Render settings).";
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-3-flash-preview";
    
    // Construct a comprehensive context from the portfolio data
    const portfolioContext = `
      You are the AI Assistant for Himanshu's portfolio.
      
      ABOUT Himanshu:
      Himanshu is a Computer Science student at Lovely Professional University (LPU) with a CGPA of 8.72, specializing in AI and ML.
      He is focused on Backend Development (Python, Django) and Machine Learning.
      He is based in Punjab, India.
      
      SKILLS:
      - Languages: ${SKILLS.Languages.map(s => `${s.name} (${s.level}%)`).join(', ')}
      - Libraries & Frameworks: ${SKILLS["Libraries_&_frameworks"].map(s => `${s.name} (${s.level}%)`).join(', ')}
      - Tools & Platforms: ${SKILLS["tools_&_Plateforms"].map(s => `${s.name} (${s.level}%)`).join(', ')}
      - Databases: ${SKILLS.databases.map(s => `${s.name} (${s.level}%)`).join(', ')}
      - Soft Skills: ${SKILLS.nonTechnical.map(s => `${s.name} (${s.level}%)`).join(', ')}
      
      PROJECTS:
      ${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tags: ${p.tags.join(', ')})`).join('\n')}
      
      EDUCATION:
      ${EDUCATION.map(e => `- ${e.degree} at ${e.institution} (${e.year}): ${e.description}`).join('\n')}
      
      INTERNSHIPS:
      ${INTERNSHIPS.map(i => `- ${i.organization} (${i.duration}): ${i.shortDescription}`).join('\n')}
      
      CERTIFICATES:
      ${CERTIFICATES.map(c => `- ${c.name} from ${c.issuer} (${c.date})`).join('\n')}
      
      ACHIEVEMENTS:
      ${ACHIEVEMENTS.map(a => `- ${a.title}: ${a.description}`).join('\n')}
      
      RESUME:
      Himanshu's resume can be viewed or downloaded here: ${RESUME_LINK}
      
      CONTACT:
      - Email: himanshukhajanchijain@gmail.com
      - LinkedIn: linkedin.com/in/khajanchi-himanshu-jain/
      - GitHub: github.com/TheHKJ04
      
      INSTRUCTIONS:
      - Be professional, helpful, and concise.
      - Answer questions about Himanshu's skills, projects, and background based on the information above.
      - If you don't know the answer, politely say you don't have that information and suggest contacting Himanshu directly.
      - Use Markdown for formatting.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: portfolioContext
      }
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("AI Error:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
      return "The AI Assistant's API key is invalid. Please check your `GEMINI_API_KEY` in the Render environment variables.";
    }
    return "I'm having trouble connecting to my brain right now. Please check if the `GEMINI_API_KEY` is correctly set in your Render environment variables.";
  }
};

// --- Components ---

const Navbar = ({ openChat, theme, toggleTheme }: { openChat: () => void, theme: 'light' | 'dark', toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      
      // Collapse (hide) navbar when About section starts (approx 80% of hero height)
      setIsHidden(scrollY > window.innerHeight * 0.8);

      // Close mobile menu on scroll
      if (isOpen) {
        setIsOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Mobile menu scroll behavior
  useEffect(() => {
    // We'll remove the body overflow lock as the user reported it "freezes" the screen
    // Instead, we'll ensure the menu itself is scrollable
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Training', href: '#internships' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2 sm:py-4' : 'py-4 sm:py-6'} ${isHidden && !isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-500 ${scrolled || isOpen ? 'bg-portfolio-card/80 backdrop-blur-xl border-portfolio-border/50 card-shadow' : 'bg-transparent border-transparent'}`}>
        <a href="#home" className="text-xl sm:text-2xl font-bold tracking-tighter text-portfolio-dark">
          <span className="text-portfolio-primary"></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs xl:text-sm font-medium text-portfolio-text hover:text-portfolio-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            className="p-2 text-portfolio-text hover:text-portfolio-primary hover:bg-portfolio-primary/10 rounded-full transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle & Theme Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-portfolio-text hover:text-portfolio-primary hover:bg-portfolio-primary/10 rounded-full transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="p-2 text-portfolio-dark hover:bg-portfolio-primary/10 rounded-full transition-colors" 
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </div>
  </nav>

    {/* Floating Hamburger Button when navbar is hidden */}
    <AnimatePresence>
      {isHidden && !isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: -20 }}
          onClick={() => setIsOpen(true)}
          className="fixed top-6 right-6 z-[55] p-4 bg-portfolio-card/80 backdrop-blur-xl border border-portfolio-border/50 rounded-full text-portfolio-primary shadow-2xl hover:scale-110 active:scale-95 transition-transform"
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </motion.button>
      )}
    </AnimatePresence>

    {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[60] bg-portfolio-bg/95 backdrop-blur-2xl flex flex-col items-center justify-start py-20 overflow-y-auto"
          >
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 p-2 text-portfolio-dark hover:bg-portfolio-primary/10 rounded-full transition-colors"
              aria-label="Close Menu"
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-portfolio-dark hover:text-portfolio-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center gap-8">
              <a href="https://github.com/TheHKJ04" target="_blank" rel="noopener noreferrer" className="text-portfolio-text hover:text-portfolio-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/khajanchi-himanshu-jain/" target="_blank" rel="noopener noreferrer" className="text-portfolio-text hover:text-portfolio-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:himanshukhajanchijain@gmail.com" className="text-portfolio-text hover:text-portfolio-primary transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 sm:mb-16 text-center px-4 relative z-10">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-portfolio-text max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-12 sm:w-16 h-1 bg-portfolio-primary mx-auto mt-4 sm:mt-6 rounded-full opacity-50" />
  </div>
);

const FluidBackground = ({ theme }: { theme: 'light' | 'dark' }) => {
  const { scrollYProgress } = useScroll();
  
  // Apple System Colors (Light/Dark variants)
  const lightColors = [
    '#F5F5F7', // Default Gray
    '#E0F2FE', // Blue/Sky
    '#DCFCE7', // Green
    '#F3E8FF', // Purple
    '#FFEDD5', // Orange
    '#FCE7F3', // Pink
    '#F5F5F7'
  ];

  const darkColors = [
    '#000000', // Default Black
    '#001D3D', // Deep Blue
    '#00261A', // Deep Green
    '#1A0033', // Deep Purple
    '#331A00', // Deep Orange
    '#33001A', // Deep Pink
    '#000000'
  ];

  const colors = theme === 'light' ? lightColors : darkColors;

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
    colors
  );

  return (
    <>
      <motion.div 
        className="fluid-bg"
        style={{ backgroundColor }}
      >
        {/* Subtle Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'light' ? 'from-white/20 via-transparent to-black/5' : 'from-white/5 via-transparent to-black/20'} pointer-events-none`} />
        
        {/* Fluid Blobs - Apple-like soft glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] ${theme === 'light' ? 'bg-portfolio-primary/5' : 'bg-portfolio-primary/10'} rounded-full blur-[100px]`}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] ${theme === 'light' ? 'bg-portfolio-secondary/5' : 'bg-portfolio-secondary/10'} rounded-full blur-[100px]`}
        />
      </motion.div>
      <div className={`glitter-overlay ${theme === 'light' ? 'opacity-[0.01]' : 'opacity-[0.03]'}`} />
    </>
  );
};

const SkillCard = ({ name, icon }: { name: string; icon?: React.ReactNode }) => (
  <div className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-white/10 shadow-sm transition-all duration-300 flex items-center gap-3 hover:bg-white/20 hover:scale-105 group overflow-hidden">
    {icon && <div className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0">{React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}</div>}
    <span className="font-bold text-xs sm:text-sm truncate tracking-tight">{name}</span>
  </div>
);

const SkillCategory = ({ title, icon, skills, colorClass }: { title: string, icon: React.ReactNode, skills: any[], colorClass: string }) => (
  <div className="w-screen min-h-[70vh] flex-shrink-0 flex items-center justify-center p-4 sm:p-8 lg:p-12 snap-center">
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className={`p-6 sm:p-10 lg:p-14 rounded-[2.5rem] sm:rounded-[3.5rem] backdrop-blur-3xl border-2 shadow-2xl w-full max-w-5xl flex flex-col items-center justify-center ${colorClass} will-change-transform`}
    >
      <div className="mb-6 sm:mb-10 text-center">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex p-3 sm:p-5 bg-white/20 rounded-2xl sm:rounded-[1.5rem] shadow-xl mb-4 sm:mb-6 border border-white/20"
        >
          {React.cloneElement(icon as React.ReactElement<any>, { size: 40, className: "sm:w-12 sm:h-12" })}
        </motion.div>
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter"
        >
          {title}
        </motion.h3>
      </div>
      
      {/* Grid on desktop, Horizontal swipe on mobile */}
      <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full overflow-x-auto sm:overflow-y-auto sm:max-h-[50vh] pb-4 sm:pb-0 sm:pr-2 custom-scrollbar snap-x snap-mandatory scrollbar-hide">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="flex-shrink-0 w-[140px] sm:w-auto snap-center"
          >
            <SkillCard name={skill.name} icon={icon} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

const HorizontalSkills = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = [
    { title: "Languages", icon: <Code2 />, skills: SKILLS.Languages, color: "bg-blue-500/10 border-blue-500/40 text-blue-600 dark:text-blue-300" },
    { title: "Libraries & Frameworks", icon: <Cpu />, skills: SKILLS["Libraries_&_frameworks"], color: "bg-purple-500/10 border-purple-500/40 text-purple-600 dark:text-purple-300" },
    { title: "Tools & Platforms", icon: <Globe />, skills: SKILLS["tools_&_Plateforms"], color: "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-300" },
    { title: "Databases", icon: <Database />, skills: SKILLS.databases, color: "bg-orange-500/10 border-orange-500/40 text-orange-600 dark:text-orange-300" },
    { title: "Soft Skills", icon: <Layout />, skills: SKILLS.nonTechnical, color: "bg-pink-500/10 border-pink-500/40 text-pink-600 dark:text-pink-300" },
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = window.innerWidth * 0.8;
      
      if (direction === 'right') {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft <= 10) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section id="skills" className="relative py-20 bg-portfolio-bg/10 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <SectionHeading title="My Expertise" subtitle="Explore my technical toolkit. Swipe or scroll horizontally to see more." />
      </div>

      <div className="relative group">
        {/* Navigation Buttons - Always functional for circular scroll */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-portfolio-dark shadow-xl transition-all duration-300 hover:bg-portfolio-primary hover:text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-portfolio-dark shadow-xl transition-all duration-300 hover:bg-portfolio-primary hover:text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-0 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing py-12 -my-12"
        >
          {categories.map((cat, i) => (
            <SkillCategory 
              key={i}
              title={cat.title} 
              icon={cat.icon} 
              skills={cat.skills} 
              colorClass={cat.color}
            />
          ))}
        </div>
      </div>

      {/* Swipe Indicator for Mobile */}
      <div className="flex justify-center mt-8 md:hidden">
        <div className="flex gap-2">
          {categories.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-portfolio-primary/30" />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-portfolio-card/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-portfolio-border/50 card-shadow group h-full flex flex-col transition-all duration-500"
  >
    <div className="relative h-48 sm:h-64 overflow-hidden">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
        <div className="flex gap-3 sm:gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-portfolio-card rounded-full text-portfolio-dark hover:bg-portfolio-primary hover:text-white transition-all">
              <Github size={18} />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="p-2 sm:p-3 bg-portfolio-card rounded-full text-portfolio-dark hover:bg-portfolio-primary hover:text-white transition-all">
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
    <div className="p-5 sm:p-8 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
        <h3 className="text-lg sm:text-xl font-bold group-hover:text-portfolio-primary transition-colors line-clamp-1 group-hover:line-clamp-none">{project.title}</h3>
        <span className="text-[9px] sm:text-[10px] font-bold text-portfolio-primary bg-portfolio-primary/10 px-2 py-1 rounded-md whitespace-nowrap">{project.date}</span>
      </div>
      <p className="text-portfolio-text text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-2 group-hover:line-clamp-none flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 sm:px-3 py-1 bg-portfolio-bg/50 text-portfolio-text rounded-full border border-portfolio-border/30">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const CertificateCard = ({ cert, index }: { cert: Certificate, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getPreviewUrl = (url: string) => {
    if (!url) return '';
    return url.replace('/view?usp=sharing', '/preview').replace('/view?usp=drive_link', '/preview');
  };

  const CardContent = (
    <div className="flex items-start gap-4 w-full h-full">
      <div className="p-3 bg-portfolio-bg rounded-2xl text-portfolio-secondary group-hover:scale-110 transition-transform shrink-0">
        <Award size={24} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-bold text-portfolio-dark mb-1 text-sm sm:text-base truncate">{cert.name}</h4>
        <p className="text-xs sm:text-sm text-portfolio-text mb-2 truncate">{cert.issuer}</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-bold text-portfolio-secondary">{cert.date}</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-portfolio-primary opacity-0 group-hover:opacity-100 transition-opacity">Hover to Preview</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <motion.div 
        key={cert.name}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, y: 12, zIndex: 50 }}
        viewport={{ once: true }}
        transition={{ 
          delay: index * 0.1,
          scale: { type: "spring", stiffness: 400, damping: 10 },
          y: { type: "spring", stiffness: 400, damping: 10 }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`p-5 sm:p-6 bg-portfolio-card/70 backdrop-blur-xl rounded-3xl border border-portfolio-border/50 hover:border-portfolio-secondary transition-shadow duration-300 group relative z-10 shadow-lg hover:shadow-2xl ${cert.link ? 'cursor-pointer' : ''}`}
      >
        {cert.link ? (
          <a href={cert.link} target="_blank" rel="noopener noreferrer">
            {CardContent}
          </a>
        ) : (
          CardContent
        )}
      </motion.div>

      <AnimatePresence>
        {isHovered && cert.link && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-full left-0 right-0 z-50 mt-4 h-64 sm:h-80 bg-portfolio-card rounded-3xl border-2 border-portfolio-secondary/30 shadow-2xl overflow-hidden origin-top"
          >
            <div className="absolute inset-0 bg-portfolio-bg/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-portfolio-secondary" />
            </div>
            <iframe 
              src={getPreviewUrl(cert.link)} 
              className="w-full h-full relative z-10 border-none"
              title={`Preview of ${cert.name}`}
            />
            <div className="absolute top-3 right-3 z-20 px-3 py-1 bg-portfolio-secondary text-white text-[10px] font-bold rounded-full shadow-lg">
              PREVIEW
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AchievementContent = ({ ach }: { ach: Achievement }) => (
  <>
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 sm:w-14 sm:h-14 gradient-bg text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
        {ach.icon}
      </div>
      <div>
        <span className="text-[10px] font-bold text-portfolio-primary bg-portfolio-primary/10 px-2 py-1 rounded-md uppercase tracking-wider inline-block mb-1">{ach.date}</span>
        <h4 className="text-base sm:text-lg font-bold leading-tight">{ach.title}</h4>
      </div>
    </div>
    {ach.organization && (
      <p className="text-portfolio-primary text-xs sm:text-sm font-semibold mb-3">
        {ach.organization}
      </p>
    )}
    <p className="text-portfolio-text text-xs sm:text-sm leading-relaxed">
      {ach.description}
    </p>
    {ach.link && (
      <div className="mt-4 flex items-center gap-2 text-portfolio-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        View Profile <ChevronRight size={14} />
      </div>
    )}
  </>
);

const InternshipCard = ({ internship }: { internship: Internship }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-portfolio-card/70 backdrop-blur-xl p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-portfolio-border/50 card-shadow hover:border-portfolio-primary transition-all duration-500 group"
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 sm:mb-6 gap-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="p-3 sm:p-4 bg-portfolio-primary/10 text-portfolio-primary rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform">
          <Briefcase size={24} className="sm:w-7 sm:h-7" />
        </div>
        <div>
          <h4 className="text-lg sm:text-xl font-bold text-portfolio-dark">{internship.program}</h4>
          <p className="text-portfolio-primary font-semibold text-sm sm:text-base">{internship.organization}</p>
        </div>
      </div>
      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-portfolio-bg/50 rounded-full text-[10px] sm:text-xs font-bold text-portfolio-text border border-portfolio-border/30">
        {internship.duration}
      </span>
    </div>
    
    <div className="space-y-4">
      <p className="text-portfolio-text text-xs sm:text-sm leading-relaxed font-medium bg-portfolio-bg/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-portfolio-border/20">
        {internship.shortDescription}
      </p>
      
      <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
        {internship.longDescription.map((item, i) => (
          <div key={i} className="flex gap-2 sm:gap-3 items-start">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-portfolio-primary shrink-0" />
            <p className="text-portfolio-text text-xs sm:text-sm leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ChatAssistant = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  const [messages, setMessages] = useState<{ role: string, parts: { text: string }[] }[]>([
    { role: 'model', parts: [{ text: "Hi! I'm AI assistant. How can I help you today?" }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getAIResponse(input, messages);
    setMessages(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-96 bg-portfolio-card rounded-3xl border border-portfolio-border card-shadow overflow-hidden flex flex-col h-[500px] sm:h-[600px] max-h-[70vh]"
          >
            <div className="p-5 sm:p-6 gradient-bg text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">AI Assistant</h4>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 sm:p-4 rounded-2xl text-xs sm:text-sm ${msg.role === 'user' ? 'bg-portfolio-primary text-white rounded-tr-none' : 'bg-portfolio-bg text-portfolio-dark rounded-tl-none'}`}>
                    <div className="markdown-body prose dark:prose-invert prose-sm max-w-none">
                      <Markdown>{msg.parts[0].text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-portfolio-bg p-3 sm:p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-portfolio-text/30 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-portfolio-text/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-portfolio-text/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 sm:p-4 border-t border-portfolio-border flex gap-2 bg-portfolio-card/50">
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 p-3 bg-portfolio-bg rounded-xl text-xs sm:text-sm outline-none focus:border-portfolio-primary border border-transparent transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-3 gradient-bg text-white rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 gradient-bg text-white rounded-full flex items-center justify-center shadow-xl shadow-portfolio-primary/30 relative"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />}
      </motion.button>
    </div>
  );
};

// --- Main App ---

const HorizontalCertificates = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = window.innerWidth * 0.8;
      
      if (direction === 'right') {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft <= 10) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section id="certificates" className="section-spacing relative bg-portfolio-bg/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="Certificates" subtitle="Validating my skills through industry-recognized programs." />
        
        <div className="relative group">
          {/* Navigation Buttons - Always functional for circular scroll */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-portfolio-dark shadow-xl transition-all duration-300 hover:bg-portfolio-primary hover:text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-portfolio-dark shadow-xl transition-all duration-300 hover:bg-portfolio-primary hover:text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>

          {/* Horizontal Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pt-12 pb-[400px] -mt-12 -mb-[400px] snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
          >
            {CERTIFICATES.map((cert, index) => (
              <div key={cert.name} className="flex-shrink-0 w-[280px] sm:w-[350px] snap-center">
                <CertificateCard cert={cert} index={index} />
              </div>
            ))}
          </div>
          
          {/* Swipe Indicator for Mobile */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {CERTIFICATES.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-portfolio-primary/30" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      return (saved as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const openChat = () => setIsChatOpen(true);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        if (data.error === 'MISSING_API_KEY') {
          alert('The contact form is not fully configured. Please set the `RESEND_API_KEY` in the environment variables.');
        }
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-500 relative">
      <FluidBackground theme={theme} />
      <Navbar openChat={openChat} theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-portfolio-primary/10 text-portfolio-primary text-xs sm:text-sm font-bold mb-6">
              Available for Opportunities
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
              Hello, I'm <span className="gradient-text">Himanshu Khajanchi Jain</span>
            </h1>
            <p className="text-lg sm:text-xl text-portfolio-text mb-10 leading-relaxed">
              A Computer Science undergraduate passionate about Full Stack Development, Problem Solving,Machine Learning and Entrepreneurship.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <a href="#projects" className="px-8 py-4 bg-portfolio-primary text-white rounded-full font-bold shadow-lg shadow-portfolio-primary/20 hover:scale-105 active:scale-95 transition-transform">
                View Projects
              </a>
              <a 
                href={RESUME_DOWNLOAD_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 bg-portfolio-card/80 backdrop-blur-xl border border-portfolio-border/50 text-portfolio-dark rounded-full font-bold hover:bg-portfolio-primary/10 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-spacing relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="About Me" subtitle="Passionate about bussiness,technology and continuous learning." />
          
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold">I'm a Computer Science student focused on Full Stack & ML.</h3>
              <p className="text-portfolio-text leading-relaxed text-sm sm:text-base max-w-3xl mx-auto">
                I am a Computer Science undergraduate at Lovely Professional University with a deep-rooted passion for architecting scalable Full Stack applications and exploring the frontiers of Machine Learning. My journey is driven by a curiosity to solve complex problems through elegant code and data-driven insights.
                <br /><br />
                With a solid foundation in Python and C++, I specialize in building robust backend architectures using Django and crafting intelligent solutions with Scikit-learn, Pandas, and NumPy. I thrive in environments that challenge me to implement clean architecture and design seamless RESTful APIs that bridge the gap between complex data and intuitive user experiences.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
                <div className="p-5 sm:p-6 bg-portfolio-card/70 backdrop-blur-xl rounded-3xl border border-portfolio-border/50 text-left transition-all duration-500 hover:border-portfolio-primary">
                  <User className="text-portfolio-primary mb-4" size={24} />
                  <h4 className="font-bold mb-2">Personal Info</h4>
                  <ul className="text-xs sm:text-sm space-y-2 text-portfolio-text">
                    <li><span className="font-semibold text-portfolio-dark">Name:</span> Himanshu Khajanchi Jain</li>
                    <li><span className="font-semibold text-portfolio-dark">Education:</span> B.Tech CSE (AI & ML)</li>
                    <li><span className="font-semibold text-portfolio-dark">Location:</span> Rajasthan, India</li>
                  </ul>
                </div>
                <div className="p-5 sm:p-6 bg-portfolio-card/70 backdrop-blur-xl rounded-3xl border border-portfolio-border/50 text-left transition-all duration-500 hover:border-portfolio-secondary">
                  <Briefcase className="text-portfolio-secondary mb-4" size={24} />
                  <h4 className="font-bold mb-2">Interests</h4>
                  <ul className="text-xs sm:text-sm space-y-2 text-portfolio-text">
                    <li>Full Stack Development</li>
                    <li>Machine Learning</li>
                    <li>DSA & Problem Solving</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <HorizontalSkills />

      {/* Education Section */}
      <section id="education" className="section-spacing relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Education Journey" subtitle="My academic background and milestones." />
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-portfolio-primary/30 -translate-x-1/2 hidden sm:block" />
            
            <div className="space-y-8 sm:space-y-12">
              {EDUCATION.map((edu, index) => (
                <motion.div 
                  key={edu.degree}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-6 sm:gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} sm:pl-0`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 top-8 w-4 h-4 bg-portfolio-primary rounded-full -translate-x-1/2 z-10 border-4 border-slate-900 hidden sm:block" />
                  
                  <div className="md:w-1/2">
                    <div className="bg-portfolio-card/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-portfolio-border/50 card-shadow hover:border-portfolio-primary transition-all duration-500">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-portfolio-bg/50 rounded-2xl text-portfolio-primary shrink-0">
                          <GraduationCap size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-base sm:text-lg leading-tight">{edu.degree}</h4>
                          <p className="text-portfolio-primary text-xs sm:text-sm font-semibold mt-1">{edu.institution}</p>
                        </div>
                      </div>
                      <span className="inline-block px-3 py-1 bg-portfolio-bg/50 rounded-full text-[10px] sm:text-xs font-bold text-portfolio-text mb-4 border border-portfolio-border/30">
                        {edu.year}
                      </span>
                      <p className="text-portfolio-text text-xs sm:text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section id="internships" className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Work Experience" subtitle="Professional training and internships." />
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {INTERNSHIPS.map((internship, index) => (
              <InternshipCard key={index} internship={internship} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Featured Projects" subtitle="A selection of my recent work and experiments." />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PROJECTS.map(project => (
              <React.Fragment key={project.title}>
                <ProjectCard project={project} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <HorizontalCertificates />

      {/* Achievements Section */}
      <section id="achievements" className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Key Achievements" subtitle="Recognition for hard work and dedication." />
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-portfolio-primary/20 -translate-x-1/2 hidden sm:block" />
            
            <div className="space-y-12">
              {ACHIEVEMENTS.map((ach, index) => (
                <motion.div 
                  key={ach.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 top-10 w-5 h-5 bg-portfolio-primary rounded-full -translate-x-1/2 z-10 border-4 border-portfolio-bg hidden sm:block shadow-[0_0_15px_rgba(0,122,255,0.5)]" />
                  
                  <div className="md:w-1/2">
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-portfolio-card/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-portfolio-border/50 card-shadow group relative overflow-hidden transition-all duration-300 hover:border-portfolio-primary"
                    >
                      {ach.link ? (
                        <a href={ach.link} target="_blank" rel="noopener noreferrer" className="block">
                          <AchievementContent ach={ach} />
                        </a>
                      ) : (
                        <AchievementContent ach={ach} />
                      )}
                    </motion.div>
                  </div>
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="section-spacing bg-black text-white overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-portfolio-primary/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border border-white/10">
            <FileText size={48} className="mx-auto mb-6 sm:mb-8 text-portfolio-primary sm:w-16 sm:h-16" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Download My Detailed Resume</h3>
            <p className="text-sm sm:text-base text-white/60 mb-8 sm:mb-10 leading-relaxed">
              Interested in more details about my experience, projects, and academic background? Download my full resume in PDF format.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={RESUME_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 sm:px-10 sm:py-5 gradient-bg text-white rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-2xl shadow-portfolio-primary/40"
              >
                <FileText size={20} className="sm:w-6 sm:h-6" />
                View Resume
              </a>
              <a 
                href={RESUME_DOWNLOAD_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 sm:px-10 sm:py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
              >
                <Download size={20} className="sm:w-6 sm:h-6" />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Get In Touch" subtitle="Have a question or want to collaborate? Drop me a message!" />
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-center lg:text-left"
            >
              <h3 className="text-2xl sm:text-3xl font-bold">Contact Information</h3>
              <p className="text-portfolio-text leading-relaxed max-w-lg mx-auto lg:mx-0">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                <a href="mailto:himanshukhajanchijain@gmail.com" className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-portfolio-card/70 backdrop-blur-xl rounded-3xl border border-portfolio-border/50 card-shadow hover:border-portfolio-primary transition-all duration-500 group text-left">
                  <div className="p-3 sm:p-4 bg-portfolio-primary/10 text-portfolio-primary rounded-2xl group-hover:bg-portfolio-primary group-hover:text-white transition-colors shrink-0">
                    <Mail size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold text-portfolio-text uppercase tracking-widest mb-1">Email Me</p>
                    <p className="font-bold text-portfolio-dark text-sm sm:text-base truncate">himanshukhajanchijain@gmail.com</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/khajanchi-himanshu-jain" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-portfolio-card/70 backdrop-blur-xl rounded-3xl border border-portfolio-border/50 card-shadow hover:border-portfolio-secondary transition-all duration-500 group text-left">
                  <div className="p-3 sm:p-4 bg-portfolio-secondary/10 text-portfolio-secondary rounded-2xl group-hover:bg-portfolio-secondary group-hover:text-white transition-colors shrink-0">
                    <Linkedin size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold text-portfolio-text uppercase tracking-widest mb-1">LinkedIn</p>
                    <p className="font-bold text-portfolio-dark text-sm sm:text-base truncate">linkedin.com/in/khajanchi-himanshu-jain</p>
                  </div>
                </a>
                <a href="https://github.com/TheHKJ04" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-portfolio-card/70 backdrop-blur-xl rounded-3xl border border-portfolio-border/50 card-shadow hover:border-portfolio-dark transition-all duration-500 group text-left">
                  <div className="p-3 sm:p-4 bg-portfolio-dark/5 text-portfolio-dark rounded-2xl group-hover:bg-portfolio-dark group-hover:text-white transition-colors shrink-0">
                    <Github size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold text-portfolio-text uppercase tracking-widest mb-1">GitHub</p>
                    <p className="font-bold text-portfolio-dark text-sm sm:text-base truncate">github.com/TheHKJ04</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`bg-portfolio-card/70 backdrop-blur-xl p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border transition-all duration-500 ${submitStatus === 'success' ? 'border-portfolio-primary shadow-2xl shadow-portfolio-primary/30' : 'border-portfolio-border/50 card-shadow'}`}
            >
              <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-portfolio-dark ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 sm:p-4 bg-portfolio-bg rounded-xl sm:rounded-2xl border border-portfolio-border outline-none focus:border-portfolio-primary transition-colors text-portfolio-dark text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-portfolio-dark ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 sm:p-4 bg-portfolio-bg rounded-xl sm:rounded-2xl border border-portfolio-border outline-none focus:border-portfolio-primary transition-colors text-portfolio-dark text-sm" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-portfolio-dark ml-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Project Inquiry" 
                    required
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    className="w-full p-3 sm:p-4 bg-portfolio-bg rounded-xl sm:rounded-2xl border border-portfolio-border outline-none focus:border-portfolio-primary transition-colors text-portfolio-dark text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-portfolio-dark ml-1">Message</label>
                  <textarea 
                    placeholder="Tell me about your project..." 
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full p-3 sm:p-4 bg-portfolio-bg rounded-xl sm:rounded-2xl border border-portfolio-border outline-none focus:border-portfolio-primary transition-colors h-32 sm:h-40 resize-none text-portfolio-dark text-sm" 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 sm:py-5 gradient-bg text-white rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-portfolio-primary/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                  <Send size={20} />
                </button>
                {submitStatus === 'error' && <p className="text-red-500 text-xs sm:text-sm text-center">Something went wrong. Please try again.</p>}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-portfolio-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <a href="#home" className="text-xl sm:text-2xl font-bold tracking-tighter text-portfolio-dark mb-4 block">
              HKJ<span className="text-portfolio-primary"></span>
            </a>
            <p className="text-xs sm:text-sm text-portfolio-text max-w-xs">
              Building scalable systems with clean code and modern frameworks.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <a href="#about" className="text-xs sm:text-sm font-medium text-portfolio-text hover:text-portfolio-primary transition-colors">About</a>
            <a href="#projects" className="text-xs sm:text-sm font-medium text-portfolio-text hover:text-portfolio-primary transition-colors">Projects</a>
            <a href="#contact" className="text-xs sm:text-sm font-medium text-portfolio-text hover:text-portfolio-primary transition-colors">Contact</a>
          </div>

          <div className="flex gap-4 sm:gap-6">
            <a href="https://github.com/TheHKJ04" target="_blank" rel="noopener noreferrer" className="p-3 bg-portfolio-bg rounded-full text-portfolio-text hover:text-portfolio-primary transition-all hover:scale-110">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/khajanchi-himanshu-jain/" target="_blank" rel="noopener noreferrer" className="p-3 bg-portfolio-bg rounded-full text-portfolio-text hover:text-portfolio-primary transition-all hover:scale-110">
              <Linkedin size={20} />
            </a>
            <a href="mailto:himanshukhajanchijain@gmail.com" className="p-3 bg-portfolio-bg rounded-full text-portfolio-text hover:text-portfolio-primary transition-all hover:scale-110">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-portfolio-border text-center">
          <p className="text-[10px] sm:text-xs text-portfolio-text font-medium">
            © {new Date().getFullYear()} HKJ — All Rights Reserved.
          </p>
        </div>
      </footer>
      <ChatAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}
