const mongoose = require('mongoose');

const MassageSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please add a name'],
        unique: true,
        trim: true,
        maxlength:[50,'Name cannot be more than 50 characters']
    },
    address:{
        type:String,
        required:[true,'Please add an address']
    },
    district:{
        type:String,
        required:[true,'Please add a district']
    },
    province:{
        type:String,
        required:[true,'Please add a province']
    },
    postalcode:{
        type:String,
        required:[true,'Please add a postalcode'],
        maxlength:[5,'Postal Code cannot be more than 5 digits']
    },
    tel:{
        type:String
    },
    region:{
        type:String,
        required:[true,'Please add a region']
    },
    opentime: {
        type: String,
        required: [true, 'Please add an opening time'],
      },
      closetime: {
        type: String,
        required: [true, 'Please add a closing time'],
    },
},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

MassageSchema.pre('deleteOne',{document:true,query:false},async function(next){
    console.log(`Appointments being removed from Massage shop ${this._id}`);

    await this.model('Appointment').deleteMany({massageshop:this._id});
    
    next();
});



// Reverse populate with virtuals
MassageSchema.virtual('appointments',{
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'massageshop',
    justOne:false
});

MassageSchema.virtual('massagers',{
    ref: 'Massager',
    localField: '_id',
    foreignField: 'massager',
    justOne:false
});

module.exports=mongoose.model('Massageshop',MassageSchema);