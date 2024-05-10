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
            <BreadcrumbWithCustomSeparator category="Đồng hồ"/>
            <Filter category="Đồng hồ"/>
            <DisplayedItem brand="Garmin" category="Đồng hồ" />
            <DisplayedItem brand="Samsung" category="Đồng hồ" />
            <DisplayedItem brand="Apple" category="Đồng hồ" />
            <Footer />
        </div>
    );
}
