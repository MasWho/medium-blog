import { forwardRef } from "react";
import { SingleSlideProps } from "../types/Carousel";
import SliderArrow from "./SlideArrow";

/**
 * This code creates a single slide in a slide pack with the ability to slide left and right.
 */
const SingleSlide = forwardRef<HTMLDivElement, SingleSlideProps>((props, ref) => {
  const { slide, onSlideLeft, onSlideRight, showArrow = false } = props;
  return (
    <div className={slide.class}>
      <SliderArrow direction="left" onSlide={onSlideLeft} show={showArrow} />
      <SliderArrow direction="right" onSlide={onSlideRight} ref={ref} show={showArrow} />
      <div className="slider-single-content">{slide.element}</div>
    </div>
  );
});

export default SingleSlide;