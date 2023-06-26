import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./styles/carousel.scss";

type CarouselProps = {
  inputSlides: React.ReactNode[];
  autoplay?: boolean;
  interval?: number;
  onSlideChange?: (currSlideIndex: number) => void;
  arrows?: boolean;
  arrowBorders?: boolean;
}

const initialSlides = (slides: any) => {
  const locSlides: any = [];
  slides.forEach((slide: any) => {
    const slideobject = {
      class: "slider-single proactivede",
      element: slide,
    };
    locSlides.push(slideobject);
  });
  if (slides.length === 2) {
    slides.forEach((slide: any) => {
      const slideobject = {
        class: "slider-single proactivede",
        element: slide,
      };
      locSlides.push(slideobject);
    });
  }
  return locSlides;
}

const Carousel = (props: CarouselProps) => {
  const {inputSlides, arrows, arrowBorders, interval, autoplay, onSlideChange} = props;
  const [slideCurrent, setSlideCurrent] = useState(-1);
  const [slides, setSlides] = useState(initialSlides.bind(null, inputSlides));
  const [height, setHeight] = useState("0px");
  const intervalRef = useRef<any>(null);
  const nextRef = useRef<any>();

  // First render will initialise some styling
  useEffect(() => {
    if (slideCurrent === -1) {
      setTimeout(() => {
        nextRef.current.click();
        if (autoplay) {
          intervalRef.current = setTimeout(() => {
            nextRef.current.click();
          }, interval);
        }
      }, 500);
    }
  }, [slideCurrent]);

  const slideRight = () => {
    const activeClass = "slider-single active";
    const slide: any = [...slides];
    const lastSlideIndex = slides.length - 1;
    if (lastSlideIndex > 1) {
      let slideCurrentLoc = slideCurrent;
      if(slideCurrentLoc === -1) {
        slideCurrentLoc = 0;
      }
      slideCurrentLoc = slideCurrentLoc % lastSlideIndex;
      const activeSlide: any = slide[slideCurrentLoc];
      let preactiveSlide: any;
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1];
      } else {
        preactiveSlide = slide[lastSlideIndex];
      }

      let proactiveSlide: any;
      // const activeSlide: any = slide[slideCurrentLoc];
      if (slideCurrentLoc < lastSlideIndex) {
        proactiveSlide = slide[slideCurrentLoc + 1];
      } else {
        proactiveSlide = slide[0];
      }

      slide.forEach((slid: any) => {
        if (slid.class.includes("preactivede")) {
          slid.class = "slider-single proactivede";
        }
        if (slid.class.includes("preactive")) {
          slid.class = "slider-single preactivede";
        }
      });

      preactiveSlide.class = "slider-single preactive";
      activeSlide.class = activeClass;
      proactiveSlide.class = "slider-single proactive";
      setSlides(slide);
      setSlideCurrent(slideCurrentLoc + 1);

      if (document.getElementsByClassName("slider-single active").length > 0) {
        setTimeout(() => {
          if (document.getElementsByClassName("slider-single active").length > 0) {
            const height = document.getElementsByClassName("slider-single active")[0].clientHeight;
            setHeight(`${height}px`);
          }
        }, 500);
      }
      if(onSlideChange) {
        onSlideChange(slideCurrentLoc);
      }
      if (autoplay) {
        clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(() => {
          nextRef.current.click();
        }, interval);
      }
    } else if (slide[0] && slide[0].class !== activeClass) {
      slide[0].class = activeClass;
      setSlides(slide);
      setSlideCurrent(0);
    }
  };

  const slideLeft = () => {
    const slideTotal = slides.length - 1;
    if (slideTotal > 1) {
      let preactiveSlide: any;
      let proactiveSlide: any;
      let slideCurrentLoc = slideCurrent;
      const slide: any = [...slides];
      if (slideCurrentLoc > 0) {
        slideCurrentLoc--;
      } else {
        slideCurrentLoc = slideTotal;
      }

      if (slideCurrentLoc < slideTotal) {
        proactiveSlide = slide[slideCurrentLoc + 1];
      } else {
        proactiveSlide = slide[0];
      }
      let activeSlide = slide[slideCurrentLoc];
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1];
      } else {
        preactiveSlide = slide[slideTotal];
      }
      slide.forEach((slid: any) => {
        if (slid.class.includes("proactivede")) {
          slid.class = "slider-single preactivede";
        }
        if (slid.class.includes("proactive")) {
          slid.class = "slider-single proactivede";
        }
      });
      preactiveSlide.class = "slider-single preactive";
      activeSlide.class = "slider-single active";
      proactiveSlide.class = "slider-single proactive";
      setSlides(slide);
      setSlideCurrent(slideCurrentLoc);
      if(onSlideChange) {
        onSlideChange(slideCurrentLoc);
      }
      if (document.getElementsByClassName("slider-single active").length > 0) {
        setTimeout(() => {
          if (document.getElementsByClassName("slider-single active").length > 0) {
            const height = document.getElementsByClassName("slider-single active")[0].clientHeight;
            setHeight(`${height}px`);
          }
        }, 500);
      }
    }
  };

  const sliderClass = (direction: any) => {
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
          {slides.map((slider: any, index: number) => (
            <div className={slider.class} key={index}>
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

              <div className="slider-single-content">{slider.element}</div>
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
