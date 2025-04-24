const { agent } = require('./index')

app.post('/issue', async (req, res) => {
  try {
    const identifier = await agent.didManagerGetOrCreate({ alias: 'issuer' })

    const verifiableCredential = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: identifier.did },  // ✅ Now it's a managed DID!
        credentialSubject: {
          id: 'did:example:123',
          name: 'Rahul Rao',
          course: 'VC Basics'
        }
      },
      proofFormat: 'jwt',
      save: false
    })

    res.json(verifiableCredential)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error issuing VC')
  }
})
