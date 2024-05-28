'use client';
import NewMenubarMenu from '@/app/home/dashboard/menubar/page';
import { Menubar, MenubarMenu, MenubarShortcut } from '@/components/ui/menubar';
import { MenubarTrigger } from '@/components/ui/menubar';
import { FolderClosed, Gift, Star, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import OrderItem from './order/page';
import { IOrder } from '../../../../back-end/src/models/Order.model';
import axios from 'axios';

export default function ManageOrder() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');

    console.log(localStorage.getItem('access_token'));

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });

    const fetchOrders = async (status: string): Promise<IOrder[]> => {
        try {
            const response = await axiosInstance.get(`/admin/order/${status}`);
            console.log(response.data.data);

            return response.data.data.list as IOrder[];
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
                        <MenubarTrigger onClick={() => setStatusFilter('all')}>Tất cả</MenubarTrigger>

                        <MenubarTrigger onClick={() => setStatusFilter('pending')}>
                            <MenubarShortcut>
                                <FolderClosed />
                            </MenubarShortcut>{' '}
                            Đang chờ xác thực
                        </MenubarTrigger>

                        <MenubarTrigger onClick={() => setStatusFilter('package')}>
                            <MenubarShortcut>
                                <Gift />
                            </MenubarShortcut>{' '}
                            Đang chuẩn bị hàng
                        </MenubarTrigger>

                        <MenubarTrigger onClick={() => setStatusFilter('transition')}>
                            <MenubarShortcut>
                                <Truck />
                            </MenubarShortcut>{' '}
                            Đang giao hàng
                        </MenubarTrigger>

                        <MenubarTrigger onClick={() => setStatusFilter('delivered')}>
                            <MenubarShortcut>
                                <Star />
                            </MenubarShortcut>{' '}
                            Giao hàng thành công
                        </MenubarTrigger>
                    </div>
                </MenubarMenu>
            </Menubar>
            <div className="flex flex-row gap-16 content-center">
                {orders.map((order) => (
                    <OrderItem key={order._id} order={order} />
                ))}
            </div>
        </div>
    );
}
