import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import image from '../../../Images/asus-vivobook.jpg';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLast } from 'lucide-react';
import Link from 'next/link';

export default function DisplayedItem({ category }: { category: string }) {
    return (
        <div className="lg:w-3/4 max-w-sm lg:max-w-full m-y-2 m-0 md:my-4">
            <div className=" flex justify-between items-center">
                <Label className="font-bold md:text-xl text-base">{category}</Label>
                <Button>
                    Xem thêm
                    <ChevronLast />
                </Button>
            </div>
            <Carousel>
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="pl-1 basis-1/3 lg:basis-1/5 ">
                            <div className="p-[3px] md:p-1">
                                <Card>
                                    <CardContent className="md:pt-4 p-[12px] flex flex-col md:space-y-2 space-y-1">
                                        <img src={image.src} alt="asus" />
                                        <Badge
                                            variant={'destructive'}
                                            className="md:w-20 h-4 md:h-4.5 md:text-xs text-[9px] w-16"
                                        >
                                            Giảm giá
                                        </Badge>
                                        <CardTitle className="md:text-xl text-[14px] ">ASUS Vivobook</CardTitle>
                                        <p className=" md:text-lg text-[11px] relative">
                                            14.000.000
                                            <span className="underline md:text-xs text-[8px] inline-block align-top">
                                                đ
                                            </span>
                                        </p>
                                        <div>
                                            <CardDescription className="md:text-xs text-[8px]">
                                                CPU: i5, 1240P, 1.7GHzC
                                            </CardDescription>
                                            <CardDescription className="md:text-xs text-[8px]">
                                                Card: Intel Iris XeC
                                            </CardDescription>
                                            <CardDescription className="md:text-xs text-[8px]">
                                                Ram: 16GB, SSD: 512 GB
                                            </CardDescription>
                                            <CardDescription className="md:text-xs text-[8px]">
                                                Màn hình: 15.6", Full HDC
                                            </CardDescription>
                                            <CardDescription className="md:text-xs text-[8px]">
                                                Pin: 3-cell, 41WhC
                                            </CardDescription>
                                            <CardDescription className="md:text-xs text-[8px]">
                                                Khối lượng: 1.72 kgC
                                            </CardDescription>
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
        </div>
    );
}
