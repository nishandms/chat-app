var db = require("../config/mongo-connect")
const constants = require("../config/constants.js")
const bcrypt = require('bcrypt');
const { user } = require("../config/constants.js");

module.exports = {
    signup: (user) => {
        return new Promise(async (resolve, reject) => {
            user.password = await bcrypt.hash(user.password, 10);
            db.getDb().collection(constants.user).insertOne(user).then((data) => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    authenticate: (user) => {
        return new Promise(async (resolve, reject) => {
            let userData = await db.getDb().collection(constants.user).findOne({ username: user.username })
            if (userData) {
                bcrypt.compare(user.password, userData.password).then(data => {
                    if (data) {
                        console.log(`${user.username} successfuly logged in`);
                        resolve(true);
                    }
                    else {
                        resolve(false);
                        console.log("login failed")
                    }
                })
            }
            else {
                reject(true);
            }
        })
    }
}