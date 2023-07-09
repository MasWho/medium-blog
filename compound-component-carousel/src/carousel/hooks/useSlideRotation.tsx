import { ReactNode, useEffect, useRef, useState } from "react";
import { Slide } from "../types/Carousel";

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
 * This is the hook that is responsible for sliding the carousel.
 * Consists of the state that keeps track of the current slide index, and the slides state that keeps track of the slides.
 * @param args 
 * @returns 
 */
const useSlideRotation = (args: {autoplay?: boolean, interval: number, images: ReactNode[]}) => {
  const { interval = 1000, autoplay, images } = args;
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

  return {
    slideLeft,
    slideRight,
    nextRef,
    slides,
    intervalRef,
    currentSlideIndex
  };
};

export default useSlideRotation;