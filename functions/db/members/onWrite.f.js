const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports = module.exports = functions.database.ref('/members/{uid}').onWrite((eventSnapshot, context) => {
  const { uid } = context.params
})
