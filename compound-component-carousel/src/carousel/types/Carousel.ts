import { ReactNode } from "react";

export type Slide = {
  class: string;
  element: ReactNode;
};

export type SliderArrowProps = { 
  direction: "left" | "right"; 
  onSlide: VoidFunction; 
  show: boolean 
};

export type SlidesProps = { 
  showArrow?: boolean
};

export type CarouselProps = {
  children: ReactNode;
  images: ReactNode[];
  autoplay?: boolean;
  interval?: number;
};

export type SlidesContainerProps = {
  children: React.ReactNode;
  height?: string;
};