'use client';
import Footer from '../footer/page';
import { MenubarDemo } from '../dashboard/category/page';
import DisplayedItem from '../dashboard/displayeditem/page';
import Header from '../dashboard/header/page';
import BreadcrumbWithCustomSeparator from '../dashboard/breadcrumb/page';
import { laptopData } from '../dashboard/sample-data';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function ViewCategoryBrand() {
    let listProduct = laptopData;
    const category = window.category;
    const brand = window.brand;
    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category={category} brand={brand} />
            <div className='grid grid-cols-5 lg:w-3/4 max-w-sm lg:max-w-full my-6'>
                {listProduct.map((product, index) => (
                    <div key={index} className="p-[3px] md:p-1 ">
                        <Card>
                            <CardContent className="md:pt-4 h-[290px] p-[12px] flex flex-col md:space-y-2 space-y-1">
                                <div className="w-auto flex justify-center h-[107px]">
                                    <img src={product.images[0]} className="object-cover h-full" alt="asus" />
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
                                    <span className="underline md:text-xs text-[8px] inline-block align-top">đ</span>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
