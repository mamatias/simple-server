const http = require('http');

var myport = 8080;
var mydate = null;
var datestr = '';

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/echo') {
    let body = [];
    mydate = new Date
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      datestr = mydate.getFullYear()+'/'
      +(mydate.getMonth()+1)+'/'
      +mydate.getDate()+' '
      +mydate.getHours()+':'
      +mydate.getMinutes()+':'
      +mydate.getSeconds();
      response.setHeader('X-Powered-By', 'MTR');
      response.end(body+'\n'+datestr);
      console.log('Nuevo POST en server espejo | Timestamp: '
        +datestr
    );
    });
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(myport);

console.log('Listening on port: '+myport);