import * as moment from 'moment';
import _ from 'lodash';


var DB = {};


var DB = {};


// OLD 
DB.DB_SID = "1Ks7b2pJ-WR7BgnHmHrQTdLALKbNxAg7vbttD16LFHSA";
DB.APP_DID = "1ww1lUGpWU4DwD9XdbWs7qTx0xAmPWKkS";
DB.Q_SID = "1N0M1CL9MPJ9J0ov7XvRRj9tyBq_YfYjq9CpXMY_Q2D4";
DB.SS_URL = "https://docs.google.com/spreadsheets/d/<sid>/edit#gid=0";
DB.EMAIL_DEBUG = ["lourenzoisthebest@gmail.com"];

DB.QDRAF_DID ="1-PsFQS9d0qcyW--d9FjBusVMVmhAKP54";
DB.QREF_SID = "16qNKpHORTtRdlknBFMr6uE1_6cdSb7ZdEVRHJHyy1UA";
DB.EMAIL_NEW_QUOTE = ["lourenzoisthebest@gmail.com","pomy@icstravelgroup.com"];
DB.USER_NEW_QUOTE = ["lourenzoisthebest@gmail.com","pomy@icstravelgroup.com"];

//NEW
DB.AGENT_SID = "1AhPMW3H2ZDuvPyLkIHP9QXvZElR6MG-ARai-gQu__zQ";
DB.QUOTER_SID = "1-LrwA4irGueMUrff5DSf01haCrwtkTnCi08bqe487SA";
DB.EMAIL_DCID = "10aXnYHBATGOzTiS9g9kfl9oa74JasRvUc1ZidY7r2BI";


DB.BALID_listAgent = function(){
  let SS = SpreadsheetApp.openById(this.AGENT_SID);
  let sht = SS.getSheetByName("agent");
  let all_data = sht.getDataRange().getValues();
  all_data.shift();
  let agent_list = [];
  all_data.every(
    (row) => {
    let new_data =  {
      agent_name : row[0].toString(),
      credit_term : row[1].toString(),
      country : row[2].toString()
    };
    agent_list.push(new_data);
    return true;
  });
  return agent_list;
}

DB._bal_prefix =null;
DB.BalID_compose = function(num){
  var MAX_LENGTH_GEN =4; 
  
  if (this._bal_prefix ===null){
    this._bal_prefix = "BAL" + moment().format("YY");
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
  new_bal_val.market = "US";
  new_bal_val.package_name = "new_package_name";
  
  // FILL THE HEADER VALUES 
  let sht = SS.getSheetByName("2 pax");
  let fill_hdr = {y : 1, x : 2, h: 10, w:1 }
  
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

  this.notify("NEW_BAL",new_bal_val);
  
  return new_bal_val;
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
  
  sht.getRange(to_r.y, to_r.x,to_r.h,to_r.w).setValues([
  [new_bal_val.bal_number,
   new_bal_val.guest_name,
   new_bal_val.booking_date,
   new_bal_val.total_pax,
   new_bal_val.arrive_date,
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

DB.notify = function(code,param = {}){
  switch(code){
    case "NEW_BAL" :
      MailApp.sendEmail({
        to: this.EMAIL_NEW_QUOTE.join(","),
        subject : "New Quotation for "+ param.bal_number,
        body : "Please check the quotation file on "  + this.SS_URL.replace("<sid>",param.sid),
      });
    break;
  }
}

DB.reportError = function(code,message = ""){
  switch(code){
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


export  default  DB;
