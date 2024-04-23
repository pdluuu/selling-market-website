"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import { useState } from "react"
import { number } from "zod"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DataItem = {
    id: string;
    price: number;
    name: string;
    number: number;
    class: string[];
    imageLink: string;
}

export const columns: ColumnDef<DataItem>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "imageLink",
        header: "",
        cell: ({ row }) => {
            const imageLink: string = row.getValue("imageLink");

            return (
                <div>
                    <img src={imageLink} alt={row.getValue("name")} style={{ width: "80px", height: "80px" }} />
                </div>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <div className="capitalize">{row.getValue("name")}</div>
            );
            //<div className="capitalize">{row.getValue("name")}</div>
        },
    },
    {
        accessorKey: "class",
        header: () => <div className="text-left">Version</div>,
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="lowercase">
                        {(row.getValue("class") as string[]).join(", ")}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {(row.getValue("class") as string[]) &&
                        (row.getValue("class") as string[]).map(version => (
                            <DropdownMenuItem key={version} /*onClick={() => handleVersionSelect(version)}*/>
                                {version}
                            </DropdownMenuItem>
                        ))}
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
    {
        accessorKey: "number",
        header: "Number",
        cell: ({ row }) => {

            return (
                <div className="flex flex-row gap-4">
                    <Button>-</Button>
                    <div className="capitalize flex justify-items-center items-center">{row.getValue("number")}</div>
                    <Button>+</Button>

                </div>

            );
            //<div className="capitalize">{row.getValue("name")}</div>
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-right"
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-left font-medium">{formatted}</div>
        },
    },

]
