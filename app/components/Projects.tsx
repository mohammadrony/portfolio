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
    title: "AI Platform Infrastructure",
    description: "Multi-region Kubernetes platform on AWS EKS with automated GitOps delivery, pipeline security scanning, and Grafana observability.",
    tech: ["AWS EKS", "Terraform", "ArgoCD", "Vault", "Grafana"],
    category: "Platform & DevSecOps",
    icon: "🤖",
    github: "https://github.com/mohammadrony",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: 2,
    title: "Document Processing Platform",
    description: "GPU-enabled Kubernetes cluster on AWS for document extraction workloads, using Karpenter for node autoscaling and in-cluster CI/CD.",
    tech: ["AWS EKS", "Karpenter", "KEDA", "NVIDIA GPUs", "GitHub Actions"],
    category: "AI & Kubernetes",
    icon: "📄",
    github: "https://github.com/mohammadrony",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 3,
    title: "Azure Kubernetes Migration",
    description: "Migrated legacy virtual machine services to AKS with modular Bicep templates, automated environment promotion, and secret management.",
    tech: ["Azure AKS", "Bicep", "ArgoCD", "Key Vault", "KEDA"],
    category: "Cloud Migration & IaC",
    icon: "☁️",
    github: "https://github.com/mohammadrony",
    color: "from-sky-500 to-blue-700"
  },
  {
    id: 4,
    title: "Financial Integration Gateway",
    description: "Multi-client API gateway using Azure APIM and Container Apps with static egress allowlisting and automated health checks.",
    tech: ["Azure APIM", "Container Apps", "Terraform", "OIDC", "k6"],
    category: "API & Container Apps",
    icon: "💳",
    github: "https://github.com/mohammadrony",
    color: "from-purple-600 to-pink-600"
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
    <section id="projects" className="py-20 px-6 bg-white/70 dark:bg-slate-800/40">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-3">
              <span aria-hidden="true">💼</span> My Projects
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
