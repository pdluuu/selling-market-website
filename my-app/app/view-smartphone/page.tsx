"use client";
import { MenubarDemo } from "../dashboard/category/page";
import DisplayedItem from "../dashboard/displayeditem/page";
import BreadcrumbWithCustomSeparator from "../dashboard/breadcrumb/page";
import Filter from "../dashboard/filter/page";
import { useState } from "react";

export default function ViewSmartPhone() {
  const [price, setPrice] = useState<number>(-1);
  const [reload,setReload]=useState<boolean>(false);
  const [brands, setBrands] = useState<string[]>([
    "Oppo",
    "Samsung",
    "Huawei",
    "Xiaomi",
    "Apple",
    "Nokia",
  ]);
  const filterPrice = (newPrice: number, brand?: string) => {
    setPrice(newPrice);
    if (brand !== undefined) setBrands([brand]);
    else setBrands(["Oppo", "Samsung", "Huawei", "Xiaomi", "Apple", "Nokia"]);
  };
  // const handleReload = (reload:boolean)=>{
  //   setReload()
  // }
  return (
    <div className="flex flex-col items-center">
      <MenubarDemo />
      <BreadcrumbWithCustomSeparator category="Điện thoại" />
      <Filter category="Điện thoại" filterPrices={filterPrice} />
      {brands.map((brand, index) => {
        return (
          <DisplayedItem
            // reload={reload}
            key={index}
            category="Điện thoại"
            brand={brand}
            price={price}
          />
        );
      })}
    </div>
  );
}
