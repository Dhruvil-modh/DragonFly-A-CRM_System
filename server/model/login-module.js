
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const ESchema = mongoose.Schema({
    firstname : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
});


/*ESchema.pre("save" , async function(next){
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("current password" +password);
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
*/
const users_crediantial = mongoose.model('users_crediantial', ESchema);

module.exports = users_crediantial;