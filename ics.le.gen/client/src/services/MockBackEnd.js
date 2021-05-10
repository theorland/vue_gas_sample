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
	BALID_listQuoter(country){
		return this.later([{"name":"andhika","email":"andhika@icstravelgroup.com"},{"name":"cindy","email":"cindy@icstravelgroup.com"},{"name":"grace","email":"grace@icstravelgroup.com"},{"name":"iluh ","email":"iluh@icstravelgroup.com"},{"name":"julius","email":"julius@icstravelgroup.com"},{"name":"luluk","email":"luluk@icstravelgroup.com"},{"name":"marc","email":"marc@icstravelgroup.com"},{"name":"yudi","email":"yudi@icstravelgroup.com"},{"name":"widi","email":"widiani@icstravelgroup.com"},{"name":"rifqy","email":"rifqy@icstravelgroup.com"},{"name":"shabrina","email":"shabrina@icstravelgroup.com"}]);
	}
	BALID_createDraft(country,_name,_by,mode){
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
	Country_list(){
		return this.later({
			"BAL":{"id":"BAL","name":"Indonesia","prefix":"BAL","template":{"xlsx":"1I3T06wsSzAzQ7pyQwd6-AVD3rYqs-tQqfmyKhFb7vxQ","docx":"1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN8"},"folder":{"draft":"1el5EqkZCATi7jVOWseK4JtlKK1v9wYFh","confirmed":"1pEsnmaIM6QmPbNlk1erKeJYA90hYwXOR"},"quoter_id":"1veQCD4fK3ZMClg7NnJtp9yjj9gZmwYfgPxUDLbb7fZg","master_info_id":"1D17xSn1XbKSaP626sm4jDugu4xAP_1b-4YDWpo3gY2g","supplier_id":"1MJ1KN00Qb2zcIoIYpeT7m0qPpMi9b1pZAe8sMYp9kFM","dashboard_id":"1MufkM3ZHbk-A8aoIm3hAN5T68IB6Nhn_8G9yBN6uM8s","email_template_id":"1MyKwhQy8cXQG2s5zV4NShtCZQsMJHzyHPkDdTeK-c2w"},
			"BKK":{"id":"BKK","name":"Thailand","prefix":"BKK","template":{"xlsx":"1I3T06wsSzAzQ7pyQwd6-AVD3rYqs-tQqfmyKhFb7vxQ","docx":"1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN9"},"folder":{"draft":"1XJShiZGBenPWm9C5hoShNFl1Pd7QXEiH","confirmed":"1Y4aJgCW8W3WV3ZT6QrAK1quVwYUTAqds"},"quoter_id":"1veQCD4fK3ZMClg7NnJtp9yjj9gZmwYfgPxUDLbb7fZg","master_info_id":"1D17xSn1XbKSaP626sm4jDugu4xAP_1b-4YDWpo3gY2g","supplier_id":"1MJ1KN00Qb2zcIoIYpeT7m0qPpMi9b1pZAe8sMYp9kFM","dashboard_id":"1MufkM3ZHbk-A8aoIm3hAN5T68IB6Nhn_8G9yBN6uM8s","email_template_id":"1MyKwhQy8cXQG2s5zV4NShtCZQsMJHzyHPkDdTeK-c2w"},
			"SGN":{"id":"SGN","name":"Vietnam","prefix":"SGN","template":{"xlsx":"1I3T06wsSzAzQ7pyQwd6-AVD3rYqs-tQqfmyKhFb7vxQ","docx":"1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN10"},"folder":{"draft":"1BVTcOWoVWzgsD6p2zzxyU3fVaM5-y1CQ","confirmed":"1Jnf_gyk7sc7Q6bN3u7YHeUqNkv3KFOB0"},"quoter_id":"1veQCD4fK3ZMClg7NnJtp9yjj9gZmwYfgPxUDLbb7fZg","master_info_id":"1D17xSn1XbKSaP626sm4jDugu4xAP_1b-4YDWpo3gY2g","supplier_id":"1MJ1KN00Qb2zcIoIYpeT7m0qPpMi9b1pZAe8sMYp9kFM","dashboard_id":"1MufkM3ZHbk-A8aoIm3hAN5T68IB6Nhn_8G9yBN6uM8s","email_template_id":"1MyKwhQy8cXQG2s5zV4NShtCZQsMJHzyHPkDdTeK-c2w"},
			"CMB":{"id":"CMB","name":"Cambodia","prefix":"CMB","template":{"xlsx":"1I3T06wsSzAzQ7pyQwd6-AVD3rYqs-tQqfmyKhFb7vxQ","docx":"1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN11"},"folder":{"draft":"19Cm9_uCT91no9rQJOuS7qhXd8mKoUWTv","confirmed":"1BoE_8TOLLmvnGWb6xOUoUHmr-bqz9sx9"},"quoter_id":"1veQCD4fK3ZMClg7NnJtp9yjj9gZmwYfgPxUDLbb7fZg","master_info_id":"1D17xSn1XbKSaP626sm4jDugu4xAP_1b-4YDWpo3gY2g","supplier_id":"1MJ1KN00Qb2zcIoIYpeT7m0qPpMi9b1pZAe8sMYp9kFM","dashboard_id":"1MufkM3ZHbk-A8aoIm3hAN5T68IB6Nhn_8G9yBN6uM8s","email_template_id":"1MyKwhQy8cXQG2s5zV4NShtCZQsMJHzyHPkDdTeK-c2w"},
			"SRI":{"id":"SRI","name":"Srilanka","prefix":"SRI","template":{"xlsx":"1I3T06wsSzAzQ7pyQwd6-AVD3rYqs-tQqfmyKhFb7vxQ","docx":"1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN12"},"folder":{"draft":"1lmFMOoEHOnTf7oWy5plur7YMlCkAyD3l","confirmed":"13RU5L6NIgC5eLtkJmORjezLlsT_PCCwl"},"quoter_id":"1veQCD4fK3ZMClg7NnJtp9yjj9gZmwYfgPxUDLbb7fZg","master_info_id":"1D17xSn1XbKSaP626sm4jDugu4xAP_1b-4YDWpo3gY2g","supplier_id":"1MJ1KN00Qb2zcIoIYpeT7m0qPpMi9b1pZAe8sMYp9kFM","dashboard_id":"1MufkM3ZHbk-A8aoIm3hAN5T68IB6Nhn_8G9yBN6uM8s","email_template_id":"1MyKwhQy8cXQG2s5zV4NShtCZQsMJHzyHPkDdTeK-c2w"}});
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