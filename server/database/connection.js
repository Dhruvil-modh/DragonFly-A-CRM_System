const mongoose = require('mongoose');

const connectDB = async () => {
    try{
       
        //For connect to Atlas
        const mongoString = "mongodb+srv://dhruvmodi1975:Dhruvil@dragonfly.w6y6h.mongodb.net/TodoTest?retryWrites=true&w=majority"
        const con = await mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true } )


        //For connect to local Mongo Compass
        // mongodb connection string
        // const con = await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useFindAndModify: false,
        //     useCreateIndex: true
        // })

        

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB



