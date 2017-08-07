var express = require('express')
var app = express();
var db = require('./sqlCon');
    

app.use(express.static('public'));
app.get('/htmlpage', function (req, res) {
   res.sendFile( __dirname + "/" + "formappl.htm");
});

app.use(express.static('public'));
app.get('/employeepage', function (req, res) {
   res.sendFile( __dirname + "/" + "employee.htm" );
});

app.get('/save', function (req, res) {
    db.SaveRecord(req,function(saveData){
        //db.SaveRecord(function(saveData){
        //console.log(saveData);
        
        res.json(saveData);
    })
});
app.get('/list', function (req, res) {
   // Prepare output in JSON format
   db.getRecords(function(records){
       console.log(records);
       res.json(records);
       //console.log("res==> ", res);
   })
   
})

app.get('/update'),function(req,res)
{
    db.updateRecords(function(record){
        console.log(record);
        res.json(record);
    })
}
app.get('/user/:id', function(req, res) {
  //res.send("tagId is set to " + req.params.tagId);
  res.sendFile(__dirname + "/employee.htm?"+req.params.id);
});
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});

//respond with "hello world" when a GET request is made to the homepage
//app.get('/htmlpage', function (req, res) {  
   //res.sendFile(__dirname + "/formappl.htm");  
//});

app.post('/',function(req,res){
    res.send('POST request to the homepage')
});
// app.listen(8089,function(){  
//     console.log("Server is running .....");  
// });
