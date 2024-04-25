import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import image from '../../../Images/asus-vivobook.jpg';
import { ChevronRight } from 'lucide-react';
export function CarouselPlugin() {
    //   const plugin = React.useRef(
    //     Autoplay({ delay: 2000, stopOnInteraction: true })
    //   )

    return (
        <Carousel
            //   plugins={[plugin.current]}
            className="lg:w-2/3 lg:mt-6 lg:mb-6 mt-3 mb-3 w-5/6"
            //   onMouseEnter={plugin.current.stop}
            //   onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="justify-center">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="pt-4 flex relative justify-center">
                                    <img src={image.src} alt="asus" />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className=' border-none'/>
            <CarouselNext className=' border-none'/>
              
        </Carousel>
    );
}
