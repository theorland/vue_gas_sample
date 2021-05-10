//import { DB } from "./lib";

  
function doGet(request) 
{
  /*let debug  = ContentService.createTextOutput();
  return  debug.append(JSON.stringify(request));*/
  
  switch (request.pathInfo){
    case "test":
      return HtmlService
        .createTemplateFromFile('test')
        .evaluate();
    default:      
   	  return HtmlService
        .createTemplateFromFile('index')
        .evaluate();

  }
 
}

function getRandomNumbers()
{
	return App.getRandomNumbers();
}

function getCurrentUser(){
  return JSON.stringify(
    {Effective: Session.getEffectiveUser(),
     Active : Session.getActiveUser()});
}



var moment;
var _;
function initlib(){
  moment = App.moment;
  _ = App._lo;  
  //DB = App.DB;
  
// OLD 
DB.DB_SID = "1Ks7b2pJ-WR7BgnHmHrQTdLALKbNxAg7vbttD16LFHSA";
DB.APP_DID = "1ww1lUGpWU4DwD9XdbWs7qTx0xAmPWKkS";
DB.Q_SID = "1N0M1CL9MPJ9J0ov7XvRRj9tyBq_YfYjq9CpXMY_Q2D4";
DB.SS_URL = "https://docs.google.com/spreadsheets/d/<sid>/edit#gid=0";
DB.EMAIL_DEBUG = ["lourenzoisthebest@gmail.com"];

DB.QDRAF_DID ="1-PsFQS9d0qcyW--d9FjBusVMVmhAKP54";
DB.QREF_SID = "16qNKpHORTtRdlknBFMr6uE1_6cdSb7ZdEVRHJHyy1UA";
DB.EMAIL_NEW_QUOTE = ["lourenzoisthebest@gmail.com","pomy@icstravelgroup.com"];

// DEVELOPMENT  
DB.USER_NEW_QUOTE = ["lourenzoisthebest@gmail.com","pomy@icstravelgroup.com"];
// PRODUCTION 
//DB.USER_NEW_QUOTE = null;

//NEW
DB.AGENT_SID = "1AhPMW3H2ZDuvPyLkIHP9QXvZElR6MG-ARai-gQu__zQ";
DB.QUOTER_SID = "1-LrwA4irGueMUrff5DSf01haCrwtkTnCi08bqe487SA";
DB.EMAIL_DCID = "10aXnYHBATGOzTiS9g9kfl9oa74JasRvUc1ZidY7r2BI";


}


function BalID_generateID(){
  initlib();
  return DB.BalID_generateID();
}

function BalID_createNew(new_bal_val){
  initlib();
  return DB.BalID_createNew(new_bal_val);
}

function BALID_listAgent(){
  initlib();
  return DB.BALID_listAgent();
}

function BALID_listQuoter(){
  initlib();
  return DB.BALID_listQuoter();
}

function BALID_listAllDraftFile(){
  initlib();
  return DB.BALID_listAllDraftFile();
}

function BALID_createDraft(_name,_by,mode){
  initlib();
  return DB.BALID_createDraft(_name,_by,mode);
}

// TEMPAT TEST
function use_test(){ 
  initlib();
  let daftar ;
  daftar = BalID_generateID();
  DB.reportError("DEBUG",daftar);
}
// END OF TEMPAT TEST




