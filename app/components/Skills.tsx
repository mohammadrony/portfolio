export default function Skills() {
  const skills = {
    "Languages": ["Python", "Java", "JavaScript", "C++", "Bash"],
    "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Argo", "Jenkins", "Terraform", "Ansible"],
    "Databases": ["MySQL", "PostgreSQL", "MSSQL", "Oracle", "Redis", "MongoDB"],
    "Monitoring": ["Prometheus", "Grafana", "OpenTelemetry", "ELK stack"],
    "Frameworks": ["Vue.js", "Flutter", "React.js", "Node.js", "Bootstrap"]
  };

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-800 dark:text-white mb-16">
          ⚡ Technical Skills
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <div
              key={category}
              className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">
                  {category === 'Languages' ? '💻' :
                   category === 'Cloud & DevOps' ? '☁️' :
                   category === 'Databases' ? '🗄️' :
                   category === 'Monitoring' ? '📊' : '🛠️'}
                </span>
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}