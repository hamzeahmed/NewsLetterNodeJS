const express = require('express');
const myBodyParser = require("body-parser");
const request = require("request");
const https =  require("https");
const { response } = require('express');

const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/singup.html')
});
app.post("/",(req,res)=>{
    const firstName =req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members:[
            {
                email_address: email, 
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/83ab2e7eae";
    const options = {
        method: "POST",
        auth:"Hamze:69fc957686a4a3dc535aa18bad52bdde-us5"
    }
    const request = https.request(url,options,(response)=>{
        if (response.statusCode === 200){
            res.sendFile(__dirname+'/success.html')
        }else{
            res.sendFile(__dirname+'/failure.html')
        }
        response.on("data",(data)=>{
            //const repondedData = JSON.parse(data);
        })
    })

    request.write(jsonData);
    request.end();
})
app.post('/failure', (req,res) => {
    res.redirect('/')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
//69fc957686a4a3dc535aa18bad52bdde-us5
// list id
// 83ab2e7eae