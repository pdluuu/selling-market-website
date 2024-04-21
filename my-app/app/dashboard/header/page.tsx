import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-select';
import {
    Bell,
    CircleUserRound,
    CreditCard,
    LifeBuoy,
    LogOut,
    MonitorCheck,
    SearchIcon,
    Settings,
    ShoppingCart,
    User,
} from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <div className="flex items-center w-full justify-between  p-2 lg:pl-8 lg:pr-7 h-86 ">
            <Link href="/dashboard">
                <Button className=" p-0 lg:text-2xl text-base font-bold">
                    <MonitorCheck className="lg:mr-2" size={30}/>
                    <span>Brand</span>
                </Button>
            </Link>
            <div className="flex flex-row-reverse items-center w-1/4">
                <Input type="text" className="w-full lg:text-base text-xs lg:rounded-3xl rounded-xl h-30 " placeholder="Bạn tìm gì..." />
               
                <Button
                    type="submit"
                    className="absolute  lg:rounded-r-3xl lg:rounded-l-none rounded-1/2"
                >
                    <SearchIcon />
                </Button>
            </div>
            <div className="flex items-center lg:space-x-4 ">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex space-x-1 items-center ">
                            <CircleUserRound size={35} />
                            <div className="flex flex-col">
                                <p className="lg:text-base text-xs  ">Phan Khánh Linh</p>
                                <p className="lg:text-xs text-[9px] ">Khách hàng</p>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <Link href="/view-order">
                                <DropdownMenuItem>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Billing</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LifeBuoy className="mr-2 h-4 w-4" />
                            <span>Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Bell size={25} />
                <ShoppingCart size={25} />
            </div>
        </div>
    );
}
