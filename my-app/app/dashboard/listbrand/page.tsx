import samsung from '../../../Images/samsung-logo-text-png-1.png'
import huawei from '../../../Images/huawei-logo.jpg'
import apple from '../../../Images/apple-logo.png'
import xiaomi from '../../../Images/Xiaomi_logo_(2021-)png.png'
import nokia from '../../../Images/Nokia_wordmark.svg.png'
import oppo from '../../../Images/png-transparent-oppo-logo-phone-identity-green.png'

export default function ListBrand() {
    return <div className="w-3/4 bg-gray-200 p-5 flex space-x-5 justify-around">
<img src={samsung.src} width={100}/>
<img src={huawei.src} width={100} />
<img src={apple.src} width={100}/>
<img src={xiaomi.src} width={100}/>
<img src={nokia.src} width={100}/>
<img src={oppo.src} width={100}/>
    </div>;
}
