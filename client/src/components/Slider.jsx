import { Carousel } from "flowbite-react";

export function Slider({ images }) {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover indicators={false}>
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Slider image ${index + 1}`} 
            className="object-cover h-full w-full" 
          />
        ))}
      </Carousel>
    </div>
  );
}