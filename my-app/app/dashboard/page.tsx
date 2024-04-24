import Footer from '../footer/page';
import { CarouselPlugin } from './carosel/page';
import { MenubarDemo } from './category/page';
import DisplayedItem from './displayeditem/page';
import Header from './header/page';
import ListBrand from './listbrand/page';
import { phoneData, watchData, laptopData, tabletData, accessoryData } from './sample-data';

export default function Dashboard() {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <MenubarDemo />

            <CarouselPlugin />
            <ListBrand />
            <DisplayedItem  category="Laptop" />
            <DisplayedItem category="Điện thoại" />
            <DisplayedItem  category="Tablet" />
            <DisplayedItem category="Đồng hồ" />
            <DisplayedItem  category="Phụ kiện" />
            <Footer />
        </div>
    );
}
