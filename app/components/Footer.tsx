'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/mohammadrony"
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://linkedin.com/in/mohammadrony"
  },
  {
    name: "Email",
    icon: FaEnvelope,
    href: "mailto:mohammadronyku@gmail.com"
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-semibold text-lg">Md. Asaduzzaman Rony</p>
            <p className="text-slate-400 text-sm">
              DevOps Engineer · Bangladesh
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <social.icon aria-hidden="true" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
