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

    if (reverse==="true") {
        if (brand) firstt = brand;
        if (category) secondd = category;
        sectionLink = './view-brand';
    } else {
        if (brand) secondd = brand;
        if (category) firstt = category;
        switch (category) {
            case 'Điện thoại':
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
                break;
        }
    }
    return (
        <Breadcrumb className="ml-0 mt-6 -mb-3 w-full lg:w-3/4 flex">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href="/dashboard">
                        <BreadcrumbPage>Home</BreadcrumbPage>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
                <BreadcrumbItem>
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