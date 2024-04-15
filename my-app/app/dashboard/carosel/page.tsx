import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import image from '../../../Images/asus-vivobook.jpg'
export function CarouselPlugin() {
//   const plugin = React.useRef(
//     Autoplay({ delay: 2000, stopOnInteraction: true })
//   )

  return (
    <Carousel
    //   plugins={[plugin.current]}
      className="w-2/3"
    //   onMouseEnter={plugin.current.stop}
    //   onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="justify-center" >
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1 bg-red-300">
              <Card>
                <CardContent className="pt-4 flex relative justify-end">
                  <img src={image.src} alt="asus"/>
                  <div className="bg-gradient-to-r absolute inset-0 from-white">
                    <p>ASUS Vivobook</p>
                    </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
