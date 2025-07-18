import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext, 
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  return (
    <div className="my-20">
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
              <Button variant="outline" className="rounded-full">{category}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
         <CarouselNext/>

      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
