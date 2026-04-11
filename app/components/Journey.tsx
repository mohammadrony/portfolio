'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface JourneyItem {
  id: number;
  title: string;
  role: string;
  company: string;
  period: string;
  icon: string;
  color: string;
  highlights: string[];
}

const journeyItems: JourneyItem[] = [
  {
    id: 1,
    title: "Education",
    role: "B.Sc. in Computer Science and Engineering",
    company: "Khulna University",
    period: "Jan 2018 – Feb 2023",
    icon: "🎓",
    color: "from-blue-500 to-cyan-500",
    highlights: [
      "Coursework: Data Structures, Algorithms, Database Systems",
      "Operating Systems, Computer Networks",
      "Software Engineering, AI, ML fundamentals"
    ]
  },
  {
    id: 2,
    title: "Training",
    role: "Trainee DevOps & Cloud Engineer",
    company: "BJIT Academy Ltd.",
    period: "Apr 2023 – Jul 2023",
    icon: "📚",
    color: "from-green-500 to-emerald-500",
    highlights: [
      "AWS Cloud Services & Architecture",
      "Docker & Kubernetes Containerization",
      "Jenkins & GitLab CI/CD Pipelines",
      "Ansible Automation & Configuration"
    ]
  },
  {
    id: 3,
    title: "Professional",
    role: "Junior DevOps Engineer",
    company: "Dynamic Solution Innovators Ltd.",
    period: "Sep 2023 – Aug 2025",
    icon: "💼",
    color: "from-purple-500 to-pink-500",
    highlights: [
      "Built CI/CD pipelines with Jenkins, ArgoCD, GitHub Actions",
      "Deployed microservices on Kubernetes with GitOps",
      "Collaborated with dev & QA teams on automation",
      "Managed AWS & DigitalOcean with Terraform & Ansible",
      "Implemented observability with Prometheus & Grafana",
      "Administered databases: PostgreSQL, MySQL, Oracle, MSSQL"
    ]
  }
];

function JourneyCard({ item, index }: { item: JourneyItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10 mt-6" />

      {/* Content */}
      <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-[box-shadow] duration-300 border border-white/20 dark:border-slate-700/50"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl" aria-hidden="true">{item.icon}</span>
            <div className={index % 2 === 0 ? 'md:text-right' : 'md:text-left'}>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                {item.role}
              </p>
            </div>
          </div>

          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm mb-2">
            {item.company}
          </p>

          <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
            {item.period}
          </p>

          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
            {item.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5" aria-hidden="true">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="py-20 px-6 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-slate-800 dark:text-white mb-3"
            >
              <span aria-hidden="true">🛤️</span> My Journey
            </motion.h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From education to becoming a DevOps Engineer: My professional growth path
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative ml-2 md:ml-0">
          {/* Vertical line */}
          <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-600 to-blue-500 opacity-50" aria-hidden="true" />

          <div className="space-y-8">
            {journeyItems.map((item, index) => (
              <JourneyCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "2+", label: "Years DevOps", icon: "⏰" },
              { value: "4+", label: "Months Training", icon: "📚" },
              { value: "5", label: "Years Education", icon: "🎓" },
              { value: "6+", label: "Technologies", icon: "🛠️" }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.03 }}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-xl p-4 text-center shadow-lg border border-white/20 dark:border-slate-600/50"
              >
                <div className="text-2xl mb-1" aria-hidden="true">{stat.icon}</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white tabular-nums">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
