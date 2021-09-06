import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Sales extends BaseSchema {
  protected tableName = 'sales';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('client_name').notNullable();
      table.date('date').notNullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
