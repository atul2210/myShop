export class checkedInItems
{
        
        public id :number ;
        public  userIp:string ;
        public  itemId:number ;
        public  quantity:number ;
        public  checkOut:boolean ;
        public  colorid:number ;
        public  userSessionId:string ;
        public  color:string ;
        public  itemname:string ;
        public  colorname:string ;
        public  price:number ;
        public  offerprice:number ;
        public  deliveryCharges:number ;
        public  imageUrl:string ;
        public  brand:string ;
}

export class checkedInItemsArray
{
        body:checkedInItems []=[];
     
}