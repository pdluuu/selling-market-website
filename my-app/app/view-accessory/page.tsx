import Footer from '../footer/page';
import { MenubarDemo } from '../dashboard/category/page';
import DisplayedItem from '../dashboard/displayeditem/page';
import Header from '../dashboard/header/page';
import BreadcrumbWithCustomSeparator from '../dashboard/breadcrumb/page';
import { phoneData } from '../dashboard/sample-data';

export default function Dashboard() {
    

    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator title={["Điện thoại"]}/>
            <DisplayedItem category="Oppo" listProduct={phoneData}/>
            <DisplayedItem category="Samsung" listProduct={phoneData}/>
            <DisplayedItem category="Apple" listProduct={phoneData}/>
            <DisplayedItem category="Nokia" listProduct={phoneData}/>
            <DisplayedItem category="Xiaomi" listProduct={phoneData}/>
            <Footer />
        </div>
    );
}
