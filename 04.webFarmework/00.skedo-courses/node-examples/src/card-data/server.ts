import express from 'express'
import { Card, CardAttributes } from './Card'

import {Op, WhereOptions} from 'sequelize'
import { Db } from './Db'

const app = express()

app.get('/export-csv', async (req, res) => {
  res.set('Content-Type', 'application/octet-stream')
  let csv = ''

  const all = await Card.findAll()
  const data = all.filter(x => x.info.find(x => x.alg === 'ETH - Ethash (Phoenix)'))


  res.send(data.map(x => {
    const eth = x.info.find(x => x.alg === 'ETH - Ethash (Phoenix)')
    return `${x.title}, ${eth.rate}`
  }).join('\n'))
})

app.get('/', async (req, res) => {
  const {page, title} = req.query 


  let pageNumber = parseInt(page as string)
  if(Number.isNaN(pageNumber)) {
    pageNumber = 1
  }

  const conditions : WhereOptions<CardAttributes> = {} 
  if(title) {
    conditions.title = {
      [Op.like] : `%${title}%`,
    }
  }

  const result = await Card.findAll({
    where: conditions,
    offset: (pageNumber - 1) * 20,
    limit: 20,
  });

  res.send(result)


})

app.listen(3018)