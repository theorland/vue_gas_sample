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
	BalID_generateID(country){
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BalID_generateID(country);
		});
	}
	BalID_createNew(country,new_bal_val){
		
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BalID_createNew(country,new_bal_val);
		});
	}
	BALID_listAgent(country){
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_listAgent(country);
		});
	}
	BALID_listSupplier(country){
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_listSupplier(country);
		});
	}
	BALID_listQuoter(country){
		return new Promise(function(resolve,reject) 
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_listQuoter(country);
		});
	}
	BALID_listAllDraftFile(country){
		return new Promise(function(resolve,reject)
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_listAllDraftFile(country);
		});
	}
	BALID_createDraft(country,_name,_by,mode){
		return new Promise(function(resolve,reject)
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_createDraft(_name,_by,mode);
		});
	}
	BALID_submitDraft(country,new_bal_val){
		return new Promise(function(resolve,reject)
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_submitDraft(country,new_bal_val);
		});
	}
	Country_list(){
		return new Promise(function(resolve,reject)
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			Country_list();
		});
	}
	Quote_loadHeaders(country,id){
		return new Promise(function(resolve,reject)
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			Quote_loadHeaders(country,id);
		});
	}
	BALID_listBookingType(country){
		return new Promise(function(resolve,reject)
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_listBookingType(country);
		});
	}

}

export default GASBackEnd;