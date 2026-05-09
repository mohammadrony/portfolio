'use client';

import Link from 'next/link';
import {motion } from 'framer-motion';
import {FaLinux, FaWindows, FaDatabase, FaCloud, FaStarAndCrescent } from 'react-icons/fa';
import {SiDocker, SiKubernetes, SiAnsible, SiVirtualbox } from 'react-icons/si';
import ScrollReveal from './ScrollReveal';

const topics = [
  {
    name: 'Linux',
    slug: 'linux',
    Icon: FaLinux,
    count: 242,
    color: 'from-orange-500 to-yellow-500',
    desc: 'Commands, scripting, system administration'
  },
  {
    name: 'Kubernetes',
    slug: 'kubernetes',
    Icon: SiKubernetes,
    count: 149,
    color: 'from-blue-500 to-cyan-500',
    desc: 'Orchestration, deployments, networking'
  },
  {
    name: 'Database',
    slug: 'database',
    Icon: FaDatabase,
    count: 108,
    color: 'from-green-500 to-teal-500',
    desc: 'MySQL, PostgreSQL, Redis, MongoDB'
  },
  {
    name: 'Cloud',
    slug: 'cloud',
    Icon: FaCloud,
    count: 42,
    color: 'from-violet-500 to-purple-600',
    desc: 'AWS, GCP, cloud-native patterns'
  },
  {
    name: 'Docker',
    slug: 'docker',
    Icon: SiDocker,
    count: 52,
    color: 'from-sky-500 to-blue-600',
    desc: 'Containers, images, compose, registries'
  },
  {
    name: 'Virtualization',
    slug: 'virtualization',
    Icon: SiVirtualbox,
    count: 21,
    color: 'from-pink-500 to-rose-500',
    desc: 'KVM, QEMU, VMware, VirtualBox'
  },
  {
    name: 'Windows',
    slug: 'windows',
    Icon: FaWindows,
    count: 10,
    color: 'from-indigo-500 to-blue-500',
    desc: 'Administration, PowerShell, WSL'
  },
  {
    name: 'Ansible',
    slug: 'ansible',
    Icon: SiAnsible,
    count: 5,
    color: 'from-red-500 to-orange-500',
    desc: 'Playbooks, roles, automation'
  },
];

export default function KnowledgeBase() {
  return (
    <section id="knowledge-base" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal width="100%">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Knowledge Base
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Notes and documentation across DevOps, infrastructure, and more.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {topics.slice(0, 9).map((topic, i) => (
            <ScrollReveal key={topic.slug} width="100%" delay={i * 0.05}>
              <Link href={`/docs/${topic.slug}`}>
                <motion.div
                  whileHover={{y: -4, scale: 1.02 }}
                  transition={{type: 'spring', stiffness: 300 }}
                  className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 h-full cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${topic.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-lg bg-linear-to-br ${topic.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <topic.Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-800 dark:text-white">{topic.name}</h3>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">{topic.count}</span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{topic.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal width="100%">
          <div className="text-center">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
            >
              Browse all documentation
              <span className="text-lg">→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
