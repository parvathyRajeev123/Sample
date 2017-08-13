var express = require('express')
var app = express();
var db = require('./sqlCon');
//app.engine('.html', require('ejs').renderFile);  
// npm i node-localstorage
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}  

app.use(express.static('public'));

app.get('/list', function (req, res) {
   // Prepare output in JSON format
   db.getRecords(function(records){
       res.json(records);
   })
   
});

app.get('/listDetails/:empId', function(req, res) {
  localStorage.setItem('myFirstKey', req.params.empId);
  
  res.sendFile(__dirname + "/employee.htm");
});

app.get('/edit/:empId', function(req, res) {
  console.log("Edit: ", req.params.empId);
});

app.get('/delete/:empId', function(req, res) {
  console.log("Delete: ", req.params.empId);
  var delRec = req.params.empId;
  db.DeleteRecord(delRec, function(deleteRec){
    return res.redirect('/htmlpage');
  });
});

app.get('/second', function (req, res) {
  var second = localStorage.getItem('myFirstKey');
  db.getSingleRecords(second, function(getData){
    res.json(getData);
  });
});

app.get('/save', function (req, res) {
    db.SaveRecord(req,function(saveData){
      return res.redirect('/htmlpage');
    });
});

app.get('/add',function(req,res) {
    console.log('red to: ',req.query.empID);    
    db.addTodoRecord(req, function(addTodo){
        return res.redirect('/listDetails/'+req.query.empID);
    });
});

app.get('/update',function(req,res) {
  //var empId = req.query.empId;
  db.updateRecord(req, function(updateData) {
    res.json(updateData);
  });
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});

//respond with "hello world" when a GET request is made to the homepage
app.get('/htmlpage', function (req, res) {  
   res.sendFile(__dirname + "/formappl.htm");  
});
app.post('/',function(req,res){
    res.send('POST request to the homepage')
});