import { Button } from '@/components/ui/button';
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { CircleUserRound, CreditCard, LifeBuoy, User } from 'lucide-react';
import Link from 'next/link';

export default function UserMenuBar() {
    return (
        <div className="flex space-x-1 w-[250px] h-[740px] p-2 border rounded-lg items-center flex-col">
            <div className="flex ml-0 text-base items-center space-x-1 pt-3 pb-[15px]">
                <CircleUserRound size={35} />
                <p className="text-xl">Phan Khánh Linh</p>
            </div>
            <Button  className="w-full mb-[2px]">
                <User className="mr-2  h-4 w-4" />
                <span >Profile</span>
            </Button>
            <Button className="w-full mb-[2px]">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
            </Button>
            <Button className="w-full mb-[2px]">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
            </Button>
        </div>
    );
}
