import UserModel, { UserRole } from '../models/User.model';
import { ErrorResponse, InvalidInput } from '../utils/errorResponse';
import OrderModel from '../models/Order.model';
import ProductModel from '../models/Product.model';
import ListRegisterModelModel from '../models/ListRegister.model';
import ListRegisterModel from '../models/ListRegister.model';
import ShoppingCartModel from '../models/ShoppingCart.model';
import { compare, compareSync, genSaltSync, hash, hashSync } from 'bcrypt';

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
        const user = await UserModel.findById({ _id });
        return user;
    }

    async takeOrder(product_id: string, user_id: string, quantity: number) {
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
                    totalprice: '0',
                    date: new Date().toISOString(),
                    user_id: user_id,
                    address: 'xxxx',
                    deliver_id: 'xxxxx',
                    phoneNumber: user.phoneNumber,
                    orderProduct: [],
                };
                order = await OrderModel.create(orderData);
            }
    
            let existingProduct = order.orderProduct.find(item => item.product_id === product_id);
    
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                order.orderProduct.push({
                    product_id: product_id,
                    store_id: 'store ID',
                    quantity: quantity,
                    status: 'chua_duoc_chuyen_di',
                    price: product.price || 0,
                    discount: (product.discount || 0).toString(),
                });
            }
    
            let totalPrice = 0;
            for (const item of order.orderProduct) {
                totalPrice += parseFloat(item.price.toString()) * (1 - parseFloat(item.discount) / 100) * item.quantity;
            }
    
            order.totalprice = totalPrice.toFixed(2);
    
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

    async updateUser(_id: string,username: string, password: string, email: string, mobile: string) {
        if ((await this.isExistEmail(email)) || (await this.isExistUsername(username))) {
            throw new InvalidInput('Email already exists');
        }
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        const data: { username: string; password: string; email: string; mobile: string } = {

            username,
            password: hash,
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
    async addToCart(userId: string, productId: string, quantity: number) {
        try {
            const product = await ProductModel.findById(productId);
            if (!product) {
                return {
                    success: false,
                    message: 'Product not found',
                };
            }
            const user = await UserModel.findById(userId);
            if (!user) {
                return {
                    success: false,
                    message: 'User not found',
                };
            }

            let cart = await ShoppingCartModel.findOne({ user_id: userId });
            if (!cart) {
                cart = new ShoppingCartModel({
                    user_id: userId,
                    cartProduct: [{
                        product_id: productId,
                        quantity: quantity
                    }]
                });
            } else {
                const productIndex = cart.cartProduct.findIndex(item => item.product_id === productId);
                if (productIndex >= 0) {
                    cart.cartProduct[productIndex].quantity += quantity;
                } else {
                    cart.cartProduct.push({
                        product_id: productId,
                        quantity: quantity
                    });
                }
            }
            await cart.save();
            return {
                success: true,
                message: 'Product added to cart',
            };
        } catch (error) {
            console.error('Error adding to cart:', error);
            return {
                success: false,
                message: 'Failed to add product to cart',
            };
        }
    }
    async viewAllOrder(userId: string) {
        try {
            const order = await OrderModel.findOne({ user_id: userId }).populate('orderProduct.product_id');
    
            if (order) {
                const orderProducts = order.orderProduct.map(product => ({
                        productId: product.product_id,
                        storeId: product.store_id,
                        quantity: product.quantity,
                        price: product.price,
                        discount: product.discount,
                        status: product.status
                    }))
                ;
    
                return {
                    success: true,
                    orderProducts: orderProducts,
                };
            } else {
                return {
                    success: false,
                    message: "Không có đơn hàng nào",
                };
            }
        } catch (error) {
            console.error('Error retrieving orders:', error);
            throw error;
        }
    }
    
    async viewCart(userId: string) {
        try {
            const cart = await ShoppingCartModel.findOne({ user_id: userId });
      
            if (cart) {
              const cartItems = await Promise.all(
                cart.cartProduct.map(async (item) => {
                  const product = await ProductModel.findById(item.product_id);
                  if (product) {
                    return {
                      _id: product._id,
                      name: product.name,
                      discount: product.discount,
                      price: product.price,
                      brand: product.brand,
                      items: product.items,
                      category: product.category,
                      images: product.images,
                    };
                  }
                })
              );
              cartItems.filter((item) => item !== undefined);
              return{ 
                success: true,
                data: cartItems,
              };
            } else {
                return {
                    success: false,
                    message: 'ok',
                };
            }
          } catch (error) {
            console.error('Error retrieving cart items:', error);
            throw error;
          }
    }

    async checkOut(userId: string,productId: string) {
        try {
            const order = await OrderModel.findOne({user_id:userId});
            const product_x = await ProductModel.findById(productId);
            if (order && product_x) {
                for (const product of order.orderProduct) {
                    if (productId==product.product_id && product.status === 'da_nhan_hang') {
                        return {
                            success: true,
                            message: 'san pham ' + productId + 'da duoc nhan',
                        };
                    }
                }
                
            } else {
                return {
                    success: false,
                    message: 'Order not found',
                };
            }
          } catch (error) {
            return {
                success: false,
                message: 'error',
            };
          }
    }
    
    async  purchersProduct(userId: string, productId: string) {
        try {
            const order = await OrderModel.findOne({ user_id: userId });
            const product_x = await ProductModel.findById(productId);
    
            if (order && product_x) {
                let productUpdated = false;
                for (const product of order.orderProduct) {
                    if (productId === product.product_id) {
                        product.status = 'da_nhan_hang';
                        productUpdated = true;
                        console.log('Product status updated:', product);  // Log cập nhật trạng thái sản phẩm
                        break;
                    }
                }
    
                if (productUpdated) {
                    await order.save();
                    console.log('Order saved:', order);  // Log việc lưu lại đơn hàng
                    return {
                        success: true,
                        message: 'Sản phẩm ' + productId + ' đã được mua',
                    };
                } else {
                    console.log('Product not found in order');  // Log khi sản phẩm không có trong đơn hàng
                    return {
                        success: false,
                        message: 'Sản phẩm không có trong đơn hàng',
                    };
                }
            } else {
                console.log('Order or product not found');  // Log khi không tìm thấy đơn hàng hoặc sản phẩm
                return {
                    success: false,
                    message: 'Đơn hàng hoặc sản phẩm không tồn tại',
                };
            }
        } catch (error) {
            console.error('Error occurred:', error);  // Log lỗi nếu có
            return {
                success: false,
                message: 'Lỗi: ' ,
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
