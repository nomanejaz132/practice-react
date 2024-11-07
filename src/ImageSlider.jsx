import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1729433321272-9243b22c5f6e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1729273793467-7b40e05d1bbd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1729582017869-a0c84b5c91b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8',
];

function ImageSlider() {
  const [count, setCount] = useState(0);
  const handleNext = () =>
    setCount((prevIndex) => (count === images.length - 1 ? 0 : prevIndex + 1));

  const handlePrevious = () =>
    setCount((prevIndex) => (count === 0 ? images.length - 1 : prevIndex - 1));

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col max-w-[620px] gap-5">
        <div className="flex items-center gap-5">
          {images.map((image, index) => {
            return (
              count === index && (
                <img
                  key={index}
                  src={image}
                  alt="name"
                  className="w-[37.5rem] h-[25rem] aspect-video block rounded-2xl shadow-xl"
                />
              )
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={handlePrevious} className="shadow-md">
            <ChevronLeft />
          </button>
          <button onClick={handleNext} className="shadow-md">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
