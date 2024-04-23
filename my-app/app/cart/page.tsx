'use client'

import { useState } from "react";
import { DataItem, columns } from "./columns"
import { DataTable } from "./dataTables"

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

export default async function DemoPage() {
  const data = await getData()
  const [total, setTotal] = useState(0);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        total={total}
      />
    </div>
  )
}
