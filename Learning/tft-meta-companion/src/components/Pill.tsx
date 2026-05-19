import type { ReactNode } from 'react';

export type PillVariant = 'default' | 'trait' | 'augment' | 'easy' | 'medium' | 'hard';

type PillProps = {
  children: ReactNode;
  variant?: PillVariant;
};

const variantClasses: Record<PillVariant, string> = {
  default: 'bg-slate-800 text-slate-200',
  trait: 'border border-orange-400/40 bg-slate-800 text-orange-300',
  augment: 'border border-purple-400/30 bg-purple-400/10 text-purple-200',
  easy: 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
  medium: 'border border-yellow-400/20 bg-yellow-400/10 text-yellow-200',
  hard: 'border border-red-400/20 bg-red-400/10 text-red-200',
};

function Pill({ children, variant = 'default' }: PillProps) {
  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}

export default Pill;