import Link from 'next/link';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function BreadcrumbWithCustomSeparator({ category, brand }: { category: string; brand?: string }) {
    let categoryLink = '';
    switch (category) {
        case 'Điện thoại':
            categoryLink = './view-smartphone';
            break;
        case 'Laptop':
            categoryLink = './view-laptop';
            break;
        case 'Đồng hồ':
            categoryLink = './view-watch';
            break;
        case 'Tablet':
            categoryLink = './view-tablet';
            break;
        case 'Phụ kiện':
            categoryLink = './view-accessory';
            break;
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
                    <Link href={categoryLink}>
                        <BreadcrumbPage>{category}</BreadcrumbPage>
                    </Link>
                </BreadcrumbItem>
                {brand && (
                    <div className="flex gap-1.5 items-center">
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {category} {brand}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </div>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
