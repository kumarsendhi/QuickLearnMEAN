var express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express()

mongoose.connect('mongodb://localhost:27017/darealist');

var areaSchema = require('./public/models/areaSchema');

var jsonParser = bodyParser.json();

app.use(express.static(__dirname+'/public'));

app.post('/arealist',jsonParser,function(req,res){
    console.log(req.body);
    var area = new areaSchema(req.body);
    area.save(function(err,docs){
        if(err){
            console.log(err);
        }
        else{
            res.json(docs);
        }
    })
})

app.get('/arealist',function(req,res){
    console.log("I received a Get Request");
    areaSchema.find({},function(err,docs){
        if(err){
            console.log("Error getting arealist");
        }
        else{
            console.log("Result: "+docs);
            res.json(docs);
        }
    })

    //res.send(areas);
})

app.delete('/arealist/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
areaSchema.remove({_id:req.params.id},function(err,docs){
    if(err){
        console.log("Error removing area")
    }
    else{
        console.log(docs);
        res.json(docs);
    }
})
})

app.get('/arealist/:id',function(req,res){
    var id= req.params.id;
    console.log(id);
    areaSchema.findOne({_id:req.params.id},function(err,docs){
        if(err){
            console.log('Error getting particular area')
        }
        else{
            console.log("Result: "+docs);
            res.json(docs);
        }
    })
})

app.put('/arealist/:id',jsonParser,function(req,res){
    var id = req.params.id;
    console.log(req.body);
    areaSchema.findById({_id:req.params.id},function(err,doc){
        if(err){
            console.log("Error getting document");
            return;
        }
        else{
            console.log("found for update"+doc);
            doc.country = req.body.country;
			doc.state = req.body.state;
			doc.district = req.body.district;
			doc.area = req.body.area;
			doc.pincode = req.body.pincode;

            doc.save(function(err,docs){
                if(err){
                    console.log(err);
                }
                else{
                    res.json(docs);
                }
            }
            )

        }
    })
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})