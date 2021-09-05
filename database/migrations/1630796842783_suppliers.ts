import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Suppliers extends BaseSchema {
  protected tableName = 'suppliers';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('name').notNullable();
      table.decimal('commission').notNullable();
      table.boolean('active').defaultTo(true);
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
