import { ReactNode } from "react";
import Carousel from "./carousel/Carousel";

function App() {
  const images: ReactNode[] = [
    <img src="https://picsum.photos/800/300/?random" alt="1" />,
    <img src="https://picsum.photos/800/301/?random" alt="2" />,
    <img src="https://picsum.photos/800/302/?random" alt="3" />,
    <img src="https://picsum.photos/800/303/?random" alt="4" />,
    <img src="https://picsum.photos/800/304/?random" alt="5" />,
  ];

  return (
    <Carousel 
      images={images} 
      autoplay 
      interval={3000} 
      showArrow 
      title="Carousel" 
      showPaging 
    />
  );
}

export default App;
