import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-400 hover:to-amber-500 shadow-lg hover:shadow-yellow-500/25",
        secondary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg hover:shadow-blue-500/25",
        outline: "border-2 border-yellow-500 text-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-black transition-colors",
        ghost: "text-white hover:bg-white/10 hover:text-yellow-400",
        nav: "text-gray-300 hover:text-yellow-400 hover:bg-white/5 rounded-md transition-colors"
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base", 
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild) {
      return (
        <span className={cn(buttonVariants({ variant, size, className }))}>
          {children}
        </span>
      );
    }
    
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };