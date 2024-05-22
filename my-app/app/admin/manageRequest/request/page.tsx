import { IListRegister } from "../../../../../back-end/src/models/ListRegister.model"
export default function RequestItem({ request } : {request : IListRegister}){
    return(
        <div className="order-item border p-4 mb-4">
            <p>UserId: {request.userId}</p>
            <p>Email: {request.email}</p>
            <p>Role: {request.role}</p>
        </div>
    )
}


