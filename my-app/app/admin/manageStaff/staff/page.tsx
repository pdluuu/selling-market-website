import { IUser } from "../../../../../back-end/src/models/User.model"
export default function StaffItem({ staff } : {staff : IUser}){
    return(
        <div className="order-item border p-4 mb-4">
            <p>Name: {staff.name}</p>
            <p>Email: {staff.email}</p>
            <p>Role: {staff.role}</p>
            <p>Phone Number: {staff.phoneNumber}</p>
        </div>
    )
}


