'use client'
import { Menubar, MenubarMenu, MenubarShortcut } from "@/components/ui/menubar";
import { MenubarTrigger } from "@/components/ui/menubar";
import { SquareUser, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import RequestItem from "./request/page";
import { IListRegister } from "../../../../back-end/src/models/ListRegister.model";
import { ISuccessRes, IFailRes } from "../../../../back-end/src/utils/auth.interface";
<<<<<<< HEAD
import axios from "axios";


export default function ManageOrder() {
    const [requests, setRequest] = useState<IListRegister[]>([]);
    const [roleFilter, setRoleFilter] = useState('all');

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: { Authorization: `Bearer ${localStorage.getItem('refresh_token')}` }
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
=======


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
>>>>>>> refs/remotes/origin/main

    useEffect(() => {
        const getRequests = async () => {
            const requests = await fetchRequests(roleFilter);
            setRequest(requests);
        };
        getRequests();
    }, [roleFilter]);

    return (
<<<<<<< HEAD
        <div>
            <div className="flex h-12 justify-start items-center border border-y w-full mt-8">
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
            </div>
            <div className="flex flex-row gap-16 content-center mx-16">
                {requests.map((request) => (
                    <RequestItem key={request._id} request={request} />
                ))}
=======
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
>>>>>>> refs/remotes/origin/main
            </div>
        </div>
    );
}
