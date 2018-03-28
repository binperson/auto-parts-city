// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import {
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Row,
  Col,
  DatePicker,
  Switch,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Button,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Radio,
  TimePicker,
  Upload,
  Message,
  Table,
  TableColumn,
  Popover,
  Icon,
  Tag,
  Dialog,
  Rate
} from 'element-ui';

import './common/stylus/index.styl';

Vue.config.productionTip = false; // 来关闭生产模式下给出的提示

Vue.use(VueResource);// 注册
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Row);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(RadioGroup);
Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Radio);
Vue.use(TimePicker);
Vue.use(Upload);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Icon);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Rate);
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
  /* router.push('/home/index'); */

