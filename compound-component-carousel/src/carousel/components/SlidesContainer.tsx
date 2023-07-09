import { SlidesContainerProps } from "../types/Carousel";

/**
 * This is the container compoennt that holds the slides.
 * @param props 
 * @returns 
 */
const SlidesContainer = (props: SlidesContainerProps) => {
  const { children, height = "300px" } = props;
  return (
    <div className="react-3d-carousel" style={{ height }}>
      <div className="slider-container">{children}</div>
    </div>
  );
};

export default SlidesContainer;
