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
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    let categoryLink = '';
    switch (category) {
        case 'Điện thoại':
            categoryLink = '/home/view-smartphone';
            break;
        case 'Máy tính':
<<<<<<< HEAD
            categoryLink = '/home/view-laptop';
=======
            categoryLink = './view-laptop';
>>>>>>> refs/remotes/origin/main
            break;
        case 'Đồng hồ':
            categoryLink = '/home/view-watch';
            break;
        case 'Tablet':
            categoryLink = '/home/view-tablet';
            break;
        case 'Phụ kiện':
            categoryLink = '/home/view-accessory';
            break;
    }
    const router = useRouter();
    const handleClick = (brand: string) => {
<<<<<<< HEAD
        const url = `/home/view-category-brand`;
        localStorage.setItem('category', category);
        localStorage.setItem('brand', brand);
=======
        const url = `/view-category-brand`;
        localStorage.setItem("category",category);
        localStorage.setItem("brand",brand);
>>>>>>> refs/remotes/origin/main
        router.push(url);
    };
    return (
        <MenubarMenu open={openDropdown} onOpenChange={() => setOpenDropdown(false)}>
<<<<<<< HEAD
            <MenubarTrigger
                onClick={() => router.push(categoryLink)}
                onMouseEnter={() => setOpenDropdown(true)}
                className="lg:w-64 lg:text-base text-xs hover:bg-accent"
            >
                {icon}
                {category}
            </MenubarTrigger>

=======
            
                <MenubarTrigger
                    onClick={() => router.push(categoryLink)}
                    onMouseEnter={() => setOpenDropdown(true)}
                    className="lg:w-64 lg:text-base text-xs hover:bg-accent"
                >
                    {icon}
                    {category}
                </MenubarTrigger>
           
>>>>>>> refs/remotes/origin/main
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
