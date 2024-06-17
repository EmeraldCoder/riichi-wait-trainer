import fs from 'fs'
import crypto from 'crypto'
import { mapTilesFromMPSZFormat, getUkeire } from '../../src/riichi-fn.js'

async function main () {
  const waitCases = JSON.parse(fs.readFileSync('./cases.json', { encoding: 'utf-8' }))

  const output = waitCases.map(x => ({
    id: crypto.randomUUID(),
    hand: mapTilesFromMPSZFormat(x.hand),
    calls: (x.calls ?? []).map(y => ({
      type: y.type,
      tiles: mapTilesFromMPSZFormat(y.tiles)
    }))
  }))

  // tests each question to see that it does not crash when we calculate the ukeire
  output.forEach(x => {
    getUkeire({ hand: x.hand, calls: x.calls })
  })

  fs.writeFileSync('./output.json', JSON.stringify(output, undefined, 2))
}

main()
