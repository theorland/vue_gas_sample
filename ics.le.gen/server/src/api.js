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
  
DB.SS_URL = "https://docs.google.com/spreadsheets/d/<sid>/edit#gid=0";
DB.DF_URL = "https://drive.google.com/drive/folders/<did>";
DB.DC_URL = "https://docs.google.com/document/d/<DCID>/edit";
DB.EMAIL_DEBUG = ["lourenzoisthebest@gmail.com"];

// URL
DB.Q_SID = "1HjvCl_PYSpvctTxgUJnolFtFuYeS2wv3nJSqr5JCXwU";
DB.DB_SID = "18uUrS4RxZZ9Z-kkwouFNUA3TzWf7B6dGbAkfO75MB7I";
DB.APP_DID = "1jggA0WEH1nFsO3YBkLPip4MPHRRSm8Yz";

DB.QDRAF_DID ="1jNsUsOlInTeoigzdIa9VwAFxETaEmqk3";
DB.PDRAF_DCID = "1VYw9yLbmu6ZWlP8GIVurEaIdHKrCP3b4UeHpHpT58DU";

DB.QREF_SID = "1HjvCl_PYSpvctTxgUJnolFtFuYeS2wv3nJSqr5JCXwU";
DB.CONFIRMED_DID = "151qYwaQrRhkFJCy-AuFnDhz5_GPTDf2m";

//DB.EMAIL_NEW_QUOTE = ["lourenzoisthebest@gmail.com","pomy@icstravelgroup.com"];
DB.EMAIL_NEW_QUOTE = [];
DB.USER_NEW_QUOTE = null;
DB.USER_EXEC = "databaseics79@gmail.com";

//NEW
DB.QUOTER_SID = "1F8Zh46007THOkp6t6DfxHcdtyp0PanrCt5zCq4khtdQ";
DB.AGENT_SID = "1Ja2ZNJ4PB4nNtU0yTe41pPNmxv1FcbJfzfpkdAtklWs";

DB.EMAIL_DCID = "1Rehe8H3WwYX1CEayNsUa9tIC1BVHUuFkjFGBakgDpSo";
DB.TEMPLATE_EMAIL_SUBMIT = "1Rehe8H3WwYX1CEayNsUa9tIC1BVHUuFkjFGBakgDpSo";
DB.S_LOG = "";

DB.DASHBOARD_START_ROW =5;
DB.SUBMIT_STATUS = "Confirmed";

}


function BalID_generateID(country_id){
  initlib();
  DB.Country_set(country_id);
  return DB.BalID_generateID();
}

function Country_list(){
  initlib();
  return DB.Country_list();
}


function BalID_createNew(new_bal_val){
  initlib();
  return DB.BalID_createNew(new_bal_val);
}

function BALID_listAgent(country_id){
  initlib();
  DB.Country_set(country_id);
  return DB.BALID_listAgent();
}

function BALID_listQuoter(country_id){
  initlib();
  DB.Country_set(country_id);
  return DB.BALID_listQuoter();
}

function BALID_createDraft(country,_name,_by,mode){
  initlib();
  DB.Country_set(country);
  let result = DB.BALID_createDraft(_name,_by,mode);
  //DB.reportError("PARAM_DEBUG",result);
  return result;
}


// TEMPAT TEST
function use_test(){ 
  initlib();
  //let daftar = DB.Country_list();
  //let daftar = DB.Country_set(null)
  
  
  //DocumentApp.openById("1rzwhF8l2Z20Ah6J_5AmadHTF0_W3ykGBTKkrqly2zN8");
  
  let daftar = DB.Country_set("BAL");
  daftar = BALID_createDraft("BAL","Draft BAL for this","pomy@icstravelgroup.com",3);
  DB.reportError("PARAM_DEBUG",daftar);
  //Logger.log(2 & 2);
  //daftar = BALID_createDraft("test","lourenzoisthebest@gmail.com",1);
  //

}
// END OF TEMPAT TEST




