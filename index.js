const { createSign, createVerify } = require("crypto")
const fs = require("fs")
const { cwd } = require('process')
const path = require('path')

const privateKey = fs.readFileSync("./certs/private.pem").toString()
const publicKey = fs.readFileSync("./certs/key.pub").toString()
const data = fs.readFileSync("./data/lic.json").toString()

const sign = createSign("RSA-SHA256")
sign.write(data)
sign.end()

const signature64 = sign.sign(privateKey).toString("base64")
const data64 = Buffer.from(data).toString("base64")

const license = Buffer.from(`${signature64}\n${data64}`).toString("base64")
const fp = path.join(cwd(), 'license.txt')
fs.writeFileSync(fp, license)