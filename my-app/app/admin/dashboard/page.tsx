import Sidebar from "../sidebar/page";
import ManageProduct from "../manageproduct/page";
import Header from "../header/page";

export default function DashboardAd() {
    return (
        <div>
            <div className="w-full">
                <Header />
            </div>
            <div className="w-5/6 mx-auto mt-8">
                <Sidebar />
            </div>

            <ManageProduct />

        </div>

    );
}