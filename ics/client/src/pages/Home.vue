<template>
<div>
<el-form ref="formEntry" label-width="200px" 
    :model="form" :rules="formRules" 
    v-loading="is_loading" @submit.native.prevent>
  <el-form-item label="BAL">
    <el-col :span="10">
    <el-input v-model="form.bal_number" disabled ></el-input>
    </el-col>
    <el-col :span="10">
        Date : {{today_format}}
    </el-col>
  </el-form-item>
  <el-form-item label="Submitted By" prop="travel_design">
    <el-col :span="8">
     <el-select v-model="form.travel_design" filterable placeholder="Who are you?" style="width:100%">
      <el-option
        v-for="(item,index) in list_quoters"
        :key="index"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    </el-col>
  </el-form-item>
  <el-form-item label="Guest Name" prop="guest_name">
    <el-col :span="12">
    <el-input v-model="form.guest_name"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="Booking Date" prop="booking_date">
    <el-col :span="12">
     <el-date-picker type="date" format="dd MMM yyyy" placeholder="Pick a date" v-model="form.booking_date" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>

  <el-form-item label="Total Pax" prop="total_pax">
     <el-col :span="4">
    <el-input-number v-model="form.total_pax" :step="1" style="width:100%" ></el-input-number>
     </el-col>
  </el-form-item>
  <el-form-item label="Arrival & Depature" >
    <el-col :span="10">
      Arrival
    <el-date-picker type="date" format="dd MMM yyyy"  placeholder="pick Arrival Date" v-model="form.arrive_date" style="width: 80%;"></el-date-picker>
    </el-col>
    <el-col :span="10">
      Departure
      <el-date-picker type="date" format="dd MMM yyyy"  placeholder="pick Departure Date" v-model="form.departure_date" style="width: 80%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="Agents Name" prop="agent_name">
    <el-col :span="8">
     <el-select v-model="form.agent_name" filterable placeholder="Fill The Agents" style="width:100%">
       <el-option-group
      v-for="(agents_per_country,country) in list_agents"
      :key="country"
      :label="country">
      <el-option
        v-for="agents_name in agents_per_country"
        :key="agents_name"
        :label="agents_name"
        :value="agents_name">
      </el-option>
      </el-option-group>
    </el-select>
    </el-col>
  </el-form-item>
  <el-form-item label="Total Selling Price" prop="selling_price">
      <el-col :span="15">
        <el-input placeholder="Please Input Price"
          v-model.number="form.selling_price">
        </el-input>
      </el-col>
  </el-form-item>
  <el-form-item label="To Ref" prop="to_ref">
      <el-col :span="15">
        <el-input placeholder="Ref if any"
          v-model="form.to_ref">
        </el-input>
      </el-col>
  </el-form-item>
  
  <el-form-item label="Remark" prop="remark">
      <el-col :span="4">
         <el-radio v-model="form.remark" label="Yes">Yes</el-radio>
        <el-radio v-model="form.remark" label="No">No</el-radio>
      </el-col>
  </el-form-item>
  <el-form-item label="Agent Type">
    <el-col :span="4">
     <el-select v-model="form.agent_type" placeholder="TO / TA ?" style="width:100%">
      <el-option
        v-for="(item) in list_agent_type"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    </el-col>
  </el-form-item>
  <el-form-item label="Commision">
    <el-col :span="1">
      <el-checkbox v-model="form.has_commision"></el-checkbox>
    </el-col>
    <el-col :span="16" v-show="form.has_commision">
       <el-slider :min="0" :max="MAX_PERCENT_COMMISION" :step="0.01"
      v-model="form.commision"
      :marks="commision_mark" show-input>
    </el-slider>

    </el-col>
  </el-form-item>

  <el-divider></el-divider>
   <h5>Files</h5>
   <el-divider></el-divider>
   <el-form-item label="File Quotation" prop="file_quotation">
      <el-col :span="15">
        <el-select v-model="form.file_quotation" filterable placeholder="Choose File Quotation" style="width:100%">
          <el-option-group
          v-for="(list_files,day) in list_shts"
          :key="day"
          :label="day">
          <el-option
            v-for="(filename,id) in list_files"
            :key="id"
            :label="filename"
            :value="id">
          </el-option>
          </el-option-group>
        </el-select>
      </el-col>
      <el-col :span="5" v-show="quotation_selected">
        <el-link type="success" @click.prevent.stop="openToPreview('quote')">Preview</el-link>
      </el-col>
  </el-form-item>
    <el-form-item label="File Proposal" prop="file_proposal">
      <el-col :span="15">
        <el-select v-model="form.file_proposal" filterable placeholder="Choose File Proposal" style="width:100%">
          <el-option-group
            v-for="(list_files,day) in list_docs"
            :key="day"
            :label="day">
            <el-option
              v-for="(filename,id) in list_files"
              :key="id"
              :label="filename"
              :value="id">
            </el-option>
            </el-option-group>
        </el-select>
     </el-col>
    <el-col :span="5" v-show="proposal_selected">
        <el-link type="info" @click.prevent.stop="openToPreview('proposal')">Preview</el-link>
    </el-col>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Submit Bal</el-button>
    <el-button type="warning" @click="resetForm">Reset</el-button>
  </el-form-item>
</el-form>

</div>
</template>
<style type="css">

</style>
<script>
import BackEndWrapper from '../services/BackEndWrapper';
import * as moment from "moment";


export default 
{
  name: 'Home',
  data(){
    let all_data = {
      bw:new BackEndWrapper(),
      num_loading : 0,
      today_format : moment().format("DD MMM YYYY"),
  		form : {
        bal_number: null,
        travel_design : "",
				guest_name : "",
				booking_date : new Date(),
				total_pax : 4,
        arrive_date : new Date(),
        departure_date : new Date(),
				agent_name : "",
        remark: null,
        selling_price : 0,
        to_ref : "",
        file_quotation : "",
        file_proposal : "",
        agent_type :"TO",
        has_commision :true,
        commision : 0,
      },
      formRules: {
        travel_design : [{required : true, type : "email", message:"Please Fill Correct Email", trigger: ["blur", "change"]}],
        guest_name : [{required : true, min : 3, message:"Guest Name minimum 3", trigger: ["blur", "change"]}],
        total_pax : [{required : true, type : "number", message:"Fill the correct number", trigger: ["blur", "change"]}],
        agent_name : [{validator:  checkAgent, trigger: ["blur", "change"]}],
        selling_price : [{required : true, type: "number", message:"Fill the correct number", trigger: ["blur", "change"]}],
        file_proposal : [{validator: checkFile, trigger: ["blur", "change"]}],
        file_quotation : [{validator: checkFile,trigger: ["blur", "change"]}],
        remark : [{required : true, message :"Please choose on of them", trigger: ["blur","change"]}]
      },
      list_agents : {},
      list_quoters : [],
      list_docs : {},
      list_shts : {},
      list_files : {},
      list_agent_type : ["TO","TA"],
      MAX_PERCENT_COMMISION : 25,
      commision_mark: {
        5 : {'label': this.$createElement('span','5%')
            },
        10: "10%",
        15 : "15%",
        20 : "20%",
        25 : "25%",
      }
    };
    
    var checkAgent = (rule, value, callback) => {
      
        if (value === '') {
          callback(new Error('Please input the correct Agents'));
        } 
        let found = false;
        for (let region in this.list_agents){
          let agents_in_region = this.list_agents[region];
          agents_in_region.every((agent)=>{
            if (agent == value){
              found=true;
              return false;
            }
            return true;
          }) 
        };
        if (found){
          callback();
        }else {
           callback(new Error("Please input the provided Agents"));
        }
      };
    var checkFile = (rule, value, callback) => {
      if (value === ''){
        callback(new Error("Please input the provided agents"));
      }
     
      if (this.list_files[value]==undefined){
        callback(new Error("Please input the provided agents"));
      }else {
        callback();
      }
    };
  	return all_data;
  },
  mounted()
  {
    this.generateBalID();
    this.loadAllAgents();
    this.loadAllQuoters();
    this.loadAllFiles();
  },

  computed : {
    is_loading : function(){
      return this.num_loading>0;
    },
    proposal_selected : function(){
      if (this.form.file_proposal==""){
        return false;
      }
      let id = this.form.file_proposal;

      return this.list_files[id]!==undefined;
    },
    quotation_selected : function(){
      if (this.form.file_quotation==""){
        return false;
      }
      let id = this.form.file_quotation;
      return this.list_files[id]!==undefined;
    }

  },
  methods:
  {
    onCommisionChange(){
      if (!this.form.has_commision){
        this.for.commision = 0;
      }
    },
    openToPreview(cmd){
      let id, url;

      switch(cmd){

      case "quote":
        id = this.form.file_quotation;
        url = this.list_files[id].url;
        window.open(url,"_blank");
      break;
      case "proposal":
        id = this.form.file_proposal;
        url = this.list_files[id].url;
        window.open(url,"_blank");
      break;
      }
     
    },
    generateBalID : function(){
      this.num_loading = this.num_loading +1;
      this.bw.BalID_generateID().then(function(res){
        this.form.bal_number = res;
        this.num_loading =this.num_loading -1;
      }.bind(this), function(err){
        window.alert("Some error please refresh \n\n"+ JSON.stringify(err) );
        this.num_loading =this.num_loading -1;
      }.bind(this));
    },
    loadAllFiles : function(){
      this.num_loading = this.num_loading +1;
      
      let SAVED_FORMAT = 'YYYY-MM-DD-HH-mm';
      let DAY_FORMAT = "";

      this.bw.BALID_listAllDraftFile().then(function(res){
        
        let all_files = {};
        let list_docs_groupped = {};
        res.proposal.every((row)=>{
          let id = row.id;
           
          row.modified = moment(row.modified,SAVED_FORMAT);
          let name = row.name ;
          all_files[id] = row;
          
          let day = "Updated in " + row.modified.format("ddd D/M");
          if (list_docs_groupped[day] === undefined){
            list_docs_groupped[day] = {};
          }
          list_docs_groupped[day][id] = name;
          return true;
        })
        
        this.list_docs = list_docs_groupped;

        let list_sht_groupped = {};
        res.quote.every((row)=>{
          let id = row.id;
           
          row.modified = moment(row.modified,SAVED_FORMAT);
          let name = row.name ;
          all_files[id] = row;
          
          let day = "Updated in " + row.modified.format("ddd D/M");
          if (list_sht_groupped[day] === undefined){
            list_sht_groupped[day] = {};
          }
          list_sht_groupped[day][id] = name;
          return true;
        })
        this.list_shts = list_sht_groupped;
        this.list_files = all_files;
        this.num_loading = this.num_loading-1;
        
      }.bind(this), function(err){
        window.alert("Some error please refresh \n\n"+ JSON.stringify(err) );
        this.num_loading =this.num_loading -1;
      }.bind(this));
    },
    loadAllAgents : function(){
      this.num_loading = this.num_loading +1;
      
      this.bw.BALID_listAgent().then(function(res){

        let all_agents_grouped = {};

        res.every((row)=>{
          let country = row.country;
          let agent_name = row.agent_name;
          if (all_agents_grouped[country] === undefined){
            all_agents_grouped[country] = [];
          }
          all_agents_grouped[country].push(agent_name);
          return true;
        })
        
        this.list_agents = all_agents_grouped;
        this.num_loading = this.num_loading-1;
      }.bind(this), function(err){
        window.alert("Some error please refresh \n\n"+ JSON.stringify(err) );
        this.num_loading =this.num_loading -1;
      }.bind(this));
    },
    loadAllQuoters : function(){
      this.num_loading = this.num_loading+1;
      this.bw.BALID_listQuoter().then(function(res){
        let all_quoters = [];

        res.every((row)=>{
          let new_row = {
            label : row.name.substring(0,1).toUpperCase() + row.name.substring(1) + " (" + row.email + " )" ,
            value : row.email
          }
          all_quoters.push(new_row);
          return true;
        })
        
        this.list_quoters = all_quoters;
        this.num_loading = this.num_loading-1;
      }.bind(this), function(err){
        window.alert("Some error please refresh \n\n"+ JSON.stringify(err) );
        this.num_loading =this.num_loading -1;
      }.bind(this));
    },
    resetForm: function(){
      this.form = {
        bal_number: null,
        travel_design : "@icstravelgroup.com",
				guest_name : "nama tamu",
				booking_date : new Date(),
				total_pax : 4,
        arrive_date : new Date(),
        departure_date : new Date(),
        agent_name : "nama agen",
        selling_price: 0,
        remark: null,
        to_ref : "",
        selling_price : 0,
        file_quotation : "",
        file_proposal : "",
        agent_type :"TO",
        has_commision :true,
        commision : 0,
      }
      this.generateBalID();
      this.loadAllFiles();
    },
    onSubmit : function(){
      let success = null;
      this.num_loading = this.num_loading+1; 

      var executeSubmit = ()=>{

        let new_entry = {
          bal_number: this.form.bal_number,
          travel_design : this.form.travel_design,
          guest_name : this.form.guest_name,
          booking_date : moment(this.form.booking_date).format('YYYY-MM-DD'),
          total_pax : this.form.total_pax,
          arrive_date : moment(this.form.arrive_date).format('YYYY-MM-DD'),
          departure_date : moment(this.form.departure_date).format('YYYY-MM-DD'),
          agent_name : this.form.agent_name,
          remark: this.form.remark,
          selling_price : this.form.selling_price,
          to_ref : this.form.to_ref,
          file_quotation : this.form.file_quotation,
          file_proposal : this.form.file_proposal,
          agent_type :this.form.agent_type,
          commision : (this.form.commision>0?this.form.commision + "%": ""),
        };


        this.bw.BALID_submitDraft(new_entry).then(function(res){
          this.resetForm();
          this.$notify({
            title: 'Success',
            message: 'Submitting new Bal success',
            type: 'success'
          });
          
          this.num_loading =this.num_loading-1;
        }.bind(this),
        function(err){
          window.alert("Some error please refresh \n\n"+ JSON.stringify(err) );
          this.num_loading =this.num_loading-1;
        }.bind(this));
        
      }
      
      this.$refs["formEntry"].validate(
        (valid)=>{
          
        if (valid){
          executeSubmit();
        } else {
          this.$notify({
            title: 'Error',
            message: 'Some entry has error',
            type: 'error'
          });
          this.num_loading = this.num_loading-1;
        }  
      });
      
    },
  	
  }
  
}
</script>