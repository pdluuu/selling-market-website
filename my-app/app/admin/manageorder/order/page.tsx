import { IOrder } from "../../../../../back-end/src/models/Order.model"
export default function OrderItem({ order } : {order : IOrder}){
    return(
        <div className="order-item border p-4 mb-4">
            <p>Status: {order.status}</p>
            <p>Date: {order.date}</p>
            <p>Total Price: {order.totalprice}</p>
            <p>Address: {order.address}</p>
            <p>Phone Number: {order.phoneNumber}</p>
        </div>
    )
}


