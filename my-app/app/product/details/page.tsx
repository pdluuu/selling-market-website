'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { FC, useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import tag from '../../../Images/tag3.png';
import { BellRing, CircleDollarSign, Minus, Plus } from 'lucide-react';
import { Item } from '@radix-ui/react-dropdown-menu';
interface IItem {
    _id: string;
    name: string;
    discount: number;
    price: number;
    brand: string;
    version: any[];
    category: string;
    images: string[];
    items: string[];
}

export default function Page({ item }: { item: IItem }) {
    console.log(item);
    // const [item, setItem] = useState<IItem>({
    //     name: 'Iphone 14',
    //     price: 1000,
    //     discount: 40,

    //     images: [
    //         'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQdVfDUaINyZJbqFIqo4aWQNo9i7M36i2z-4pxEqyLj24vTJXRCcakk_EMW7N5wMaeznQ2CosAFhzsqgifrV0iNrLP7XEz4dYnd5AMfkqA&usqp=CAE',

    //         'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTxmedas04p5zvAFFNgKcMmXyaaNdL0DsPZonMIs4G-Ybtj0r8fHtUjlch2gXje4dwlpbUI2zMwmDDRQmmzCS2_9Afph_gI-0FNp4QwQy4RLp2ewyjKQ9or&usqp=CAE',
    //         'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSB4nuv1UmJDp-PuTMFyZ0Ofa1m5Nxs4EEiEYRC3Whu21kPDmZ5QVKTCEUb5sWCjmEHElWKFpvvasXyDeBmL5i1y67FoS3Lw19At63va-o&usqp=CAE',
    //     ],
    //     versions: [
    //         {
    //             color: 'black',
    //             memory: '16GB',
    //             price: 1000,
    //         },
    //         {
    //             color: 'black',
    //             memory: '32GB',
    //             price: 2000,
    //         },
    //         {
    //             color: 'white',
    //             memory: '32GB',
    //             price: 2990,
    //         },
    //         {
    //             color: 'Purple',
    //             memory: '32GB',
    //             price: 2090,
    //         },
    //         {
    //             color: 'Purple',
    //             memory: '16GB',
    //             price: 1090,
    //         },
    //         {
    //             color: 'Blue',
    //             memory: '32GB',
    //             price: 2090,
    //         },
    //     ],
    // });

    const [price, setPrice] = useState<number>();
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        setPrice(item?.price);
    }, [item]);
    // console.log(item);
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="p-[3px] md:p-1">
                        <Card className="">
                            {item?.discount === 0 ? (
                                <div></div>
                            ) : (
                                <div className="absolute z-10 -ml-[30px] -mt-10 h-auto w-auto ">
                                    <img src={tag.src} width={120} className="transform scale-y-[-1]" />
                                    <p className=" absolute ml-8 -mt-[75px] text-white font-bold text-xs">
                                        Giảm {item?.discount}%
                                    </p>
                                </div>
                            )}
                            <CardContent className="md:pt-4 h-[290px] shadow-md p-[12px]  flex flex-col md:space-y-2 space-y-1">
                                <div className="w-auto z-0 flex justify-center h-[107px]">
                                    <img
                                        src={item?.images[0]}
                                        className="object-cover h-full hover:scale-110 transition duration-500"
                                        alt="asus"
                                    />
                                </div>
                                <CardTitle className="text-[18px]">{item?.name}</CardTitle>
                                <p className="text-[16px] relative">
                                    {item?.price}
                                    <span className="underline md:text-xs text-[8px] inline-block align-top">đ</span>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </DialogTrigger>
                <DialogContent className=" max-w-6xl">
                    {/* <DialogHeader>
                        <DialogTitle>Product : {item.name}</DialogTitle>
                    </DialogHeader> */}
                    <div className="flex gap-8">
                        <Carousel className=" flex items-center gap-8">
                            <CarouselPrevious className=" relative " />
                            <CarouselContent className="w-[400px] ">
                                {item?.images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <Card className="w-[350px] ">
                                            <CardContent className="flex aspect-square items-center justify-center p-3 ">
                                                <Image
                                                    alt="Picture of the author"
                                                    src={image}
                                                    width={600}
                                                    height={600}
                                                    className="rounded-lg"
                                                ></Image>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext className=" relative" />
                        </Carousel>
                        <div className="">
                            <DialogTitle>Sản phẩm : {item?.name}</DialogTitle>
                            <div className=" grid grid-cols-3 gap-3 mt-4 mb-4">
                                {item?.version.map((version, index) => (
                                    <Button
                                        variant={'ghost'}
                                        className=" border"
                                        key={index}
                                        onClick={() => setPrice(version.price)}
                                    >
                                        {version.memory} / {version.color}
                                    </Button>
                                ))}
                            </div>
                            <Card>
                                <CardHeader className=" space-y-3">
                                    <div className="flex items-center">
                                        <CircleDollarSign />
                                        <div className="ml-4">
                                            <p className="text-sm font-medium leading-none">Tổng tiền:</p>
                                            <div className="flex items-baseline">
                                                <p className="text-sm text-muted-foreground line-through">
                                                    {item?.price + 400000} VND
                                                </p>

                                                <p className="ml-3 text-lg ">
                                                    {price} VND {item?.discount !== 0 && `( -${item?.discount}%)`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='h-[1px] border'></div>
                                    <div className='ml-10'>
                                        <p className="text-sm font-medium leading-none">Số lượng:</p>
                                        <div className=" mt-2 h-8 flex border items-center w-24 justify-between">
                                            <Button className='p-1 rounded-none w-8 h-8 border' variant={"outline"}
                                                disabled={quantity === 1}
                                                onClick={() => {
                                                    setQuantity(quantity - 1);
                                                }}
                                            >
                                                <Minus size={10}/>
                                            </Button>
                                            <p >{quantity}</p>
                                            <Button className='p-1 rounded-none w-8 h-8 border' variant={"outline"}
                                                onClick={() => {
                                                    setQuantity(quantity + 1);
                                                }}
                                            >
                                                <Plus size={10} />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex gap-3">
                                    <Button type="submit" className=" flex-1">
                                        Mua ngay
                                    </Button>
                                    <Button type="submit" className="flex-1">
                                        Thêm vào giỏ hàng 
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    {/* <DialogFooter>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        </>
    );
}
