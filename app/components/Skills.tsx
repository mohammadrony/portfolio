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
      { name: "AWS", level: "advanced", category: "Infrastructure" },
      { name: "Linux", level: "advanced", category: "Infrastructure" },
      { name: "Docker", level: "advanced", category: "Infrastructure" },
      { name: "Kubernetes", level: "intermediate", category: "Infrastructure" }
    ]
  },
  {
    name: "IaC & Automation",
    icon: "⚙️",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Ansible", level: "advanced", category: "Automation" },
      { name: "Bash Scripting", level: "advanced", category: "Automation" },
      { name: "Python", level: "intermediate", category: "Automation" }
    ]
  },
  {
    name: "CI/CD & DevOps",
    icon: "🔄",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Jenkins", level: "advanced", category: "DevOps" },
      { name: "ArgoCD", level: "intermediate", category: "DevOps" },
      { name: "GitHub Actions", level: "intermediate", category: "DevOps" },
      { name: "Git", level: "advanced", category: "DevOps" }
    ]
  },
  {
    name: "Observability",
    icon: "📊",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Prometheus", level: "intermediate", category: "Observability" },
      { name: "Grafana", level: "intermediate", category: "Observability" },
      { name: "OpenTelemetry", level: "beginner", category: "Observability" }
    ]
  },
  {
    name: "Databases",
    icon: "🗄️",
    color: "from-indigo-500 to-blue-500",
    skills: [
      { name: "MySQL", level: "advanced", category: "Databases" },
      { name: "PostgreSQL", level: "intermediate", category: "Databases" },
      { name: "Oracle", level: "beginner", category: "Databases" },
      { name: "MSSQL", level: "intermediate", category: "Databases" },
      { name: "Redis", level: "intermediate", category: "Databases" },
    ]
  },
  {
    name: "Programming",
    icon: "💻",
    color: "from-yellow-500 to-orange-500",
    skills: [
      { name: "JavaScript", level: "intermediate", category: "Programming" },
      { name: "Java", level: "intermediate", category: "Programming" },
      { name: "TypeScript", level: "intermediate", category: "Programming" },
      { name: "K6", level: "beginner", category: "Programming" }
    ]
  }
];

const levelConfig = {
  beginner:     { dots: 1, label: 'Beginner',     color: 'bg-slate-400 dark:bg-slate-500' },
  intermediate: { dots: 2, label: 'Intermediate', color: 'bg-blue-500' },
  advanced:     { dots: 3, label: 'Advanced',     color: 'bg-emerald-500' },
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
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-slate-800 dark:text-white mb-3"
            >
              <span aria-hidden="true">⚡</span> Technical Skills
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Technologies and tools I work with in my DevOps journey
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {skillCategories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: `${totalSkills}`, label: "Skills", icon: "🎯" },
              { value: "2+", label: "Years Experience", icon: "⏰" },
              { value: "1", label: "Certification", icon: "🏆" },
              { value: "4", label: "Projects", icon: "🚀" }
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
