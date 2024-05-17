import { Router } from 'express';
import user from '../../controller/User.controller';
import { authenticateToken, isAdmin } from '../../middlerware/authentication';
import { auth } from 'google-auth-library';

const adminRouter = Router();

adminRouter.get('/view/:type', authenticateToken, isAdmin, user.ViewApply);
adminRouter.post('/accept', authenticateToken, isAdmin, user.Accept);
export default adminRouter;
