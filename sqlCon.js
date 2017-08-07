var mysql = require('mysql');
var con =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "employee"
});
//get Records


//Adding Record
exports.SaveRecord= function(req,sv) {
  console.log("Save Record...,",req.query);
var rdata=[req.query.Emp_id,req.query.UserName,req.query.todoList];
  con.query('insert into employee_list (Emp_id,UserName,todoList) Values (?,?,?)',rdata,function(err,resp)
   //con.query('delete from form_details where name = ?',rdata,function(err,resp)
{if(err) throw err;
return sv(resp);
});
};
exports.getRecords = function (cb) { 
   con.query('select * from employee_list;', function (err, resp) {
     if (err) throw err;
     return cb(resp);
     // if there are no errors send an OK message.
   });
 };

//Deleting Record
exports.DeleteRecord=function(req,ur){
  console.log("Record Added....",req.query);
  var updata=[req.query.Emp_id,req.query.UserName,req.query.todoList];
  
  con.query('delete from employee_list where Emp_id = ? and UserName=?',rdata,function(err,resp){
    if(err) throw err;
return sv(resp);
});
  };

 
  exports.getSingleRecords = function (req, cb) { 
  console.log("Save Record...,",req.params.tagId);
  //return cb(req);
   con.query('select * from employee_list where Emp_id=?;', [req.params.tagId], function (err, resp) {
     if (err) throw err;
     return cb(resp);
     // if there are no errors send an OK message.
   });
 };