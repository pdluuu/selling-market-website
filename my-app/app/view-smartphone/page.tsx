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
    const [brands, setBrands] = useState<string[]>(['Oppo', 'Samsung', 'Huawei', 'Xiaomi', 'Apple', 'Nokia']);
    const filterPrice = (newPrice: number, brand?: string) => {
        setPrice(newPrice);
        if (brand!==undefined) setBrands([brand]);
        else setBrands(['Oppo', 'Samsung', 'Huawei', 'Xiaomi', 'Apple', 'Nokia']);
    };
    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category="Điện thoại" />
            <Filter category="Điện thoại" filterPrices={filterPrice} />
            {brands.map((brand, index) => {
                return <DisplayedItem key={index} category="Điện thoại" brand={brand} price={price} />;
            })}
            <Footer />
        </div>
    );
}
