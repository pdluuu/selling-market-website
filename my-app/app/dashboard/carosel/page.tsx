import * as React from 'react';
import { laptopData, phoneData } from '../sample-data';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
export function CarouselPlugin() {
    //   const plugin = React.useRef(
    //     Autoplay({ delay: 2000, stopOnInteraction: true })
    //   )
    return (
        <Carousel
            //   plugins={[plugin.current]}
            className="w-2/3 mt-6 mb-6 "
            //   onMouseEnter={plugin.current.stop}
            //   onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {laptopData.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="pt-4  flex relative justify-center">
                                    <img src={image.images[0]} className="w-2/3" alt="asus" />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='border-none'/>
            <CarouselNext className='border-none'/>
        </Carousel>
    );
}
