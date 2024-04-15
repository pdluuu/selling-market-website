'use client';
import { useRouter } from 'next/navigation';
import Header from './dashboard/header/page';
import { MenubarDemo } from './dashboard/category/page';
import { CarouselPlugin } from './dashboard/carosel/page';
import DisplayedItem from './dashboard/displayeditem/page';
import ListBrand from './dashboard/listbrand/page';
import { Label } from '@radix-ui/react-label';
import Footer from './footer/page';
import { BreadcrumbWithCustomSeparator } from './detailed-product/Breadcrumb/page';
import Details from './detailed-product/details/page';
import Config from './detailed-product/config/page';
export default function Home() {
    const router = useRouter();

    // if (!window.localStorage.getItem("access_token")) {
    //     router.push("/auth/login");
    // }
    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />
            {/* <CarouselPlugin />
            <ListBrand/>
            <div className="flex flex-col items-center mb-20">
                <DisplayedItem/>
                <DisplayedItem/>
                <DisplayedItem/>
                <DisplayedItem/>
                <DisplayedItem/>
                
            </div > */}
            <div className="flex w-3/4 flex-col mb-20">
                <BreadcrumbWithCustomSeparator />
                <div className="flex space-x-4">
                    <Details />
                    <Config/>
                </div>
            </div>
            <Footer />
        </div>
    );
}
