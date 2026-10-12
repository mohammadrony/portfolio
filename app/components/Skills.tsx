'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

interface Skill {
  name: string;
  level: SkillLevel;
  category: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Infrastructure & Cloud",
    icon: "☁️",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Kubernetes (EKS, AKS)", level: "advanced", category: "Infrastructure" },
      { name: "AWS (EKS, VPC, RDS)", level: "advanced", category: "Infrastructure" },
      { name: "Microsoft Azure (AKS, APIM)", level: "advanced", category: "Infrastructure" },
      { name: "Red Hat OpenShift", level: "intermediate", category: "Infrastructure" },
      { name: "Google Cloud Platform (GCP)", level: "intermediate", category: "Infrastructure" },
      { name: "Linux & Docker", level: "advanced", category: "Infrastructure" },
    ]
  },
  {
    name: "IaC & GitOps Delivery",
    icon: "⚙️",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Terraform", level: "advanced", category: "Automation" },
      { name: "Azure Bicep", level: "advanced", category: "Automation" },
      { name: "ArgoCD & App-of-Apps", level: "advanced", category: "DevOps" },
      { name: "Kargo & Argo Workflows", level: "intermediate", category: "DevOps" },
      { name: "Helm & Kustomize", level: "advanced", category: "DevOps" },
      { name: "GitHub Actions & OIDC", level: "advanced", category: "DevOps" },
      { name: "Ansible & Bash", level: "advanced", category: "Automation" },
    ]
  },
  {
    name: "DevSecOps & Zero-Trust",
    icon: "🔒",
    color: "from-red-500 to-rose-500",
    skills: [
      { name: "HashiCorp Vault & ESO", level: "advanced", category: "Security" },
      { name: "Kyverno Admission Policies", level: "intermediate", category: "Security" },
      { name: "Cosign & SBOM Signing", level: "intermediate", category: "Security" },
      { name: "DefectDojo Vulnerability Triage", level: "intermediate", category: "Security" },
      { name: "NetworkPolicies & WireGuard", level: "advanced", category: "Security" },
      { name: "SOC 2 & ISO 27001", level: "intermediate", category: "Security" },
    ]
  },
  {
    name: "AI Infrastructure & Scaling",
    icon: "🧠",
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "NVIDIA GPU Operator (Time-Slicing)", level: "intermediate", category: "AI" },
      { name: "Karpenter Node Autoscaling", level: "advanced", category: "Scaling" },
      { name: "KEDA Event-Driven Scaling", level: "advanced", category: "Scaling" },
      { name: "Ollama LLM Serving", level: "intermediate", category: "AI" },
      { name: "LiteLLM & MinIO Object Storage", level: "intermediate", category: "AI" },
    ]
  },
  {
    name: "Observability & Performance",
    icon: "📊",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Grafana LGTM Stack", level: "advanced", category: "Observability" },
      { name: "Prometheus & Alertmanager", level: "advanced", category: "Observability" },
      { name: "Fluent Bit & CloudWatch", level: "intermediate", category: "Observability" },
      { name: "Azure Log Analytics (DCE/DCR)", level: "intermediate", category: "Observability" },
      { name: "k6 Load Testing", level: "intermediate", category: "Testing" },
    ]
  },
  {
    name: "Databases & Runtimes",
    icon: "🗄️",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "PostgreSQL", level: "advanced", category: "Databases" },
      { name: "Redis", level: "advanced", category: "Databases" },
      { name: "MySQL", level: "advanced", category: "Databases" },
      { name: "Python", level: "intermediate", category: "Languages" },
      { name: "Go", level: "intermediate", category: "Languages" },
    ]
  },
];

const levelConfig = {
  beginner: { dots: 1, label: 'Beginner', color: 'bg-slate-400 dark:bg-slate-500' },
  intermediate: { dots: 2, label: 'Intermediate', color: 'bg-blue-500' },
  advanced: { dots: 3, label: 'Advanced', color: 'bg-emerald-500' },
};

function SkillChip({ skill, index }: { skill: Skill; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const config = levelConfig[skill.level];

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: shouldReduceMotion ? 0 : index * 0.05 }}
      className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700/60 rounded-lg"
      aria-label={`${skill.name}: ${config.label}`}
    >
      <span className="text-slate-700 dark:text-slate-200 font-medium text-sm whitespace-nowrap">
        {skill.name}
      </span>
      <div className="flex gap-0.5 shrink-0">
        {[1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={`w-1.5 h-1.5 rounded-full ${dot <= config.dots ? config.color : 'bg-slate-300 dark:bg-slate-600'}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function CategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-5 shadow-xl transition-[box-shadow] duration-300 border border-white/20 dark:border-slate-700/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl shrink-0`}>
            <span aria-hidden="true">{category.icon}</span>
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            {category.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, idx) => (
            <SkillChip key={skill.name} skill={skill} index={idx} />
          ))}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-white/70 dark:bg-slate-800/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-3">
              <span aria-hidden="true">⚡</span> Technical Skills
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {skillCategories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
