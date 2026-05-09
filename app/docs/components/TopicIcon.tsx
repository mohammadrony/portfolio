'use client';

import { FaLinux, FaWindows, FaDatabase, FaCloud, FaStarAndCrescent } from 'react-icons/fa';
import { SiDocker, SiKubernetes, SiAnsible, SiVirtualbox } from 'react-icons/si';

interface Props {
  topic: string;
  className?: string;
}

export default function TopicIcon({ topic, className = 'w-6 h-6' }: Props) {
  const icons: Record<string, React.ReactNode> = {
    linux:          <FaLinux className={className} />,
    docker:         <SiDocker className={className} />,
    kubernetes:     <SiKubernetes className={className} />,
    database:       <FaDatabase className={className} />,
    cloud:          <FaCloud className={className} />,
    windows:        <FaWindows className={className} />,
    virtualization: <SiVirtualbox className={className} />,
    ansible:        <SiAnsible className={className} />,
    islam:          <FaStarAndCrescent className={className} />,
  };
  return <>{icons[topic] ?? icons.database}</>;
}
