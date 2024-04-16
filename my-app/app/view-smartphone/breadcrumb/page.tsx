import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function BreadcrumbWithCustomSeparator() {
  return (
    <Breadcrumb className="ml-0 mt-6 -mb-3 w-full lg:w-3/4 flex">
      <BreadcrumbList>
      <BreadcrumbItem>
          <Link href="/dashboard">
            <BreadcrumbPage>Home</BreadcrumbPage>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Điện thoại</BreadcrumbPage>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Laptop Asus</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
