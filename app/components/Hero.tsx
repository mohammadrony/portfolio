import Image from 'next/image';
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <div className="relative mb-8">
          <div className="w-40 h-40 mx-auto mb-6 relative animate-float">
            <Image
              src="/image.png"
              alt="Md. Rony"
              fill
              className="rounded-full object-cover border-4 border-blue-500 shadow-2xl"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r"></div>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-800 dark:text-white mb-6 gradient-text">
          Hi, I&apos;m Rony
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-600 dark:text-gray-400 mb-6">
          DevOps Engineer
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
           Bridging code, clouds, and creativity.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://github.com/mohammadrony"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <FaGithub className="text-xl" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/mohammadrony"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <FaLinkedin className="text-xl" /> LinkedIn
          </a>
          <a
            href="https://facebook.com/mohammadrony29"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <FaFacebook className="text-xl" /> Facebook
          </a>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 my-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-xl text-lg font-semibold"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}