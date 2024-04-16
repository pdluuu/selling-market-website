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
import { Headset, Laptop, Smartphone, Tablet, Watch, WatchIcon } from 'lucide-react';
import Link from 'next/link';

export function MenubarDemo() {
    return (
        <div className="flex h-12 justify-center items-center border border-y w-full">
            <Menubar className="border-none">
                <MenubarMenu>
                    <Link href="/view-smartphone">
                        <MenubarTrigger className="lg:w-48 lg:text-base text-xs">
                            <Smartphone />
                            Điện thoại
                        </MenubarTrigger>
                    </Link>
                    <MenubarContent className="w-32 min-w-10">
                        <MenubarItem>Nokia</MenubarItem>
                        <MenubarItem>Xiaomi</MenubarItem>
                        <MenubarItem>Oppo</MenubarItem>
                        <MenubarItem>Huawei</MenubarItem>
                        <MenubarItem>Samsung</MenubarItem>
                        <MenubarItem>Apple</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="lg:w-48 lg:text-base text-xs">
                        <Laptop />
                        Máy tính
                    </MenubarTrigger>
                    <MenubarContent className="w-32 min-w-10">
                        <MenubarItem>Msi</MenubarItem>
                        <MenubarItem>Hp</MenubarItem>
                        <MenubarItem>Acer</MenubarItem>
                        <MenubarItem>MacBook</MenubarItem>
                        <MenubarItem>Dell</MenubarItem>
                        <MenubarItem>Asus</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="lg:w-48 lg:text-base text-xs">
                        <Watch />
                        Smart watch
                    </MenubarTrigger>
                    <MenubarContent className="w-32 min-w-10">
                        <MenubarItem>Garmin</MenubarItem>
                        <MenubarItem>Samsung</MenubarItem>
                        <MenubarItem>Apple</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="lg:w-48 lg:text-base text-xs">
                        <Tablet />
                        Tablet
                    </MenubarTrigger>
                    <MenubarContent className="w-32 min-w-10">
                        <MenubarItem>Xiaomi</MenubarItem>
                        <MenubarItem>Oppo</MenubarItem>
                        <MenubarItem>Huawei</MenubarItem>
                        <MenubarItem>Samsung</MenubarItem>
                        <MenubarItem>IPad</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="lg:w-48 lg:text-base text-xs">
                        <Headset />
                        Phụ kiện
                    </MenubarTrigger>
                    <MenubarContent className="w-32 min-w-10">
                        <MenubarItem>Ốp lưng</MenubarItem>
                        <MenubarItem>Tai nghe</MenubarItem>
                        <MenubarItem>Sạc dự phòng</MenubarItem>
                        <MenubarItem>Chuột</MenubarItem>
                        <MenubarItem>Bàn phím</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
}
