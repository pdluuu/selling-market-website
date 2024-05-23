'use client'
import { Menubar, MenubarMenu, MenubarShortcut } from "@/components/ui/menubar";
import { MenubarTrigger } from "@/components/ui/menubar";
import { SquareUser, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import RequestItem from "./request/page";
import { IListRegister } from "../../../../back-end/src/models/ListRegister.model";
import { ISuccessRes, IFailRes } from "../../../../back-end/src/utils/auth.interface";
import axios from "axios";


export default function ManageOrder() {
    function isSuccessRes(response: ISuccessRes | IFailRes): response is ISuccessRes {
        return (response as ISuccessRes).message === "successful";
    }

    function isFailRes(response: ISuccessRes | IFailRes): response is IFailRes {
        return (response as IFailRes).message === "error";
    }


    const [requests, setRequest] = useState<IListRegister[]>([]);
    const [roleFilter, setRoleFilter] = useState('all');

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ2Y2QwYjU1NDczMDljMDAxMGNkYTQiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJpYXQiOjE3MTY0NjM0MTh9.XhuNIpk29x7wri9RccoholUm3WVUXOGwqCOV9clRorw` }
    });

    const fetchRequests = async (type: string): Promise<IListRegister[]> => {
        try {
            const response = await axiosInstance.get(`/admin/view/${type}`);
            console.log(response.data.data.listApply);

            return response.data.data.listApply as IListRegister[];
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error(`Error fetching staff data: ${error.response.status} - ${error.response.statusText}`);
            } else {
                console.error('Error fetching staff data:', error);
            }
            throw error; // Re-throw the error to be handled by the caller
        }
    };

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
            <div className="flex flex-row gap-16 content-center">
                {requests.map((request) => (
                    <RequestItem key={request._id} request={request} />
                ))}
            </div>
        </div>
    );
}
