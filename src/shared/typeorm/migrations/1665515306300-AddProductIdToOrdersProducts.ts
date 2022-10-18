import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from "typeorm";

export class AddProductIdToOrdersProducts1665515306300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "order_products",
      new TableColumn({
        name: "product_id",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "order_products",
      new TableForeignKey({
        name: "OrdersProductsProduct",
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("order_products", "OrdersProductsOrder");
    await queryRunner.dropColumn("order_products", "order_id");
  }
}
