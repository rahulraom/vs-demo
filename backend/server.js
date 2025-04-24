const express = require('express')
const bodyParser = require('body-parser')
const { agent } = require('./index')

const app = express()
app.use(bodyParser.json())

app.post('/verify', async (req, res) => {
  try {
    const result = await agent.verifyCredential({ credential: req.body.vc })
    res.json({ valid: result.verified })
  } catch {
    res.json({ valid: false })
  }
})

app.listen(3000, () => console.log("VC verifier running on port 3000"))
