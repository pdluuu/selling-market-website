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
            <BreadcrumbWithCustomSeparator category="Tablet"/>
            <DisplayedItem brand="Oppo" category="Tablet" />
            <DisplayedItem brand="Samsung" category="Tablet" />
            <DisplayedItem brand="Huawei" category="Tablet" />
            <DisplayedItem brand="Xiaomi" category="Tablet" />
            <DisplayedItem brand="IPad" category="Tablet" />
            <Footer />
        </div>
    );
}
