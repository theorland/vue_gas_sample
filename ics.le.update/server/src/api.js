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


var moment;
var _;
var grabHTMLTemplate;
function initlib(){
  moment = App.moment;
  _ = App._lo;  
  grabHTMLTemplate = App.grabHTMLTemplate;
  DB = App.DB;
  //DEBUG 
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

function BALID_submitDraft(new_bal_val){
  initlib();
  return DB.BALID_submitDraft(new_bal_val);
}


// TEMPAT TEST
function use_test_template(){
  initlib();
  let template = DB.Email_loadTemplate(DB.TEMPLATE_EMAIL_SUBMIT);
  MailApp.sendEmail({
    to : "lourenzoisthebest@gmail.com",
    subject : template.subject,
    htmlBody : '<pre>' + template.body + '</pre>'
  });
  
}
function use_test_3(){
  initlib();
  
}
function use_test_2(){ 
  initlib();
  let daftar ;
  let new_bal_val = {
    bal_number: DB.BalID_generateID(),
    travel_design : "pomy@icstravelgroup.com",
    guest_name : "nama tamu",
    booking_date : "2020-10-10",
    total_pax : 4,
    arrive_date : "2020-10-10",
    departure_date : "2020-12-10",
    agent_name : "nama agen",
    selling_price: 0,
    designer_name : "theo",
    market : "indonesia",
    remark: "no",
    to_ref : "",
    selling_price : 0,
    file_quotation : "1yJuaLzkMh_rcohHvUrq5hPTdDtLJ1nPZP_RTVB51EaA",
    file_proposal : "15-I7Tsc0zRS2dCk3u7C-fQlE5HMQA2cFqDDSe4dxOSA",
    folder_confirmed : DriveApp.getFolderById("13WIbzzcBysMpn-ETyF6XonNRSEZuQsSt")
  }
  DB.BALID_submitDraft(new_bal_val);
  //DB.notify("SUBMIT_BAL",new_bal_val);

}
// END OF TEMPAT TEST




