'use client';
import { MenubarDemo } from '../dashboard/category/page';
import DisplayedItem from '../dashboard/displayeditem/page';
import BreadcrumbWithCustomSeparator from '../dashboard/breadcrumb/page';
import Filter from '../dashboard/filter/page';
import { useState } from 'react';

export default function ViewWatch() {
    const [price, setPrice] = useState<number>(-1);
    const [brands, setBrands] = useState<string[]>(['Garmin', 'Samsung', 'Apple']);
    const filterPrice = (newPrice: number, brand?: string) => {
        setPrice(newPrice);
        if (brand !== undefined) setBrands([brand]);
        else setBrands(['Garmin', 'Samsung', 'Apple']);
    };
    return (
        <div className="flex flex-col items-center">
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category="Đồng hồ" />
            <Filter category="Đồng hồ" filterPrices={filterPrice} />
            {brands.map((brand, index) => {
                return <DisplayedItem key={index} category="Đồng hồ" brand={brand} price={price} />;
            })}
        </div>
    );
}
