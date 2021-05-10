import Vue from 'vue';
import AppMain from './AppMain.vue';
import Element from 'element-ui'
import elementLocale from 'element-ui/lib/locale/lang/en'; 
import Vuex from 'vuex';

Vue.use(Element,{
  locale : elementLocale
});

Vue.use(Vuex);

let store = new Vuex.Store({
  state : {
    title : "Submit new Bal",
  },
  mutations : {
    changePage(state,page){      
      switch (page){
      case 'gen':
        state.title = "Generate new BAL"; 
      break;
      default:
      case 'home':
        state.title ="Submit new BAL"
      break;
     
      }
    }
  }
});





new Vue({
  el: '#my_app',
  components: { AppMain },
  store
});
