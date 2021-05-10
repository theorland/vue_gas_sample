<template>
	<el-container>
		<el-header>
			<h1>{{ title }}</h1> 
      
		</el-header>
		<el-main  width="1024px" >
      <router-view></router-view>
		</el-main>
	</el-container>
</template>

<style lang="css" >
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }


</style>

<script>
import router from './pages/routes';
export default {
  name: 'AppMain',
  computed : {
    title  : function(){
      return this.$store.state.title;
    }
  },
  mounted(){

  },
  methods : {
    changePage(param){
      let to = param;
      if (param == "home") { to = "/"; }

      this.$store.commit("changePage",param);
      this.$router.push(to);
    }
  },
  router
}
</script>