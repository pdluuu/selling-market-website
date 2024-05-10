import Footer from '../footer/page';
import { MenubarDemo } from '../dashboard/category/page';
import DisplayedItem from '../dashboard/displayeditem/page';
import Header from '../dashboard/header/page';
import BreadcrumbWithCustomSeparator from '../dashboard/breadcrumb/page';
import { phoneData } from '../dashboard/sample-data';
import Filter from '../dashboard/filter/page';

export default function Dashboard() {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator category="Phụ kiện" />
            <Filter category="Phụ kiện" />
            <DisplayedItem brand="Oppo" category="Phụ kiện" />
            <DisplayedItem brand="Samsung" category="Phụ kiện" />
            <DisplayedItem brand="Apple" category="Phụ kiện" />
            <DisplayedItem brand="Nokia" category="Phụ kiện" />
            <DisplayedItem brand="Xiaomi" category="Phụ kiện" />
            <Footer />
        </div>
    );
}
