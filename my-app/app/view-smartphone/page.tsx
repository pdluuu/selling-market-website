import Footer from '../footer/page';
import { MenubarDemo } from '../dashboard/category/page';
import DisplayedItem from '../dashboard/displayeditem/page';
import Header from '../dashboard/header/page';
import BreadcrumbWithCustomSeparator from './breadcrumb/page';

export default function Dashboard() {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />
            <BreadcrumbWithCustomSeparator />
            <DisplayedItem category="Oppo" />
            <DisplayedItem category="Samsung" />
            <DisplayedItem category="Apple" />
            <DisplayedItem category="Nokia" />
            <DisplayedItem category="Xiaomi" />
            <Footer />
        </div>
    );
}
