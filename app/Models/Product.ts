import { DateTime } from 'luxon';
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Supplier from './Supplier';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public supplierId: number;

  @column()
  public userId: number;

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
    foreignKey: 'supplierId',
  })
  public supplier: BelongsTo<typeof Supplier>;

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>;
}
