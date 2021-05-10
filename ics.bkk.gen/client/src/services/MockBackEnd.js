'use strict';

import * as moment from 'moment';


class MockBackEnd
{
	constructor()
	{
		
	}
	getRandomNumbers()
	{
		return this.later([12,33,45,2,3,11,56,66]);
	}

	getCurrentUser(){
		return this.later("MOCK USER");
	}
	BalID_generateID(){
		return this.later("BAL" + moment().format("YYMM") + "66" );
	}
	BalID_createNew(new_bal_val){
		return this.later(new_bal_val);
	}
	BALID_listAgent(){
		return this.later([{"agent_name":"1 - Globe","credit_term":"14 days BEFORE Arrival date","country":"India"},{"agent_name":"1000 Mile Corporate Travel","credit_term":"14 days BEFORE Arrival date","country":"Australia"},{"agent_name":"24x7 rooms.com","credit_term":"14 days BEFORE Arrival date","country":"India"},{"agent_name":"24x7 travels.com","credit_term":"14 days BEFORE Arrival date","country":"India"},{"agent_name":"24x7rooms.com(Bahrain)","credit_term":"14 days BEFORE Arrival date","country":"Bahrain"}]);
	}
	BALID_listQuoter(){
		return this.later([{"name":"andhika","email":"andhika@icstravelgroup.com"},{"name":"cindy","email":"cindy@icstravelgroup.com"},{"name":"grace","email":"grace@icstravelgroup.com"},{"name":"iluh ","email":"iluh@icstravelgroup.com"},{"name":"julius","email":"julius@icstravelgroup.com"},{"name":"luluk","email":"luluk@icstravelgroup.com"},{"name":"marc","email":"marc@icstravelgroup.com"},{"name":"yudi","email":"yudi@icstravelgroup.com"},{"name":"widi","email":"widiani@icstravelgroup.com"},{"name":"rifqy","email":"rifqy@icstravelgroup.com"},{"name":"shabrina","email":"shabrina@icstravelgroup.com"}]);
	}
	BALID_createDraft(_name,_by,mode){
		let result = {};
		if (mode & 1 > 0){
			result["quote"] = {
				"id":"16rUff1elmTjAinuvsCrzTVTQLm4IvWrm_R5YMkYgJTI",
				"url":"https://docs.google.com/spreadsheets/d/16rUff1elmTjAinuvsCrzTVTQLm4IvWrm_R5YMkYgJTI/edit?usp=drivesdk",
				"name":"test at 09:31 by andika@icstravelgroup.com"
			};
		}
		if (mode & 2 > 0){
			result["proposal"] = {
				"id":"1PSYJwQbWLoRu00iCNW6KpOAAZnVkK5409mZecV0Zr1A",
				"url":"https://docs.google.com/document/d/1PSYJwQbWLoRu00iCNW6KpOAAZnVkK5409mZecV0Zr1A/edit?usp=drivesdk",
				"name":"test at 09:31 by andika@icstravelgroup.com"}
		}
		return this.later(result);
	}
	BALID_listAllDraftFile(){
		return this.later({
			"proposal":[
				{"id":"1PSYJwQbWLoRu00iCNW6KpOAAZnVkK5409mZecV0Zr1A",
				"url":"https://docs.google.com/document/d/1PSYJwQbWLoRu00iCNW6KpOAAZnVkK5409mZecV0Zr1A/edit?usp=drivesdk",
				"name":"test at 09:31 by andika@icstravelgroup.com",
				"modified":"2020-06-24-09-31"}
			],
			"quote":[
				{"id":"1eStQ1aj150zq5anZUvufllO5xJD75G3-UaZePB7IGYs",
				"url":"https://docs.google.com/spreadsheets/d/1eStQ1aj150zq5anZUvufllO5xJD75G3-UaZePB7IGYs/edit?usp=drivesdk",
				"name":"BAL200503 at 13:36 by databaseics79@gmail.com",
				"modified":"2020-06-24-15-02"},
				{"id":"1Y6Ak-lo6ek_gR-lw6LluJVJDSOnVwGmtzCCKUrjcBsE",
				"url":"https://docs.google.com/spreadsheets/d/1Y6Ak-lo6ek_gR-lw6LluJVJDSOnVwGmtzCCKUrjcBsE/edit?usp=drivesdk",
				"name":"BAL200006 at 13:44 by databaseics79@gmail.com",
				"modified":"2020-06-24-13-44"},
				{"id":"16rUff1elmTjAinuvsCrzTVTQLm4IvWrm_R5YMkYgJTI",
				"url":"https://docs.google.com/spreadsheets/d/16rUff1elmTjAinuvsCrzTVTQLm4IvWrm_R5YMkYgJTI/edit?usp=drivesdk",
				"name":"test at 09:31 by andika@icstravelgroup.com",
				"modified":"2020-06-24-09-31"},
				{"id":"1v7agEF7E5q-NzES2QyS6ixREAO9qGboBH3Qeid-j9Nc",
				"url":"https://docs.google.com/spreadsheets/d/1v7agEF7E5q-NzES2QyS6ixREAO9qGboBH3Qeid-j9Nc/edit?usp=drivesdk",
				"name":"test at 09:26 by andika@icstravelgroup.com",
				"modified":"2020-06-24-09-27"},
				{"id":"1D0QXTwNburHHwIttIywgFkw1gGSAA_SRbiZ0jsH2WRU",
				"url":"https://docs.google.com/spreadsheets/d/1D0QXTwNburHHwIttIywgFkw1gGSAA_SRbiZ0jsH2WRU/edit?usp=drivesdk",
				"name":"test at 09:22 by andika@icstravelgroup.com",
				"modified":"2020-06-24-09-22"}]}
		)
	}
	later(value) 
	{
		return new Promise(function(resolve) 
		{
			setTimeout(function() 
			{
			    resolve(value);
			}, 500);
		});
	}
};

export default MockBackEnd;