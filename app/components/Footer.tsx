import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg mb-2">Md. Asaduzzaman Rony</p>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex gap-6">
          <a
            href="https://github.com/mohammadrony"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors text-2xl hover:scale-110 transform duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/mohammadrony"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors text-2xl hover:scale-110 transform duration-200"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://facebook.com/mohammadrony29"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors text-2xl hover:scale-110 transform duration-200"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
}

