import Link from 'next/link';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function BreadcrumbWithCustomSeparator({
    category,
    brand,
    reverse,
}: {
    category?: string;
    brand?: string;
    reverse?: string;
}) {
    let sectionLink = '';
    let firstt = '';
    let secondd = '';

<<<<<<< HEAD
    if (reverse === 'true') {
=======
    if (reverse==="true") {
>>>>>>> refs/remotes/origin/main
        if (brand) firstt = brand;
        if (category) secondd = category;
        sectionLink = './view-brand';
    } else {
        if (brand) secondd = brand;
        if (category) firstt = category;
        switch (category) {
            case 'Điện thoại':
<<<<<<< HEAD
                sectionLink = '/home/view-smartphone';
                break;
            case 'Máy tính':
                sectionLink = '/home/view-laptop';
                break;
            case 'Đồng hồ':
                sectionLink = '/home/view-watch';
                break;
            case 'Tablet':
                sectionLink = '/home/view-tablet';
                break;
            case 'Phụ kiện':
                sectionLink = '/home/view-accessory';
=======
                sectionLink = './view-smartphone';
                break;
            case 'Laptop':
                sectionLink = './view-laptop';
                break;
            case 'Đồng hồ':
                sectionLink = './view-watch';
                break;
            case 'Tablet':
                sectionLink = './view-tablet';
                break;
            case 'Phụ kiện':
                sectionLink = './view-accessory';
>>>>>>> refs/remotes/origin/main
                break;
        }
    }
    return (
        <Breadcrumb className="ml-0 mt-6 -mb-3 w-full lg:w-3/4 flex">
            <BreadcrumbList>
                <BreadcrumbItem>
<<<<<<< HEAD
                    <Link href="/home/dashboard">
=======
                    <Link href="/dashboard">
>>>>>>> refs/remotes/origin/main
                        <BreadcrumbPage>Home</BreadcrumbPage>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
<<<<<<< HEAD
                <BreadcrumbItem onClick={()=>{console.log(sectionLink)}}>
=======
                <BreadcrumbItem>
>>>>>>> refs/remotes/origin/main
                    <Link href={sectionLink}>
                        <BreadcrumbPage>{firstt}</BreadcrumbPage>
                    </Link>
                </BreadcrumbItem>
                {secondd && (
                    <div className="flex gap-1.5 items-center">
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {firstt} {secondd}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </div>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
