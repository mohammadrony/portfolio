import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "eMarket",
      description: "E-commerce web application with Vue.js, Vuex state management, Stripe payment gateway, Node.js backend, and MySQL database.",
      tech: ["Vue.js", "Vuex", "Node.js", "MySQL", "Stripe"],
      type: "Full-Stack E-commerce",
      icon: "🛒",
      github: "https://github.com/mohammadrony/emarket"
    },
    {
      title: "Smart Diary",
      description: "Flutter application with GetX framework, Node.js backend, TypeScript, and MongoDB for sharing notes between teachers and students.",
      tech: ["Flutter", "GetX", "Node.js", "TypeScript", "MongoDB"],
      type: "Mobile Application",
      icon: "📱",
      github: "https://github.com/mohammadrony/smart-diary"
    },
    {
      title: "Argo Practice",
      description: "GitOps practice with ArgoCD for Blue Green and Canary Deployment strategies.",
      tech: ["ArgoCD", "Kubernetes", "GitOps", "Blue-Green", "Canary"],
      type: "DevOps Practice",
      icon: "🚀",
      github: "https://github.com/mohammadrony/argo-practice"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-800 dark:text-white mb-16">
          💼 Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{project.icon}</div>
                <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-semibold mb-4">
                  {project.type}
                </span>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-105 shadow"
                >
                  <FaGithub /> GitHub Repo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}