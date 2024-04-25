'use client';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function NewMenubarMenu({
    icon,
    category,
    brands,
}: {
    icon: JSX.Element;
    category: string;
    brands: string[];
}) {
    const [openDropdown, setOpenDropdown] = useState(false);
    let categoryLink = '';
    switch (category) {
        case 'Điện thoại':
            categoryLink = './view-smartphone';
            break;
        case 'Laptop':
            categoryLink = './view-laptop';
            break;
        case 'Đồng hồ':
            categoryLink = './view-watch';
            break;
        case 'Tablet':
            categoryLink = './view-tablet';
            break;
        case 'Phụ kiện':
            categoryLink = './view-accessory';
            break;
    }
    const router = useRouter();
    const handleClick = (brand: string) => {
        const url = `/view-category-brand`;
        window.category = category;
        window.brand = brand;
        router.push(url);
    };
    return (
        <MenubarMenu open={openDropdown} onOpenChange={() => setOpenDropdown(false)}>
            <Link href={categoryLink}>
                <MenubarTrigger
                    onMouseEnter={() => setOpenDropdown(true)}
                    className="lg:w-48 lg:text-base text-xs hover:bg-accent"
                >
                    {icon}
                    {category}
                </MenubarTrigger>
            </Link>
            <MenubarContent
                onMouseLeave={() => {
                    setOpenDropdown(false);
                }}
                className="w-32 min-w-10"
            >
                {brands.map((brand, index) => (
                    <MenubarItem onClick={() => handleClick(brand)} key={index}>
                        {brand}
                    </MenubarItem>
                ))}
            </MenubarContent>
        </MenubarMenu>
    );
}
