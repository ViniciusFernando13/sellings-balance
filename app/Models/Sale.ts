import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import SaleItem from './SaleItem';

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public clientName: string;

  @column.date()
  public date: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>;

  @hasMany(() => SaleItem, {
    foreignKey: 'saleId',
  })
  public saleItems: HasMany<typeof SaleItem>;
}
