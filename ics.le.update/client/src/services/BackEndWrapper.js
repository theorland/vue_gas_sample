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
	BalID_generateID(){
		return this.real.BalID_generateID();
	}
	BalID_createNew(new_bal_val){
		return this.real.BalID_createNew(new_bal_val);
	}
	BALID_listAgent(){
		return this.real.BALID_listAgent();
	}
	BALID_listQuoter(){
		return this.real.BALID_listQuoter();
	}
	BALID_listAllDraftFile(){
		return this.real.BALID_listAllDraftFile();
	}
	BALID_createDraft(_name,_by,mode){
		return this.real.BALID_createDraft(_name,_by,mode);
	}
	BALID_listAllDraftFile(){
		return this.real.BALID_listAllDraftFile();
	}
	BALID_submitDraft(new_bal_val){
		return this.real.BALID_submitDraft(new_bal_val);
	}

};

export default BackEndWrapper;

