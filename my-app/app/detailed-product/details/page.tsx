import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import asus from '../../../Images/ASUS vivobook/vi-vn-asus-vivobook-go-15-e1504fa-r5-nj776w-slider-2.jpg';
export default function Details() {
    return (
        <div className="w-3/5">
            <Card>
                <CardContent className="flex flex-col items-center space-y-4">
                    <Carousel className="w-full max-w-xl">
                        <CarouselContent className="pt-6">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <img src={asus.src} alt="asus" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    <h3>Thông tin chi tiết</h3>
                    <p>
                        <span className='font-bold'>ASUS Vivobook</span> mang phong cách thiết kế sang trọng, hiệu năng mạnh mẽ cùng tính đa năng sử dụng, chắc chắn sẽ
                        giúp bạn đáp ứng mọi tác vụ công việc và học tập hàng ngày một cách hiệu quả và chuyên nghiệp
                        nhất. Thiết kế quen thuộc, kiểu cách sang trọng Kiểu dáng đã quá quen thuộc đến từ các dòng
                        Vivobook nhà Asus, tuy vậy nhưng với thiết kế ngoại hình tối giản hiện đại như vậy, cá nhân mình
                        lại nhận thấy cực kì phù hợp với xu hướng thời trang hiện nay. Laptop Asus vẫn giữ được nét
                        thuần tuý với gam màu bạc sáng khá thu hút, vỏ được chế tác bằng nhựa nhưng lại rất cứng cáp, độ
                        bền lại còn được đảm bảo chuẩn quân đội MIL STD 810H và các bề mặt được gia công ghép nối rất
                        kĩ, nên mình chỉ việc trang bị thêm một chiếc túi chống sốc là có thể an tâm mang theo mọi nơi
                        rồi.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
