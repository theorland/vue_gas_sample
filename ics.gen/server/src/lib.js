import * as moment from 'moment';
import _ from 'lodash';
import DB from './lib.db';

function getRandomNumbers()
{
	let out = _.times(6, ()=>
	{
		return _.random(1,100); 
	});

	return out;
}
var _lo = _;


export  {
	getRandomNumbers,
    moment,
    _lo,
    DB
}; 