import { MenubarDemo } from "../dashboard/category/page";
import Header from "../dashboard/header/page";
import Footer from "../footer/page";
import OrderFrame from "./order-frame/page";

export default function ViewOrder(){
    return (
        <div>
            <Header/>
            <MenubarDemo/>
            <OrderFrame/>
            <Footer/>
        </div>
    )
}