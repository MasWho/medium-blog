import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

type SliderArrowProps = { direction: "left" | "right"; onSlide: VoidFunction; show: boolean };

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

export default SliderArrow;