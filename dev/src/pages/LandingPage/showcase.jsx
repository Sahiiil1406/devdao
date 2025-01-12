import React, { useState, useEffect } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";


export function HeroScrollDemo() {
  
  // State to manage the current image
  const [currentImage, setCurrentImage] = useState("/linear.webp");

  // Array of image URLs
  const images = ["ss1.png", "ss2.png", "ss3.png"];

  useEffect(() => {
    // Function to change the image every 5 seconds
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000); // Change image every 5 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="flex flex-col overflow-hidden mt-[-60px] relative">
      {/* Background container */}
      <div className="w-full h-full absolute top-0 left-0">
        {/* Optional: You can add styles for the background here */}
      </div>

      {/* Main content */}
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white/50 dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-white">
                Task's Based Learning
              </span>
            </h1>
          </>
        }
      >
        {/* Display the current image */}
        <img
          src={currentImage}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top w-full bg-center "
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
