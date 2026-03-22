/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  User,
  Cpu,
  Database,
  Layout,
  MessageSquare,
  Utensils
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
    description: "Focusing on Backend Development and Machine Learning.Completed Summer Training at Cipher School (July 2025) focused on Product Management."
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
  technical: [
    { name: "Python", level: 90, icon: <Code2 size={16} /> },
    { name: "C++", level: 81, icon: <Code2 size={16} /> },
    { name: "Django", level: 72, icon: <Cpu size={16} /> },
    { name: "SQL", level: 81, icon: <Database size={16} /> },
    { name: "Pandas", level: 90, icon: <Database size={16} /> },
    { name: "Numpy/SciPy", level: 81, icon: <Database size={16} /> },
    { name: "Matplotlib", level: 81, icon: <Database size={16} /> },
    { name: "Scikit-learn", level: 72, icon: <Cpu size={16} /> }
    // { name: "Git / GitHub", level: 90, icon: <Globe size={16} /> },
  ],


  // Languages: [
  //       { name: "Python", level: 90 },
  //       { name: "C++", level: 85 },
  //       { name: "C", level: 80 },
  //       { name: "Java", level: 75 },
  //       { name: "JavaScript", level: 80 },
  //       { name: "SQL", level: 85 },
        // { name: "R", level: 70 },
        // { name: "Swift", level: 65 },
        // { name: "Bash", level: 75 },
        // { name: "Kotlin", level: 60 }
      // ],


  // technologies: [
  //       { name: "Machine Learning", level: 85 },
  //       { name: "Deep Learning (DL)", level: 80 },
  //       { name: "Natural Language Processing (NLP)", level: 75 },
  //       { name: "Computer Vision (CV)", level: 70 },
  //       { name: "Generative Artificial Intelligence(AGI)", level: 70 },
  //       { name: "Data Science & Visualisation", level: 90 },
  //       { name: "Big Data & Analytics", level: 90 },
  //     ],


  // Libraries_&_frameworks:[
  //       { name: "Pandas", level: 90 },
  //       { name: "NumPy/SciPy", level: 90 },
  //       { name: "Matplotlib", level: 85 },
  //       { name: "Seaborn", level: 85 },
  //       { name: "Scikit-learn", level: 85 },
        // { name: "TensorFlow", level: 75 },
        // { name: "Keras", level: 75 },
        // { name: "PyTorch", level: 70 },
        // { name: "NLTK", level: 75 },
        // { name: "Hugging Face", level: 75 },
        // { name: "LangChain", level: 75 },
        // { name: "Tkinter", level: 75 },
        // { name: "Django/Flask", level: 80 },
        // { name: "FastAPI", level: 80 },
        // { name: "React.js", level: 80 },
        // { name: "Node.js", level: 75 },
        // { name: "Express.js", level: 75 },
        // { name: "Tailwind CSS", level: 85 },
        // { name: "Bootstrap", level: 80 }
      // ], 


  // tools_&_Plateforms:[
        // { name: "Git", level: 90 },
        // { name: "GitHub", level: 90 },
        // { name: "Docker", level: 75 },
        // { name: "Kubernetes", level: 70 },
        // { name: "AWS", level: 65 },
        // { name: "Terraform", level: 60 },
        // { name: "Jenkins", level: 65 },
        // { name: "Ansible", level: 60 },
        // { name: "Prometheus", level: 65 },
        // { name: "Grafana", level: 65 },
        // { name: "Jira", level: 80 },
        // { name: "Postman", level: 85 },
        // { name: "Selenium", level: 75 },
        // { name: "Figma", level: 70 },
        // { name: "AutoCAD", level: 65 },
        // { name: "Packet Tracer", level: 70 },
        // { name: "Proteus", level: 65 },
        // { name: "Arduino", level: 75 },
        // { name: "Google Colab", level: 90 },
        // { name: "Vercel", level: 80 },
        // { name: "Replit", level: 85 },
        // { name: "Streamlit", level: 85 }
      // ],


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


  // databases:[
  //   { name: "MySQL", level: 90 },
  //   { name: "PostgreSQL", level: 80 },
  //   { name: "MongoDB", level: 75 },
  // ],


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
      - Technical: ${SKILLS.technical.map(s => `${s.name} (${s.level}%)`).join(', ')}
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

const Navbar = ({ openChat }: { openChat: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-800/80 backdrop-blur-md border-b border-portfolio-border py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold tracking-tighter text-portfolio-dark">
          HKJ<span className="text-portfolio-primary"></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-portfolio-text hover:text-portfolio-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button className="text-portfolio-dark" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-slate-800 z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex gap-4">
              </div>
              <button onClick={() => setIsOpen(false)} className="text-portfolio-dark">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 items-center">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-portfolio-dark hover:text-portfolio-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-portfolio-text max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-20 h-1.5 gradient-bg mx-auto mt-6 rounded-full" />
  </div>
);

const SkillCard = ({ name, level, icon }: { name: string; level: number; icon?: React.ReactNode }) => (
  <div className="bg-slate-800 p-6 rounded-2xl border border-portfolio-border card-shadow group hover:border-portfolio-primary transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {icon && <div className="text-portfolio-primary">{icon}</div>}
        <h4 className="font-semibold text-portfolio-dark">{name}</h4>
      </div>
      <span className="text-xs font-bold text-portfolio-primary">{level}%</span>
    </div>
    <div className="h-2 bg-portfolio-bg rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full gradient-bg"
      />
    </div>
  </div>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-slate-800 rounded-3xl overflow-hidden border border-portfolio-border card-shadow group"
  >
    <div className="relative h-64 overflow-hidden">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <div className="flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full text-portfolio-dark hover:bg-portfolio-primary hover:text-white transition-all">
              <Github size={20} />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="p-3 bg-slate-800 rounded-full text-portfolio-dark hover:bg-portfolio-primary hover:text-white transition-all">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
    <div className="p-8">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold group-hover:text-portfolio-primary transition-colors">{project.title}</h3>
        <span className="text-[10px] font-bold text-portfolio-primary bg-portfolio-primary/10 px-2 py-1 rounded-md">{project.date}</span>
      </div>
      <p className="text-portfolio-text text-sm mb-6 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-portfolio-bg text-portfolio-text rounded-full border border-portfolio-border">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const InternshipCard = ({ internship }: { internship: Internship }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-slate-800 p-8 rounded-[2.5rem] border border-portfolio-border card-shadow hover:border-portfolio-primary transition-all duration-300 group"
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-portfolio-primary/10 text-portfolio-primary rounded-2xl group-hover:scale-110 transition-transform">
          <Briefcase size={28} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-portfolio-dark">{internship.program}</h4>
          <p className="text-portfolio-primary font-semibold">{internship.organization}</p>
        </div>
      </div>
      <span className="px-4 py-2 bg-portfolio-bg rounded-full text-xs font-bold text-portfolio-text border border-portfolio-border">
        {internship.duration}
      </span>
    </div>
    
    <div className="space-y-4">
      <p className="text-portfolio-text text-sm leading-relaxed font-medium bg-portfolio-bg/50 p-4 rounded-2xl border border-portfolio-border/50">
        {internship.shortDescription}
      </p>
      
      <div className="space-y-3 pt-2">
        {internship.longDescription.map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-portfolio-primary shrink-0" />
            <p className="text-portfolio-text text-sm leading-relaxed">{item}</p>
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
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="absolute bottom-20 right-0 w-80 md:w-96 bg-slate-800 rounded-3xl border border-portfolio-border card-shadow overflow-hidden flex flex-col h-[500px]"
          >
            <div className="p-6 gradient-bg text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">AI Assistant</h4>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-portfolio-primary text-white rounded-tr-none' : 'bg-portfolio-bg text-portfolio-dark rounded-tl-none'}`}>
                    <div className="markdown-body prose dark:prose-invert prose-sm max-w-none">
                      <Markdown>{msg.parts[0].text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-portfolio-bg p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-portfolio-text/30 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-portfolio-text/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-portfolio-text/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-portfolio-border flex gap-2">
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 p-3 bg-portfolio-bg rounded-xl text-sm outline-none focus:border-portfolio-primary border border-transparent transition-colors"
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
        className="w-16 h-16 gradient-bg text-white rounded-full flex items-center justify-center shadow-xl shadow-portfolio-primary/30 relative"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />}
      </motion.button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    <div className="min-h-screen bg-portfolio-bg transition-colors duration-300">
      <Navbar openChat={openChat} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-portfolio-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-portfolio-secondary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-portfolio-primary/10 text-portfolio-primary text-sm font-bold mb-6">
              Available for Opportunities
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Hello, I'm <span className="gradient-text">Himanshu Khajanchi</span>
            </h1>
            <p className="text-xl text-portfolio-text mb-10 max-w-lg leading-relaxed">
              A Computer Science undergraduate passionate about backend development, problem solving, and machine learning.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="px-8 py-4 gradient-bg text-white rounded-2xl font-bold shadow-lg shadow-portfolio-primary/20 hover:scale-105 transition-transform">
                View Projects
              </a>
              <a 
                href={RESUME_DOWNLOAD_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 bg-slate-800 border border-portfolio-border text-portfolio-dark rounded-2xl font-bold hover:bg-portfolio-bg transition-colors flex items-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full aspect-square max-w-md mx-auto rounded-[3rem] overflow-hidden border-8 border-slate-800 card-shadow">
              <img 
                src="/himan-photo.jpg" 
                alt="Himanshu Khajanchi" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-portfolio-secondary rounded-full -z-10 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-portfolio-primary rounded-full -z-10" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-spacing bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="About Me" subtitle="Passionate about technology and continuous learning." />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden card-shadow border border-portfolio-border">
                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&h=1000" alt="Computer Science" className="w-full h-auto" referrerPolicy="no-referrer" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold">I'm a Computer Science student focused on Backend & ML.</h3>
              <p className="text-portfolio-text leading-relaxed">
                I am a Computer Science undergraduate at Lovely Professional University with a strong passion for backend development, problem solving, and machine learning applications. I enjoy building scalable and efficient systems using modern frameworks and applying clean coding practices to ensure maintainable software.
                My primary expertise lies in Python and C++. I have experience developing backend services using Django and building machine learning solutions using Scikit-learn, Pandas, and NumPy. I am particularly interested in designing RESTful APIs and implementing clean architecture.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 bg-portfolio-bg rounded-2xl border border-portfolio-border">
                  <User className="text-portfolio-primary mb-4" size={24} />
                  <h4 className="font-bold mb-2">Personal Info</h4>
                  <ul className="text-sm space-y-2 text-portfolio-text">
                    <li><span className="font-semibold text-portfolio-dark">Name:</span> Himanshu Khajanchi</li>
                    <li><span className="font-semibold text-portfolio-dark">Education:</span> B.Tech CSE (AI & ML)</li>
                    <li><span className="font-semibold text-portfolio-dark">Location:</span> Rajasthan, India</li>
                  </ul>
                </div>
                <div className="p-6 bg-portfolio-bg rounded-2xl border border-portfolio-border">
                  <Briefcase className="text-portfolio-secondary mb-4" size={24} />
                  <h4 className="font-bold mb-2">Interests</h4>
                  <ul className="text-sm space-y-2 text-portfolio-text">
                    <li>Backend Development</li>
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
      <section id="skills" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="My Expertise" subtitle="A comprehensive toolkit of technical and professional skills." />
          
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Code2 className="text-portfolio-primary" />
                Technical Proficiency
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SKILLS.technical.map(skill => (
                  <React.Fragment key={skill.name}>
                    <SkillCard name={skill.name} level={skill.level} icon={skill.icon} />
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Layout className="text-portfolio-secondary" />
                Soft Skills
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {SKILLS.nonTechnical.map(skill => (
                  <React.Fragment key={skill.name}>
                    <SkillCard name={skill.name} level={skill.level} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-spacing bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Education Journey" subtitle="My academic background and milestones." />
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-portfolio-primary/30 -translate-x-1/2" />
            
            <div className="space-y-12">
              {EDUCATION.map((edu, index) => (
                <motion.div 
                  key={edu.degree}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} pl-10 md:pl-0`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 top-8 w-4 h-4 bg-portfolio-primary rounded-full -translate-x-1/2 z-10 border-4 border-slate-900" />
                  
                  <div className="md:w-1/2">
                    <div className="bg-portfolio-bg p-8 rounded-3xl border border-portfolio-border card-shadow hover:border-portfolio-primary transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-slate-800 rounded-2xl text-portfolio-primary">
                          <GraduationCap size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{edu.degree}</h4>
                          <p className="text-portfolio-primary text-sm font-semibold">{edu.institution}</p>
                        </div>
                      </div>
                      <span className="inline-block px-3 py-1 bg-slate-800 rounded-full text-xs font-bold text-portfolio-text mb-4 border border-portfolio-border">
                        {edu.year}
                      </span>
                      <p className="text-portfolio-text text-sm leading-relaxed">
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
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Work Experience" subtitle="Professional training and internships." />
          <div className="max-w-4xl mx-auto space-y-8">
            {INTERNSHIPS.map((internship, index) => (
              <InternshipCard key={index} internship={internship} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Featured Projects" subtitle="A selection of my recent work and experiments." />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map(project => (
              <React.Fragment key={project.title}>
                <ProjectCard project={project} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="section-spacing bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Certificates" subtitle="Validating my skills through industry-recognized programs." />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATES.map((cert, index) => {
              const CardContent = (
                <>
                  <div className="p-3 bg-slate-800 rounded-xl text-portfolio-secondary group-hover:scale-110 transition-transform">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-portfolio-dark mb-1">{cert.name}</h4>
                    <p className="text-sm text-portfolio-text mb-2">{cert.issuer}</p>
                    <span className="text-xs font-bold text-portfolio-secondary">{cert.date}</span>
                  </div>
                </>
              );

              return (
                <motion.div 
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 bg-portfolio-bg rounded-2xl border border-portfolio-border flex items-start gap-4 hover:border-portfolio-secondary transition-colors group ${cert.link ? 'cursor-pointer' : ''}`}
                >
                  {cert.link ? (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 w-full h-full">
                      {CardContent}
                    </a>
                  ) : (
                    CardContent
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Key Achievements" subtitle="Recognition for hard work and dedication." />
          
          <div className="grid md:grid-cols-3 gap-8">
            {ACHIEVEMENTS.map((ach, index) => {
              const CardContent = (
                <>
                  <div className="w-16 h-16 gradient-bg text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                    {ach.icon}
                  </div>
                  <div className="mb-2">
                    <span className="text-[10px] font-bold text-portfolio-primary bg-portfolio-primary/10 px-2 py-1 rounded-md uppercase tracking-wider">{ach.date}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-1">{ach.title}</h4>
                  {ach.organization && (
                    <p className="text-portfolio-primary text-sm font-semibold mb-3">
                      {ach.organization}
                    </p>
                  )}
                  <p className="text-portfolio-text text-sm leading-relaxed">
                    {ach.description}
                  </p>
                  {ach.link && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-portfolio-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      View Profile <ChevronRight size={14} />
                    </div>
                  )}
                </>
              );

              return (
                <motion.div 
                  key={ach.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800 p-8 rounded-3xl border border-portfolio-border card-shadow text-center group relative overflow-hidden"
                >
                  {ach.link ? (
                    <a href={ach.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                      {CardContent}
                    </a>
                  ) : (
                    CardContent
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="section-spacing bg-black text-white overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-portfolio-primary/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg p-12 rounded-[3rem] border border-white/10">
            <FileText size={64} className="mx-auto mb-8 text-portfolio-primary" />
            <h3 className="text-3xl font-bold mb-6 text-white">Download My Detailed Resume</h3>
            <p className="text-white/60 mb-10 leading-relaxed">
              Interested in more details about my experience, projects, and academic background? Download my full resume in PDF format.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={RESUME_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-10 py-5 gradient-bg text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-2xl shadow-portfolio-primary/40"
              >
                <FileText size={24} />
                View Resume
              </a>
              <a 
                href={RESUME_DOWNLOAD_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
              >
                <Download size={24} />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Get In Touch" subtitle="Have a question or want to collaborate? Drop me a message!" />
          
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-portfolio-text leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-6">
                <a href="mailto:himanshukhajanchijain@gmail.com" className="flex items-center gap-6 p-6 bg-slate-800 rounded-2xl border border-portfolio-border card-shadow hover:border-portfolio-primary transition-colors group">
                  <div className="p-4 bg-portfolio-primary/10 text-portfolio-primary rounded-xl group-hover:bg-portfolio-primary group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-portfolio-text uppercase tracking-widest mb-1">Email Me</p>
                    <p className="font-bold text-portfolio-dark">himanshukhajanchijain@gmail.com</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/khajanchi-himanshu-jain" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 bg-slate-800 rounded-2xl border border-portfolio-border card-shadow hover:border-portfolio-secondary transition-colors group">
                  <div className="p-4 bg-portfolio-secondary/10 text-portfolio-secondary rounded-xl group-hover:bg-portfolio-secondary group-hover:text-white transition-colors">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-portfolio-text uppercase tracking-widest mb-1">LinkedIn</p>
                    <p className="font-bold text-portfolio-dark">linkedin.com/in/khajanchi-himanshu-jain</p>
                  </div>
                </a>
                <a href="https://github.com/TheHKJ04" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 bg-slate-800 rounded-2xl border border-portfolio-border card-shadow hover:border-portfolio-dark transition-colors group">
                  <div className="p-4 bg-portfolio-dark/5 text-portfolio-dark rounded-xl group-hover:bg-portfolio-dark group-hover:text-white transition-colors">
                    <Github size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-portfolio-text uppercase tracking-widest mb-1">GitHub</p>
                    <p className="font-bold text-portfolio-dark">github.com/TheHKJ04</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`bg-slate-800 p-10 rounded-[2.5rem] border transition-all duration-500 ${submitStatus === 'success' ? 'border-portfolio-primary shadow-2xl shadow-portfolio-primary/30' : 'border-portfolio-border card-shadow'}`}
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-portfolio-dark ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full p-4 bg-portfolio-bg rounded-2xl border border-portfolio-border outline-none focus:border-portfolio-primary transition-colors text-portfolio-dark" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-portfolio-dark ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full p-4 bg-portfolio-bg rounded-2xl border border-portfolio-border outline-none focus:border-portfolio-primary transition-colors text-portfolio-dark" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-portfolio-dark ml-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Project Inquiry" 
                    required
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    className="w-full p-4 bg-portfolio-bg rounded-2xl border border-portfolio-border outline-none focus:border-portfolio-primary transition-colors text-portfolio-dark" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-portfolio-dark ml-1">Message</label>
                  <textarea 
                    placeholder="Tell me about your project..." 
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full p-4 bg-portfolio-bg rounded-2xl border border-portfolio-border outline-none focus:border-portfolio-primary transition-colors h-40 resize-none text-portfolio-dark" 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 gradient-bg text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-portfolio-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                  <Send size={20} />
                </button>
                {submitStatus === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-800 border-t border-portfolio-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold tracking-tighter text-portfolio-dark mb-4 block">
              HKJ<span className="text-portfolio-primary"></span>
            </a>
            <p className="text-sm text-portfolio-text">
              Building scalable systems with clean code and modern frameworks.
            </p>
          </div>

          <div className="flex gap-8">
            <a href="#about" className="text-sm font-medium text-portfolio-text hover:text-portfolio-primary transition-colors">About</a>
            <a href="#projects" className="text-sm font-medium text-portfolio-text hover:text-portfolio-primary transition-colors">Projects</a>
            <a href="#contact" className="text-sm font-medium text-portfolio-text hover:text-portfolio-primary transition-colors">Contact</a>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/TheHKJ04" target="_blank" rel="noopener noreferrer" className="p-3 bg-portfolio-bg rounded-full text-portfolio-text hover:text-portfolio-primary transition-all">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/khajanchi-himanshu-jain/" target="_blank" rel="noopener noreferrer" className="p-3 bg-portfolio-bg rounded-full text-portfolio-text hover:text-portfolio-primary transition-all">
              <Linkedin size={20} />
            </a>
            <a href="mailto:himanshukhajanchijain@gmail.com" className="p-3 bg-portfolio-bg rounded-full text-portfolio-text hover:text-portfolio-primary transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-portfolio-border text-center">
          <p className="text-xs text-portfolio-text font-medium">
            © 2026 HKJ — All Rights Reserved.
          </p>
        </div>
      </footer>
      <ChatAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}
