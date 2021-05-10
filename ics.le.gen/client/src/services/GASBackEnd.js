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
	
	BALID_createDraft(country,_name,_by,mode){
		return new Promise(function(resolve,reject)
		{
			google.script.run.withSuccessHandler(function(res)
			{ resolve(res); })
			.withFailureHandler(function(err)
			{ reject(JSON.stringify(err)); }).
			BALID_createDraft(country,_name,_by,mode);
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
}

export default GASBackEnd;