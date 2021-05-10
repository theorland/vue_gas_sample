var DB = {};

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

//DB.EMAIL_NEW_QUOTE =["lourenzoisthebest@gmail.com","pomy@icstravelgroup.com"];
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

DB.Email_loadTemplate = function(id){
 //let id = "10aXnYHBATGOzTiS9g9kfl9oa74JasRvUc1ZidY7r2BI";
 let url = "https://docs.google.com/feeds/download/documents/export/Export?id="+id+"&exportFormat=html";
 let param = 
     {
       method      : "get",
       headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
       muteHttpExceptions:true,
     };
  let html = UrlFetchApp.fetch(url,param).getContentText();
  let parsed = grabHTMLTemplate(html);
  return parsed;
}

DB.BALID_moveToNewBal = function(new_bal_val){
  
  new_bal_val.bal_number = this.BalID_generateID();
  new_bal_val.file_quotation;
  let root_folder = DriveApp.getFolderById(this.CONFIRMED_DID);
  let old_folder=DriveApp.getFolderById(this.QDRAF_DID);
  
  let quoter = this.BALID_prepareNewQuoter();
  let new_folder = root_folder.createFolder(new_bal_val.bal_number);
  
  let fquote = DriveApp.getFileById(new_bal_val.file_quotation);
  let fprop = DriveApp.getFileById(new_bal_val.file_proposal);
  
  new_folder.addFile(fquote);
  new_folder.addFile(fprop);
  old_folder.removeFile(fquote);
  old_folder.removeFile(fprop);
  
  new_bal_val.file_quotation = fquote;
  new_bal_val.file_proposal = fprop;
  new_bal_val.folder_confirmed = new_folder;
  return new_bal_val;
}

DB.BALID_submitDraft = function(new_bal_val){
  

  this.BALID_moveToNewBal(new_bal_val);
  
  var year = moment().format("YYYY");
  var app =  SpreadsheetApp.openById(this.DB_SID);
  var sht = app.getSheetByName(year);
  
  if (sht == null){
    this.reportError("DASH_NO_SHT_BAL");
    return 0;
  }
  this.DASHBOARD_START_ROW; 
   
  sht.insertRowBefore(this.DASHBOARD_START_ROW);
  let new_row = this.DASHBOARD_START_ROW;
  let to_r = {y: new_row, x:1, h:1, w:this.DS_MAX_COL } 
  let from_r = { y: new_row+1, x:1, h:1, w: this.DS_MAX_COL}; 
 
  sht.getRange(from_r.y, from_r.x,from_r.h,from_r.w)
  .copyFormatToRange(sht, to_r.x,(to_r.x+to_r.w-1),to_r.y,to_r.y);
  
  new_bal_val.booking_status = DB.SUBMIT_STATUS ;
  
  new_bal_val.booking_date = moment(new_bal_val.booking_date,"YYYY-MM-DD").toDate();
  new_bal_val.departure_date = moment(new_bal_val.departure_date,"YYYY-MM-DD").toDate();
  new_bal_val.arrive_date= moment(new_bal_val.arrive_date,"YYYY-MM-DD").toDate();
  /* {
    bal_number: null,
    travel_design : "@icstravelgroup.com",
    guest_name : "nama tamu",
    booking_date : "2020-10-10",
    total_pax : 4,
    arrive_date : "2020-10-10",
    departure_date : "2020-12-10",
    agent_name : "nama agen",
    selling_price: 0,
    remark: "no",
    to_ref : "",
    selling_price : 0,
    file_quotation : "1yJuaLzkMh_rcohHvUrq5hPTdDtLJ1nPZP_RTVB51EaA",
    file_proposal : "15-I7Tsc0zRS2dCk3u7C-fQlE5HMQA2cFqDDSe4dxOSA",
    folder_confirmed: 
  }*/
  //Logger.log("on dashboard");
  sht.getRange(to_r.y, to_r.x,to_r.h,to_r.w).setValues([
  [new_bal_val.bal_number,
   new_bal_val.guest_name,
   new_bal_val.booking_date,
   new_bal_val.total_pax,
   new_bal_val.arrive_date,
   new_bal_val.departure_date,
   new_bal_val.agent_name,
   new_bal_val.agent_type,
   new_bal_val.to_ref,
   new_bal_val.travel_design,
   new_bal_val.selling_price,
   new_bal_val.commision,
   new_bal_val.booking_status,
   new_bal_val.remark,
  ]]);
   

  let drive_url = this.DF_URL.replace("<did>",new_bal_val.folder_confirmed.getId());
  
  sht.getRange(to_r.y,to_r.x)
     .setFormula('=HYPERLINK("'+drive_url+'",' +
       '"' + new_bal_val.bal_number + '")');

  // find market 
  let all_agent = this.BALID_listAgent();
  let agent_name = new_bal_val.agent_name;
  let market = "Indonesia";
  all_agent.every((agent) => {
    if (agent.agent_name == agent_name){
      market = agent.country;
      return false;
    }
    return true;
  });
  new_bal_val.market = market;
    
  //find designer name 
  let travel_design = new_bal_val.travel_design;
  let quoters = this.BALID_listQuoter();
  let quoter_name = "No Name";
  quoters.every((quoter) => {
    Logger.log(JSON.stringify(quoter) + " : " + travel_design);
    if (quoter.email == travel_design){
      quoter_name = quoter.name;
      return false;
    }
    return true;
  });
  new_bal_val.designer_name = quoter_name;
  
  this.notify("SUBMIT_BAL",new_bal_val);
    
   return new_bal_val;
}

DB.BALID_prepareNewQuoter = function(){
  //this.S_LOG = this.S_LOG  + "masuk ke fungsi pertama\n";
  if (this.USER_NEW_QUOTE == null){
     //this.S_LOG = this.S_LOG  + "masuk if kan?";
     let all_quoters = this.BALID_listQuoter();
     let users = [this.USER_EXEC ];
     //this.S_LOG =  this.S_LOG + JSON.stringify(all_quoters);
     all_quoters.every((data,idx) => {
       users.push(data.email);
       //this.S_LOG = this.S_LOG + ","+data.email;
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
  
  let quote_ref = SpreadsheetApp.openById(this.QREF_SID);
  let proposal_ref = DocumentApp.openById(this.PDRAF_DCID);
  
  let editors = this.USER_NEW_QUOTE.map((x)=> x.toString());
  
  editors.push(_by.toString());

  let result = {};
  if (mode & 1 >0){
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
  if (mode & 2 >0){
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
    num = num.padStart(MAX_LENGTH_GEN,"0")        ;
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
    case "SUBMIT_BAL" :
      
      let translate = { 
        "guest_name" : param.guest_name,
        "travel_designer": param.designer_name,
        "travel_design" : param.travel_design,
        "user" : param.designer_name,
        "client_name": param.guest_name,
        "market": param.market,
        "pax":param.total_pax,
        "package_name":param.bal_number,
        "agentref": param.to_ref,
        "agenttype": param.agent_type,
        "agent_name": param.agent_name,
        "book_date": param.booking_date,
        "arrival_date": param.arrive_date,
        "deptur_date": param.departure_date,
        "commission" :param.commission,
        "bal_number": param.bal_number,
        "BAL": param.bal_number,
        "link_folder": param.folder_confirmed.getUrl(),
      }
      let to = this.EMAIL_NEW_QUOTE.map((x)=>x);
      to.push(param.travel_design)
      
      let template = this.Email_loadTemplate(DB.TEMPLATE_EMAIL_SUBMIT);
      let subject = template.subject;
      let body = template.body;
      
      let PARAM_LEFT = "&lt;&lt;";
      let PARAM_RIGHT = "&gt;&gt;";
      
      for (let from in translate){
        let to = translate[from];
        let s_from = "<<" + from+">>";
        Logger.log([s_from,to]);
        let from_regex = new RegExp(s_from,"g");
        subject = subject.replace(from_regex,to);
        body= body.replace(from_regex,to);
        
        s_from = PARAM_LEFT + from + PARAM_RIGHT;
        Logger.log([s_from,to]);
        from_regex = new RegExp(s_from,"g");
        
        subject = subject.replace(from_regex,to);
        body= body.replace(from_regex,to);
      }
      
      MailApp.sendEmail({
        to: to.join(","),
        subject : subject,
        htmlBody : body,
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



