/*import { parse } from 'node-html-parser';
import fs from 'fs';
import path from 'path';
*/

let parse = require('node-html-parser').parse;

let fs = require('fs');
path = require('path'),    
filePath = path.join(__dirname, 'isi_email.html');

let data = fs.readFileSync(filePath, {encoding: 'utf-8'});
let parsed = parse(data,{style: true});

let body = parsed.querySelector("body");
body = body.innerHTML.split("<hr>",2);
let subject = parse(body[0]).text;
subject = subject.replace(/\s+/g," ");

let style = parsed.querySelector("style").innerHTML;
body = body[1];



//console.log(parse(body[1]).innerHTML);

