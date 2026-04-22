'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface JourneyItem {
  id: number;
  title: string;
  role: string;
  company: string;
  companyUrl: string;
  period: string;
  icon: string;
  highlights: string[];
}

const journeyItems: JourneyItem[] = [
  {
    id: 1,
    title: "Professional",
    role: "DevOps & QA Engineer",
    company: "Dviz Technologies Inc.",
    companyUrl: "https://dviz.tech",
    period: "Nov 2025 – Present",
    icon: "💼",
    highlights: [
      "Implemented Helm charts and GitOps with ArgoCD",
      "Implemented security best practice with CI/CD pipeline",
      "Managed application deployment in RedHat OpenShift cluster",
      "Deployed application stack in GCP and AWS",
    ]
  },
  {
    id: 2,
    title: "Professional",
    role: "Junior DevOps Engineer",
    company: "Dynamic Solution Innovators Ltd.",
    companyUrl: "https://dsinnovators.com",
    period: "Sep 2023 – Aug 2025",
    icon: "💼",
    highlights: [
      "Built CI/CD pipelines with Jenkins, ArgoCD, GitHub Actions",
      "Deployed microservices on Kubernetes with GitOps",
      "Implemented observability with Prometheus & Grafana",
      "Managed AWS & DigitalOcean with Terraform & Ansible",
      "Collaborated with dev & QA teams on automation",
      "Administered databases: PostgreSQL, MySQL, Oracle, MSSQL"
    ]
  },
  {
    id: 3,
    title: "Training",
    role: "Trainee DevOps & Cloud Engineer",
    company: "BJIT Academy Ltd.",
    companyUrl: "https://bjitacademy.com",
    period: "Apr 2023 – Jul 2023",
    icon: "📚",
    highlights: [
      "AWS Cloud Services & Architecture",
      "Docker & Kubernetes Containerization",
      "Jenkins & GitLab CI/CD Pipelines",
      "Ansible Automation & Configuration"
    ]
  },
  {
    id: 4,
    title: "Education",
    role: "B.Sc. in Computer Science and Engineering",
    company: "Khulna University",
    companyUrl: "https://ku.ac.bd/discipline/cse",
    period: "Jan 2018 – Feb 2023",
    icon: "🎓",
    highlights: [
      "Coursework: Data Structures, Algorithms, Database Systems",
      "Operating Systems, Computer Networks",
      "Software Engineering, AI, ML fundamentals"
    ]
  }
];

const dot = "w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10";
const cardClass = "bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-[box-shadow] duration-300 border border-white/20 dark:border-slate-700/50";

function CardContent({ item }: { item: JourneyItem }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl" aria-hidden="true">{item.icon}</span>
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">{item.title}</h3>
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{item.role}</p>
        </div>
      </div>
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 dark:text-purple-400 font-semibold text-sm mb-2 hover:underline inline-block"
      >
        {item.company}
      </a>
      <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">{item.period}</p>
      <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
        {item.highlights.slice(0, 3).map((highlight, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5" aria-hidden="true">•</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function JourneyCard({ item, index }: { item: JourneyItem; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      {/* Mobile: dot on left, card indented */}
      <div className="md:hidden">
        <div className={`absolute left-0 mt-6 ${dot}`} />
        <div className="ml-8">
          <motion.div whileHover={{ scale: 1.02 }} className={cardClass}>
            <CardContent item={item} />
          </motion.div>
        </div>
      </div>

      {/* Desktop: alternating left/right with center dot */}
      <div className="hidden md:flex items-start">
        <div className="w-1/2 pr-8 flex justify-end">
          {isLeft && (
            <motion.div whileHover={{ scale: 1.02 }} className={`w-full ${cardClass}`}>
              <CardContent item={item} />
            </motion.div>
          )}
        </div>
        <div className="flex-shrink-0 flex justify-center pt-6 w-4">
          <div className={dot} />
        </div>
        <div className="w-1/2 pl-8">
          {!isLeft && (
            <motion.div whileHover={{ scale: 1.02 }} className={`w-full ${cardClass}`}>
              <CardContent item={item} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="py-20 px-6 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-slate-800 dark:text-white mb-3"
            >
              <span aria-hidden="true">🛤️</span> My Journey
            </motion.h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative ml-2 md:ml-0">
          {/* Vertical line */}
          <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-600 to-blue-500 opacity-50" aria-hidden="true" />
          <div className="space-y-8">
            {journeyItems.map((item, index) => (
              <JourneyCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
