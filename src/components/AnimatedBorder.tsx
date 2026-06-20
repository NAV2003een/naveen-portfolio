import type { ReactNode } from "react";

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedBorder({ children, className = "" }: AnimatedBorderProps) {
  return (
    <div className={`animated-border rounded-2xl p-[1px] ${className}`}>
      <div className="bg-void rounded-2xl p-6 md:p-8 h-full">
        {children}
      </div>
    </div>
  );
}