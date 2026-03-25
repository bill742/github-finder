import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'bg-primary/20 text-primary border border-primary/30',
        destructive: 'bg-destructive/20 text-destructive border border-destructive/30',
        outline: 'border border-border text-foreground',
        secondary: 'bg-secondary text-secondary-foreground border border-border',
        success: 'bg-green-500/20 text-green-400 border border-green-500/30',
      },
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
