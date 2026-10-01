import { TriangleAlert } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ActionWarning({ children, className }: Props) {
  if (!children) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 mb-6 text-sm text-amber-600',
        className,
      )}
    >
      <TriangleAlert className="h-4 w-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
