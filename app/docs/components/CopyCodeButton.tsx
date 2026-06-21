'use client';

import { useEffect } from 'react';

export default function CopyCodeButton() {
  useEffect(() => {
    const blocks = document.querySelectorAll('pre');

    blocks.forEach((pre) => {
      if (pre.parentElement?.classList.contains('copy-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'copy-wrapper';
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;

      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent || '';
        await navigator.clipboard.writeText(code);
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        setTimeout(() => {
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
        }, 2000);
      });

      wrapper.appendChild(btn);
    });
  });

  return null;
}
