
var DB = {};


// OLD 
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

DB.EMAIL_NEW_QUOTE = ["lourenzoisthebest@gmail.com","pomy@icstravelgroup.com"];
DB.USER_NEW_QUOTE = null;
DB.USER_EXEC = "databaseics79@gmail.com";

//NEW
DB.AGENT_SID = "1AhPMW3H2ZDuvPyLkIHP9QXvZElR6MG-ARai-gQu__zQ";
DB.QUOTER_SID = "1-LrwA4irGueMUrff5DSf01haCrwtkTnCi08bqe487SA";
DB.EMAIL_DCID = "10aXnYHBATGOzTiS9g9kfl9oa74JasRvUc1ZidY7r2BI";

DB.S_LOG = "";


DB.BALID_prepareNewQuoter = function(){
  //this.S_LOG = this.S_LOG  + "masuk ke fungsi pertama\n";
  if (this.USER_NEW_QUOTE == null){
     //this.S_LOG = this.S_LOG  + "masuk if kan?";
     let all_quoters = this.BALID_listQuoter();
     let users = [this.USER_EXEC ];
     //this.S_LOG =  this.S_LOG + JSON.stringify(all_quoters);
     all_quoters.every((data,idx) => {
       users.push(data.email);
       this.S_LOG = this.S_LOG + ","+data.email;
       return true;                  
     });
     this.USER_NEW_QUOTE = users;
   
  }
  
  return this.USER_NEW_QUOTE;
}


DB.BALID_createDraft= function(_name,_by,mode=0){
  let all_quoters = this.BALID_prepareNewQuoter();
  let destFolder = DriveApp.getFolderById(this.QDRAF_DID);
  let name = _name + " at " + moment().format("HH:mm DD/MM")  + " by " + _by ;
  
  //Logger.log("step 1");
  
  let quote_ref = SpreadsheetApp.openById(this.QREF_SID);
  let proposal_ref = DocumentApp.openById(this.PDRAF_DCID);
  
  let editors = this.USER_NEW_QUOTE.map((x)=> x.toString());
  
  //Logger.log("step 2");
  
  editors.push(_by.toString());

  //Logger.log("step 3");
  
  let result = {};
  if ((mode & 1) >0){
    //Logger.log("step 3 create");
    let new_quote = DriveApp.getFileById(quote_ref.getId()).makeCopy(name, destFolder);
    new_quote.setShareableByEditors(false);
    let ss = SpreadsheetApp.openById(new_quote.getId());
    
    editors.every((x)=> {
       ss.addEditor(x);
       ss.addViewer(x);
    })
    
    result['quote'] = {
      id : new_quote.getId(),
      url : new_quote.getUrl(),
      name : new_quote.getName()
    };
  }

  //Logger.log("step 4");
  if ((mode & 2) >0){
    //Logger.log("step 4 create");
    let new_proposal = DriveApp.getFileById(proposal_ref.getId()).makeCopy(name,destFolder);
    new_proposal.setShareableByEditors(false);
    let dc = DocumentApp.openById(new_proposal.getId());
    editors.every((x)=> {
       dc.addEditor(x);
       dc.addViewer(x);
    })
    
    result['proposal'] = {
      id : new_proposal.getId(),
      url : new_proposal.getUrl(),
      name : new_proposal.getName()
    };
    
  }
  //Logger.log("step 5");
  
  return result;
}

// WIP
DB.BALID_NewEmailCompose = function(){
  let SS = DocumenApp.openById(DB.EMAIL_DCID);

}

DB.BALID_listAllDraftFile = function (){
  let FOLDER = DriveApp.getFolderById(this.QDRAF_DID);
  let COMPARE_FORMAT = 'YYYYMMDD';
  let SAVED_FORMAT = 'YYYY-MM-DD-HH-mm';
  let one_week_before = moment().subtract(1,'w');
  let one_week_before_s = one_week_before.format(COMPARE_FORMAT);
  let files_counter =  null; 
      
  files_counter = FOLDER.getFilesByType(MimeType.GOOGLE_DOCS);
  let all_proposal = [];
  while (files_counter.hasNext()){
    let file = files_counter.next();
    let file_date = moment(file.getLastUpdated());
    let file_date_s = file_date.format(COMPARE_FORMAT);
    //this.LOG = this.LOG +"\n" + file_date_s + " <> " + one_week_before_s;
    
    //Logger.log(file_date_s + "<>" + one_week_before_s + " : " + file.getName());
    
    if (file_date_s<one_week_before_s){
      continue;
    }
    
    let new_file = {
      id : file.getId(),
      url : file.getUrl(),
      name : file.getName(),
      modified :  file_date.format(SAVED_FORMAT)
    }
    all_proposal.push(new_file);
  }
  
  files_counter = FOLDER.getFilesByType(MimeType.GOOGLE_SHEETS);
  let all_quote = [];
  while (files_counter.hasNext()){
    let file = files_counter.next();
    let file_date = moment(file.getLastUpdated());
    let file_date_s = file_date.format(COMPARE_FORMAT);
    
    //Logger.log(file_date_s + "<>" + one_week_before_s + " : " + file.getName());
    
    if (file_date_s<one_week_before_s){
      continue;
    }
    Logger.log(file.getName());
    let new_file = {
      id : file.getId(),
      url : file.getUrl(),
      name : file.getName(),
      modified :  file_date.format(SAVED_FORMAT)
    }
    all_quote.push(new_file);
  }
  return {
    proposal : all_proposal,
    quote : all_quote
  };
}


DB.BALID_listQuoter = function(){
  let SS = SpreadsheetApp.openById(this.QUOTER_SID);
  let sht = SS.getSheetByName("quoter");
  let all_data = sht.getDataRange().getValues();
  all_data.shift();
  let all_quoters = [];
  all_data.every((row)=>{
     let new_data = {
         name : row[0].toString(),
         email: row[1].toString()
     };
     all_quoters.push(new_data);
     return true;
  });

  //this.S_LOG = this.S_LOG + "masuk list quoter dimaksud \n";
  return all_quoters;
}
DB._list_agent = null;
DB.BALID_listAgent = function(){
  let SS = SpreadsheetApp.openById(this.AGENT_SID);
  let sht = SS.getSheetByName("agent");
  let all_data = sht.getDataRange().getValues();
  
  all_data.shift();
  let agent_list = [];
  if (this._list_agent == null){
      all_data.every((row) => {
      let new_data =  {
        agent_name : row[0].toString(),
        credit_term : row[1].toString(),
        country : row[2].toString()
      };
      agent_list.push(new_data);
      return true;
    });
    DB._list_agent  = agent_list;
  }
  return DB._list_agent ;
}

DB.BALID_agentInfo = function(name){
  let list_agents = this.BALID_listAgent();
  let agent_info = {
    agent_name : "No Data",
    credit_term : "No Data",
    country : "No Data"
  };
  list_agents.every((agent) =>{
    if (agent.agent_name ==  name){
      agent_info = agent;
      return false;
    }
    return true;
  }); 
  return agent_info;
  
}

DB._bal_prefix =null;
DB.BalID_compose = function(num){
  var MAX_LENGTH_GEN =4; 
  
  if (this._bal_prefix ===null){
    this._bal_prefix = "BKG" + moment().format("YY");
  }
  num = num.toString();

  if (num.length<MAX_LENGTH_GEN){
    num = num.padStart(MAX_LENGTH_GEN,"0");
  }
  return this._bal_prefix + num;
};

DB.BalID_shtGrabAll = function(sht){
  let dt_xy = {y : 5, x:1, h:sht.getMaxRows()+1 -5, w: 1};
  let all_bal = sht.getRange(dt_xy.y,dt_xy.x,dt_xy.h,dt_xy.w).getValues();
  let bal_list =[];
  this.BalID_compose(0);
  let bal_prefix = this._bal_prefix;
  let bal_l = bal_prefix.length;
  for (i in all_bal){
    let bal_id = all_bal[i][0].toString();
    if (bal_id.substr(0,bal_l) == bal_prefix){
      bal_list.push(bal_id)
    };
  }
  return bal_list;
}


DB.BalID_generateID = function(){
  var year = moment().format("YYYY");
  var app =  SpreadsheetApp.openById(this.DB_SID);
  var sht = app.getSheetByName(year);
  
  if (sht == null){
    this.reportError("DASH_NO_SHT_BAL");
    return 0;
  }
  
  let counter=1;
  let balid = this.BalID_compose(counter);
  let bal_list = this.BalID_shtGrabAll(sht);
  
  while (bal_list.indexOf(balid)>=0){
    counter++;
    balid = this.BalID_compose(counter);
  }
  
  return balid;
  
}


DB.notify = function(code,param = {}){
  switch(code){
    case "NEW_BAL" :
      TEMPL.PARAM = param;
      
      let subject = "ICS NEW BOOKING <<BAL>> / <<guest_name>>";
      let body = "Dear <<travel_designer>>,\n"+
"\n"+
"\n"+
"Please kindly see booking details below:\n"+
"\n"+
"Agent name : <<agent_name>>\n"+
"\n"+
"Client name : <<client_name>>\n"+
"\n"+
"Market : <<market>>\n"+
"\n"+
"Number of Pax : <<pax>>\n"+
"\n"+
"Package name : <<package_name>>\n"+
"\n"+
"Agent Ref. Number : <<agentref>>\n"+
"\n"+
"Tour date : <<tour_date>\n"+
"\n"+
"Travel Designer : <<travel_designer>>\n"+
"\n"+
"ICS Ref. number : <<bal_number>>\n"+
"\n"+
"\n"+
"Please follow this link to create quotation: <<bal_url>>\n"+
"\n"+
"\n"+
"If you have any question please ask IT administrator\n"+
"\n"+
"Note: all data is generated automatically from the system\n"+
"\n";
      subject = TEMPL.transParam(subject);
      body = TEMPL.transParam(body);
      MailApp.sendEmail({
        to: this.EMAIL_NEW_QUOTE.join(","),
        subject : subject,
        body : body,
      });
    break;
  }
}

DB.reportError = function(code,message = ""){
  switch(code){
    case "ALL_DOC_REF":
       
    break;
    case "DASH_NO_SHT_BAL":
      MailApp.sendEmail({
        to : this.EMAIL_DEBUG.join(","),
        subject : "No Sheetname for BAL in " + message,
        body : "Please add the sheet \"" + message + "\" in the docs " + this.SS_URL.replace("<sid>",this.DB_SID),
      });
    break;
    case "DEBUG" : 
      MailApp.sendEmail({
        to : this.EMAIL_DEBUG.join(","),
        subject : "DEBUGGING for application",
        htmlBody : "Things to debug \n<br/><hr/><br/>\n<pre>" + JSON.stringify(message)  + "\n</pre>\n<br/><hr/><br/>\n"
      });
    break;
  }
}


// CHANGE LOGIC NOT USED 


DB.BalID_createNew = function(new_bal_val){ 
  var year = moment().format("YYYY");
  var app =  SpreadsheetApp.openById(this.DB_SID);
  var sht = app.getSheetByName(year);
  
  if (sht == null){
    this.reportError("DASH_NO_SHT_BAL");
    return 0;
  }
  
  let balid =this.BalID_generateID();
   
  sht.insertRowAfter(sht.getMaxRows());
  let new_row = sht.getMaxRows();
  let from_r = { y: 5, x:1, h:1, w: 10}, 
      to_r = {y: new_row, x:1, h:1, w:10 }  
  sht.getRange(from_r.y, from_r.x,from_r.h,from_r.w).
       copyTo(sht.getRange(to_r.y, to_r.x,to_r.h,to_r.w));
  
  let current_email = Session.getActiveUser().getEmail();
  if (current_email == null){
    current_email ="USUAL";
  }
  
  new_bal_val.bal_number = balid;
  new_bal_val.to_ref = "REF";
  new_bal_val.booking_status = "NEW";
  
  new_bal_val.booking_date = moment(new_bal_val.booking_date,'YYYY-MM-DD');
  new_bal_val.arrival_date = moment(new_bal_val.arrival_date,'YYYY-MM-DD');
  new_bal_val.departure_date = moment(new_bal_val.departure_Date,'YYYY-MM-DD');
  /*new_bal_val = {
    bal_number: DB.BalID_compose(11),
    guest_name : "nama tamu",
    booking_date : new Date(),
    total_pax : 4,
    arrive_date : new Date(),
    agent_name : "nama agen",
    to_ref : "referensi",
    travel_design : current_email,
    remark: "catatan",
    booking_status : "kondisi booking"
  };*/
  Logger.log("on dashboard");
  sht.getRange(to_r.y, to_r.x,to_r.h,to_r.w).setValues([
  [new_bal_val.bal_number,
   new_bal_val.guest_name,
   new_bal_val.booking_date,
   new_bal_val.total_pax,
   new_bal_val.arrive_date,
   new_bal_val.departure_date,
   new_bal_val.agent_name,
   new_bal_val.to_ref,
   new_bal_val.travel_design,
   new_bal_val.remark,
   new_bal_val.booking_status
  ]]);
  
  this.BalID_newDraftQuote(new_bal_val);
  
  sht.getRange(to_r.y,to_r.x)
     .setFormula('=HYPERLINK("'+this.SS_URL.replace("<sid>",new_bal_val.sid)+'",' +
       '"' + new_bal_val.bal_number + '")');
}

DB.BalID_newDraftQuote = function(new_bal_val){
  let active_user = Session.getActiveUser();
  let quote_ref = SpreadsheetApp.openById(this.QREF_SID);
  let destFolder = DriveApp.getFolderById(this.QDRAF_DID);
  let name = new_bal_val.bal_number+ " at " + moment().format("HH:mm")  + " by " + active_user ;
  let new_file = DriveApp.getFileById(quote_ref.getId()).makeCopy(name, destFolder);
  
  let editors = this.USER_NEW_QUOTE.map((x)=> x);
  var owner = Session.getEffectiveUser().getEmail();
  editors.push(owner);
  new_file.addEditors(editors);
  
  new_bal_val.sid = new_file.getId();
  let SS = SpreadsheetApp.openById(new_bal_val.sid);
  
  // value not available on dashboard 
  agent = this.BALID_agentInfo(new_bal_val.agent_name)
  new_bal_val.market = agent.country;
  new_bal_val.package_name = "new_package_name";
  new_bal_val.bal_url = this.SS_URL.replace("<sid>",new_bal_val.sid)
  
  // FILL THE HEADER VALUES 
  let sht = SS.getSheetByName("2 pax");
  let fill_hdr = {y : 1, x : 2, h: 10, w:1 }
  
  //Logger.log("on new draft");
  sht.getRange(fill_hdr.y,fill_hdr.x,fill_hdr.h,fill_hdr.w)
  .setValues([
    [new_bal_val.agent_name],
    [new_bal_val.guest_name],
    [new_bal_val.market],
    [new_bal_val.total_pax],
    [new_bal_val.package_name],
    [new_bal_val.to_ref],
    [new_bal_val.booking_date],
    [new_bal_val.travel_design],
    [new_bal_val.arrive_date],
    [new_bal_val.remark]
  ]);
  
  let lock_hdr = {y:1,x:1,h:10,w:13};
  
  let protection = sht.getRange(lock_hdr.y,lock_hdr.x,lock_hdr.h,lock_hdr.w).protect();
  protection.setWarningOnly(false);
  protection.setDescription("Header Protection");
  protection.removeEditors(protection.getEditors());
  if (protection.canDomainEdit()) {
    protection.setDomainEdit(false);
  }
  let email_to_ori = this.EMAIL_NEW_QUOTE.slice(0);
  this.EMAIL_NEW_QUOTE.push(this.travel_design);
  this.notify("NEW_BAL",new_bal_val);
  this.EMAIL_NEW_QUOTE = email_to_ori;
  
  return new_bal_val;
}



