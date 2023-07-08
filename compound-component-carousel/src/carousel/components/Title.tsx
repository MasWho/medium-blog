/**
 * Component that displays the title of the slide.
 */
const Title = (props: { text: string }) => {
  const { text } = props;
  return <p className="slide-title">{text}</p>;
};

export default Title;