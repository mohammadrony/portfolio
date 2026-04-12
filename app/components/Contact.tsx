'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import ScrollReveal from './ScrollReveal';

const contactInfo = [
  {
    icon: FaEnvelope,
    title: "Email",
    value: "mohammadronyku@gmail.com",
    link: "mailto:mohammadronyku@gmail.com",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+880 1521-255638",
    link: "https://wa.me/8801521255638",
    color: "from-green-500 to-green-600"
  },
  {
    icon: FaLinkedin,
    title: "LinkedIn",
    value: "mohammadrony",
    link: "https://linkedin.com/in/mohammadrony",
    color: "from-blue-600 to-blue-700"
  }
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              <span aria-hidden="true">📞</span> Get In Touch
            </motion.h2>
            <p className="text-blue-100 max-w-xl mx-auto">
              Interested in DevOps solutions or want to collaborate? Feel free to reach out through any of these channels.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInfo.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 rounded-xl"
            >
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-[box-shadow] duration-300 h-full">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                  <item.icon className="text-2xl" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm break-all">
                  {item.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
