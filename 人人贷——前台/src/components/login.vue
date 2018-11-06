<template>
    <div class="outer">
        <h4>用户登陆</h4>
        <div class="user-phone">
            <input type="number" name="tel" placeholder="请输入手机号" v-model="phone"/>
        </div>
        <div class="code">
            <input type="number" name="tel" placeholder="请输入验证码" v-model="code"/>
            <span id="sendCode" @click="sendCode()">{{sendValue}}</span>
        </div>
        <button :class="[code == '' ? 'read-only button' : 'submit button']" @click="submit()">登陆</button>
        <div class="warning">登陆即代表同意（<span @click="popup = true">人人贷用户协议</span>)</div>
        <div class="type">
            <span @click="$router.replace('/passlogin')">账号密码登陆>></span>
        </div>
        <mt-popup v-model="popup" class="dialog">
            <div class="content">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;1、人人贷服务条款的确认和接纳
人人贷的各项电子服务的所有权和运作权归杭州人人贷网络科技有限公司，以下简称人人贷科技。人人贷科技按照其发布的章程、服务条款和操作规则提供服务。用户使用或接受服务，即视为其已了解并完全同意本服务条款的各项内容，包括人人贷科技就服务条款随时作出的任何增加、删减或修改。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;2、服务条款的修改和服务修订
人人贷科技有权在必要时修改服务条款，人人贷科技服务条款一旦发生变动，将会在网站上同步提示修改内容。如果用户继续享用网络服务，则视为同意并接受服务条款的变动；如果用户不同意所改动的内容，可以主动取消获得的网络服务。人人贷科技保留随时修改或中断服务而不需知会用户的权利。人人贷科技行使修改或中断服务的权利，不需对用户或第三方负责。用户所提供的个人资料将会被人人贷科技进行适当的处理汇总，并根据实际业务需要为人人贷科技的合作方提供依据。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;3、用户信息使用 
用户同意人人贷科技不定期地通过注册会员留下的电子邮件、手机短信或通讯地址同该用户保持联系。为完成人人贷科技为用户所提供的服务，用户同意人人贷科技利用计算机及其它方式搜集，保存，处理个人资料（包括但不限于姓名、出生年月日、身份证号码、电话及通信地址等信息）和其它信息（包括但不限于个人信用、投资及保险等信息），授权人人贷科技及其关联公司向征信机构或其他第三方核实其本人资信情况；同时，用户也授权人人贷科技可以将其本人的信用资料、个人信息及其他记录提供给征信机构或经人人贷科技许可并授权的其他第三方使用。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;4、用户隐私制度
尊重用户个人隐私是人人贷科技义不容辞的责任，人人贷科技不会在未经合法用户授权时公开其提交或存储在人人贷科技的非公开资料，但以下情况除外：根据法机关、政府部门、行业主管部门或其他管理机关之要求；根据法律法规、规范性文件或相关政策要求；为社会公共目的向相关单位提供个人资料；因用户密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露；由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营之不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等在紧急情况下为维护用户个人和社会公众的安全之目的。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;5、拒绝提供担保
用户个人对网络服务的使用承担风险，人人贷科技对此不承担任何责任，也不作任何类型的担保，但是不排除商业性的隐含担保、特定目的和不违反规定的适当担保。对人人贷外部链接的真实性、准确性和完整性，以及非人人贷科技控制的任何网页的内容的真实性、准确性和完整性，人人贷科技不作任何担保，也不承担任何责任。人人贷科技不担保服务一定能满足用户的要求，也不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保。人人贷科技对用户在人人贷上得到的任何商品购物服务或交易进程，不作担保。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;6、对用户信息的存储和限制
用户在访问、使用人人贷科技或申请使用人人贷科技服务时，必须提供本人真实有效的个人信息，且用户应该根据实际变动情况及时更新个人信息。保护用户隐私是我们的重点原则，我们通过各种技术手段和强化内部管理等办法提供隐私保护服务功能，充分保护用户的个人信息安全，人人贷科技不负责审核用户提供的个人信息的真实性、准确性或完整性，因信息不真实、不准确或不完整而引起的任何问题及其后果，由用户自行承担，且用户应保证人人贷科技免受由此而产生的任何损害或责任。若我们发现用户提供的个人信息是虚假、不准确或不完整的，人人贷科技有权随时中断对其提供网络服务，并无需事先通知。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;7、保障
用户不得利用人人贷科技的服务从事任何违法、不正当或可能侵害人人贷科技或任何第三方合法权益的活动。用户完全理解并同意，因其不当行为导致第三方索赔的，用户应承担人人贷科技及其所属公司或子公司、分公司、董事职员、代理人因此发生的所有费用和遭受的一切损失（包括其向第三方进行的赔付费用以及其为处理该赔付要求而花费的所有费用，包括但不限于律师费、诉讼费、差旅费等）。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;8、结束服务
用户理解并完全同意，人人贷科技可随时自行决定中断或终止一项或多项网络服务而无需事先通知，也无需对用户或任何第三方承担任何责任。用户对后来的条款修改有异议，或对人人贷的服务不满，可以行使如下权利：停止使用人人贷的网络服务。通告人人贷停止对该用户的服务。用户结束服务后，用户使用网络服务的权利立即中止。自结束服务之时起，用户无权要求，人人贷科技也没有义务向用户或任何第三方提供任何未处理的信息或未完成的服务。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;9、法律
本服务条款的订立、执行和解释及争议的解决均应适用中华人民共和国法律。如发生任何争议，任何一方均应向杭州协力信息科技有限公司所在地有管辖权的人民法院提起诉讼。如服务条款与中华人民共和国法律法规相抵触，则发生抵触的条款应按相关法律规定重新解释，而其它条款则仍然有效。</p>
                
            </div>
		</mt-popup>
    </div>
</template>

<script>
    import { getQueryString } from '@/api/load.js'
    export default {
        name: 'login',
        data() {
            return {
                phone: '',
                code: '',
                sendValue: '获取验证码',
                waitTime: 60,
                popup: false,
            }
        },
        beforeRouteLeave (to, from, next) {
            if(to.name == 'mine') {
                this.$router.replace('/index')
            }
            next();
        },
        beforeMount() {

        },
        methods: {
            submit() {
                let _this = this;
                if(!(/^1[345678]\d{9}$/.test(_this.phone))) {
                    _this.$toast('手机号格式不正确');
                    _this.phone = '';
                    return;
                }
                if(_this.code == '') {
                    _this.$$toast('请输入有效的验证码');
                    return;
                }

                let param = new URLSearchParams();
                param.append("phone", _this.phone);
                param.append("verifyCode",  _this.code);
                param.append("shareCode",  sessionStorage.getItem('share'));
                _this.$http.post('/api/user/login', param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$toast(r.message);
                        _this.$router.replace('/index');
                    } else {
                        _this.$toast(r.message)
                    }
                })
            },
            sendCode() {
                let _this = this;
                if(_this.phone.replace(/^\s*$/g, "") == '') {
                    Toast('请填写手机号');
                } else {
                    let url = '/api/user/sendVerifyMsg/' + _this.phone;
                    _this.$http.post(url).then((res) => {
                        let r = res.data;
                        if(r.code == 0) {
                            _this.$toast(r.message);
                        } else {
                            _this.$toast('服务繁忙请稍后再试')
                        }
                    })
                    _this.times();
                }
            },
            //短信倒计时
            times() {
                let _this = this
                if(_this.waitTime == 0) {
                    document.getElementById('sendCode').style.color = '#00B996';
                    _this.disabled = false;
                    _this.sendValue = '获取验证码'
                } else {
                    document.getElementById('sendCode').style.color = '#8E8E8E';
                    _this.disabled = true;
                    _this.sendValue =  _this.waitTime + "s";
                    _this.waitTime--;
                    setTimeout(function() {
                        _this.times()
                    },1000)
                }
            },
        }
    }
</script>

<style scoped>
    .outer {
        width: 100%;
        min-height: 100%;
        overflow: hidden;
        background: #fff;
        position: relative;
    }
    h4 {
        font-size: 0.54rem;
        font-family:PingFangSC-Regular;
        color:rgba(60,60,60,1);
        line-height: 0.6rem;
        margin: 2.3rem 0 0 0.5rem;
    }
    .user-phone {
        width: 6rem;
        height: 0.9rem;
        margin: 0.5rem auto 0;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
    }
    .user-phone input {
        width: 100%;
        border: 0;
        height: 0.9rem;
        line-height: normal;
        font-size: 0.3rem;
        color: #3c3c3c;
        float: left;
        outline: none;
    }

    .code {
        width: 6rem;
        height: 0.9rem;
        margin: 0.5rem auto 0;
        overflow: hidden;
        border-bottom: 1px solid #ddd;
    }
    .code input {
        float: left;
        width: 4rem;
        height: 0.9rem;
        line-height: normal;
        color: #3c3c3c;
        font-size: 0.3rem;
        border: 0;
        outline: none;
    }
    .code span {
        float: left;
        width: 2rem;
        line-height: 0.9rem;
        font-size: 0.3rem;
        color: #59cac2;
        text-align: center;
    }

    .button {
        width: 6rem;
        height: 0.88rem;
        border-radius: 1rem;
        outline: none;
        font-size: 0.32rem;
        color: #fff;
        line-height: normal;
        text-align: center;
        margin: 0.5rem auto 0;
        display: block;
        border: 0;
    }
    .read-only {
        background: #f6f6f6;
    }
    .submit {
        background: #59cac2;
    }
    .type {
        position: absolute;
        bottom: 0.3rem;
        width: 100%;
        overflow: hidden;
    }
    .type span {
        float: right;
        font-size: 0.28rem;
        margin-right: 0.36rem;
        color: #59cac2;
        line-height: 0.4rem;
    }

    .warning {
        text-align: center;
        margin-top: 0.4rem;
        font-size: 0.3rem;
    }
    .warning span {
        color: #59cac2;
    }
    .dialog {
        width: 6rem;
        height: 8rem;
        border-radius: 0.1rem;
    }
    .dialog .content {
        width: 5.48rem;
        height: 7.2rem;
        margin: 0.4rem auto 0;
        overflow-y: scroll;
    }
    .dialog .content p {
        font-size: 0.28rem;
        line-height: 0.4rem;
    }
</style>