import { orderItem } from './orderItem';
import { User } from './user';
export class Order {
  name?: string;
  email?: string;
  id?: string;
  user?: User | string;
  orderItems?: orderItem[];
  status!: number;
  dateOrdered?: string;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  totalPrice?: string;
  phone?: number;
}
