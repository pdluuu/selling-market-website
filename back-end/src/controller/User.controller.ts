import { log } from "console";
import userServices from "../services/User.services";

class User {
    sign_up(req: any, res: any) {
        try {
            const { name, username, password, phone_number, email, role } = req.body;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^0\d{9}$/;
            const errors = [];
            if (!name) {
                errors.push({message: 'Name is required.' });
            }
            if (!username) {
                errors.push({message: 'Username is required.' });
            }
            if (!password) {
                errors.push({message: 'Password is required.' });
            }
            if (!phone_number) {
                errors.push({message: 'Phone number is required.' });
            } else if (!phoneRegex.test(phone_number)) {
                errors.push({message: 'Phone number is not valid.' });
            }
            if (!email) {
                errors.push({message: 'Email is required.' });
            } else if(!emailRegex.test(email)){
                errors.push({message: 'Email is not valid.'});
            }
            if (!role) {
                errors.push({message: 'Role is required.' });
            }
            
            // Continue with your logic
            //const mess = userServices.tao_nguoi_dung(name, password);
            if(errors.length>0){
                return res.json({...errors});
            } else return res.json({
                message: 'Sign up completed!'
            })
            
        } catch (error) {
            console.log(error);
            return res.json({});
        }
    }
}

const user = new User();
export default user;
