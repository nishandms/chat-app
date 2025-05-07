var mongoClient = require("mongodb").MongoClient;
const state = {
    db: null
};

module.exports.connect = (done) => {   
    const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jslxrzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`  
    const dbname = "chat-app"

    mongoClient.connect(url, (err, data) => {
        console.log(err, data);
        if (err) return err;
        state.db = data.db(dbname);
        done()
    })
};

module.exports.getDb = () => {
    return state.db;
}