"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import ComboboxDemo from "./combobox";




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



export default function Payment() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-5/6 mt-20 mx-auto">
      <div className="flex flex-col">
        <div className="flex justify-between">Địa chỉ nhận hàng
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update</DialogTitle>
              </DialogHeader>
              <ComboboxDemo></ComboboxDemo>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div>Vu Van A 0123456987 Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội</div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Phan loai</TableHead>
              <TableHead>So luong</TableHead>
              <TableHead className="text-right">Gia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carts.map((cart) => (
              <TableRow key={cart.id}>
                <TableCell className="w-1/6 h-1/6"><img src={cart.imageLink} alt="Anh san pham" /></TableCell>
                <TableCell className="font-medium">{cart.name}</TableCell>
                <TableCell>{cart.class}</TableCell>
                <TableCell>{cart.number}</TableCell>
                <TableCell className="text-right">{cart.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between">
        <div>
          Total: 0
        </div>
        <div>
          <Button>Dat Hang</Button>
        </div>
      </div>
    </div>
  )
}