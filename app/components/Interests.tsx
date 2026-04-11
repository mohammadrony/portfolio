'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface Interest {
  title: string;
  icon: string;
  description: string;
  color: string;
}

const interests = [
  {
    title: "Cloud Architecture",
    icon: "☁️",
    description: "Designing and implementing scalable cloud solutions with AWS and Kubernetes",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Infrastructure as Code",
    icon: "⚙️",
    description: "Automating infrastructure with Terraform, Ansible, and configuration management",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "CI/CD Pipelines",
    icon: "🔄",
    description: "Building automated deployment workflows with Jenkins, ArgoCD, and GitHub Actions",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Container Orchestration",
    icon: "📦",
    description: "Managing containerized applications with Docker and Kubernetes",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Observability",
    icon: "📊",
    description: "Implementing monitoring and logging with Prometheus, Grafana, and OpenTelemetry",
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Learning New Technologies",
    icon: "📚",
    description: "Continuously exploring new DevOps tools, cloud services, and best practices",
    color: "from-indigo-500 to-blue-500"
  }
];

function InterestCard({ interest, index }: { interest: typeof interests[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-[box-shadow] duration-300 border border-white/20 dark:border-slate-700/50"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${interest.color} flex items-center justify-center text-2xl shrink-0`}>
          <span aria-hidden="true">{interest.icon}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          {interest.title}
        </h3>
      </div>

      <p className="text-slate-600 dark:text-slate-300 text-sm">
        {interest.description}
      </p>
    </motion.div>
  );
}

export default function Interests() {
  return (
    <section id="interests" className="py-20 px-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-slate-900/30 dark:to-slate-800/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-slate-800 dark:text-white mb-3"
            >
              <span aria-hidden="true">❤️</span> Interests &amp; Focus Areas
            </motion.h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Areas where I&apos;m passionate about building expertise and contributing
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <InterestCard key={interest.title} interest={interest} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
