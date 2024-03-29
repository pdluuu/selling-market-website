import { Router } from 'express';
import user from '../controller/User.controller';

const authRotuer = Router();

authRotuer.post('/sign-up', user.sign_up);
authRotuer.post('/sign-in', user.sign_up);
export default authRotuer;
