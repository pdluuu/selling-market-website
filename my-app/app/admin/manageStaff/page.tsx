'use client'
import NewMenubarMenu from "@/app/dashboard/menubar/page";
import { Menubar, MenubarMenu, MenubarShortcut } from "@/components/ui/menubar";
import { MenubarTrigger } from "@/components/ui/menubar";
import { SquareUser,Truck } from "lucide-react";
import { useEffect, useState } from "react";
import StaffItem from "./staff/page";
import { IUser } from "../../../../back-end/src/models/User.model";


export default function ManageOrder() {
    const [staffs, setStaffs] = useState<IUser[]>([]);
    const [roleFilter, setRoleFilter] = useState('all');

    const fetchStaffs = async (type: string): Promise<IUser[]>  => {
        const response = await fetch(`/admin/list/${type}`);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        const getStaffs = async () => {
            const staffs = await fetchStaffs(roleFilter);
            setStaffs(staffs);
        };
        getStaffs();
    }, [roleFilter]);

    return (
        <div className="flex h-12 justify-start items-center border border-y w-full">
            <Menubar className="border-none">
                <MenubarMenu>
                    <div className="flex gap-16 ml-56">
                        <MenubarTrigger onClick={() => setRoleFilter('all')}>
                            Tất cả
                        </MenubarTrigger>

                        <MenubarTrigger onClick={() => setRoleFilter('staff')}>
                            <MenubarShortcut><SquareUser /></MenubarShortcut> Staff
                        </MenubarTrigger>

                        <MenubarTrigger onClick={() => setRoleFilter('deliver')}>
                            <MenubarShortcut><Truck /></MenubarShortcut> Deliver
                        </MenubarTrigger>
                    </div>
                </MenubarMenu>
            </Menubar>
            <div>
                {staffs.map(staff => (
                    <StaffItem key={staff._id} staff={staff} />
                ))}
            </div>
        </div>
    );
}
