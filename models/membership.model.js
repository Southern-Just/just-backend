import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'membership name is required'], trim: true, minlength: 2, maxlength: 100},
    price: {type: Number, required: [true, 'membership price is required'], min:[0,'price must be greater than 0']},
    currency:{type: String, enum:['USD','EUR','KES'], default: 'USD'},
    frequency:{type: String, enum:['daily','weekly','monthly', 'annually']},
    category:{type:String, enum:['sports', 'news', 'entertainment', 'lifestyle', 'technology','finance', 'politics', 'other'], required: true},
    paymentMethod:{type:String,required:true, trim:true},
    status:{type:String, enum:['active','canceled', 'expired'], default: 'active'},
    startDate:{type:Date, required:true, validate:{validator:(value)=> value <= new Date(),message:'start date must be in the past'}, default: Date.now},
    renewalDate:{type:Date, required:true, validate:{validator:function(value){return value > this.startDate;},message:'renewal date must be after the start date'},},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required: true, index: true},

}, {timestamps: true});

//auto calculates renewal date if missing
membershipSchema.pre('save', function (next) {
    if(!this.renewalDate){
        const renewalPeriods ={
            daily:1,
            weekly:7,
            monthly:30,
            annually:365,
        };
        this.renewalDate=new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]);
    }
    // auto update status
    if(this.renewalDate < new Date()){
        this.status='expired';
    }
    next();

})

const membership = mongoose.model('Membership', membershipSchema);
export default membership;