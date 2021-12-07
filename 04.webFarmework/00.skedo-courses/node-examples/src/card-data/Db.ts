import path from 'path'
import {Sequelize} from 'sequelize'

export class Db {
  private static inst : Db = new Db()
 
  private db : Sequelize

  public static getDb(){
    return Db.inst.db 
  }

  public constructor(){
    this.db = new Sequelize({
      dialect : "sqlite",
      database  : "cards",
      storage : path.resolve(__dirname, "./data.db")
    })
  }




}