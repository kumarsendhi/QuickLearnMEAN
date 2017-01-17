var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var areaSchema = new Schema({
    country:String,
    state:String,
    district:String,
    area:String,
    pincode:String
})

var areaCollection = mongoose.model('areaCollection',areaSchema);

module.exports = areaCollection