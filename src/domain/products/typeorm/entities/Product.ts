import { OrdersProducts } from "@domain/orders/typeorm/entities/OrdersProducts";
import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Products {
  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column()
    name: string;

  @Column()
    price: number;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.product, {
    cascade: true,
  })
    order_products: OrdersProducts[];

  @Column()
    quantity: number;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}
