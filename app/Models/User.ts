import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Supplier from './Supplier';
import Product from './Product';
import Sale from './Sale';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Supplier, {
    foreignKey: 'userId',
    onQuery: (query) => {
      query.where('active', true);
    },
  })
  public activeSuppliers: HasMany<typeof Supplier>;

  @hasMany(() => Supplier, {
    foreignKey: 'userId',
    onQuery: (query) => {
      query.where('active', false);
    },
  })
  public inactiveSuppliers: HasMany<typeof Supplier>;

  @hasMany(() => Supplier, {
    foreignKey: 'userId',
  })
  public suppliers: HasMany<typeof Supplier>;

  @hasMany(() => Product, {
    foreignKey: 'userId',
    onQuery: (query) => {
      query.where('active', true);
    },
  })
  public activeProducts: HasMany<typeof Product>;

  @hasMany(() => Product, {
    foreignKey: 'userId',
    onQuery: (query) => {
      query.where('active', false);
    },
  })
  public inactiveProducts: HasMany<typeof Product>;

  @hasMany(() => Product, {
    foreignKey: 'userId',
  })
  public products: HasMany<typeof Product>;

  @hasMany(() => Sale, {
    foreignKey: 'userId',
  })
  public sales: HasMany<typeof Sale>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
