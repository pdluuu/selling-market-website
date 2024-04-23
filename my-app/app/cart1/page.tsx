"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const carts = [
    {
        id: "728ed52f",
        price: 100,
        name: "pending",
        class: ["black"],
        number: 1,
        imageLink: "https://cdn.tgdd.vn/Products/Images/42/323002/realme-c65-thumb-1-600x600.jpg",
    },
    {
        id: "728ed52f",
        price: 10,
        name: "pending",
        class: ["black"],
        number: 1,
        imageLink: "https://cdn.tgdd.vn/Products/Images/42/323002/realme-c65-thumb-1-600x600.jpg",
    },
]

export default function Cart() {
    return (
        <div className="flex mx-40 mt-20 rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow className="flex justify-between">
                        <TableHead className="w-1/12">
                            <Checkbox />
                        </TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">So luong</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carts.map((cart) => (
                        <TableRow key={cart.id} className="flex justify-between justify-items-center items-center">
                            <TableCell><Checkbox /></TableCell>
                            <TableCell>
                                <div className="w-20 h-20">
                                    <img src={cart.imageLink} />
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">{cart.name}</TableCell>
                            <TableCell>{cart.price}</TableCell>
                            <TableCell>{cart.number}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="flex justify-between">
                        <div>
                            <TableCell>Total</TableCell>
                        </div>
                        <div className="flex">
                            <TableCell className="text-right">$2,500.00</TableCell>
                            <Button className="flex justify-items-center items-center">thanh toan</Button>
                        </div>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
