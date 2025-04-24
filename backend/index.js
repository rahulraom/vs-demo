const { createAgent } = require('@veramo/core')
const { KeyManager } = require('@veramo/key-manager')
const { DIDManager } = require('@veramo/did-manager')
const { CredentialIssuer } = require('@veramo/credential-w3c')

const agent = createAgent({
  plugins: [
    new KeyManager({}),
    new DIDManager({}),
    new CredentialIssuer(),
  ]
})

async function issueCredential() {
  const did = 'did:web:rahul.proceedit.com'
  const credential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: did },
      credentialSubject: {
        id: 'did:web:holder.user.com',
        role: 'Intern',
        verified: true,
      },
    },
    proofFormat: 'jwt',
  })

  console.log(JSON.stringify(credential, null, 2))
}

issueCredential()
