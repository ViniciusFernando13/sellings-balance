import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import Sale from './Sale';
import Product from './Product';

export default class SaleItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public saleId: number;

  @column()
  public productId: number;

  @column()
  public name: string;

  @column()
  public quantity: number;

  @column()
  public price: number;

  @column()
  public commission: number;

  @column()
  public replacementId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Sale, {
    foreignKey: 'saleId',
  })
  public sale: BelongsTo<typeof Sale>;

  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  public product: BelongsTo<typeof Product>;

  @belongsTo(() => Product, {
    foreignKey: 'replacementId',
  })
  public replacement: BelongsTo<typeof Product>;

  @beforeSave()
  public static async completeProductData(saleItem: SaleItem) {
    const product = await Product.query().preload('supplier').where('id', saleItem.productId).firstOrFail();
    saleItem.name = product.name;
    saleItem.price = product.price;
    saleItem.commission = product.supplier.commission;
  }
}
