<<<<<<< HEAD:my-app/app/home/user/page.tsx
import { MenubarDemo } from '../dashboard/category/page';
import Header from '../../header/page';
import Footer from '../../footer/page';
import Profile from './profile/page';
import UserMenuBar from '../view-order/user-bar/page';
=======
import { MenubarDemo } from '../home/dashboard/category/page';
import Header from '../header/page';
import Footer from '../footer/page';
import UserMenuBar from '../view-order/user-bar/page';
import Profile from './profile/page';
>>>>>>> refs/remotes/origin/main:my-app/app/user/page.tsx

export default function User() {
    return (
        <div>
            <MenubarDemo />
            <div className="mx-32 my-16 space-x-[12px] flex">
                <UserMenuBar />
                <Profile />
            </div>
        </div>
    );
}
