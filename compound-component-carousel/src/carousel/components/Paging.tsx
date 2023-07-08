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

export default Paging;