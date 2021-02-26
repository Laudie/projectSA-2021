var http = require('http');
const https = require('https');

var datacenterOnLine = true;

const request = require('request');

var urldc1 = "http://dc1-service-sa-2021.apps-crc.testing/"
var urldc2 = "http://dc2-service-sa-2021.apps-crc.testing/"

// call my function every 5 seconds
var timer = setInterval(function() {

  if(datacenterOnLine){
    var randomico = Math.floor(Math.random() * 100) + 1;
    request(urldc1 + 'T1/'+randomico, { json: true }, (err, res, body) => {
      if (res.statusCode==503) { 
        datacenterOnLine = false;
        console.log("Datacenter 1 T1 : Offline")
        
      } 
      else{
        console.log("Datacenter 1 T1 SERVICE : "+res.body);
      }
      });

    request(urldc1 + 'T2', { json: true }, (err, res, body) => {
    if (res.statusCode==503) { 
      console.log("Datacenter 1 T2 : Offline")
      
    } 
    else{
      console.log("Datacenter 1 T2 SERVICE : "+res.body);
    }
    });
    var randomico2 = Math.floor(Math.random() * 100) + 1;

    request(urldc2+'T1/'+randomico2, { json: true }, (err, res, body) => {
      if (res.statusCode==503) { 
        datacenterOnLine = false;
        console.log("Datacenter 2 T1 : Offline")
        
      } 
      else{
        console.log("Datacenter 2 T1 SERVICE : "+res.body);
      }
      });

    request(urldc2+'T2', { json: true }, (err, res, body) => {
    if (res.statusCode==503) { 
      console.log("Datacenter 2 T2:Offline")
      
    } 
    else{
      console.log("Datacenter 2 T2 SERVICE : "+res.body);
    }
    });


    
  }
  else{
    request('https://908xrsdblf.execute-api.us-east-1.amazonaws.com/default/ipdataora', { json: true }, (err, res, body) => {
      if (err) { 
        console.log("AWS1 : Offline")
        
      }
      else{
        
        console.log("AWS LAMBDA PER T2 SERVICE : "+res.body);

      }
    });
    request('https://908xrsdblf.execute-api.us-east-1.amazonaws.com/default/ipdataora', { json: true }, (err, res, body) => {
      if (err) { 
        console.log("AWS2 : Offline")
        
      }
      else{
        
        console.log("AWS LAMBDA PER T2 SERVICE : "+res.body);

      }
    });
    var randomico2 = Math.floor(Math.random() * 100) + 1;

    request(urldc2+ 'T1/'+randomico2, { json: true }, (err, res, body) => {
      if (res.statusCode==503) { 
        datacenterOnLine = false;
        console.log("Datacenter 2 T1 : Offline")
        
      } 
      else{
        console.log("Datacenter 2 T1 SERVICE : "+res.body);
      }
      }); 
      var randomico2 = Math.floor(Math.random() * 100) + 1;

      request( urldc2+'T1/'+randomico2, { json: true }, (err, res, body) => {
        if (res.statusCode==503) { 
          datacenterOnLine = false;
          console.log("Datacenter 2 T1 : Offline")
          
        } 
        else{
          console.log("Datacenter 2 T1 SERVICE : "+res.body);
        }
        });
      request( urldc1+'T1/'+randomico2, { json: true }, (err, res, body) => {
          if (res.statusCode==503) { 
            
          } 
          else{
            datacenterOnLine = true;
          }
          });

  } 

}, 5000);


var server = http.createServer(function(req, res) { 
    res.writeHead(200, {"Content-Type": "text/html"}); 
    res.end('<p>'+aws+'</p>');
  });
  
  server.listen(8080);
