"use client"
import { useState } from "react"
import { DataItem, columns } from "./column"
import { DataTable } from "./table"
import { Button } from "@/components/ui/button";
interface IProduct {
  name: string;
  price: number;
  discount: number;
  images: string[];
  versions: {
    color: string;
    memory: string;
    price: number;
  }[];
}

async function getData(): Promise<DataItem[]> {
  // Fetch data from your API here.
  return [
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
    // ...
  ]
}
export default async function Payment() {
  const data = await getData()

  return (
    <div>
      <div className="flex flex-col my-8 ml-64">
        <div>Địa chỉ nhận hàng</div>
        <div>Vu Van A 0123456987 Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội</div>
      </div>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={data}
        />
      </div>
      <div className="flex justify-between mx-64">
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