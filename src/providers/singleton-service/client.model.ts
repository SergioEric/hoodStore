export interface Client{
  name:string,
  phone:string,
  address:string
}

export interface ClientID extends Client{
  key:string
}