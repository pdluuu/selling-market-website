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
            <BreadcrumbWithCustomSeparator category="Laptop"/>
            <DisplayedItem category="Laptop" brand="Dell" />
            <DisplayedItem category="Laptop" brand="Macbook" />
            <DisplayedItem category="Laptop" brand="Hp" />
            <DisplayedItem category="Laptop" brand="Asus" />
            <DisplayedItem category="Laptop" brand="Msi" />
            <DisplayedItem category="Laptop" brand="Acer" />
            <Footer />
        </div>
    );
}
