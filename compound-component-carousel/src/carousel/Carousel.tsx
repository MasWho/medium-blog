import { useState, useEffect, useRef, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./styles/carousel.scss";

type CarouselProps = {
  images: ReactNode[];
  autoplay?: boolean;
  interval?: number;
  arrows?: boolean;
  arrowBorders?: boolean;
  height?: string;
}

type Slide = {
  class: string;
  element: ReactNode;
}

const initialSlides = (images: ReactNode[]): Slide[] => {
  let lessThanThree = images.length < 3;
  const slides: Slide[] = [];
  while(lessThanThree) {  
    images = images.concat(images);
    lessThanThree = images.length < 3;
  }

  for(let idx = 0; idx < images.length; idx++) {
    let slideClass = "slider-single proactivede";
    slides.push({
      class: slideClass,
      element: images[idx]
    })
  }
  return slides;
}

const Carousel = (props: CarouselProps) => {
  const {images, arrows, arrowBorders, interval, autoplay, height = '300px'} = props;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState(initialSlides.bind(null, images));
  const intervalRef = useRef<number>();
  const nextRef = useRef<HTMLDivElement>(null);

  // First render will initialise some styling
  useEffect(() => {
    slideRight();

    // Autoplay needs to use a ref or else the sliding function will have sticky states due to closure
    if(autoplay) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        nextRef.current?.click();
      }, interval);
    }

    return () => {
      clearInterval(intervalRef.current);
    }
  }, [nextRef.current]);

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

  const sliderClass = (direction: 'left' | 'right') => {
    let sliderClass = `slider-${direction}`;
    if (!arrows) {
      sliderClass = "slider-disabled";
    } else if (arrows && !arrowBorders) {
      sliderClass = `slider-${direction}-noborders`;
    }
    return sliderClass;
  };

  let content = null;
  if (slides && slides.length > 0) {
    content = (
      <div className="slider-container">
        <div className="slider-content">
          {slides.map((slide, index: number) => (
            <div className={slide.class} key={index}>
              <div className={sliderClass("left")} onClick={slideLeft}>
                <div>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
              </div>
              <div className={sliderClass("right")} onClick={slideRight} ref={nextRef}>
                <div>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>

              <div className="slider-single-content">{slide.element}</div>
            </div>
          ))}
        </div>
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
