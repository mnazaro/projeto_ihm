import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // Variantes temáticas alimentares
        vegetarian:
          "border-transparent bg-[oklch(0.62_0.18_145)] text-white [a&]:hover:bg-[oklch(0.58_0.18_145)] dark:bg-[oklch(0.68_0.18_145)] dark:text-[oklch(0.15_0.02_145)]",
        quick:
          "border-transparent bg-[oklch(0.72_0.16_65)] text-[oklch(0.30_0.08_65)] [a&]:hover:bg-[oklch(0.68_0.16_65)] dark:bg-[oklch(0.70_0.15_65)] dark:text-[oklch(0.15_0.02_65)]",
        dessert:
          "border-transparent bg-[oklch(0.48_0.12_340)] text-white [a&]:hover:bg-[oklch(0.44_0.12_340)] dark:bg-[oklch(0.60_0.15_340)] dark:text-white",
        protein:
          "border-transparent bg-[oklch(0.52_0.20_25)] text-white [a&]:hover:bg-[oklch(0.48_0.20_25)] dark:bg-[oklch(0.60_0.18_25)] dark:text-white",
        dairy:
          "border-transparent bg-[oklch(0.90_0.08_90)] text-[oklch(0.35_0.08_90)] [a&]:hover:bg-[oklch(0.86_0.08_90)] dark:bg-[oklch(0.75_0.10_90)] dark:text-[oklch(0.20_0.05_90)]",
        "gluten-free":
          "border-transparent bg-[oklch(0.70_0.10_50)] text-[oklch(0.25_0.05_50)] [a&]:hover:bg-[oklch(0.66_0.10_50)] dark:bg-[oklch(0.68_0.12_50)] dark:text-[oklch(0.15_0.02_50)]",
        healthy:
          "border-transparent bg-[oklch(0.58_0.15_130)] text-white [a&]:hover:bg-[oklch(0.54_0.15_130)] dark:bg-[oklch(0.65_0.16_130)] dark:text-[oklch(0.15_0.02_130)]",
        comfort:
          "border-transparent bg-[oklch(0.50_0.08_35)] text-white [a&]:hover:bg-[oklch(0.46_0.08_35)] dark:bg-[oklch(0.58_0.10_35)] dark:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };