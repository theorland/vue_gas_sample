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
DB.DB_SID = "1Ks7b2pJ-WR7BgnHmHrQTdLALKbNxAg7vbttD16LFHSA";
DB.APP_DID = "1ww1lUGpWU4DwD9XdbWs7qTx0xAmPWKkS";
DB.Q_SID = "1N0M1CL9MPJ9J0ov7XvRRj9tyBq_YfYjq9CpXMY_Q2D4";

DB.QDRAF_DID ="1-PsFQS9d0qcyW--d9FjBusVMVmhAKP54";
DB.PDRAF_DCID = "1wCe29gZn3mL5wKom0fRA9g33-XUrKyyEmcLk7oBlD8c";
DB.QREF_SID = "16qNKpHORTtRdlknBFMr6uE1_6cdSb7ZdEVRHJHyy1UA";
DB.CONFIRMED_DID = "1AJTWD6-hEyc7KXmrIj830hk-M3zTnDZd";

//DB.EMAIL_NEW_QUOTE = ["lourenzoisthebest@gmail.com","pomy@icstravelgroup.com"];
DB.EMAIL_NEW_QUOTE = [];
DB.USER_NEW_QUOTE = null;
DB.USER_EXEC = "databaseics79@gmail.com";

//NEW
DB.AGENT_SID = "1AhPMW3H2ZDuvPyLkIHP9QXvZElR6MG-ARai-gQu__zQ";
DB.QUOTER_SID = "1-LrwA4irGueMUrff5DSf01haCrwtkTnCi08bqe487SA";
DB.EMAIL_DCID = "10aXnYHBATGOzTiS9g9kfl9oa74JasRvUc1ZidY7r2BI";
DB.TEMPLATE_EMAIL_SUBMIT = "10aXnYHBATGOzTiS9g9kfl9oa74JasRvUc1ZidY7r2BI";
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




