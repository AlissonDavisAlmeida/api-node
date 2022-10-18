import { Products } from "@domain/products/typeorm/entities/Product";
import {
  Column,
  CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";
import { Order } from "./Orders";

@Entity("orders_products")
export class OrdersProducts {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: "order_id" })
    order: Order;

  @ManyToOne(() => Products, (products) => products.order_products)
  @JoinColumn({ name: "product_id" })
    product: Products;

  @Column()
    order_id: string;

  @Column()
    product_id: string;

  @Column()
    price: number;

  @Column()
    quantity: number;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}
