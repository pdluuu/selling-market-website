import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import image from '../../../Images/asus-vivobook.jpg';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLast } from 'lucide-react';
export default function DisplayedItem() {
    return (
        <div className="w-3/4">
            <div className=' flex justify-between items-center'>
                <Label>Laptop</Label>
                <Button className='bg-transparent text-red-400'>
                    Xem thêm
                    <ChevronLast/>
                </Button>
                </div>
            <Carousel
                opts={{
                    align: 'start',
                }}
            >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="pt-4 flex flex-col">
                                        <img src={image.src} alt="asus" />
                                        <Badge variant={'destructive'}>Giảm giá</Badge>
                                        <CardTitle>ASUS Vivobook</CardTitle>
                                        <p className="text-red-400 relative">
                                            14.000.000
                                            <span className="underline text-xs inline-block align-top">đ</span>
                                        </p>
                                        <CardDescription>CPU: i5, 1240P, 1.7GHzC</CardDescription>
                                        <CardDescription>Card: Intel Iris XeC</CardDescription>
                                        <CardDescription>Ram: 16GB, SSD: 512 GB</CardDescription>
                                        <CardDescription>Màn hình: 15.6", Full HDC</CardDescription>
                                        <CardDescription>Pin: 3-cell, 41WhC</CardDescription>
                                        <CardDescription>Khối lượng: 1.72 kgC</CardDescription>
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
