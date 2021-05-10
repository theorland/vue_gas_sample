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
	BalID_generateID(country){
		return this.later("BAL" + moment().format("YYMM") + "66" );
	}
	BalID_createNew(country,new_bal_val){
		return this.later(new_bal_val);
	}
	BALID_listAgent(country){
		return this.later({
			"Luxury Escapes" : "Luxury Escapes",
			"GTC" : "GTC"
		  });
	}
	BALID_listSupplier(country){
		return this.later([
			{"name":"Wakasailing","country":"Indonesia"},{"name":"Wakaland","country":"Indonesia"},{"name":"Prana Spa Seminyak","country":"Indonesia"},
			{"name":"Bali Nusa Dua Theatre (Devdan Show)","country":"Indonesia"},{"name":"Bali Safari and Marine Park","country":"Indonesia"},
			{"name":"True Bali Experience","country":"Indonesia"},{"name":"PT Gapura Angkasa (Fast Track)","country":"Indonesia"},
			{"name":"Paon Cooking Class","country":"Indonesia"},{"name":"Bali Extreme Cycling Tours","country":"Indonesia"},
			{"name":"Madu Sari Restaurant Kintamani","country":"Indonesia"},{"name":"Komunitas VW Safari Bali","country":"Indonesia"},
			{"name":"ICS Indonesia","country":"Indonesia"},{"name":"Trikayana Transport","country":"Indonesia"},
			{"name":"Wirasana Transport","country":"Indonesia"},{"name":"Kulkul Bali Trans","country":"Indonesia"},
			{"name":"ICS Thailand","country":"Thailand"},{"name":"I-Asia","country":"Thailand"},
			{"name":"Asia Link","country":"Thailand"},{"name":"Cafe Del Mar Phuket","country":"Thailand"},
			{"name":"ICS Vietnam","country":"Vietnam"},{"name":"ICS Myanmar","country":"Myanmar"},
			{"name":"ICS Cambodia","country":"Cambodia"},{"name":"ICS Laos","country":"Laos"},{"name":"Jetwings Tour Srilanka","country":"Srilanka"}]
		)
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
	BALID_listAllDraftFile(country){
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
	BALID_submitDraft(country,new_bal_val){
		return this.later(new_bal_val);
	}

	Country_list(){
		return this.later({
			"BAL":{"id":"BAL","name":"Indonesia","prefix":"BAL","template":{"xlsx":"1I3T06wsSzAzQ7pyQwd6-AVD3rYqs-tQqfmyKhFb7vxQ","docx":"1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN8"},"folder":{"draft":"1el5EqkZCATi7jVOWseK4JtlKK1v9wYFh","confirmed":"1pEsnmaIM6QmPbNlk1erKeJYA90hYwXOR"},"quoter_id":"1veQCD4fK3ZMClg7NnJtp9yjj9gZmwYfgPxUDLbb7fZg","master_info_id":"1D17xSn1XbKSaP626sm4jDugu4xAP_1b-4YDWpo3gY2g","supplier_id":"1MJ1KN00Qb2zcIoIYpeT7m0qPpMi9b1pZAe8sMYp9kFM","dashboard_id":"1MufkM3ZHbk-A8aoIm3hAN5T68IB6Nhn_8G9yBN6uM8s","email_template_id":"1MyKwhQy8cXQG2s5zV4NShtCZQsMJHzyHPkDdTeK-c2w"},
			"BKK":{"id":"BKK","name":"Thailand","prefix":"BKK","template":{"xlsx":"1I3T06wsSzAzQ7pyQwd6-AVD3rYqs-tQqfmyKhFb7vxQ","docx":"1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN9"},"folder":{"draft":"1XJShiZGBenPWm9C5hoShNFl1Pd7QXEiH","confirmed":"1Y4aJgCW8W3WV3ZT6QrAK1quVwYUTAqds"},"quoter_id":"1veQCD4fK3ZMClg7NnJtp9yjj9gZmwYfgPxUDLbb7fZg","master_info_id":"1D17xSn1XbKSaP626sm4jDugu4xAP_1b-4YDWpo3gY2g","supplier_id":"1MJ1KN00Qb2zcIoIYpeT7m0qPpMi9b1pZAe8sMYp9kFM","dashboard_id":"1MufkM3ZHbk-A8aoIm3hAN5T68IB6Nhn_8G9yBN6uM8s","email_template_id":"1MyKwhQy8cXQG2s5zV4NShtCZQsMJHzyHPkDdTeK-c2w"},
			"SGN":{"id":"SGN","name":"Vietnam","prefix":"SGN","template":{"xlsx":"1I3T06wsSzAzQ7pyQwd6-AVD3rYqs-tQqfmyKhFb7vxQ","docx":"1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN10"},"folder":{"draft":"1BVTcOWoVWzgsD6p2zzxyU3fVaM5-y1CQ","confirmed":"1Jnf_gyk7sc7Q6bN3u7YHeUqNkv3KFOB0"},"quoter_id":"1veQCD4fK3ZMClg7NnJtp9yjj9gZmwYfgPxUDLbb7fZg","master_info_id":"1D17xSn1XbKSaP626sm4jDugu4xAP_1b-4YDWpo3gY2g","supplier_id":"1MJ1KN00Qb2zcIoIYpeT7m0qPpMi9b1pZAe8sMYp9kFM","dashboard_id":"1MufkM3ZHbk-A8aoIm3hAN5T68IB6Nhn_8G9yBN6uM8s","email_template_id":"1MyKwhQy8cXQG2s5zV4NShtCZQsMJHzyHPkDdTeK-c2w"},
			"CMB":{"id":"CMB","name":"Cambodia","prefix":"CMB","template":{"xlsx":"1I3T06wsSzAzQ7pyQwd6-AVD3rYqs-tQqfmyKhFb7vxQ","docx":"1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN11"},"folder":{"draft":"19Cm9_uCT91no9rQJOuS7qhXd8mKoUWTv","confirmed":"1BoE_8TOLLmvnGWb6xOUoUHmr-bqz9sx9"},"quoter_id":"1veQCD4fK3ZMClg7NnJtp9yjj9gZmwYfgPxUDLbb7fZg","master_info_id":"1D17xSn1XbKSaP626sm4jDugu4xAP_1b-4YDWpo3gY2g","supplier_id":"1MJ1KN00Qb2zcIoIYpeT7m0qPpMi9b1pZAe8sMYp9kFM","dashboard_id":"1MufkM3ZHbk-A8aoIm3hAN5T68IB6Nhn_8G9yBN6uM8s","email_template_id":"1MyKwhQy8cXQG2s5zV4NShtCZQsMJHzyHPkDdTeK-c2w"},
			"SRI":{"id":"SRI","name":"Srilanka","prefix":"SRI","template":{"xlsx":"1I3T06wsSzAzQ7pyQwd6-AVD3rYqs-tQqfmyKhFb7vxQ","docx":"1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN12"},"folder":{"draft":"1lmFMOoEHOnTf7oWy5plur7YMlCkAyD3l","confirmed":"13RU5L6NIgC5eLtkJmORjezLlsT_PCCwl"},"quoter_id":"1veQCD4fK3ZMClg7NnJtp9yjj9gZmwYfgPxUDLbb7fZg","master_info_id":"1D17xSn1XbKSaP626sm4jDugu4xAP_1b-4YDWpo3gY2g","supplier_id":"1MJ1KN00Qb2zcIoIYpeT7m0qPpMi9b1pZAe8sMYp9kFM","dashboard_id":"1MufkM3ZHbk-A8aoIm3hAN5T68IB6Nhn_8G9yBN6uM8s","email_template_id":"1MyKwhQy8cXQG2s5zV4NShtCZQsMJHzyHPkDdTeK-c2w"}});
	}
	Quote_loadHeaders(country,id){
		return this.later( {
			client_name  : "Client Name",
			market : "Australia",
			agent_name : "Luxury Escapes",
			pax : "2",
			booking_type : "Activity",
			agent_ref : "L.E Booking Code",
			selling_price : 666
		  });
	}
	BALID_listBookingType(country){
		return this.later ({
			"Airport Transfer":"Airport Transfer",
			"Activity":"Activity",
			"Tour":"Tour"
		})
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