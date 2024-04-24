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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";



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

const provinces = [
  {
    value: "hanoi",
    label: "Ha Noi",
  },
  {
    value: "thaibinh",
    label: "Thai Binh",
  }, {
    value: "hochiminh",
    label: "Ho Chi Minh",
  }, {
    value: "danang",
    label: "Da Nang",
  },

]

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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value
                      ? provinces.find((province) => province.value === value)?.label
                      : "Select province..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search province" />
                    <CommandEmpty> No province found.</CommandEmpty>
                    <CommandGroup>
                      {
                        provinces.map((province) => (
                          <CommandItem
                            key={province.value}
                            value={province.value}
                            onSelect={(curValue) => {
                              setValue(curValue === value ? "" : curValue)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === province.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {province.label}
                          </CommandItem>
                        ))
                      }
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
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