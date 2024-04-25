'use client'
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

export default function ViewBrand() {
    const category = window.category;
    const brand = window.brand;

    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator brand={brand} reverse={true} />
            <DisplayedItem brand={brand} category="Laptop" reverse={true} />
            <DisplayedItem brand={brand} category="Tablet" reverse={true} />
            <DisplayedItem brand={brand} category="Điện thoại" reverse={true} />
            <DisplayedItem brand={brand} category="Đồng hồ" reverse={true} />
            <DisplayedItem brand={brand} category="Phụ kiện" reverse={true} />
            <Footer />
        </div>
    );
}
