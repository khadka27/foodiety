"use client";

import { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface ClientMotionProps {
  children?: ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  [key: string]: any;
}

// Dynamically import motion to prevent SSR issues
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const MotionH1 = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.h1),
  { ssr: false }
);

const MotionP = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.p),
  { ssr: false }
);

export function ClientMotionDiv({ children, ...props }: ClientMotionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a plain div during SSR to prevent context issues
    const { initial, animate, transition, ...divProps } = props;
    return <div {...divProps}>{children}</div>;
  }

  return <MotionDiv {...props}>{children}</MotionDiv>;
}

export function ClientMotionH1({ children, ...props }: ClientMotionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    const { initial, animate, transition, ...divProps } = props;
    return <h1 {...divProps}>{children}</h1>;
  }

  return <MotionH1 {...props}>{children}</MotionH1>;
}

export function ClientMotionP({ children, ...props }: ClientMotionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    const { initial, animate, transition, ...divProps } = props;
    return <p {...divProps}>{children}</p>;
  }

  return <MotionP {...props}>{children}</MotionP>;
}

// Generic motion component that can be any element
export function ClientMotion({
  as: Component = "div",
  children,
  ...props
}: ClientMotionProps & { as?: keyof JSX.IntrinsicElements }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    const { initial, animate, transition, ...elementProps } = props;
    return <Component {...elementProps}>{children}</Component>;
  }

  // For dynamic import, we'll use MotionDiv as fallback for now
  // This could be improved by creating dynamic imports for each element type
  return <MotionDiv {...props}>{children}</MotionDiv>;
}
