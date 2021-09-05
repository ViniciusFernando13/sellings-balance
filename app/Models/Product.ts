import { DateTime } from 'luxon';
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Supplier from './Supplier';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public supplier_id: number;

  @column()
  public user_id: number;

  @column()
  public name: string;

  @column()
  public price: number;

  @column()
  public inventory: number;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Supplier, {
    foreignKey: 'supplier_id',
  })
  public supplier: BelongsTo<typeof Supplier>;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>;
}
