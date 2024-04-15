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

export function MenubarDemo() {
    return (
        <div className="flex justify-center ">
            <Menubar className='border-none space-x-20'>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Smartphone />
                        Điện thoại
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Nokia</MenubarItem>
                        <MenubarItem>Xiaomi</MenubarItem>
                        <MenubarItem>Oppo</MenubarItem>
                        <MenubarItem>Huawei</MenubarItem>
                        <MenubarItem>Samsung</MenubarItem>
                        <MenubarItem>Apple</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Laptop />
                        Máy tính
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Msi</MenubarItem>
                        <MenubarItem>Hp</MenubarItem>
                        <MenubarItem>Acer</MenubarItem>
                        <MenubarItem>MacBook</MenubarItem>
                        <MenubarItem>Dell</MenubarItem>
                        <MenubarItem>Asus</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Watch />
                        Smart watch
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Garmin</MenubarItem>
                        <MenubarItem>Samsung</MenubarItem>
                        <MenubarItem>Apple</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Tablet />
                        Tablet
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Xiaomi</MenubarItem>
                        <MenubarItem>Oppo</MenubarItem>
                        <MenubarItem>Huawei</MenubarItem>
                        <MenubarItem>Samsung</MenubarItem>
                        <MenubarItem>IPad</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Headset />
                        Phụ kiện
                    </MenubarTrigger>
                    <MenubarContent>
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
