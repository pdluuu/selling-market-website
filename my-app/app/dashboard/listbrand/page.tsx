import samsung from '../../../Images/samsung-logo.png'
import huawei from '../../../Images/Huawei-Logo.png'
import apple from '../../../Images/apple-logo.png'
import xiaomi from '../../../Images/xiaomi-logo.png'
import nokia from '../../../Images/nokia-logo.png'
import oppo from '../../../Images/Oppo-Logo.wine.png'
import acer from '../../../Images/Acer-Logo.png'
import asus from '../../../Images/asus-logo.png'
import dell from '../../../Images/Dell_Logo.png'
import Hp from '../../../Images/hp-logo.png'

export default function ListBrand() {
    return <div className="lg:w-3/4 ml-2 mr-2 border rounded-lg p-3 lg:p-5 grid grid-cols-7 items-center lg:gap-x-4 gap-x-2 lg:gap-y-2">
<img src={samsung.src} width={100}/>
<img src={huawei.src} width={105} />
<img src={apple.src} width={80}/>
<img src={xiaomi.src} width={80}/>
<img src={nokia.src} width={100}/>
<img src={oppo.src} width={100}/>
<img src={acer.src} width={100}/>
<img src={Hp.src} width={80}/>
<img src={dell.src} width={100}/> 
<img src={asus.src} width={100}/>
    </div>;
}
