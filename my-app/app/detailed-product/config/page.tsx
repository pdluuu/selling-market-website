import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import den from '../../../Images/ASUS vivobook/den.jpg';
import xam from '../../../Images/ASUS vivobook/xams.jpg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Config() {
    return (
        <div className="w-2/5 flex flex-col space-y-4">
            <Card className="pt-6">
                <CardContent>
                    <CardTitle className="relative text-red-500">
                        14.000.000
                        <span className="underline text-xs inline-block align-top">đ</span>
                    </CardTitle>
                    <p>Màu sắc</p>
                    <CardContent className="flex space-x-4">
                        <Card>
                            <CardContent className="p-3 pl-4 flex items-center space-x-1">
                                <img src={den.src} width={50} />
                                <CardDescription className="text-base">Đen</CardDescription>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3 pl-4  flex items-center space-x-1">
                                <img src={xam.src} width={50} />
                                <CardDescription className="text-base">Xám</CardDescription>
                            </CardContent>
                        </Card>
                    </CardContent>
                    <div className="flex w-full">
                        <h3 className="mr-3 w-20">Số lượng:</h3>
                        <Input className="w-10 h-7 rounded-r-none" />
                        <Button className="w-7 h-7 p-1 rounded-l-none">
                            <Plus />
                        </Button>
                    </div>
                    <div className="flex space-x-5">
                        <Button className="bg-blue-400 w-3/4">MUA NGAY</Button>
                        <Button className="w-1/4 bg-transparent text-red-400 border border-red-400">
                            <ShoppingCartIcon />
                            <PlusIcon width={10} className="absolute ml-1" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card >
                <CardContent className='flex flex-col'>
                    <TableCaption className='w-full'>Cấu hình</TableCaption>
                    <Table>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell className="font-medium">CPU:</TableCell>
                                <TableCell>Ryzen 5, 7520U, 2.8GHz</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">RAM:</TableCell>
                                <TableCell>16 GB, LPDDR5(Onboard), 5500 MHz</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Ổ cứng:</TableCell>
                                <TableCell>512 GB SSD NVMe PCIe</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Màn hình:</TableCell>
                                <TableCell>15.6", Full HD(1920 x 1080)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Hệ điều hành: </TableCell>
                                <TableCell>Windows 11 Home SL</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

    );
}
