import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  title: "Md. Rony | DevOps Engineer & Cloud Enthusiast",
  description:
    "Portfolio of Md. Rony — a DevOps Engineer from Bangladesh specializing in cloud infrastructure, CI/CD pipelines, Kubernetes, GitOps, and automation. Open to collaboration.",
  metadataBase: new URL('https://mohammadrony.com'),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Md. Asaduzzaman Rony', url: 'https://mohammadrony.com' }],
  openGraph: {
    type: 'website',
    url: 'https://mohammadrony.com',
    title: "Md. Rony | DevOps Engineer & Cloud Enthusiast",
    description:
      "Portfolio of Md. Rony — a DevOps Engineer from Bangladesh specializing in cloud infrastructure, CI/CD pipelines, Kubernetes, GitOps, and automation.",
    siteName: "Md. Rony's Portfolio",
    images: [
      {
        url: '/image.jpeg',
        width: 800,
        height: 800,
        alt: 'Md. Rony — DevOps Engineer',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: "Md. Rony | DevOps Engineer & Cloud Enthusiast",
    description:
      "Portfolio of Md. Rony — a DevOps Engineer from Bangladesh specializing in cloud infrastructure, CI/CD pipelines, Kubernetes, GitOps, and automation.",
    images: ['/image.jpeg'],
  },
  icons: {
    icon: [
      { url: '/favicon-black.png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-white.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/favicon-black.png',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Md. Asaduzzaman Rony',
  alternateName: 'Md. Rony',
  url: 'https://mohammadrony.com',
  image: 'https://mohammadrony.com/image.jpeg',
  jobTitle: 'DevOps Engineer',
  description:
    'DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, Kubernetes, GitOps, and automation.',
  knowsAbout: [
    'DevOps', 'Cloud Infrastructure', 'Kubernetes', 'Docker', 'CI/CD',
    'AWS', 'Terraform', 'Ansible', 'Jenkins', 'ArgoCD', 'GitOps',
    'Prometheus', 'Grafana', 'Linux', 'Python', 'Bash',
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'Certified Kubernetes Administrator (CKA)',
    credentialCategory: 'Professional Certification',
    recognizedBy: { '@type': 'Organization', name: 'The Linux Foundation' },
    validFrom: '2024-09-01',
    validUntil: '2026-09-01',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Khulna University',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Khulna',
      addressCountry: 'BD',
    },
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BD',
    addressRegion: 'Dhaka',
  },
  nationality: 'Bangladeshi',
  sameAs: [
    'https://github.com/mohammadrony',
    'https://linkedin.com/in/mohammadrony',
  ],
};

const faviconScript = `
  (function() {
    const updateFavicon = (m) => {
      const icon = document.querySelector("link[rel='icon']") || document.createElement('link');
      icon.rel = 'icon';
      icon.href = m.matches ? '/favicon-black.png' : '/favicon-white.png';
      if (!icon.parentNode) document.head.appendChild(icon);
    };
    const m = window.matchMedia('(prefers-color-scheme: dark)');
    m.addEventListener('change', updateFavicon);
    updateFavicon(m);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script dangerouslySetInnerHTML={{ __html: faviconScript }} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9XH5NHDQGZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9XH5NHDQGZ');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
