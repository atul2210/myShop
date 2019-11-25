import { Injectable } from "@angular/core";
export class pagedata
{
    ItemName :string;
    Active:boolean;
    AvailableColor:string;
    AvailableQty:number;
    brand :string;
    CategoryId:number;
    Color :string;
    detailId:number ;
    image :string;
    InitialQty:number ;
    DeliveryCharges:number;
    itemDescription :string;
    OfferPrice:number;
    Price:number;
    ReserveQty:number;
    SizeId:number;
    ItemId:number
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}

@Injectable()
export class responseData{
    Count: number;
    Results: Array<pagedata>;

}




export interface Ipagedata{
    Count: number;
    Results: Array<pagedata>;
}