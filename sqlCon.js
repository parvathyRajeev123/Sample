var mysql = require('mysql'), http = require('http');
var con =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "employee"
});

con.connect(function(err){
  if(!err){
    console.log("Connected"); 
  }else{
    console.log("error");
  }
});

//get Records
exports.getRecords = function (cb) { 
   con.query('select * from employee_list;', function (err, resp) {
     if (err) throw err;
     return cb(resp);
     // if there are no errors send an OK message.
   });
 };

 exports.getSingleRecords = function (req, cb) { 
  console.log("get Single Records...,",req);
   con.query('select * from employee_list where Emp_id=?;', [req], function (err, resp) {
     if (err) throw err;
     return cb(resp);
     // if there are no errors send an OK message.
   });
 };

//Adding Record
exports.SaveRecord= function(req,sv) {
    console.log("Save Record...,",req.query);
    var rdata=[req.query.Emp_id,req.query.empName];
    con.query('insert into employee_list (Emp_id,UserName) Values (?,?)',rdata,function(err,resp){
      if(err) throw err;
      return sv(resp);
    });
};

exports.addTodoRecord = function(req,ad) {
  console.log("Add Record...,",req.query);
  var adata=[req.query.empID,req.query.todo];
  con.query('insert into employee_todo (Emp_id,Emp_todo) Values (?,?)',adata,function(err,resp){
      if(err) throw err;
      return ad(resp);
  });
}; 

//update record
exports.updateRecord= function(req,sv) {
    console.log("Update Record...,",req.query);
    var credfull = {
        Emp_id: req.query.Pre_Emp_id,
        UserName: req.query.empTodo
    }
    whereclause = {
        Emp_id: req.query.previousId
    };
    con.query('UPDATE employee_list SET ? WHERE ?', [credfull, whereclause],function(err,resp){
      if(err) throw err;
      return sv(resp);
    });
};

//Deleting Record
exports.DeleteRecord=function(req,dl){
    console.log("Record deleted....",req);  
    con.query('delete from employee_list where Emp_id = ?;',[req],function(err,resp){
      if(err) throw err;
      return dl(resp);
    });
};