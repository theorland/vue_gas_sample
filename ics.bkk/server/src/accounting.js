function onOpen(){
  let menu = SpreadsheetApp.getUi().createMenu("Accounting");
  menu.addItem("Extract Data", "extract_data");
  menu.addToUi();
}

function open_newurl(url) {
    var js = " \
    <script> \
      window.open('<url>', '_blank'); \
      google.script.host.close(); \
    </script> \
  ";
  js = js.replace("<url>",url);
  //Logger.log(js);
  var html = HtmlService.createHtmlOutput(js)
    .setHeight(10)
    .setWidth(100);
  SpreadsheetApp.getUi().showModalDialog(html, 'Now loading.'); // If you use this on Spreadsheet
}

var moment = Moment.moment;
var OUTPUT_DID = "12-Sb-SavVFb9VS06B6YrMzZK3TdClvU0";
var NEW_NAME = "Extract Data <date>";
var START_ROW = 5;
var spreadsheet_url = "https://docs.google.com/spreadsheets/d/<url>/edit"

var BAL_generate_url = "https://script.google.com/macros/s/AKfycbzEEdlIu5aKYZm8ZPBm-KMr6E5N76xso9I1gAoyUMF4P8FbNXA/exec";
var BAL_submit_url = "https://script.google.com/macros/s/AKfycbyo3N1QZko-gc2moBPwwXjHFrvf9rpI6ditHSF7hBBTyVW3w2w/exec";

var COL_MAX = 12;
function open_link_bal_generate(){
  open_newurl(BAL_generate_url);
}

function open_link_bal_submit(){
  open_newurl(BAL_submit_url);
}

function load_all_data(){
  let SS = SpreadsheetApp.getActive();
  let sht = SS.getActiveSheet();
  let sht_name = sht.getName();
  let ss_id = SS.getId();
  
  let values = sht.getDataRange().getValues();
  
  let data_export = [];
  values.every((data_row,i_row) => {
     let real_row = i_row;
     if (real_row < START_ROW) return true;
     if (sht.isRowHiddenByFilter(real_row)) return true;
     //Logger.log(real_row + " lolos filter"); 
     if (sht.isRowHiddenByUser(real_row)) return true;
     //Logger.log(real_row + " lolos user :" + data_row); 
     
     let data_one_row = [];
     data_row.every((cell,i_cell) => {
        let data_cell = cell.toString();
        if (cell instanceof Date){
           data_cell = cell
        }
        
        data_one_row.push(data_cell);
        return true;
     });
     //Logger.log(real_row +" : " + data_one_row);
     data_export.push(data_one_row);
     return true;
  });
  //Logger.log(data_export);

  return {
    data : data_export,
    sht_name : sht_name,
    ss_id : ss_id,
    sht : sht
  };
}

function test(){
  load_all_data();
  
}
function clean_sheet(NEW_SS,sht){
  let sht_name = sht.getName();
  NEW_SS.getSheets().every((sht) => {
      if (sht.getName() != sht_name){
        NEW_SS.deleteSheet(sht);
      }
      return true;
   });
   
  let new_sht = null;
  new_sht = NEW_SS.getSheetByName(sht.getName()); 

   let last_row = new_sht.getLastRow();
   let diff_row = last_row - START_ROW +1;
   new_sht.getFilter().remove();agent_type

   new_sht.getDrawings().every(
     (draw) => {
       draw.remove();
       return true;
    });

   new_sht.deleteRows(START_ROW+1, diff_row-1);
   let xy_output = {x : 1,y:START_ROW, w: COL_MAX, h :1} ,
       blank_data = [
         "BAL","Guest",
         "",0,"","",
         "","","",
         "",0,"",
         "Confirmed","Yes"];
   let output_range = new_sht.getRange(xy_output.y, xy_output.x,xy_output.h, xy_output.w);
   output_range.setValues([blank_data]);

   new_sht.insertRowAfter(START_ROW);
   output_range.copyFormatToRange(new_sht,xy_output.x,(xy_output.x+xy_output.w-1), START_ROW+1, START_ROW+1);

   return NEW_SS;
}

function extract_data(){
  let data = load_all_data(); 
  agent_type
  let data_export = data["data"];
  let sht = data["sht"];
  
  let folder = DriveApp.getFolderById(OUTPUT_DID);
  let fileref = DriveApp.getFileById(ss_id);
  let newfile = fileref.makeCopy(folder);
  let NEW_SS =  SpreadsheetApp.openById(newfile.getId());
  
  NEW_SS = clean_sheet(NEW_SS,sht);
  
  NEW_SS.rename(
    NEW_NAME.replace("<date>",moment().format("YYYY-MM-DD HH:mm"))
  );
  
  let new_sht = null;
  new_sht = NEW_SS.getSheetByName(sht.getName()); 
  
 let xy_output = {x : 1,y:START_ROW, w: COL_MAX, h :1};
 
   data_export.every((data_row,idx) => {
       let real_row = START_ROW + idx;
       let range = new_sht.getRange(real_row,1,1,data_row.length);
       //Logger.log(range.getNumRows() + " <> " + data_row);
       //Logger.log(range.getNumColumns() + " <> " + data_row.length);
       range.setValues([data_row]);
       
       new_sht.insertRowAfter(real_row);
       range.copyFormatToRange(new_sht,xy_output.x,(xy_output.x+xy_output.w-1),real_row+1, real_row+1);
       return true;
   });

   let new_url = spreadsheet_url.replace("<url>",newfile.getId());
   open_newurl(new_url);
}

