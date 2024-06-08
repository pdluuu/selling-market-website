'use client';
<<<<<<< HEAD
import { MenubarDemo } from '../dashboard/category/page';
import DisplayedItem from '../dashboard/displayeditem/page';
import BreadcrumbWithCustomSeparator from '../dashboard/breadcrumb/page';
import Filter from '../dashboard/filter/page';
=======
import { MenubarDemo } from '../../home/dashboard/category/page';
import DisplayedItem from '../../home/dashboard/displayeditem/page';
import BreadcrumbWithCustomSeparator from '../../home/dashboard/breadcrumb/page';
import Filter from '../../home/dashboard/filter/page';
>>>>>>> refs/remotes/origin/main
import { useState } from 'react';

export default function ViewTablet() {
    const [price, setPrice] = useState<number>(-1);
    const [brands, setBrands] = useState<string[]>(['Xiaomi', 'Oppo', 'Huawei', 'Samsung', 'Ipad']);
    const filterPrice = (newPrice: number, brand?: string) => {
        setPrice(newPrice);
        if (brand !== undefined) setBrands([brand]);
        else setBrands(['Xiaomi', 'Oppo', 'Huawei', 'Samsung', 'Ipad']);
    };
    return (
        <div className="flex flex-col items-center">
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category="Tablet" />
            <Filter category="Tablet" filterPrices={filterPrice} />
            {brands.map((brand, index) => {
                return <DisplayedItem key={index} category="Tablet" brand={brand} price={price} />;
            })}
        </div>
    );
}
