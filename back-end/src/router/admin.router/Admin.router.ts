import { Router } from 'express';
import user from '../../controller/User.controller';
import { authenticateToken, isAdmin } from '../../middlerware/authentication';
import { auth } from 'google-auth-library';

const adminRouter = Router();

adminRouter.get('/view/:type', authenticateToken, isAdmin, user.ViewApply);
adminRouter.get('/list/:type', authenticateToken, isAdmin, user.ViewList);
adminRouter.post('/accept', authenticateToken, isAdmin, user.Accept);
adminRouter.post('/notAccept', authenticateToken, isAdmin, user.notAccept);
adminRouter.get('/order/:status', authenticateToken, isAdmin, user.ViewOrder);

export default adminRouter;