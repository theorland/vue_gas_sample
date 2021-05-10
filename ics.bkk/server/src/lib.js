import * as moment from 'moment';
import _ from 'lodash';
import DB from './lib.db';
import {parse} from "node-html-parser";


function grabHTMLTemplate(text){
	let parsed = parse(text,{style: true});

	let body = parsed.querySelector("body");
	body = body.innerHTML.split("<hr>",2);
	let subject = parse(body[0]).text;
	subject = subject.replace(/\s+/g," ");
	
	let style = parsed.querySelector("style").innerHTML;
	body = body[1];
	return {
		body : '<style>'+style+'</style><body>' + body + '</body>',
		subject : subject
	}
}



var _lo = _;


export  {
	grabHTMLTemplate,
    moment,
    _lo,
    DB
}; 