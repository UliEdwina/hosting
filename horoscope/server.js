const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const port = process.argv[2] || 8000

console.log(process.argv)

const mineType = {
    '.icon': 'image/x-icon',
    '.html': 'text html',
    '.js': `text/javascript`,
    '.json': `application/json`,
    '.css': `text/css`,
    '.png': 'image/png',
    '.jpg': "image/jpg",
    '.wav': 'audio/wave ',
    '.mp3': 'adio/mp3',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms=sontobject',
    '.ttf': 'application/font=sfnt'

}

http.createServer(function(req, res) {
    console.log(`${req.method} ${req.url}`)
    const parseURL = url.parse(req.url)
    
    // Avoid Directory traversal attack
    const sanitizePath = path.normalize(parseURL.pathname).replace(/^(\.\.[\/\\])+/, '')

    let pathName = path.join(__dirname, sanitizePath)

    fs.exists(pathName, function(exist) {
        if (!exist) {
            res.statusCode = 404
            res.end(`File ${pathName} notfound`)
            return
        }


        if (fs.statSync(pathName).isDirectory()) pathName += '/index.html'

        fs.readFile(pathName, function (err, data){
            if (err) {
                res.statusCode = 500
                res.end("error")
                console.log(err)
            } else {
                const ext = path.parse(pathName).ext

                res.setHeader('Content-type', mineType[ext] || 'text/plain')
                res.end(data)
            }
        })
    })
}).listen(parseInt(port))
