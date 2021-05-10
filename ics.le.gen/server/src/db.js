var DB = {};

// URL

DB.APP_DID = "12dE7cHURrTtKbRFAXiWWSzBQ9uSOwND1";

// PARAMETER 
DB.SS_URL = "https://docs.google.com/spreadsheets/d/<sid>/edit#gid=0";
DB.DF_URL = "https://drive.google.com/drive/folders/<did>";
DB.DC_URL = "https://docs.google.com/document/d/<DCID>/edit";
DB.EMAIL_DEBUG = ["lourenzoisthebest@gmail.com"];


DB.DB_SID = "18uUrS4RxZZ9Z-kkwouFNUA3TzWf7B6dGbAkfO75MB7I";
DB.APP_DID = "1jggA0WEH1nFsO3YBkLPip4MPHRRSm8Yz";


DB.QDRAF_DID ="1jNsUsOlInTeoigzdIa9VwAFxETaEmqk3";
DB.PDRAF_DCID = "1VYw9yLbmu6ZWlP8GIVurEaIdHKrCP3b4UeHpHpT58DU";
DB.QREF_SID = "1HjvCl_PYSpvctTxgUJnolFtFuYeS2wv3nJSqr5JCXwU";

DB.CONFIRMED_DID = "151qYwaQrRhkFJCy-AuFnDhz5_GPTDf2m";
DB.MASTER_DCID = "1VYw9yLbmu6ZWlP8GIVurEaIdHKrCP3b4UeHpHpT58DU"

//DB.EMAIL_NEW_QUOTE = ["lourenzoisthebest@gmail.com","pomy@icstravelgroup.com"];
DB.EMAIL_NEW_QUOTE = [];
DB.USER_NEW_QUOTE = null;
DB.USER_EXEC = "databaseics79@gmail.com";

DB.QUOTER_SID = "1F8Zh46007THOkp6t6DfxHcdtyp0PanrCt5zCq4khtdQ";
DB.SUPPLIER_SID = "1Ja2ZNJ4PB4nNtU0yTe41pPNmxv1FcbJfzfpkdAtklWs";

DB.EMAIL_DCID = "1Rehe8H3WwYX1CEayNsUa9tIC1BVHUuFkjFGBakgDpSo";
DB.TEMPLATE_EMAIL_SUBMIT = "1Rehe8H3WwYX1CEayNsUa9tIC1BVHUuFkjFGBakgDpSo";

// END OF PARAMETER

DB.CD_SID = "1cDSlQBZ-xEHX3bDNC3X5QmV-gXj3DEc0JO8jb8hU5ag";
DB.S_LOG = "";

DB.DASHBOARD_START_ROW =5;
DB.SUBMIT_STATUS = "Confirmed";
DB.COUNTRY_ACTIVE="BAL";

// NEW EDITED 

DB.COUNTRIES = null;
DB.Country_list = function(){
  if (this.COUNTRIES===null){
  let SS = SpreadsheetApp.openById(this.CD_SID);
  let sht = SS.getSheetByName("Main");
  let all_data = sht.getDataRange().getValues();
  all_data.shift();
  let COUNTRY_DATA ={};
  all_data.every((row)=>{
     let country_id  = row[0].toString();
     let data = {
       id : country_id,
       name : row[1].toString(),
       prefix : row[2].toString(),
       template : {
         xlsx : row[3].toString(),
         docx : row[4].toString(),
       },
       folder : {
         draft : row[5].toString(),
         confirmed : row[6].toString(),
       },
       quoter_id : row[7].toString(),
       master_info_id : row[8].toString(),
       supplier_id : row[9].toString(),
       dashboard_id : row[10].toString(),
       email_template_id : row[11].toString(),
     };
     COUNTRY_DATA[country_id] = data;
     return true;
    });
    this.COUNTRIES = COUNTRY_DATA;
  }
  return this.COUNTRIES;
}

DB.Country_set = function(id){
  let list_countries = this.Country_list();
  
  //DB.reportError("DEBUG",list_countries[id]);
  if (list_countries[id]!==undefined){
    this.COUNTRY_ACTIVE = id;
    this.COUNTRY_CODE = id;
   
    let country_data = list_countries[id];
    
    this.QDRAF_DID =country_data.folder.draft;
    this.PDRAF_DCID = country_data.template.docx;
    this.QREF_SID = country_data.template.xlsx;
    this.CONFIRMED_DID = country_data.folder.confirmed;
    this.DB_SID = country_data.dashboard_id;
    this.QUOTER_SID = country_data.quoter_id;
    this.MASTER_DCID = country_data.master_info_id;
    
    //DB.EMAIL_NEW_QUOTE =["lourenzoisthebest@gmail.com","pomy@icstravelgroup.com"];
    this.EMAIL_NEW_QUOTE = [];
    this.USER_NEW_QUOTE = null;

    this.SUPPLIER_SID = country_data.supplier_id;

    this.EMAIL_DCID = country_data.email_template_id;
    this.TEMPLATE_EMAIL_SUBMIT = country_data.email_template_id;
    this.S_LOG = "";
    
    this.DASHBOARD_START_ROW =5;
    this.SUBMIT_STATUS = "Confirmed";
    return country_data;
  }
  return "";
}


DB.BALID_listQuoter = function(){
  let SS = SpreadsheetApp.openById(this.QUOTER_SID);
  let sht = SS.getSheetByName(this.COUNTRY_ACTIVE);
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
    case "DEBUG_PARAM" :
      let PATTERN = {
        did : new RegExp("<did>","gi"),
        dcid : new RegExp("<DCID>","gi"),
        sid : new RegExp("<sid>","gi"),
        is_did : new RegExp("_DID$","i"),
        is_dcid : new RegExp("_DCID$","i"),
        is_sid : new RegExp("SID","i")
      }
      let msg = "<table border=1>";
      let ALL_KEYS = Object.keys(DB); 
      for (let key in ALL_KEYS){
        key = ALL_KEYS[key];
        let value = DB[key];
        if (typeof value ===  "function") continue;
        if (value == null) continue;
        if (typeof value === "object") value = JSON.stringify(value);
        
        let ol = "<tr><td>" + key + "</td><td> = </td><td>" + value ;
        if (PATTERN.is_did.test(key)){
          ol = ol +  " <a href=\""+  this.DF_URL.replace(PATTERN.did,value) + "\" >LINK</a>";
        }else if (PATTERN.is_dcid.test(key)) {
          ol  = ol + " <a href=\"" + this.DC_URL.replace(PATTERN.dcid, value) + "\" >LINK</a>";
        }else if (PATTERN.is_sid.test(key)) {
          ol = ol + " <a href=\"" +  this.SS_URL.replace(PATTERN.sid,value) + "\" >LINK</a>";
        }
         msg = msg + ol + "</td></tr>";
      }
      msg = msg + "</table>";

      
      MailApp.sendEmail({
        to : this.EMAIL_DEBUG.join(","),
        subject :"PARAMETER for APPLICATON",
        htmlBody : "Things to debug \n<br/><hr/><br/>\n"+msg+"\n<hr><pre>" + JSON.stringify(message)  + "\n</pre>\n<br/><hr/><br/>\n"
      })
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


// END OF NEW EDIT



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


DB.BALID_prepareNewQuoter = function(){
  
  if (this.USER_NEW_QUOTE == null){
  
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





DB._list_agent = null;
DB.BALID_listAgent = function(){
  let SS = SpreadsheetApp.openById(this.AGENT_SID);
  let sht = SS.getSheetByName(this.db.COUNTRY_ACTIVE);
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
DB.COUNTRY_CODE = "";
DB.BalID_compose = function(num){
  var MAX_LENGTH_GEN =4; 
  
  if (this._bal_prefix ===null){
    this._bal_prefix = this.COUNTRY_CODE + moment().format("YY");
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
