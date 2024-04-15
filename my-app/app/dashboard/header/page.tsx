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
        <div className="flex h-86 items-center w-full justify-between p-2 pl-4 pr-7 border-b border-gray-400">
            <Button className="bg-white text-2xl font-bold  text-blue-400 &:hover{bg-transparent}">
                <MonitorCheck size={30} className="mr-2" />
                <span>Brand</span>
            </Button>
            <div className="flex flex-row-reverse w-1/4">
                <Input type="text" className="w-full rounded-3xl border-blue-400" placeholder="Bạn tìm gì..." />
                {/* <Separator color='black' className='w-2'/> */}
                <Button
                    type="submit"
                    className="bg-transparent text-blue-400 absolute mr-0 rounded-r-3xl rounded-l-none"
                >
                    <SearchIcon />
                </Button>
            </div>
            <div className="flex items-center space-x-4 text-blue-400">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex space-x-1 items-center ">
                            <CircleUserRound size={35} />
                            <div className="flex flex-col">
                                <p className="text-base text-black">Phan Khánh Linh</p>
                                <p className="text-xs text-gray-500">Khách hàng</p>
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
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
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
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Bell size={25} />
                <ShoppingCart size={25} />
            </div>
        </div>
    );
}
