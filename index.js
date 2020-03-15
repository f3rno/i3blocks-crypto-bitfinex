#!/usr/bin/env node
'use strict'

const { symbol: BLOCK_SYMBOL } = process.env
const { RESTv2 } = require('bfx-api-node-rest')
const { preparePrice } = require('bfx-api-node-util')

const CCY_ICONS = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  GBP: '£',
  BTC: '\uf15a',
  ETH: '\ufcb9'
}

const rest = new RESTv2({ transform: true })

const run = async () => {
  const symbol = BLOCK_SYMBOL[0] === 't' ? BLOCK_SYMBOL : `t${BLOCK_SYMBOL}`
  const base = symbol.substring(1, 4)
  const quote = symbol.substring(4)
  const ticker = await rest.ticker(symbol)
  const { lastPrice, dailyChangePerc } = ticker
  let str = base

  if (CCY_ICONS[quote]) {
    str += ` ${CCY_ICONS[quote]}`
  }

  str += `${+preparePrice(lastPrice)}`
  str += ` ${(dailyChangePerc * 100).toFixed(2)}%`

  console.log(str)
}

try {
  run()
} catch (e) {
  console.error(e.message)
}
