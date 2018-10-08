import { JsonController, Get, BadRequestError, Body, Post, Authorized, Delete, Param, NotFoundError} from "routing-controllers";
import {Shop} from './entity'

@JsonController()
export class ShopsController {

  @Authorized()
  @Post('/shops')
  async newShop(
    @Body() shops: any,//object[]
  ) {
    if (shops.length === 0) {
      throw new BadRequestError('Shops is not an array')
    }
    const savedShops: any = []
    shops.forEach(async (shop) => {
      if (shop.storeName) {
        const newShop = await Shop.create(shop)
        newShop.save()
        savedShops.push(newShop)
      }
    })
    return {newShops: savedShops}
  }

  @Get('/shops')
  async allShops() {
    const shops = await Shop.find()
    if (!shops) throw new BadRequestError(`Can't find any shops`)
    return {shops}
  }

  @Delete('/shops/:id')
  async deleteShop(
    @Param('id') id: number
  ) {
    const shop = await Shop.findOne(id)
    if (!shop) throw new NotFoundError('Shop doesnt exist')
    return Shop.delete(shop)
  }



}