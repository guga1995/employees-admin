import Vue from 'vue'
import { ValidationProvider, ValidationObserver , extend, setInteractionMode} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Field is required'
});
extend('email', {
  ...email,
  message: 'Email format is invalid'
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
