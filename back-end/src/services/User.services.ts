import UserModel, { UserRole } from '../models/User.model';
import { ErrorResponse, InvalidInput } from '../utils/errorResponse';
import OrderModel from '../models/Order.model';
import ProductModel from '../models/Product.model';
import ListRegisterModelModel from '../models/ListRegister.model';
import ListRegisterModel from '../models/ListRegister.model';

class UserServices {
    // * tao nguoi dung
    async createUser(email: string, password: string, username: string): Promise<string> {
        try {
            const new_user = await UserModel.create({ email, password, username });
            return '00';
        } catch (error) {
            console.log(error);

            return '01';
        }
        // ket noi database de tao nguoi dung
    }

    async loginUser(email: string, password: string): Promise<string> {
        console.log('start login');

        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return '02';
            }
            if (user.password != password) {
                return '03';
            }
            return '00';
        } catch (error) {
            console.log(error);
            return '01';
        }
    }

    async getUserById(_id: string) {
        const user = await UserModel.findById({ _id }).select('email name username status role');
        return user;
    }

    async takeOrder(product_id: string, user_id: string) {
        try {
            const product = await ProductModel.findOne({ _id: product_id });
            if (!product) {
                return {
                    success: false,
                    message: 'Product not found',
                };
            }

            const user = await UserModel.findById(user_id);
            if (!user) {
                return {
                    success: false,
                    message: 'User not found',
                };
            }

            let order = await OrderModel.findOne({ user_id: user_id });
            if (!order) {
                const orderData = {
                    totalprice: product.price || '0',
                    status: 'pending',
                    date: new Date().toISOString(),
                    user_id: user_id,
                    address: 'xxxx',
                    deliver_id: 'xxxxx',
                    phoneNumber: user.phoneNumber,
                    orderProduct: [],
                };
                order = await OrderModel.create(orderData);
            }

            order.orderProduct.push({
                product_id: product_id,
                store_id: 'Your store ID here',
                quantity: '1',

                price: product.price || 0,
                discount: (product.discount || '0').toString(),
            });

            let totalPrice = 0;
            for (const item of order.orderProduct) {
                totalPrice += parseFloat(item.price.toString()) * parseFloat(item.discount);
            }

            order.totalprice = totalPrice.toString();

            await order.save();
            return {
                success: true,
                message: 'takeOrder successfully',
            };
        } catch (error) {
            console.error('Error in takeOrder:', error);
            return {
                success: false,
                message: 'Failed to take order',
            };
        }
    }

    async updateUser(_id: string, name: string, username: string, password: string, email: string, mobile: string) {
        if ((await this.isExistEmail(email)) || (await this.isExistUsername(username))) {
            throw new InvalidInput('Email already exists');
        }
        const data: { name: string; username: string; password: string; email: string; mobile: string } = {
            name,
            username,
            password,
            email,
            mobile,
        };
        const response = await UserModel.findByIdAndUpdate(_id, data, { new: true }).select(
            '-password -role -refreshToken',
        );
        if (response) {
            return {
                success: true,
                message: 'found user and update',
            };
        } else {
            return {
                success: false,
                message: 'not found user',
            };
        }
    }
    async isExistEmail(email: string) {
        const user = await UserModel.findOne({ email }).lean().exec();

        if (user) {
            return true;
        }
        return false;
    }
    async isExistUsername(username: string) {
        const user = await UserModel.findOne({ username }).lean().exec();
        if (user) {
            return true;
        }
        return false;
    }
    async saveRegister(_id: string, email: string, role: string) {
        try {
            const newUser = await ListRegisterModel.create({
                userId: _id,
                email: email,
                role: role,
            });
            if (newUser) {
                return {
                    success: true,
                    message: 'ok',
                };
            } else {
                return {
                    success: false,
                    message: 'no ok',
                };
            }
        } catch (error) {
            console.error('Error saving user:', error);
            return {
                success: false,
                message: 'error',
            };
        }
    }
    // chỉ admin được đồng ý
    async agreeRegister(email: string, role: string) {
        try {
            const data: { role: string } = { role };
            const response = await UserModel.findByIdAndUpdate(email, data, { new: true }).select(
                '-password -role -refreshToken',
            );
            if (response) {
                // sau khi thay đồng ý thay đổi trường role trong model user thì xóa bản ghi trong listRegister.
                await ListRegisterModel.deleteOne({ email: email });
                return {
                    success: true,
                    message: 'ok',
                };
            } else {
                return {
                    success: false,
                    message: 'no ok',
                };
            }
        } catch (error) {
            console.error('Error saving user:', error);
            return {
                success: false,
                message: 'error',
            };
        }
    }
    // xóa một bản ghi trong danh sách register
    async deleteRegister(userId: string) {
        try {
            const response = await ListRegisterModel.deleteOne({ _id: userId });
            if (response) {
                return {
                    success: true,
                    message: 'ok',
                };
            } else {
                return {
                    success: false,
                    message: 'no ok',
                };
            }
        } catch (error) {
            console.error('Error saving user:', error);
            return {
                success: false,
                message: 'error',
            };
        }
    }

    async getAllRegister() {
        try {
            const listRegisters = await ListRegisterModel.find();
            if (listRegisters) {
                return {
                    success: true,
                    listRegisters,
                };
            } else {
                return {
                    success: false,
                    message: 'no ok',
                };
            }
        } catch (error) {
            console.error('Error saving user:', error);
            return {
                success: false,
                message: 'error',
            };
        }
    }

    async getAllApply(type: string) {
        try {
            const listApply = await ListRegisterModel.find();
            let list = listApply;
            if (type !== 'all') {
                list = listApply.filter(apply => {
                    apply.role === type;
                    apply.hide === false;
                })
            }
            return list;
        } catch (error) {
            return 500;
        }
    }

    async getAllOrder(status: string) {
        try {
            let list = await OrderModel.find({
                role: { $in: ['confirm', 'package', 'transition', 'delivered'] }
            }).exec();
            if (status !== 'all') {
                list = list.filter(list => list.status === status);
            }
            return list;
        } catch (error) {
            return 500;
        }
    }

    async getAllList(type: string) {
        try {
            let list = await UserModel.find({
                role: { $in: ['staff', 'deliver'] }
            }).exec();
            if (type !== 'all') {
                list = list.filter(list => list.role === type);
            }
            return list;
        } catch (error) {
            return 500;
        }
    }

    async notAcceptUser(id: string, type: string) {
        try {
            if (!id || !type) {
                return 400;
            }
            await ListRegisterModel.findOneAndUpdate(
                { userId: id },
                { hide: true },
                { new: true }
            );
            return 200;
        } catch (error: any) {
            return 500;
        }
    }

    async acceptUser(id: string, type: string) {
        try {
            if (!id || !type) {
                return 400;
            }
            const updateRole = await UserModel.findByIdAndUpdate(
                id,
                { role: type },
                { new: true }
            );
            if (!updateRole) {
                return 404;
            } else {
                await ListRegisterModel.findOneAndUpdate(
                    { userId: id },
                    { hide: true },
                    { new: true }
                );
                return 200;

            }
        } catch (error: any) {
            return 500;
        }
    }

    tao_nguoi_dung(email: string, password: string): string {
        // ket noi database de tao nguoi dung
        if (1) {
            return 'ok';
        }
        return 'no ok';
    }
    async extractUserRole(id: string): Promise<string> {
        try {
            const role = await UserModel.findOne({ _id: id });
            if (role) {
                return role.role;
            }
            return 'not found';
        } catch (error) {
            return 'not found';
        }
    }
}

const userServices = new UserServices();
export default userServices;