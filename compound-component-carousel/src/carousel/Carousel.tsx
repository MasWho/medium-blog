import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./styles/carousel.scss";

const Carousel = (props: any) => {
  const [slideTotal, setSlideTotal] = useState(0);
  const [slideCurrent, setSlideCurrent] = useState(-1);
  const [slides, setSlides] = useState([]);
  const [height, setHeight] = useState("0px");
  const intervalRef = useRef<any>(null);
  const nextRef = useRef<any>();

  useEffect(() => {
    const locSlides: any = [];
    props.slides.forEach((slide: any) => {
      const slideobject = {
        class: "slider-single proactivede",
        element: slide,
      };
      locSlides.push(slideobject);
    });
    if (props.slides.length === 2) {
      props.slides.forEach((slide: any) => {
        const slideobject = {
          class: "slider-single proactivede",
          element: slide,
        };
        locSlides.push(slideobject);
      });
    }
    setSlides(locSlides);
    setSlideTotal(locSlides.length - 1);
    setSlideCurrent(-1);
    if (slideCurrent === -1) {
      setTimeout(() => {
        nextRef.current.click();
        if (props.autoplay) {
          intervalRef.current = setTimeout(() => {
            nextRef.current.click();
          }, props.interval);
        }
      }, 500);
    }
  }, [props.slides]);

  useEffect(() => {
    if (slideCurrent === -1) {
      setTimeout(() => {
        //slideRight();
      }, 500);
    }
  }, [slides, slideCurrent]);

  const slideRight = () => {
    let preactiveSlide: any;
    let proactiveSlide: any;
    let slideCurrentLoc = slideCurrent;

    const activeClass = "slider-single active";
    const slide: any = [...slides];
    if (slideTotal > 1) {
      if (slideCurrentLoc < slideTotal) {
        slideCurrentLoc++;
      } else {
        slideCurrentLoc = 0;
      }
      if (slideCurrentLoc > 0) {
        preactiveSlide = slide[slideCurrentLoc - 1];
      } else {
        preactiveSlide = slide[slideTotal];
      }
      const activeSlide: any = slide[slideCurrentLoc];
      if (slideCurrentLoc < slideTotal) {
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
      setSlideCurrent(slideCurrentLoc);

      if (document.getElementsByClassName("slider-single active").length > 0) {
        setTimeout(() => {
          if (document.getElementsByClassName("slider-single active").length > 0) {
            const height = document.getElementsByClassName("slider-single active")[0].clientHeight;
            setHeight(`${height}px`);
          }
        }, 500);
      }
      props.onSlideChange(slideCurrentLoc);
      if (props.autoplay) {
        clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(() => {
          nextRef.current.click();
        }, props.interval);
      }
    } else if (slide[0] && slide[0].class !== activeClass) {
      slide[0].class = activeClass;
      setSlides(slide);
      setSlideCurrent(0);
    }
  };

  const slideLeft = () => {
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
      props.onSlideChange(slideCurrentLoc);
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
    if (!props.arrows) {
      sliderClass = "slider-disabled";
    } else if (props.arrows && !props.arrowBorders) {
      sliderClass = `slider-${direction}-noborders`;
    }
    return sliderClass;
  };

  return (
    <div className="react-3d-carousel" style={{ height }}>
      {slides && slides.length > 0 && (
        <div className="slider-container">
          <div className="slider-content">
            {slides.map((slider: any, index) => (
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
      )}
    </div>
  );
};

export default Carousel;
