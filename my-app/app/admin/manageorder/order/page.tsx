<<<<<<< HEAD
import { IOrder } from '../../../../../back-end/src/models/Order.model';
import { IProduct } from '../../../../../back-end/src/models/Product.model';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface OrderProduct {
    product_id: string;
    store_id?: string;
    quantity: string;
    price: number;
    discount: string;
    status: string;
}

export default function OrderItem({ order }: { order: IOrder }) {
    const statuses = [
        {
            value: 'returnData',
            label: 'Trả hàng/Hoàn tiền',
        },
        {
            value: 'deleteData',
            label: 'Đã hủy',
        },
        {
            value: 'completedData',
            label: 'Hoàn thành',
        },
        {
            value: 'deliveringData',
            label: 'Đang vận chuyển',
        },
        {
            value: 'notExaminedData',
            label: 'Chờ xử lý',
        },
        {
            value: 'package',
            label: 'Đã đóng gói',
        },
    ];

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [value, setValue] = useState('');
    const [orderStatus, setOrderStatus] = useState(order.status);

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    });
    const handleSave = async () => {
        try {
            const response = await axiosInstance.post(`/admin/order/update-status`, {
                order_Id: order._id,
                status: value,
            });
            setOrderStatus(response.data.data.status);
            setOpenDialog(false);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    async function fetchProductDetails(productId: string) {
        try {
            const response = await axiosInstance.post(`/product/view-detail-product`, { _id: productId });
            //console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }

    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        // Hàm để lấy thông tin sản phẩm cho từng sản phẩm trong đơn hàng
        const fetchAllProducts = async () => {
            const productsWithDetails = await Promise.all(
                order.orderProduct.map(async (product) => {
                    const productDetails = await fetchProductDetails(product.product_id);
                    if (productDetails) {
                        const mergedProduct = {
                            ...productDetails,
                            ...product,
                        };
                        //console.log('Merged product:', mergedProduct); // Debugging line
                        return mergedProduct;
                    } else {
                        return null;
                    }
                }),
            );
            //console.log('Products with details:', productsWithDetails); // Debugging line
            setProducts(productsWithDetails.filter((product) => product !== null));
        };

        fetchAllProducts();
    }, [order]);
    return (
        <div className="border p-4 mb-4 mt-8">
            <p>User_Id: {order.user_id}</p>
            <p>Status: {order.status}</p>
            <p>Date: {order.date}</p>
            <div>
                {products.map((product) => (
                    <div key={product._id}>
                        <p>Ten san pham: {product[0].name || 'Unknown'}</p>
                        <p>So luong: {product.quantity}</p>
                    </div>
                ))}
            </div>
            <p>Total Price: {order.totalprice}</p>
            <p>Address: {order.address}</p>
            <p>Phone Number: {order.phoneNumber}</p>
            <Dialog open={openDialog}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="mt-4" onClick={() => setOpenDialog(true)}>
                        Cập nhật trạng thái
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader> Cập nhật trạng thái đơn hàng</DialogHeader>
                    <div>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {value
                                        ? statuses.find((status) => status.value === value)?.label
                                        : 'Chọn trạng thái...'}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div>
                                    <div>Chọn trạng thái</div>
                                    <div className="flex flex-col ">
                                        {statuses.map((status) => (
                                            <Button
                                                className="m-4"
                                                onClick={(e) => {
                                                    setValue(status.value);
                                                    setOpen(false);
                                                }}
                                            >
                                                {status.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                {/* <Command>
                                    <CommandInput placeholder="Chọn trạng thái" />
                                    <CommandEmpty>No status found.</CommandEmpty>
                                    <CommandGroup>
                                        <CommandList>
                                            {statuses.map((status) => (
                                                <CommandItem
                                                    onClick={(e) => {
                                                        console.log(e);
                                                    }}
                                                    key={status.value}
                                                    value={status.value}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? '' : currentValue);

                                                        setOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            value === status.value ? 'opacity-100' : 'opacity-0',
                                                        )}
                                                    />
                                                    <div
                                                        onClick={(e) => {
                                                            console.log(123);
                                                        }}
                                                    >
                                                        {status.label}
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandList>
                                    </CommandGroup>
                                </Command> */}
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button onClick={handleSave}>Save</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
=======
import { IOrder } from "../../../../../back-end/src/models/Order.model"
export default function OrderItem({ order } : {order : IOrder}){
    return(
        <div className="order-item border p-4 mb-4">
            <p>Status: {order.status}</p>
            <p>Date: {order.date}</p>
            <p>Total Price: {order.totalprice}</p>
            <p>Address: {order.address}</p>
            <p>Phone Number: {order.phoneNumber}</p>
        </div>
    )
}


>>>>>>> refs/remotes/origin/main
