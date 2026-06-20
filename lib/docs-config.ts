export interface TopicConfig {
  label: string;
  description: string;
  longDescription: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  badgeClass: string;
}

export const TOPICS: Record<string, TopicConfig> = {
  linux: {
    label: 'Linux',
    description: 'Commands, scripting, system administration, and internals',
    longDescription:
      'Comprehensive Linux documentation covering commands, bash scripting, networking, storage, monitoring, and system administration.',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    textClass: 'text-emerald-700',
    badgeClass: 'bg-emerald-100 text-emerald-700',
  },
  docker: {
    label: 'Docker',
    description: 'Containers, Dockerfile, Compose, and container workflows',
    longDescription:
      'Everything about Docker: building images, writing Dockerfiles, Docker Compose, networking, and production patterns.',
    colorClass: 'text-sky-600',
    bgClass: 'bg-sky-50',
    borderClass: 'border-sky-200',
    textClass: 'text-sky-700',
    badgeClass: 'bg-sky-100 text-sky-700',
  },
  kubernetes: {
    label: 'Kubernetes',
    description: 'Cluster setup, workloads, networking, and certifications',
    longDescription:
      'In-depth Kubernetes docs: cluster setup, deployments, services, RBAC, storage, networking, and CKA certification notes.',
    colorClass: 'text-indigo-600',
    bgClass: 'bg-indigo-50',
    borderClass: 'border-indigo-200',
    textClass: 'text-indigo-700',
    badgeClass: 'bg-indigo-100 text-indigo-700',
  },
  database: {
    label: 'Database',
    description: 'MySQL, PostgreSQL, MongoDB, MSSQL, and Oracle guides',
    longDescription:
      'Practical database guides for MySQL, PostgreSQL, MongoDB, MSSQL, and Oracle - queries, administration, and configuration.',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-200',
    textClass: 'text-purple-700',
    badgeClass: 'bg-purple-100 text-purple-700',
  },
  cloud: {
    label: 'Cloud',
    description: 'AWS, GCP, Azure, and Alibaba Cloud services',
    longDescription:
      'Cloud platform guides covering AWS, Google Cloud, Azure, and Alibaba Cloud - CLI, services, architecture, and projects.',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    textClass: 'text-blue-700',
    badgeClass: 'bg-blue-100 text-blue-700',
  },
  windows: {
    label: 'Windows',
    description: 'Windows administration, networking, and user management',
    longDescription:
      'Windows system administration: user management, networking, memory optimization, and desktop configuration.',
    colorClass: 'text-cyan-600',
    bgClass: 'bg-cyan-50',
    borderClass: 'border-cyan-200',
    textClass: 'text-cyan-700',
    badgeClass: 'bg-cyan-100 text-cyan-700',
  },
  virtualization: {
    label: 'Virtualization',
    description: 'VMware, VirtualBox, Vagrant, LXC, and Proxmox',
    longDescription:
      'Virtualization guides for VMware, VirtualBox, Vagrant, LXC containers, OVS networking, and hardware setup.',
    colorClass: 'text-orange-600',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    textClass: 'text-orange-700',
    badgeClass: 'bg-orange-100 text-orange-700',
  },
  ansible: {
    label: 'Ansible',
    description: 'Playbooks for Kubernetes, Jenkins, and automation',
    longDescription:
      'Ansible playbooks and automation guides for Kubernetes cluster setup, Jenkins deployment, and infrastructure management.',
    colorClass: 'text-red-600',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
    textClass: 'text-red-700',
    badgeClass: 'bg-red-100 text-red-700',
  },
};

export const TOPIC_ORDER = [
  'linux', 'docker', 'kubernetes', 'database', 'cloud',
  'windows', 'virtualization', 'ansible',
];

export const TOPIC_ICONS: Record<string, string> = {
  linux: 'linux',
  docker: 'docker',
  kubernetes: 'kubernetes',
  database: 'database',
  cloud: 'cloud',
  windows: 'windows',
  virtualization: 'virtualization',
  ansible: 'ansible',
};
