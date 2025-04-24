const { createAgent } = require('@veramo/core')
const { DIDManager } = require('@veramo/did-manager')
const { KeyManager } = require('@veramo/key-manager')
const { MemoryPrivateKeyStore } = require('@veramo/kms-local')
const { KeyManagementSystem } = require('@veramo/kms-local')
const { CredentialIssuer } = require('@veramo/credential-w3c')
const { DIDResolverPlugin } = require('@veramo/did-resolver')
const { getDidResolver } = require('did-resolver')
const { EthrDIDProvider } = require('@veramo/did-provider-ethr')

const agent = createAgent({
  plugins: [
    new KeyManager({
      store: new MemoryPrivateKeyStore(),
      kms: {
        local: new KeyManagementSystem(),
      },
    }),
    new DIDManager({
      providers: {
        'did:ethr': new EthrDIDProvider({
          defaultKms: 'local',
          network: 'goerli', // use testnet
          rpcUrl: 'https://rpc.ankr.com/eth_goerli' // or any Goerli RPC
        }),
      },
      defaultProvider: 'did:ethr',
    }),
    new CredentialIssuer(),
    new DIDResolverPlugin({
      resolver: getDidResolver()
    })
  ],
})

// EXPORT AGENT FOR USE IN OTHER FILES
module.exports = { agent }
