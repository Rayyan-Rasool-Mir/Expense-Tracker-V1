const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, reg: "User", required:true},
    icon: {type: String},
    source : {type: String, required: true},
    amount : {type: Number, required:true},
    date : {type: Date, default: Date.now},
}, {timestamps:true});

module.exports = mongoose.model("Income", incomeSchema);
