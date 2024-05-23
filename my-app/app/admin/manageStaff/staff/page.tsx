import { IUser } from "../../../../../back-end/src/models/User.model"
export default function StaffItem({ staff } : {staff : IUser}){
    return(
        <div className="border p-4 mt-64">
            <p>Name: {staff.name}</p>
            <p>Email: {staff.email}</p>
            <p>Role: {staff.role}</p>
            <p>Phone Number: {staff.phoneNumber}</p>
        </div>
    )
}


