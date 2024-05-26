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
    async takeOrder(product_id: string, userId: string, quantity: number) {
        try {
            const product = await ProductModel.findOne({ _id: product_id });
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
    
            let orders = await OrderModel.find({ user_id: userId });
            if (!orders || orders.length === 0 ) {
                const orderData = {
                    totalprice: '0',
                    date: new Date().toISOString(),
                    user_id: userId,
                    address: 'xxxx',
                    deliver_id: 'xxxxx',
                    phoneNumber: user.phoneNumber,
                    status: 'da_tao_order',
                    orderProduct: [],
                };
                const newOrder = await OrderModel.create(orderData);
                orders = [newOrder];
            }
            let n = 0;
            for (const order of orders) {
                if (order.status !== "da_tao_order" ) {
                    console.log("xxxx");
                    n=n+1;
                }else if(order.status == "da_tao_order" ){
    
                    let existingProduct = order.orderProduct.find(item => item.product_id === product_id);
                    if (existingProduct) {
                        existingProduct.quantity += quantity;
                    } else {
                        order.orderProduct.push({
                            product_id: product_id,
                            store_id: 'store ID',
                            quantity: quantity,
                            price: product.price,
                            discount: product.discount.toString(),
                        });
                    }
        
                    let totalPrice = 0;
                    for (const item of order.orderProduct) {
                        totalPrice += (parseFloat(item.price.toString()) * (1 - parseFloat(item.discount.toString()) / 100) * item.quantity);
                    }
                    order.totalprice = totalPrice.toFixed(2);
        
                    await order.save();
                }
            }
            if(n===orders.length){
                const orderData = {
                    totalprice: '0',
                    date: new Date().toISOString(),
                    user_id: userId,
                    address: 'xxxx',
                    deliver_id: 'xxxxx',
                    phoneNumber: user.phoneNumber,
                    status: 'da_tao_order',
                    orderProduct: [],
                };
                const newOrder = await OrderModel.create(orderData);
                orders = [newOrder];
                newOrder.orderProduct.push({
                    product_id: product_id,
                    store_id: 'store ID',
                    quantity: quantity,
                    price: product.price,
                    discount: product.discount.toString(),
                });
                let totalPrice = 0;
                    for (const item of newOrder.orderProduct) {
                        totalPrice += (parseFloat(item.price.toString()) * (1 - parseFloat(item.discount.toString()) / 100) * item.quantity);
                    }
                    newOrder.totalprice = totalPrice.toFixed(2);
        
                    await newOrder.save();
            }
    
            return {
                success: true,
                message: 'Orders processed successfully',
            };
        } catch (error) {
            console.error('Error in takeOrder:', error);
            return {
                success: false,
                message: 'Failed to take orders',
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
        const orders= await OrderModel.find({ user_id: userId });

        if(orders){
            return{
                success: true,
                data: orders,
            }
        }else{
            return{
                success: false,
                message: 'false',
            }
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
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

    async checkOut(userId: string,orderId: string) {
        try {
            const order = await OrderModel.findById(orderId);
            if (order ) {
                
                if (order.status === 'da_nhan_hang') {
                    return {
                        success: true,
                        message: 'san pham ' + orderId + 'da duoc nhan',
                    };
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
    
    async purchersOrder(userId: string, orderId: string) {
        try {
            const order = await OrderModel.findById(orderId);
    
            if (order && order.status === "da_tao_order") {
                order.status = "order_dang_duoc_van_chuyen";
                await order.save(); 
                return {
                    success: true,
                    message: 'Đơn hàng đang được chuyển đi',
                };
            } else {
                throw new Error('Đơn hàng không tồn tại hoặc không thể cập nhật trạng thái');
            }
        } catch (error) {
            console.error('Error occurred:', error);  
            return {
                success: false,
                message: 'Lỗi: ' ,
            };
        }
    }

    async receiveOrder(userId: string, orderId: string) {
        try {
            const order = await OrderModel.findById(orderId);
    
            if (order && order.status === "order_dang_duoc_van_chuyen") {
                order.status = "order_da_duoc_nhan";
                await order.save(); 
                return {
                    success: true,
                    message: 'Đơn hàng đã đến tay người dùng',
                };
            } else {
                throw new Error('Đơn hàng không tồn tại hoặc không thể cập nhật trạng thái');
            }
        } catch (error) {
            console.error('Error occurred:', error);  
            return {
                success: false,
                message: 'Lỗi: ' ,
            };
        }
    }
    
    async viewDetailOrder(userId: string, orderId: string) {
        try {
            const order = await OrderModel.findById(orderId);
    
            if (order) {

                return {
                    success: true,
                    data: order,
                };
            } else {
                throw new Error('Đơn hàng không tồn tại hoặc không thể cập nhật trạng thái');
            }
        } catch (error) {
            console.error('Error occurred:', error);  
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
