var db = require("../config/mongo-connect")
const constants = require("../config/constants.js")

module.exports = {

    createUserStorage: (id) =>{
        return new Promise(async(resolve, reject) => {
            let newCollection = {
                    userId: id,
                    messages: []
            };
            db.getDb().collection(constants.msge).insertOne(newCollection).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    },

    addMessage: (id,message) => {
        return new Promise((resolve, reject) => {
            db.getDb().collection(constants.msge).updateOne({ userId: id },{ $push: { messages: message }}).then(data =>{
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    },

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