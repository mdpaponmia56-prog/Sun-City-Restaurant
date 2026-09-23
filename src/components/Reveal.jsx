import React from 'react';
import { useReveal } from '@/lib/hooks';
import { cn } from '@/lib/utils';

/**
 * @param {{ children?: React.ReactNode, className?: string, delay?: number, as?: React.ElementType }} props
 */
export default function Reveal({ children = null, className = '', delay = 0, as: Tag = 'div' }) {
  const { ref, inView } = useReveal();
  return (
    <Tag
      ref={ref}
      className={cn('reveal', inView && 'in-view', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}