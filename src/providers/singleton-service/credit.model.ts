export interface Credit{
  value:Number,
  createdAt:string,
  through:boolean
}

export interface CreditId extends Credit{
  key:string
}