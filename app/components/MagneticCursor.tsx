"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const bindHover = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select, label").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    window.addEventListener("mousemove", onMove);
    bindHover();

    const observer = new MutationObserver(bindHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="magnetic-cursor"
        style={{
          position: "fixed",
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          backgroundColor: "white",
          borderRadius: "50%",
          width: 8,
          height: 8,
        }}
      />
      <motion.div
        className="magnetic-cursor"
        style={{
          position: "fixed",
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 99998,
          mixBlendMode: "difference",
          border: "1.5px solid white",
          borderRadius: "50%",
        }}
        animate={{
          width: hovered ? 52 : 34,
          height: hovered ? 52 : 34,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
