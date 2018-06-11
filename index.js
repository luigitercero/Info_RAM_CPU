
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/', function (req, res) {

    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('monitor/pages/index', {
        drinks: drinks,
        tagline: tagline
    });
});

app.get('/prueba', function (req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('ejs/pages/index', {
        drinks: drinks,
        tagline: tagline
    });
});


app.get('/about', function (req, res) {
    res.render('ejs/pages/about');
});

app.post('/endpoint', function (req, res) {
    var obj = {};
    var fs = require('fs');
    let rut = "/proc/memorias_info";
    //let rut = "/home/luigitercero/Documentos/cpu"
    let archivo = fs.readFileSync(rut, 'utf-8');
    res.send(JSON.parse(archivo));
});

app.post('/proc', function (req, res) {
    var obj = {};
    var fs = require('fs');
    let rut = "/proc/info_procesos_201408606"
    //let rut = "/home/luigitercero/Documentos/proc"
    let archivo = fs.readFileSync(rut, 'utf-8');
    res.send(JSON.parse(archivo));
});

app.post('/matar', function (req, res) {
    var fs = require('fs');
    var obj = {};

    const exec = require('child_process').exec;
    const child = exec('kill ' + req.message,
        (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    res.send(req.body);

});

app.listen(8080, function () {
    console.log('Example app listening on port 3000!');
});
