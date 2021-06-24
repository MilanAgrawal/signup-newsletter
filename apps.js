const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https = require("https");
const apps=express();
apps.use(express.static("public"));
apps.use(bodyparser.urlencoded({exxtended:true}));
apps.get("/",function(req,res)
{
  res.sendFile(__dirname + "/signup.html");
});
apps.post("/",function(req,res)
{
  const email=req.body.Email;
  const password=req.body.Password;
  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:
      {
        FNAME:password,
        LNAME:password
      }
    }]
  }
const jsondata=JSON.stringify(data);
const options={
  method:"POST",
  auth:"milanagrawal:876be32852783742fdb47b8717b15c27-us1"
}
const url="https://us1.api.mailchimp.com/3.0/lists/aa43eef3d7";
const request=https.request(url,options,function(response){
  if(response.statusCode===200)
  {
    res.send("succesfully signed up!😀😀");
  }
  else
  res.sendFile(__dirname+"/tryagain.html");
response.on("data",function(data)
{
  console.log(JSON.parse(data));

})
})
request.write(jsondata);
request.end();
});
apps.post("/tryagainroute",function(req,res)
{
  res.redirect("/");
})
apps.listen(3000,function()
{console.log(__dirname);
  console.log("the server is running good");
})
//876be32852783742fdb47b8717b15c27-us1==apikey
//==uniqueid
