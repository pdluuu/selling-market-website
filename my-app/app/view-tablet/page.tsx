'use client'
import Footer from '../footer/page';
import { MenubarDemo } from '../dashboard/category/page';
import DisplayedItem from '../dashboard/displayeditem/page';
import Header from '../dashboard/header/page';
import BreadcrumbWithCustomSeparator from '../dashboard/breadcrumb/page';
import Filter from '../dashboard/filter/page';
import { useState } from 'react';

export default function Dashboard() {
    const [price, setPrice] = useState<number>(-1);
    const [brands, setBrands] = useState<string[]>(['Xiaomi', 'Oppo', 'Huawei', 'Samsung', 'Ipad']);
    const filterPrice = (newPrice: number, brand?: string) => {
        setPrice(newPrice);
        if (brand!==undefined) setBrands([brand]);
        else setBrands(['Xiaomi', 'Oppo', 'Huawei', 'Samsung', 'Ipad']);
    };
    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category="Tablet" />
            <Filter category="Tablet" filterPrices={filterPrice} />
            {brands.map((brand, index) => {
                return <DisplayedItem key={index} category="Tablet" brand={brand} price={price} />;
            })}
            <Footer />
        </div>
    );
}
