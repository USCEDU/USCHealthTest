// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
String.prototype.format = function(args) {
  var result = this;
  if (arguments.length < 1) {
    return result;
  }

  var data = arguments;       //如果模板参数是数组
  if (arguments.length == 1 && typeof (args) == "object") {
    //如果模板参数是对象
    data = args;
  }
  for (var key in data) {
    var value = data[key];
    if (undefined != value) {
      result = result.replace("{" + key + "}", value);
    }
  }
  return result;
}

applicationId= "";
applicationKey="";

AV.Cloud.define("insert", insertObj);
AV.Cloud.define("delete",deleteObj);
AV.Cloud.define("search", searchObj);
AV.Cloud.define("on2mul", one2mutil);
AV.Cloud.define("timeout", timeDelay);

function deleteObj(request, response){
  var msg = '';
  param = request.params;
  table = param.table;
  column = param.column;
  valuse = param.valuse;
  if(table == undefined) {
    msg = msg + "no table name";
    response.error(msg)
  }
  if(column == undefined) {
    msg = msg + "no column";
    response.error(msg)
  }
  msg = msg + 'table {0} colume {1} valuse {2} '.format(table, column, valuse);
  var query = new AV.Query(table);
  query.equalTo('name', 'xxsa');
  name = query.get(valuse);
  response.success(msg);
  query.find({
    success:function (results){
      query.destroyAll({
        success:function(){},
        error:function() {}
      })
    },
    error:function (error){}
  })
}

function timeDelay(request, response){
  setTimeout(function(){
    console.log('====timeout====')
    response.success('timeout')
  },25000);
}

function insertObj(request, response){

  var msg = '';
  param = request.params;
  table = param.table;
  column = param.column;
  valuse = param.valuse;
  //msg = msg + 'table {0} colume {1} valuse {2}'.format('1', '2', '3');
  //response.success('msg is ' + msg);
  if(table == undefined) {
    msg = msg + "no table name";
    response.error(msg)
  }
  if(column == undefined) {
    msg = msg + "no column";
    response.error(msg)
  }
  msg = msg + 'table {0} colume {1} valuse {2} '.format(table, column, valuse);
  var saveTable = AV.Object.extend(table);
  var mySave = new saveTable();
  mySave.set(column,valuse);

  mySave.save(null, {
    success:function(){
      msg = msg+"save success";
      response.success(msg)
    },
    error:function (){
      msg = msg+"save error" + error.message;
      response.error(msg)
    }
  });
}

function searchObj(request, response) {
  var msg = '';
  param = request.params;
  table = param.table;
  column = param.column;
  values = param.valuse;
  if(table == undefined) {
    msg = msg + "no table name";
    response.error(msg)
  }
  if(column == undefined) {
    msg = msg + "no column";
    response.error(msg)
  }
  msg = msg + 'table {0} colume {1} valuse {2} '.format(table, column, valuse);
  var query = new AV.Query(table);
  query.equalTo(column, values);
  query.find({
    success:function(res) {
      response.success(res)
    },
    error:function(object, error) {
      response.error(error.message)
    }
  });
}

function one2mutil(request, response){
  var Post = AV.Object.extend("Post");
  var Comment = AV.Object.extend("Comment");

// Create the post
  var myPost = new Post();
  myPost.set("title", "I'm Hungry");
  myPost.set("content", "Where should we go for lunch?");

// Create the comment
  var myComment = new Comment();
  myComment.set("content", "Let's do Sushirrito.");

// Add the post as a value in the comment
  myComment.set("parent", myPost);

// This will save both myPost and myComment
  myComment.save();
}

