'use client';
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
import logo from '../Images/Screenshot 2024-05-27 114715.jpg'
import { Separator } from '@radix-ui/react-select';
import axios from 'axios';
import {
    Bell,
    CircleUserRound,
    CreditCard,
    LifeBuoy,
    LogIn,
    LogOut,
    MonitorCheck,
    SearchIcon,
    Settings,
    ShoppingCart,
    User,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, memo, useContext } from 'react';
import { useRouter } from 'next/navigation';
type User = {
    _id: string;
    email: string;
    username: string;
    status: string;
    role: string;
};
function Navbar() {
    // const userr: User | null = JSON.parse(localStorage.getItem("user"||null)||" ");
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const router = useRouter();
    // console.log(user);

    const logOut = async () => {
        try {
            setUser(null);
            const reqBody = {
                refreshToken: localStorage.getItem('refresh_token'),
            };
            const response = await fetch('http://localhost:8080/api/v1/log-out', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(reqBody),
            });

            localStorage.clear();
            window.location.replace('/home/dashboard');
            // setUser(null);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center w-full justify-between  p-2 lg:pl-8 lg:pr-7 h-86 ">
            <Link href="/home/dashboard" className='-mb-3'>
                <Button variant={"custom"} className='mt-3 h-[10px]'>
                    <img width={150} height={30} src={logo.src}/>
                </Button>
            </Link>
            <div className="flex flex-row-reverse items-center w-1/4">
                <Input
                    type="text"
                    className="w-full lg:text-base text-xs lg:rounded-3xl rounded-xl h-30 "
                    placeholder="Bạn tìm gì..."
                />

                <Button type="submit" className="absolute  lg:rounded-r-3xl lg:rounded-l-none rounded-1/2">
                    <SearchIcon />
                </Button>
            </div>

            <div className="flex items-center lg:space-x-4 ">
                {!localStorage.getItem('access_token') ? (
                    <Link href="/auth/login">
                        <Button>
                            <LogIn className="mr-2" />
                            ĐĂNG NHẬP
                        </Button>
                    </Link>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex space-x-1 items-center ">
                                <CircleUserRound size={35} />
                                <div className="flex flex-col">
                                    <p className="lg:text-lg text-xs font-bold ">{user?.username}</p>
                                    <p className="lg:text-xs text-[9px] ">{user?.role}</p>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <Link href="/user">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Tài khoản của tôi</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/home/view-order">
                                    <DropdownMenuItem>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>Đơn hàng</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Cài đặt</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LifeBuoy className="mr-2 h-4 w-4" />
                                <span>Hỗ trợ</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Đăng xuất</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                <Bell size={25} />
                <Link href="/cart">
                    <ShoppingCart size={25} />
                </Link>
            </div>
        </div>
    );
}
export default memo(Navbar);
