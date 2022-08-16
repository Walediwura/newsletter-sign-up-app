const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function (req, res){
res.sendFile(__dirname + '/signup.html');
});


app.post('/', function (req, res){
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.mail;
    const data = {
        members : [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]

    };

    const jsonData = JSON.stringify(data);
    const url = 'https://us12.api.mailchimp.com/3.0/lists/2a249dc924';
    const options = {
        method: 'POST',
        auth: 'Username: ???Your api token here'
    }



    const request = https.request(url, options, function (response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        }else{
            res.sendFile(__dirname + '/failure.html');
        }

        response.on('data', function (data){
            console.log(JSON.parse(data));
        });

    });


    

    // https://github.com/Walediwura/


    console.log(firstname, lastname, email);

    request.write(jsonData);

    request.end();
});

app.post('/failure', function (req, res){
    res.redirect('/');
});

app.listen(3000, function (){
    console.log('Server running on port 3000...');
});
