import { useContext } from "react";
import { CarouselContext } from "../Carousel";

type PagingProps = {
  elementStyle?: string;
};

/**
 * Component that displays the current slide index and the total number of slides.
 */
const Paging = (props: PagingProps) => {
  const { elementStyle } = props;
  const {slides, currentSlideIndex} = useContext(CarouselContext);
  const pagingElements = Array.from({ length: slides.length }, (_, idx) => {
    const isActive = idx === currentSlideIndex;
    return <span className={`${elementStyle ? elementStyle : 'slide-paging-element'} ${isActive ? "active" : ""}`} />;
  });

  return <div className="slide-paging">{pagingElements}</div>;
};

export default Paging;