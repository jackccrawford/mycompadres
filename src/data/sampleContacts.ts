export interface Contact {
  id: number;
  name: string;
  title: string;
  company: string;
  industry: string;
  scores: {
    positionPower: number;
    technicalAlignment: number;
    painIndicators: number;
    accessibility: number;
    competitivePosition: number;
  };
  totalScore: number;
  priority: "high" | "medium" | "low";
  notes: string;
  recentInteractions?: Array<{
    date: string;
    type: string;
    notes: string;
  }>;
  contactInfo?: {
    email?: string;
    linkedin?: string;
  };
  unlocked?: boolean;
}

export const contactsData: Contact[] = [
  {
    id: 1,
    name: "Alexandra Winters",
    title: "Director of Engineering Innovation",
    company: "TechForge Systems",
    industry: "Manufacturing",
    scores: {
      positionPower: 8,
      technicalAlignment: 9,
      painIndicators: 8,
      accessibility: 7,
      competitivePosition: 9
    },
    totalScore: 41,
    priority: "high",
    notes: "Spearheading automation initiatives across manufacturing units",
    recentInteractions: [
      { date: "2024-02-15", type: "LinkedIn Connection", notes: "Engaged with AI automation post" },
      { date: "2024-03-01", type: "Email", notes: "Discussion about developer tooling" }
    ],
    contactInfo: {
      email: "a.winters@techforge.dev",
      linkedin: "linkedin.com/in/alexwinters"
    }
  },
  {
    id: 2,
    name: "Marcus Chen",
    title: "Chief Technology Officer",
    company: "Quantum Dynamics Inc",
    industry: "Technology",
    scores: {
      positionPower: 10,
      technicalAlignment: 8,
      painIndicators: 9,
      accessibility: 6,
      competitivePosition: 8
    },
    totalScore: 41,
    priority: "high",
    notes: "Oversees 500+ developer team, actively seeking AI solutions",
    recentInteractions: [
      { date: "2024-01-10", type: "Tech Summit", notes: "Panel discussion on AI in development" },
      { date: "2024-02-20", type: "LinkedIn", notes: "Shared article about developer productivity" }
    ],
    contactInfo: {
      email: "m.chen@quantumdyn.io",
      linkedin: "linkedin.com/in/marcuschen"
    }
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    title: "VP of Software Architecture",
    company: "NovaTech Solutions",
    industry: "Technology",
    scores: {
      positionPower: 9,
      technicalAlignment: 10,
      painIndicators: 8,
      accessibility: 7,
      competitivePosition: 7
    },
    totalScore: 41,
    priority: "high",
    notes: "Leading cloud transformation and developer experience initiatives",
    recentInteractions: [
      { date: "2024-02-01", type: "Virtual Meetup", notes: "Discussed AI pair programming" },
      { date: "2024-03-05", type: "Call", notes: "Deep dive into development workflow" }
    ],
    contactInfo: {
      email: "s.rodriguez@novatech.com",
      linkedin: "linkedin.com/in/sophiarodriguez"
    }
  },
  {
    id: 4,
    name: "Raj Patel",
    title: "Director of Development",
    company: "BlueWave Financial",
    industry: "Finance",
    scores: {
      positionPower: 7,
      technicalAlignment: 9,
      painIndicators: 6,
      accessibility: 8,
      competitivePosition: 5
    },
    totalScore: 35,
    priority: "medium",
    notes: "Modernizing legacy systems with AI-driven solutions",
    recentInteractions: [
      { date: "2024-01-25", type: "Industry Event", notes: "FinTech Developer Conference" }
    ],
    contactInfo: {
      email: "raj.patel@bluewave.com",
      linkedin: "linkedin.com/in/rajpatel"
    }
  },
  {
    id: 5,
    name: "Emma Thompson",
    title: "Head of Engineering",
    company: "GreenField Agriculture Tech",
    industry: "Agriculture",
    scores: {
      positionPower: 9,
      technicalAlignment: 7,
      painIndicators: 5,
      accessibility: 4,
      competitivePosition: 7
    },
    totalScore: 32,
    priority: "medium",
    notes: "Implementing IoT solutions with growing dev team",
    recentInteractions: [
      { date: "2024-02-10", type: "Webinar", notes: "Participated in AgTech coding practices session" }
    ],
    contactInfo: {
      email: "e.thompson@greenfield.ag",
      linkedin: "linkedin.com/in/emmathompson"
    }
  },
  {
    id: 6,
    name: "Lucas Schmidt",
    title: "Technical Director",
    company: "RetailMatrix",
    industry: "Retail",
    scores: {
      positionPower: 6,
      technicalAlignment: 6,
      painIndicators: 8,
      accessibility: 5,
      competitivePosition: 6
    },
    totalScore: 31,
    priority: "medium",
    notes: "Scaling e-commerce platform development team",
    recentInteractions: [
      { date: "2024-03-01", type: "Email", notes: "Discussion about development scaling challenges" }
    ],
    contactInfo: {
      email: "l.schmidt@retailmatrix.com",
      linkedin: "linkedin.com/in/lucasschmidt"
    }
  },
  {
    id: 7,
    name: "Aisha Khan",
    title: "Development Team Lead",
    company: "HealthTech Innovations",
    industry: "Healthcare",
    scores: {
      positionPower: 5,
      technicalAlignment: 7,
      painIndicators: 6,
      accessibility: 4,
      competitivePosition: 5
    },
    totalScore: 27,
    priority: "low",
    notes: "Building next-gen healthcare applications",
    recentInteractions: [
      { date: "2024-01-05", type: "LinkedIn", notes: "Connected through healthcare tech group" }
    ],
    contactInfo: {
      email: "a.khan@healthtechinno.com",
      linkedin: "linkedin.com/in/aishakhan"
    }
  },
  {
    id: 8,
    name: "Jordan Smith",
    title: "Engineering Director",
    company: "DataStream",
    industry: "Data Analytics",
    scores: {
      positionPower: 7,
      technicalAlignment: 8,
      painIndicators: 8,
      accessibility: 5,
      competitivePosition: 7
    },
    totalScore: 35,
    priority: "medium",
    notes: "Team is struggling with code quality and review processes.",
    recentInteractions: [
      { date: "2024-02-20", type: "Conference", notes: "Discussed developer productivity tools" }
    ],
    contactInfo: {
      email: "j.smith@datastream.io",
      linkedin: "linkedin.com/in/jordansmith"
    }
  },
  {
    id: 9,
    name: "Alex Chen",
    title: "CTO",
    company: "TechFusion Inc.",
    industry: "Software",
    scores: {
      positionPower: 9,
      technicalAlignment: 9,
      painIndicators: 7,
      accessibility: 6,
      competitivePosition: 7
    },
    totalScore: 38,
    priority: "medium",
    notes: "Looking for AI-powered developer tools to improve team productivity.",
    recentInteractions: [
      { date: "2024-03-05", type: "Email", notes: "Inquiry about AI coding assistants" }
    ],
    contactInfo: {
      email: "a.chen@techfusion.dev",
      linkedin: "linkedin.com/in/alexchen"
    }
  }
];

export const getContactById = (id: number): Contact | undefined => {
  return contactsData.find(contact => contact.id === id);
};

export const getContactsByPriority = (priority: string): Contact[] => {
  return contactsData.filter(contact => contact.priority === priority);
};

export const calculateTotalScore = (scores: Contact['scores']): number => {
  return Object.values(scores).reduce((sum, score) => sum + score, 0);
};

export const getPriorityFromScore = (score: number): "high" | "medium" | "low" => {
  if (score >= 40) return "high";
  if (score >= 30) return "medium";
  return "low";
};
