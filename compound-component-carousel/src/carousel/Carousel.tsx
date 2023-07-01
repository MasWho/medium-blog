// Project dependencies
import { useState, useEffect, useRef, ReactNode, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Styling
import "./styles/carousel.scss";

// Types
type CarouselProps = {
  images: ReactNode[];
  autoplay?: boolean;
  interval?: number;
  height?: string;
  showPaging?: boolean;
  showArrow?: boolean;
  title?: string;
};

type Slide = {
  class: string;
  element: ReactNode;
};

type SliderArrowProps = { direction: "left" | "right"; onSlide: VoidFunction; show: boolean };

type SingleSlideProps = { slide: Slide; onSlideLeft: VoidFunction; onSlideRight: VoidFunction; showArrow?: boolean };

// Components

/**
 * This component is used to display the arrows that allow the user to move back and forth between slides in the slider.
 */
const SliderArrow = forwardRef<HTMLDivElement, SliderArrowProps>((props, ref) => {
  const { direction, onSlide, show } = props;
  return (
    <div className={`slider-${direction}`} onClick={onSlide} ref={ref} style={{ display: show ? "" : "none" }}>
      <div>
        <FontAwesomeIcon size="lg" icon={direction === "left" ? faArrowLeft : faArrowRight} />
      </div>
    </div>
  );
});


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

/**
 * Component that displays the current slide index and the total number of slides.
 */
const Paging = (props: { numSlides: number; currentSlideIndex: number }) => {
  const { numSlides, currentSlideIndex } = props;
  const pagingElements = Array.from({ length: numSlides }, (_, idx) => {
    const isActive = idx === currentSlideIndex;
    return <span className={`slide-paging-element ${isActive ? "active" : ""}`} />;
  });

  return <div className="slide-paging">{pagingElements}</div>;
};

/**
 * Component that displays the title of the slide.
 */
const Title = (props: { text: string }) => {
  const { text } = props;
  return <p className="slide-title">{text}</p>;
};

// Main component

/**
 * Initialise the slides state for the carousel.
 * If there are less than 3 images, duplicate the images until there are at least 3 images.
 * @param images 
 * @returns 
 */
const initialSlides = (images: ReactNode[]): Slide[] => {
  let lessThanThree = images.length < 3;
  const slides: Slide[] = [];
  while (lessThanThree) {
    images = images.concat(images);
    lessThanThree = images.length < 3;
  }

  for (let idx = 0; idx < images.length; idx++) {
    let slideClass = "slider-single proactivede";
    slides.push({
      class: slideClass,
      element: images[idx],
    });
  }
  return slides;
};

/**
 * Main carousel component. This component is responsible for displaying the slides and the arrows.
 * It has a state that keeps track of the current slide index.
 * It also has the ability to autoplay the slides at a specified interval.
 * @param props 
 * @returns 
 */
const Carousel = (props: CarouselProps) => {
  const { images, interval, autoplay, height = "300px", showArrow, title, showPaging } = props;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState(initialSlides.bind(null, images));
  const intervalRef = useRef<number>();
  const nextRef = useRef<HTMLDivElement>(null);

  // First render will initialise some styling
  useEffect(() => {
    slideRight();

    // Autoplay needs to use a ref or else the sliding function will have sticky states due to closure
    if (autoplay) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        nextRef.current?.click();
      }, interval);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [nextRef.current]);

  /**
   * This function is responsible for sliding the carousel to the right. It is called when the user clicks the right arrow button on the carousel, 
   * or when the carousel is set to autoplay. The class of the previous slide is set to "slider-single preactive", the class of the active slide is set to activeClass, 
   * and the class of the next slide is set to "slider-single proactive". The slides array and currentSlideIndex state variables are updated, and if autoplay is enabled, 
   * the intervalRef timer is cleared and a new timer is set.
   */
  const slideRight = () => {
    const activeClass = "slider-single active";
    const updatedSlides = [...slides];
    const numSlides = updatedSlides.length;
    const lastSlideIndex = numSlides - 1;
    let nextSlideIndex = currentSlideIndex + 1;
    if (currentSlideIndex === lastSlideIndex) {
      nextSlideIndex = 0;
    }

    const previousSlide = updatedSlides[currentSlideIndex];
    const activeSlide = updatedSlides[nextSlideIndex];
    // If next slide index overflows, set to first slide
    const nextSlide = updatedSlides[nextSlideIndex + 1 > lastSlideIndex ? 0 : nextSlideIndex + 1];

    updatedSlides.forEach((slide) => {
      if (slide.class.split(" ").includes("preactivede")) {
        slide.class = "slider-single proactivede";
      }
      if (slide.class.split(" ").includes("preactive")) {
        slide.class = "slider-single preactivede";
      }
    });

    previousSlide.class = "slider-single preactive";
    activeSlide.class = activeClass;
    nextSlide.class = "slider-single proactive";

    setSlides(updatedSlides);
    setCurrentSlideIndex(nextSlideIndex);

    if (autoplay) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        nextRef.current?.click();
      }, interval);
    }
  };

  /**
   * The logic is very much the same as the slideRight function, except that the slide classes are different and specified in reverse order.
   */
  const slideLeft = () => {
    const numSlides = slides.length;
    let nextSlideIndex = currentSlideIndex - 1;
    const lastSlideIndex = numSlides - 1;
    const updatedSlides = [...slides];

    if (currentSlideIndex === 0) {
      nextSlideIndex = lastSlideIndex;
    }

    // If prev slide index overflows, set to last slide
    const previousSlide = updatedSlides[nextSlideIndex - 1 < 0 ? lastSlideIndex : nextSlideIndex - 1];
    const activeSlide = updatedSlides[nextSlideIndex];
    const nextSlide = updatedSlides[currentSlideIndex];

    slides.forEach((slide) => {
      if (slide.class.split(" ").includes("proactivede")) {
        slide.class = "slider-single preactivede";
      }
      if (slide.class.split(" ").includes("proactive")) {
        slide.class = "slider-single proactivede";
      }
    });

    previousSlide.class = "slider-single preactive";
    activeSlide.class = "slider-single active";
    nextSlide.class = "slider-single proactive";

    setSlides(updatedSlides);
    setCurrentSlideIndex(nextSlideIndex);
  };

  let content = null;
  const hasSlides = slides && slides.length > 0;
  if (hasSlides) {
    const slideComponents = slides.map((slide, index: number) => (
      <SingleSlide
        slide={slide}
        onSlideLeft={slideLeft}
        onSlideRight={slideRight}
        key={index}
        ref={nextRef}
        showArrow={showArrow}
      />
    ));
    content = (
      <div className="slider-container">
        {title && <Title text={title} />}
        <div className="slider-content">{slideComponents}</div>
        {showPaging && <Paging numSlides={slides.length} currentSlideIndex={currentSlideIndex} />}
      </div>
    );
  }

  return (
    <div className="react-3d-carousel" style={{ height }}>
      {content}
    </div>
  );
};

export default Carousel;
