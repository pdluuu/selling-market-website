'use client';
import Footer from '../footer/page';
import { MenubarDemo } from '../dashboard/category/page';
import DisplayedItem from '../dashboard/displayeditem/page';
import Header from '../dashboard/header/page';
import BreadcrumbWithCustomSeparator from '../dashboard/breadcrumb/page';
import Filter from '../dashboard/filter/page';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ViewLaptop() {
    const [price, setPrice] = useState<number>(-1);
    const [brands, setBrands] = useState<string[]>(['Msi', 'Hp', 'Acer', 'Macbook', 'Dell', 'Asus']);
    const filterPrice = (newPrice: number, brand?: string) => {
        setPrice(newPrice);
        if (brand!==undefined) setBrands([brand]);
        else setBrands(['Msi', 'Hp', 'Acer', 'Macbook', 'Dell', 'Asus']);
    };
    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category="Laptop" />
            <Filter category="Máy tính" filterPrices={filterPrice} />
            
            {brands.map((brand, index) => {
                return <DisplayedItem key={index} category="Laptop" brand={brand} price={price} />;
            })}
            <Footer />
        </div>
    );
}
