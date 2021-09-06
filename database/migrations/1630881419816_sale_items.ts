import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class SaleItems extends BaseSchema {
  protected tableName = 'sale_items';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('sale_id').unsigned().references('id').inTable('sales').onDelete('CASCADE');
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
      table.string('name').notNullable();
      table.integer('quantity').notNullable();
      table.decimal('price').notNullable();
      table.decimal('commission').notNullable();
      table.integer('replacement_id').unsigned().references('id').inTable('sale_items').onDelete('CASCADE').nullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
