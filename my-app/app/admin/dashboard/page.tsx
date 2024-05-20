import Header from "@/app/dashboard/header/page";
import Sidebar from "../sidebar/page";

export default function DashboardAd() {
    return (
        <div>
            <Header />
            <div className="w-5/6 mx-auto">
                <Sidebar />
            </div>
            <div className="flex justify-center text-5xl items-center">
                Xin chao Vu Thi Mai Linh
            </div>
        </div>

    );
}