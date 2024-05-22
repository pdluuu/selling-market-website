'use client'
import { Menubar, MenubarMenu, MenubarShortcut } from "@/components/ui/menubar";
import { MenubarTrigger } from "@/components/ui/menubar";
import { SquareUser, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import RequestItem from "./request/page";
import { IListRegister } from "../../../../back-end/src/models/ListRegister.model";
import { ISuccessRes, IFailRes } from "../../../../back-end/src/utils/auth.interface";


export default function ManageOrder() {
    function isSuccessRes(response: ISuccessRes | IFailRes): response is ISuccessRes {
        return (response as ISuccessRes).message === "successful";
    }

    function isFailRes(response: ISuccessRes | IFailRes): response is IFailRes {
        return (response as IFailRes).message === "error";
    }


    const [requests, setRequest] = useState<IListRegister[]>([]);
    const [roleFilter, setRoleFilter] = useState('all');

    const fetchRequests = async (type: string) => {
       try {
        const response = await fetch(`http://localhost:8080/api/v1/admin/view/${type}`);
        const data: ISuccessRes | IFailRes = await response.json();
        if (isSuccessRes(data)) {
            return data.data;
        } else if (isFailRes(data)) {
            console.error('Error:', data.message);
            return [];
        };
       } catch (error) {
        return [];
       }
    }

    useEffect(() => {
        const getRequests = async () => {
            const requests = await fetchRequests(roleFilter);
            setRequest(requests);
        };
        getRequests();
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
                {requests.length > 0 ? (requests.map(request => (
                    <RequestItem key={request._id} request={request} />
                ))):(
                    <p>No data</p>
                )}
            </div>
        </div>
    );
}
