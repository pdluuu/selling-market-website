"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, { useState } from "react"
import Link from "next/link";

interface CartItem {
    id: string;
    price: number;
    name: string;
    class: string[];
    number: number;
    imageLink: string;
    checked: boolean;
}

const carts = [
    {
        id: "728ed52f",
        price: 100,
        name: "pending",
        class: ["black"],
        number: 1,
        imageLink: "https://cdn.tgdd.vn/Products/Images/42/323002/realme-c65-thumb-1-600x600.jpg",
        checked: false,
    },
    {
        id: "728ed22f",
        price: 10,
        name: "pending",
        class: ["black"],
        number: 1,
        imageLink: "https://cdn.tgdd.vn/Products/Images/42/323002/realme-c65-thumb-1-600x600.jpg",
        checked: false,
    },
];

export default function Cart() {
    const [cartItems, setCartItems] = useState(carts);

    const increaseNumber = (id: string) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, number: item.number + 1 } : item
            )
        );
    };

    const decreaseNumber = (id: string) => {
        setCartItems((prevItems: CartItem[]) =>
            prevItems.map(item => {
                if (item.id === id) {
                    const updatedItem = { ...item, number: item.number - 1 };
                    if (updatedItem.number === 0) {
                        return null;
                    }
                    return updatedItem;
                }
                return item;
            }).filter(Boolean) as CartItem[]
        );
    };

    const [selectAll, setSelectAll] = useState(false);

    const clickCheckbox = (id: string) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setCartItems(prevItems =>
            prevItems.map(item => ({ ...item, checked: !selectAll }))
        );
    };

    const handleDeleteSelected = () => {
        setCartItems(prevItems =>
            prevItems.filter(item => !item.checked)
        );
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (selectAll || item.checked) {
                return total + item.price * item.number;
            }
            return total;
        }, 0);
    };

    const handlePayment = () => {
        // Lọc ra các sản phẩm được chọn
        const selectedItems = cartItems.filter(item => item.checked);
        // Tạo query string từ danh sách các sản phẩm được chọn
        const queryString = selectedItems.map(item => `selectedItems[]=${encodeURIComponent(item.id)}`).join('&');
        // Điều hướng đến trang thanh toán với query string
        window.location.href = `/payment?${queryString}`;
    };
    return (
        <div className="w-5/6 mt-20 mx-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Checkbox checked={selectAll} onClick={handleSelectAll} /></TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Phan loai</TableHead>
                        <TableHead>So luong</TableHead>
                        <TableHead className="text-right">Gia</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cartItems.map((cart) => (
                        <TableRow key={cart.id}>
                            <TableCell><Checkbox checked={cart.checked} onClick={() => clickCheckbox(cart.id)} /></TableCell>
                            <TableCell className="w-1/6 h-1/6"><img src={cart.imageLink} alt="Anh san pham" /></TableCell>
                            <TableCell className="font-medium">{cart.name}</TableCell>
                            <TableCell>{cart.class}</TableCell>
                            <TableCell><div className="flex gap-2 items-center">
                                <Button onClick={() => decreaseNumber(cart.id)}>-</Button>
                                {cart.number}
                                <Button onClick={() => increaseNumber(cart.id)}>+</Button>
                            </div></TableCell>
                            <TableCell className="text-right">{cart.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between">
                <Button onClick={handleDeleteSelected}>Xoa</Button>
                <div className="flex gap-10 items-center">
                    Total: {calculateTotal()}
                    <Button onClick={handlePayment}>Thanh Toan</Button>
                </div>
            </div>
        </div>
    )
}

