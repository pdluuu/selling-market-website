import Footer from '../footer/page';
import { MenubarDemo } from '../dashboard/category/page';
import DisplayedItem from '../dashboard/displayeditem/page';
import Header from '../dashboard/header/page';
import BreadcrumbWithCustomSeparator from '../dashboard/breadcrumb/page';
import Filter from '../dashboard/filter/page';

export default function Dashboard() {
    

    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category="Điện thoại"/>
            <Filter category="Điện thoại"/>
            <DisplayedItem brand="Oppo" category="Điện thoại"  />
            <DisplayedItem brand="Samsung" category="Điện thoại" />
            <DisplayedItem brand="Apple" category="Điện thoại" />
            <DisplayedItem brand="Nokia" category="Điện thoại" />
            <DisplayedItem brand="Xiaomi" category="Điện thoại" />
            <Footer />
        </div>
    );
}
