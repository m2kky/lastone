export const lectures = [
  {
    id: "ai-automation-kickstart",
    title: "AI Automation Kickstart",
    subtitle: "Practical guide to implement no-code automation for business workflows",
    overview: "This comprehensive lecture introduces you to the world of AI-powered automation without requiring any coding skills. You'll learn how to identify automation opportunities in your business processes and implement them using popular no-code tools.\n\nPerfect for business owners, managers, and professionals who want to streamline their operations and increase efficiency. By the end of this session, you'll have practical knowledge to automate repetitive tasks and focus on high-value activities.",
    duration: "2 hours",
    date: "June 2025",
    level: "All Levels",
    language: "Arabic",
    resourcesCount: 3,
    keyElements: [
      "Process analysis before automation",
      "Operational workflow mapping",
      "Hands-on Make (Integromat) & Zapier examples",
      "Real world use cases: HR, Marketing, Sales",
      "ROI calculation and success metrics",
      "Common pitfalls and how to avoid them"
    ],
    examples: [
      { 
        title: "Workflow Map", 
        description: "Visual map of a marketing workflow", 
        image: "/images/lectures/automation.png" 
      },
      { 
        title: "Zapier Lead Flow", 
        description: "Lead capture → sheet → CRM example",
        image: "/images/lectures/automation.png"
      }
    ],
    resources: [
      { 
        label: "Slides (PDF)", 
        description: "Complete presentation slides with examples",
        link: "#" 
      },
      { 
        label: "Workflow templates", 
        description: "Ready-to-use automation templates",
        link: "#" 
      },
      { 
        label: "Tools checklist", 
        description: "Recommended automation tools and setup guide",
        link: "#" 
      }
    ],
    speaker: {
      name: "Muhammed Mekky",
      role: "Automation Specialist & Frontend Developer",
      bio: "Bridging product, automation and frontend for practical impact.",
      fullBio: "With over 5 years of experience in automation and digital transformation, Muhammed has helped 50+ businesses streamline their operations using AI-powered tools. He specializes in no-code solutions that deliver measurable results and has trained hundreds of professionals across the Middle East.",
      image: "/images/avatar.png",
      linkedin: "https://linkedin.com/in/muhammedmekky",
      website: "#"
    },
    video: { 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/images/lectures/automation.png"
    }
  },
  {
    id: "notion-productivity",
    title: "Notion Productivity Mastery",
    subtitle: "Transform your workspace into a productivity powerhouse",
    overview: "Master Notion from basics to advanced features in this comprehensive session. Learn how to create databases, templates, and automated workflows that will revolutionize how you organize your work and life.\n\nIdeal for professionals, students, and entrepreneurs who want to centralize their productivity system. You'll walk away with a complete Notion setup tailored to your needs.",
    duration: "1.5 hours",
    date: "May 2025",
    level: "Beginner to Intermediate",
    language: "Arabic",
    resourcesCount: 4,
    keyElements: [
      "Notion fundamentals and best practices",
      "Database creation and management",
      "Template design and automation",
      "Integration with other tools",
      "Personal productivity systems"
    ],
    examples: [
      { 
        title: "Project Dashboard", 
        description: "Complete project management setup",
        image: "/images/lectures/notion.png" 
      }
    ],
    resources: [
      { 
        label: "Notion Templates", 
        description: "Ready-to-use productivity templates",
        link: "#" 
      },
      { 
        label: "Setup Guide", 
        description: "Step-by-step implementation guide",
        link: "#" 
      }
    ],
    speaker: {
      name: "Muhammed Mekky",
      role: "Automation Specialist & Frontend Developer",
      bio: "Bridging product, automation and frontend for practical impact.",
      fullBio: "Notion power user and productivity consultant who has designed systems for teams ranging from startups to enterprise companies. Expert in creating scalable workspace solutions.",
      image: "/images/avatar.png",
      linkedin: "https://linkedin.com/in/muhammedmekky",
      website: "#"
    }
  }
];

export const getLectureById = (id) => {
  return lectures.find(lecture => lecture.id === id);
};

export const getRelatedLectures = (currentId, limit = 3) => {
  return lectures.filter(lecture => lecture.id !== currentId).slice(0, limit);
};