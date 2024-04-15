import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { MonitorCheck, SeparatorHorizontal, SeparatorHorizontalIcon } from 'lucide-react';
import facebook from '../../Images/facebook.png';
import messenger from '../../Images/messenger.png';
import instagram from '../../Images/instagram.png';
import youtube from '../../Images/video.png';
import { Separator } from '@radix-ui/react-select';
import { MenubarSeparator } from '@radix-ui/react-menubar';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

export default function Footer() {
    return (
        <div className="w-full bg-blue-800 flex pt-10 pb-10 flex-col items-center space-y-4">
            <div className="flex w-3/4 justify-between ">
                <div>
                    <Button className="bg-transparent text-2xl font-bold  text-blue-300">
                        <MonitorCheck size={30} className="mr-2" />
                        <span>Brand</span>
                    </Button>
                    <blockquote className="mt-6 border-l-2 pl-6 italic text-white">
                        Chất lượng không chỉ là cam kết, mà là tôn chỉ của chúng tôi!
                    </blockquote>
                    <div className="flex space-x-2">
                        <img src={facebook.src} width={40} />
                        <img src={messenger.src} width={40} />
                        <img src={instagram.src} width={40} />
                        <img src={youtube.src} width={40} />
                    </div>
                </div>
                <div>
                    <Card className="bg-transparent border-none text-white">
                        <CardContent>
                            <CardTitle>Liên hệ</CardTitle>
                            <CardDescription className="text-white">Số điện thoai: 0395235125</CardDescription>
                            <CardDescription className="text-white">Địa chỉ: Số 1 Đại Cồ Việt</CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className='w-3/4 h-0.5 bg-white' />
            <div>
                <p className='text-white'>Bản quyền thuộc sở hữu của Nhóm 22 - IT4409</p>
            </div>
        </div>
    );
}
