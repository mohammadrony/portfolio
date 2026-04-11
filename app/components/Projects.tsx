'use client';

import { motion } from 'framer-motion';
import { FaGithub } from "react-icons/fa";
import ScrollReveal from './ScrollReveal';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  icon: string;
  github: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "eMarket",
    description: "Full-stack e-commerce application with Vue.js frontend, Node.js backend, MySQL database, and Stripe payment integration. Implemented automated testing with Jest.",
    tech: ["Vue.js", "Vuex", "Node.js", "MySQL", "Stripe", "Jest"],
    category: "Full-Stack",
    icon: "🛒",
    github: "https://github.com/mohammadrony/emarket",
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: 2,
    title: "Smart Diary",
    description: "Flutter mobile application for task and note management with Node.js backend, TypeScript, and MongoDB. Built using GetX framework.",
    tech: ["Flutter", "GetX", "Node.js", "TypeScript", "MongoDB"],
    category: "Mobile",
    icon: "📱",
    github: "https://github.com/mohammadrony/smart-diary",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "GitOps Practice",
    description: "GitOps workflow implementation using ArgoCD for Blue-Green and Canary deployment strategies on Kubernetes clusters.",
    tech: ["ArgoCD", "Kubernetes", "GitOps", "Docker"],
    category: "DevOps",
    icon: "🚀",
    github: "https://github.com/mohammadrony/argo-practice",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 4,
    title: "Ansible Playbook",
    description: "Ansible playbook for configuring Kubernetes cluster and Jenkins server on Linux systems. Automates infrastructure setup.",
    tech: ["Ansible", "YAML", "Linux", "Jenkins", "Kubernetes"],
    category: "Automation",
    icon: "⚙️",
    github: "https://github.com/mohammadrony/ansible-playbook",
    color: "from-green-500 to-teal-500"
  }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-[box-shadow] duration-300 border border-white/20 dark:border-slate-700/50 h-full flex flex-col"
    >
      <div className="text-center mb-4">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-3xl text-white shadow-lg`}>
          <span aria-hidden="true">{project.icon}</span>
        </div>

        <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium mb-3">
          {project.category}
        </span>

        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
          {project.title}
        </h3>
      </div>

      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 justify-center mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 dark:bg-slate-700 text-white rounded-xl font-medium text-sm hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
      >
        <FaGithub aria-hidden="true" /> View Code
      </motion.a>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-br from-slate-50/50 to-blue-50/50 dark:from-slate-900/30 dark:to-slate-800/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-slate-800 dark:text-white mb-3"
            >
              <span aria-hidden="true">💼</span> My Projects
            </motion.h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Projects I&apos;ve built to practice and demonstrate my DevOps and development skills
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "4", label: "Projects", icon: "🚀" },
              { value: "100%", label: "Learning Focus", icon: "📚" },
              { value: "6+", label: "Technologies", icon: "🛠️" },
              { value: "Open", label: "Source", icon: "🔓" }
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
