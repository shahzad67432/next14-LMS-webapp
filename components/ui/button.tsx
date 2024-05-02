import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm  font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "text-black bg-white border-slate-200 border-2 border-b-4 active:border-2 hover:bg-slate-100",
        primary: "bg-sky-400 text-primary-foreground border-sky-500 border-2 border-b-4 hover:bg-sky-400/90 active:border-b-0",
        primaryOutline: "text-sky-400 bg-white hover:bg-slate-100",
        secondary: "bg-green-500 text-primary-foreground border-green-600 border-2 border-b-4 hover:bg-green-600 active:border-b-0",
        secondaryOutline: "text-green-500 bg-white hover:bg-slate-100",
        danger: "bg-rose-500 text-primary-foreground border-rose-600 border-2 border-b-4 hover:bg-rose-600  active:border-b-0",
        dangerOutline: "text-rose-500 bg-white hover:bg-slate-100",
        super: "bg-indigo-500 text-primary-foreground border-indigo-600 border-2 border-b-4 hover:bg-indigo-600 active:border-b-0",
        superOutline: "text-indigo-500 bg-white hover:bg-slate-100",
        ghost: "bg-transparent text-slate-500 hover:bg-slate-100",
        sidebar: "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none ",
        sidebarOutline: "text-sky-500 bg-sky-500/15 hover:bg-sky-500/20 border-sky-300 border-2 transition-none",
        locked: "bg-neutral-200 text-primary-forground hover:bg-neutal-200/90 border-neutral-400 border-b-4 active:border-b-0 ",

      },
      size: {
        default: "h-10 px-4 py-2",
        rounded: " rounded-full",
        sm: "h-11 px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
