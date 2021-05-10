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
	BalID_generateID(country){
		return this.real.BalID_generateID(country);
	}
	BalID_createNew(country,new_bal_val){
		return this.real.BalID_createNew(country,new_bal_val);
	}
	BALID_listAgent(country){
		return this.real.BALID_listAgent(country);
	}
	BALID_listSupplier(country){
		return this.real.BALID_listSupplier(country);
	}
	BALID_listQuoter(country){
		return this.real.BALID_listQuoter(country);
	}
	BALID_listSupplier(country){
		return this.real.BALID_listSupplier(country);
	}
	BALID_listAllDraftFile(country){
		return this.real.BALID_listAllDraftFile(country);
	}
	BALID_createDraft(country,_name,_by,mode){
		return this.real.BALID_createDraft(country,_name,_by,mode);
	}
	BALID_submitDraft(country,new_bal_val){
		return this.real.BALID_submitDraft(country,new_bal_val);
	}
	Country_list(){
		return this.real.Country_list();
	}
	Quote_loadHeaders(country,id){
		return this.real.Quote_loadHeaders(country,id);
	}
	BALID_listBookingType(country){
		return this.real.BALID_listBookingType(country);
	}

};

export default BackEndWrapper;

