// Project dependencies
import { createContext } from "react";
import { CarouselProps, Slide } from "./types/Carousel";

// Styling
import "./styles/carousel.scss";
import useSlideRotation from "./hooks/useSlideRotation";

// Children components
import Title from "./components/Title";
import Paging from "./components/Paging";
import Slides from "./components/Slides";
import SlidesContainer from "./components/SlidesContainer";

type CarouselContext = {
  currentSlideIndex: number;
  slides: Slide[];
  slideRight: () => void;
  slideLeft: () => void;
  nextRef: React.RefObject<HTMLDivElement> | null;
};

const defaultContext: CarouselContext = {
  currentSlideIndex: 0,
  slides: [],
  slideRight: () => {},
  slideLeft: () => {},
  nextRef: null,
};

export const CarouselContext = createContext<CarouselContext>(defaultContext);

/**
 * Main carousel component. This component is responsible for displaying the slides and the arrows.
 * It has a state that keeps track of the current slide index.
 * It also has the ability to autoplay the slides at a specified interval.
 * @param props
 * @returns
 */
const Carousel = (props: CarouselProps) => {
  const { images, interval = 1000, autoplay, children } = props;

  if (images && images.length <= 0) {
    throw new Error("Carousel requires at least one image");
  }

  const { currentSlideIndex, slides, slideLeft, slideRight, nextRef } = useSlideRotation({
    images,
    interval,
    autoplay,
  });

  return (
    <CarouselContext.Provider value={{ slideLeft, slideRight, nextRef, slides, currentSlideIndex }}>
      {children}
    </CarouselContext.Provider>
  );
};

// Set children components to be memeber of the Carousel component
Carousel.Title = Title;
Carousel.Paging = Paging;
Carousel.Slides = Slides;
Carousel.SlidesContainer = SlidesContainer;

export default Carousel;
