'use client';

import Image from 'next/image';
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="w-40 h-40 mx-auto mb-6 relative animate-float">
            <Image
              src="/image.jpeg"
              alt="Md. Rony"
              fill
              priority
              sizes="160px"
              className="rounded-full object-cover border-4 border-blue-500 shadow-2xl"
            />
            <div className="absolute inset-0 rounded-full bg-linear-to-r"></div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-slate-800 dark:text-white mb-6 gradient-text"
        >
          Hi, I&apos;m Rony
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-semibold text-gray-600 dark:text-gray-400 mb-6 h-12"
        >
          <TypeAnimation
            sequence={[
              'DevOps Engineer',
              2000,
              'Cloud Enthusiast',
              2000,
              'Automation Expert',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Bridging code, clouds, and creativity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <a
            href="https://github.com/mohammadrony"
            target="_blank"
            rel="noopener noreferrer me"
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-100 transition duration-300 hover:scale-105 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
          >
            <FaGithub className="text-xl" aria-hidden="true" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/mohammadrony"
            target="_blank"
            rel="noopener noreferrer me"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 hover:scale-105 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <FaLinkedin className="text-xl" aria-hidden="true" /> LinkedIn
          </a>
          <a
            href="https://facebook.com/mohammadrony29"
            target="_blank"
            rel="noopener noreferrer me"
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 hover:scale-105 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          >
            <FaFacebook className="text-xl" aria-hidden="true" /> Facebook
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 my-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 hover:scale-105 shadow-xl text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
