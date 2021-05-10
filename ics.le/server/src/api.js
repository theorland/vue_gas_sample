//import { DB } from "./lib";

// Generate https://script.google.com/macros/s/AKfycbzzLsvYRKmrCRojdjjbNdLBmuNDNNw3kZ7Zs_nW1coU1v1kSsk/exec
// Submit https://script.google.com/macros/s/AKfycbyB5SY-3AXOm5yK-TpwaO9pv3robf-eN7XGkV6CpY06ozVN-C5S/exec
// Update https://script.google.com/macros/s/AKfycbwebSK0UioV75AIpYX91ODaD-7utLichlPu_bkq/exec
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
  //DB = App.DB;
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


function BalID_generateID(country){
  initlib();
  DB.Country_set(country);
  return DB.BalID_generateID();
}

function BalID_createNew(country,new_bal_val){
  initlib();
  DB.Country_set(country);
  return DB.BalID_createNew(new_bal_val);
}

function BALID_listAgent(country){
  initlib();
  DB.Country_set(country);
  return DB.BALID_listAgent();
}

function BALID_listQuoter(country){
  initlib();
  DB.Country_set(country);
  return DB.BALID_listQuoter();
}

function BALID_listAllDraftFile(country){
  initlib();
  DB.Country_set(country);
  return DB.BALID_listAllDraftFile();
}

function BALID_createDraft(country,_name,_by,mode){
  initlib();
  DB.Country_set(country);
  let result = DB.BALID_createDraft(_name,_by,mode);
  //DB.reportError("PARAM_DEBUG",result);
  return result;
}

function BALID_submitDraft(country,new_bal_val){
  initlib();
  DB.Country_set(country);
  return DB.BALID_submitDraft(new_bal_val);
}

function Country_list(){
  initlib();
  return DB.Country_list();
}

function BALID_listQuoter(country){
  initlib();
  DB.Country_set(country);
  return DB.BALID_listQuoter();
}

function BALID_listSupplier(country){
  initlib();
  DB.Country_set(country);
  return DB.BALID_listSupplier();
}
function Quote_loadHeaders(country,id){
  initlib();
  DB.Country_set(country);
  DB.Quote_loadHeaders(id);
}
function BALID_listAgent(country){
  initlib();
  DB.Country_set(country);
  return DB.BALID_listAgent();
}

function BALID_listBookingType(country){
  initlib();
  DB.Country_set(country);
  return DB.BALID_listBookingType();
}


// TEMPAT TEST

function use_test(){ 
  initlib();
  Logger.log(BalID_generateID("BAL"));
  return 0;
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
  let data = BALID_listSupplier("BKK");
  DB.reportError("DEBUG",data);
  
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




