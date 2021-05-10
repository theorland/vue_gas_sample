'use strict';
import MockBackEnd from './MockBackEnd.js';
import GASBackEnd from './GASBackEnd.js';

class BackEndWrapper
{
	constructor()
	{
		if (typeof google !== 'undefined')
		{
			this.real = new GASBackEnd();
		}
		else
		{
			this.real = new MockBackEnd();
		}
	}

	getRandomNumbers()
	{
		return this.real.getRandomNumbers();
	}
	getCurrentUser(){
		return this.real.getCurrentUser();
	}
	BALID_listAgent(country){
		return this.real.BALID_listAgent(country);
	}
	BALID_listQuoter(country){

		return this.real.BALID_listQuoter(country);
	}
	BALID_createDraft(country,_name,_by,mode){
		return this.real.BALID_createDraft(country,_name,_by,mode);
	}
	Country_list(){
		return this.real.Country_list();
	}

};

export default BackEndWrapper;

