// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
applicationId= "";
applicationKey="";

AV.Cloud.define("hello", function(request, response) {
  console.log("console test");
  //response.success("Hello world!");
  //response.success("Hello world!");
  var MyTest = AV.Object.extend("test1");
  //response.success("start save");
  var test = new MyTest();
  test.set("1","test1");

  test.save(null, {
    success:function(){
      response.success("save success")
    },
    error:function (){
      response.success("save error", + error.message);
    }
  })

});
