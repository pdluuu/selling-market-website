'use client'
import { Menubar, MenubarMenu, MenubarShortcut } from "@/components/ui/menubar";
import { MenubarTrigger } from "@/components/ui/menubar";
import { FolderClosed, Gift, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import OrderItem from "./order/page";
import { IOrder } from "../../../../back-end/src/models/Order.model";


export default function ManageOrder() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchOrders = async (status: string): Promise<IOrder[]>  => {
        const response = await fetch(`/admin/order/${status}`);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        const getOrders = async () => {
            const orders = await fetchOrders(statusFilter);
            setOrders(orders);
        };
        getOrders();
    }, [statusFilter]);

    return (
        <div className="flex h-12 justify-center items-center border border-y w-full">
            <Menubar className="border-none">
                <MenubarMenu>
                    <div className="flex gap-16">
                        <MenubarTrigger onClick={() => setStatusFilter('all')}>
                            Tất cả
                        </MenubarTrigger>

                        <MenubarTrigger onClick={() => setStatusFilter('confirm')}>
                            <MenubarShortcut><FolderClosed /></MenubarShortcut> Đang chờ xác thực
                        </MenubarTrigger>

                        <MenubarTrigger onClick={() => setStatusFilter('package')}>
                            <MenubarShortcut><Gift /></MenubarShortcut> Đang chuẩn bị hàng
                        </MenubarTrigger>

                        <MenubarTrigger onClick={() => setStatusFilter('transition')}>
                            <MenubarShortcut><Truck /></MenubarShortcut> Đang giao hàng
                        </MenubarTrigger>

                        <MenubarTrigger onClick={() => setStatusFilter('delivered')}>
                            <MenubarShortcut><Star /></MenubarShortcut> Giao hàng thành công
                        </MenubarTrigger>
                    </div>
                </MenubarMenu>
            </Menubar>
            <div>
                {orders.map(order => (
                    <OrderItem key={order._id} order={order} />
                ))}
            </div>
        </div>
    );
}
