//https://github.com/baianat/vee-validate
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
const requiredMessage = {
  mobile: '手机号不能为空',
  password: '请输入密码',
  nickname: "昵称不能为空",
  email: "邮箱格式不对",
}
// 手机验证 11位
const Mobile = {
    validate: (value, args) => {
       return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
}
//图形验证码 4位
const ImageVerify = {
  validate: (value, args) => {
     return value.length == 4 && /^[0-9]{4}$/.test(value)
  }
}
//短信验证码 6位
const VerifyCode = {
  validate: (value, args) => {
     return value.length == 6 && /^[0-9]{6}$/.test(value)
  }
}
//密码  字符和数字必须输入，可加特殊符号
const Password = {
  validate: (value, args) => {
    return /^(?=.*[0-9])(?=.*[A-Za-z])[0-9A-Za-z\x21-\x7e]{8,16}$/.test(value)
  }
}
//配置错误文言
Validator.localize({
  zh_CN: {
    messages: {
      required: (name) => requiredMessage[name] || '输入不能为空',
      mobile: (name) => '请输入正确的手机号', 
      imageVerify: (name) => '请输入正确格式的图形验证码',
      verifyCode: (name) => '请输入6位的短信验证码',
      password: (name) => '密码过于简单，至少包含一个数字和字母，长度在8-16位之间',
    }
  }
})

//添加方法
Validator.extend('mobile',Mobile);
Validator.extend('imageVerify',ImageVerify);
Validator.extend('verifyCode',VerifyCode);
Validator.extend('password',Password);


const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields', 
  delay: 0, 
  locale: 'zh_CN', 
  dictionary: null, 
  strict: true, 
  enableAutoClasses: true,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'ng-valid', // model is valid
    invalid: 'ng-invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'ng-dirty' // control has been interacted with
  },
  events: 'blur',//events: 'input|blur',
  inject: true  
}

Vue.use(VeeValidate,config);