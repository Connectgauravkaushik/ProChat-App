const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        pic: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }
    },
    {
        timestamp: true
    }
);

//check if password is valid or not
userSchema.methods.validPassword = async function(Enteredpassword){
    return await bcrypt.compare(Enteredpassword , this.password);
}

//Before saving the password it will Encrpt the password

// userschema.pre('save') function is a pre-hook in Mongoose that triggers 
// whenever a database operation is performed. Pre-hooks can be used for 
// a variety of purposes, including: Custom validations, 
// Generating hash passwords, and Excluding archived documents in each find call.
// The syntax for the Schema.prototype.pre() method is Schema.prototype.pre(methodName, options, callback)
// The next parameter is a function provided by Mongoose to indicate that the execution chain should continue with the next step.


userSchema.pre("save" , async function(next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password , salt);
})

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;