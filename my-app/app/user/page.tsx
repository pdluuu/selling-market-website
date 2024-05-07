import { MenubarDemo } from '../dashboard/category/page';
import Header from '../dashboard/header/page';
import Footer from '../footer/page';
import UserMenuBar from '../view-order/user-bar/page';
import Profile from './profile/page';

export default function User() {
    return (
        <div>
            <Header />
            <MenubarDemo />
            <div className="mx-32 my-16 space-x-[12px] flex">
                <UserMenuBar />
                <Profile />
            </div>
            <Footer />
        </div>
    );
}