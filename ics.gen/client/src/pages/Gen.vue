<template>
  <div>
   <el-form ref="fgenerate" :model="form" label-width="120px" v-loading="is_loading"
    :rules="ruleForm">
    <el-form-item label="File Name">
       <el-input v-model="form.filename" prop="filename"></el-input>
     </el-form-item>
     <el-form-item label="Submitted By">
      <el-col :span="8">
      <el-select v-model="form.created_by" filterable placeholder="Who are you?" style="width:100%" prop="created_by">
        <el-option
          v-for="(item,index) in list_quoters"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-col>
    </el-form-item>
     <el-form-item>
       Generate
      <el-button type="success" @click="onGenBoth"> Both</el-button>
      <el-button type="primary" @click="onGenDoc" >Proposal Only</el-button>
      <el-button type="warning" @click="onGenSht" > Quote Only</el-button>
    </el-form-item>
   </el-form>
   <el-dialog
    title="Generated Files"
    :visible.sync="result.showDialog"
    width="80%"
    :before-close="onDialogClose">
    <h4>See the link below <el-link type="success" :href="result.quote.url" :disabled="!result.quote.has" target="_blank">Quote</el-link> and 
    <el-link type="info" :href="result.proposal.url" :disabled="!result.proposal.has" target="_blank">Proposal</el-link></h4>
    <a v-show="result.quote.has" :href="result.quote.url" target="_blank"><el-button type="success">{{ result.quote.filename }}</el-button></a>
    <a v-show="result.proposal.has" :href="result.proposal.url" target="_blank"><el-button type="info" v-html="result.proposal.filename">{{ result.proposal.filename }}</el-button></a>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="result.showDialog = false">Done</el-button>
    </span>
  </el-dialog>
   </div>
</template>
<script>
import BackEndWrapper from '../services/BackEndWrapper';
import * as moment from "moment";

export default {
  name: 'PageGen',
  data(){
    return {
      bw : new BackEndWrapper(),
      form : {
          filename : "draft",
          created_by : "andika@icstravelgroup.com"
      },
      result :{
        showDialog : false,
        quote : {
          has : false,
          filename : "",
          url : "",
        },
        proposal : {
          has : false,
          filename : "",
          url : "",
        }
      },
      ruleForm : {
        filename : [{ required: true,message: 'Please input Filename', trigger: 'blur' },
        { type:"number",message: 'Please input Filename', trigger: 'blur' }],
        created_by : [ {required: true, type: "string", min: 1, message: 'Please input Created By', trigger: 'blur' }
        ]
      },
      list_quoters: [],
      num_loading : 0,
    }
  },
  computed :{
    is_loading : function(){
      return this.num_loading>0;
    }
  },
  mounted()
  {
    this.loadAllQuoters();
  },
  methods : {
    checkValid(){
      let result = false;
      this.$refs["fgenerate"].validate((valid) => {
        if (!valid){
          this.$message({
            type: 'error',
            message : 'Please fill all the input',
          });
        }
        result=valid;
      });
      return result;
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
    onGenBoth : function(){
       if (!this.checkValid()){
         console.log("non valid again ?");
        return false;
      }
      
      this.num_loading = this.num_loading+1;

      this.bw.BALID_createDraft(this.form.filename, this.form.created_by, 3).then(function(res){
          this.result.quote.has = true;
          this.result.quote.url = res.quote.url;
          this.result.quote.filename = res.quote.name;
          this.result.proposal.has = true;
          this.result.proposal.url = res.proposal.url;
          this.result.proposal.filename = res.proposal.name;

          this.result.showDialog = true;
          this.num_loading =this.num_loading -1;  

      }.bind(this),function(err){
        window.alert("Some error please refresh \n\n"+ JSON.stringify(err) );
        this.num_loading =this.num_loading -1;
      }.bind(this));
    },
    onGenDoc : function(){
       if (!this.checkValid()){
        return false;
      }
      this.num_loading = this.num_loading+1;

      this.bw.BALID_createDraft(this.form.filename, this.form.created_by,2).then(function(res){
          this.result.proposal.has = true;
          this.result.proposal.url = res.proposal.url;
          this.result.proposal.filename = res.proposal.name;

          this.result.showDialog = true;
          this.num_loading =this.num_loading -1;  

       }.bind(this),function(err){
        window.alert("Some error please refresh \n\n"+ JSON.stringify(err) );
        this.num_loading =this.num_loading -1;
      }.bind(this));
    },
    onGenSht : function(){
      if (!this.checkValid()){
        return false;
      }

      this.num_loading = this.num_loading+1;

      this.bw.BALID_createDraft(this.form.filename, this.form.created_by,1).then(function(res){
          this.result.quote.has = true;
          this.result.quote.url = res.quote.url;
          this.result.quote.filename = res.quote.name;

          this.result.showDialog = true;
          this.num_loading =this.num_loading -1;  

       }.bind(this),function(err){
        window.alert("Some error please refresh \n\n"+ JSON.stringify(err) );
        this.num_loading =this.num_loading -1;
      }.bind(this));
    },
    onDialogClose : function(done){
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done();
          this.result.quote.has = false;
          this.result.quote.url = "";
          this.result.quote.filename = "";
          this.result.proposal.has = false;
          this.result.proposal.url = "";
          this.result.proposal.filename = "";
        })
        .catch(_ => {});
    }
  }
}
</script>