import { Model, Optional, DataTypes } from "sequelize"
import { Db } from "./Db"

// sql + no-sql : postgre
export interface CardAttributes {
  id: number;
  title : string;
  info : {
    alg : string,
    rate : number
  }[]
}

interface CardCreationAttributes extends Optional<CardAttributes, "id"> {}

export class Card extends Model<CardAttributes, CardCreationAttributes> {
  public id!: number;
  public title : string;
  public info: { alg: string; rate: number }[];
}

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    info: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize: Db.getDb(),
    modelName: "Card",
    tableName: "card",
  }
);

// Card.sync({
//   force : true
// })
