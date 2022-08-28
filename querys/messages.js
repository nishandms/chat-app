var db = require("../config/mongo-connect")
const constants = require("../config/constants.js")

module.exports = {
    addMessage: (message, callback) => {
        db.getDb().collection(constants.msge).insertOne(message).then((data) => {
            callback(data)
        })
    },
    // addPrduct: (product, callback) => {
    //     db.getDb().collection("product").insertOne(product).then((data) => {
    //         callback(data.insertedId.toString())
    //     })
    // },

    getAllMessages: () => {
        return new Promise(async(resolve, reject) => {
            let messages = await db.getDb().collection(constants.msge).find().toArray()
            resolve(messages)
        })
    },

    // removeProducts: (id) => {
    //     console.log(id)
    //     return new Promise(async(resolve, reject) => {
    //         let product = await db.getDb().collection(constants.product).deleteOne(id)
    //         resolve(product)
    //     })
    // }
}