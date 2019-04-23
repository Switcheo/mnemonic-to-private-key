const bip39 = require('bip39')
const hdkey = require('hdkey')
const bip44Constants = require('bip44-constants')

function getCoinType(blockchain) {
  return bip44Constants[blockchain] - 0x80000000
}

function getKey(root, coinType) {
  const addrNode = root.derive(`m/44'/${coinType}'/0'/0/0`)
  return addrNode._privateKey.toString('hex')
}

function printPrivateKeys(mnemonic) {
  const seed = bip39.mnemonicToSeed(mnemonic)
  const root = hdkey.fromMasterSeed(seed)

  const ethKey = getKey(root, getCoinType('ETH'))
  const neoKey = getKey(root, getCoinType('NEO'))

  const res = {
    ETH: ethKey,
    NEO: neoKey,
    mnemonic,
  }
  console.info(res)

  return null
}

printPrivateKeys(process.env.MNEMONIC)
