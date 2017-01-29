/**
 * Created by yuech on 1/29/2017.
 */
/**
 * Created by yuech on 1/28/2017.
 */
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));
//Lets define a port we want to listen to
const PORT=3000;

//We need a function which handles requests and send response
function handleRequest(req, res){
    var url = req.url;
    console.log("dirname: "+path.join(__dirname,url));
    //console.log(url);
    switch(req.method)
    {
        case 'GET':
            //console.log("get method");
            if (url == '/') {
                //console.log("slash");
                renderFile(res, path.join(__dirname,'video.html'));
            }
            else if(url == '/upload.html'){
                console.log("option");
                renderFile(res, path.join(__dirname,'upload.html'));
            }
            // else if (url == '/login') {console.log(path.join(__dirname, 'public','login.html'));renderFile(res, path.join(__dirname,'public','login.html'));console.log('read file end');}
            // else if (url == '/register') renderFile(res, path.join(__dirname,'public','register.html'));
            else renderFile(res, path.join(__dirname, url));
            break;
        default:
            console.log('method has not according solution');
    }}

function renderFile(res, file)
{
    console.log('render file');
    fs.readFile(file, function(err, data){
        if(err)
        {
            res.writeHead(404);
            res.write('File Not Found');
        }
        else
        {
            res.writeHead(200);
            res.write(data);
        }
        res.end();
    });
}
//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
