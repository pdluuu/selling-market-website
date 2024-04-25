'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import image from '../../../Images/asus-vivobook.jpg';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLast, Router } from 'lucide-react';
import Link from 'next/link';
import { laptopData } from '../sample-data';
import { useRouter } from 'next/navigation';

declare global {
    interface Window {
        category: string;
        brand: string;
        reverse?: boolean;
    }
}

export default function DisplayedItem({
    brand,
    category,
    price,
    reverse,
}: {
    brand?: string;
    category: string;
    price?: number;
    reverse?: boolean;
}) {
    let listProduct: {
        _id: string;
        name: string;
        discount: number;
        price: number;
        brand: string;
        version: string[];
        category: string;
        images: string[];
        items: string[];
    }[] = [];
    listProduct = laptopData;
    const router = useRouter();

    const handleViewMore = () => {
        if (reverse === true) {
            const url = `/view-category-brand`;
            if (category) window.category = category;
            if (brand) window.brand = brand;
            window.reverse = reverse;
            console.log(123);
            router.push(url);
        } else {
            if (!brand) {
                switch (category) {
                    case 'Điện thoại':
                        router.push('/view-smartphone');
                        break;
                    case 'Laptop':
                        router.push('/view-laptop');
                        break;
                    case 'Đồng hồ':
                        router.push('/view-watch');
                        break;
                    case 'Tablet':
                        router.push('/view-tablet');
                        break;
                    case 'Phụ kiện':
                        router.push('/view-accessory');
                        break;
                }
            } else {
                const url = `/view-category-brand`;
                window.category = category;
                window.brand = brand;
                router.push(url);
            }
        }
    };
    return (
        <div className="lg:w-3/4 max-w-sm lg:max-w-full  m-y-2 m-0 md:my-4">
            <div className=" flex justify-between items-center">
                <Label className="font-bold md:text-xl text-base">
                    {reverse === true ? category : brand || category}
                </Label>
                <Button onClick={handleViewMore}>
                    Xem thêm
                    <ChevronLast />
                </Button>
            </div>
            <Carousel className="">
                <CarouselContent className="-ml-1 ">
                    {listProduct.map((product, index) => (
                        <CarouselItem key={index} className="pl-1  basis-1/3 lg:basis-1/5 ">
                            <div className="p-[3px] md:p-1  ">
                                <Card className="">
                                    <CardContent className="md:pt-4 h-[290px] shadow-md p-[12px]  flex flex-col md:space-y-2 space-y-1">
                                        <div className="w-auto  flex justify-center h-[107px]">
                                            <img
                                                src={product.images[0]}
                                                className="object-cover h-full hover:scale-110 transition duration-500"
                                                alt="asus"
                                            />
                                        </div>
                                        {product.discount && (
                                            <Badge
                                                variant={'destructive'}
                                                className="md:w-20 h-4 md:h-4.5 md:text-xs text-[9px] w-16"
                                            >
                                                Giảm giá
                                            </Badge>
                                        )}
                                        <CardTitle className="text-[18px]">{product.name}</CardTitle>
                                        <CardDescription>{product.discount}</CardDescription>
                                        <p className="text-[16px] relative">
                                            {product.price}
                                            <span className="underline md:text-xs text-[8px] inline-block align-top">
                                                đ
                                            </span>
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className=" border-none" />
                <CarouselNext className=" border-none" />
            </Carousel>
        </div>
    );
}
