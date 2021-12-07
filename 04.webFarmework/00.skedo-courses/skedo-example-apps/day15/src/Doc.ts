import {Sequelize, Model, Optional, DataTypes} from 'sequelize'

const sequelize = new Sequelize({
  dialect : "sqlite",
  database : "mytest"
})
// sql + no-sql : postgre
interface DocAttributes {
	id : number,
	type : string,
	idx : string,
	doc : string
}

interface DocCreationAttributes extends Optional<DocAttributes, "id"> {}

class Doc extends Model<DocAttributes, DocCreationAttributes>{
	public id!:number
}

Doc.init({
	id : {
		type : DataTypes.INTEGER,
		autoIncrement :true,
		primaryKey : true
	},
	type : {
		type : DataTypes.STRING,
	},
	idx : {
		type : DataTypes.STRING,
		unique : true
	},
	doc: {
		type : DataTypes.JSON
	}

}, {
	sequelize : sequelize,
	modelName : "Doc",
	tableName : 'doc'
})


Doc.sync({
  force:true
})
