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

export type SingleSlideProps = { 
  slide: Slide; 
  onSlideLeft: VoidFunction; 
  onSlideRight: VoidFunction; 
  showArrow?: boolean 
};

export type CarouselProps = {
  images: ReactNode[];
  autoplay?: boolean;
  interval?: number;
  height?: string;
  showPaging?: boolean;
  showArrow?: boolean;
  title?: string;
};