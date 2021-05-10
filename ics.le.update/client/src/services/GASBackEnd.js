'use strict';

class GASBackEnd
{
	constructor()
	{

	}
	getRandomNumbers()
	{
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			getRandomNumbers();
		});
	}
	getCurrentUser(){
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(json_encode(err)); }).
			getCurrentUser();
		});
	}
	BalID_generateID(){
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BalID_generateID();
		});
	}
	BalID_createNew(new_bal_val){
		
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BalID_createNew(new_bal_val);
		});
	}
	BALID_listAgent(){
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_listAgent();
		});
	}
	BALID_listQuoter(){
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_listQuoter();
		});
	}
	BALID_listAllDraftFile(){
		return new Promise(function(resolve,reject)
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_listAllDraftFile();
		});
	}
	BALID_createDraft(_name,_by,mode){
		return new Promise(function(resolve,reject)
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_createDraft(_name,_by,mode);
		});
	}
	BALID_submitDraft(new_bal_val){
		return new Promise(function(resolve,reject)
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_submitDraft(new_bal_val);
		});
	}


}

export default GASBackEnd;