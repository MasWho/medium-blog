import { useContext } from "react";
import { SlidesProps } from "../types/Carousel";
import SlideArrow from "./SlideArrow";
import { CarouselContext } from "../Carousel";

/**
 * This code creates a slide pack where individual slides have the ability to slide left and right.
 */
const Slides = (props: SlidesProps) => {
  const { showArrow = true } = props;
  const { slides, slideLeft, slideRight, nextRef } = useContext(CarouselContext);

  const slideComponents = slides.map((slide, index: number) => (
    <div className={slide.class} key={`slide-${index}`}>
      <SlideArrow direction="left" onSlide={slideLeft} show={showArrow} />
      <SlideArrow direction="right" onSlide={slideRight} ref={nextRef} show={showArrow} />
      <div className="slider-single-content">{slide.element}</div>
    </div>
  ));

  return <div className="slider-content">{slideComponents}</div>;
};

export default Slides;
