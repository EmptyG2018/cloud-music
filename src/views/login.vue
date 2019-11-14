<template>
	<div data-page='login'>
		<h1 class="tit">登录</h1>
		<mu-slide-left-transition>
			<div class="form" v-show="!isEmail">
				<div class="wrapper">
					<mu-form ref="phoneForm" :model="phone.validateForm" class="mu-demo-form">
						<mu-form-item :label-float="true" label="手机号" prop="username" :rules="phone.usernameRules">
							<mu-text-field v-model="phone.validateForm.username" prop="username"></mu-text-field>
						</mu-form-item>
						<mu-form-item :label-float="true" label="密码" prop="password" :rules="phone.passwordRules">
							<mu-text-field type="password" v-model="phone.validateForm.password" prop="password"></mu-text-field>
						</mu-form-item>
						<div class="Ptop4">
							<mu-button large full-width color="#A611F4" @click="sendPhone">提交</mu-button>
						</div>
					</mu-form>
				</div>
				<div class="href">
					<span class="to" @click="toggleLogin">邮箱登陆</span>
				</div>
			</div>
		</mu-slide-left-transition>
		<mu-slide-right-transition>
			<div class="form" v-show="isEmail">
				<div class="wrapper">
					<mu-form ref="emailForm" :model="email.validateForm" class="mu-demo-form">
						<mu-form-item :label-float="true" label="邮箱账号" prop="username" :rules="email.usernameRules">
							<mu-text-field v-model="email.validateForm.username" prop="username"></mu-text-field>
						</mu-form-item>
						<mu-form-item :label-float="true" label="密码" prop="password" :rules="email.passwordRules">
							<mu-text-field type="password" v-model="email.validateForm.password" prop="password"></mu-text-field>
						</mu-form-item>
						<div class="Ptop4">
							<mu-button large full-width color="#A611F4" @click="sendEmail">提交</mu-button>
						</div>
					</mu-form>
				</div>
				<div class="href">
					<span class="to" @click="toggleLogin">手机号登陆</span>
				</div>
			</div>
		</mu-slide-right-transition>
		<mu-snackbar :position="snackbar.position" :open.sync="snackbar.open">
		{{snackbar.message}}
		<mu-button flat slot="action" color="secondary" @click="snackbar.open = false">关闭</mu-button>
		</mu-snackbar>		
	</div>
</template>
<script>
import axios from 'axios'
export default {
	/*async asyncData ({isServer, req, redirect}) {
		if(isServer){
			console.log(req.headers['cookie']);
			console.log('服务器渲染')
		}else{
			let data = await axios.get("/login/refresh");
			redirect(302,'/');
		}
		
		
	},*/
	data () {
		return {
			isEmail: 0,
			snackbar: {
				position: 'top',
				message: '提示',
				open: false,
				timeout: 3000
			},
			phone: {
				usernameRules: [
					{ validate: (val) => !!val, message: '必须填写用户名'},
					{ validate: (val) => val.length >= 3, message: '用户名长度大于3'}
				],
				passwordRules: [
					{ validate: (val) => !!val, message: '必须填写密码'},
					{ validate: (val) => val.length >= 3 && val.length <= 16, message: '密码长度大于3小于16'}
				],
				validateForm: {
					username: '',
					password: ''
				}				
			},
			email: {
				usernameRules: [
					{ validate: (val) => !!val, message: '必须填写用户名'},
					{ validate: (val) => val.length >= 3, message: '用户名长度大于3'}
				],
				passwordRules: [
					{ validate: (val) => !!val, message: '必须填写密码'},
					{ validate: (val) => val.length >= 3 && val.length <= 16, message: '密码长度大于3小于16'}
				],
				validateForm: {
					username: '',
					password: ''
				}				
			}
			
		}
	},
	methods: {
		sendPhone () {
			this.$refs.phoneForm.validate().then((result) => {
				if(result){
					axios.get('/login/cellphone', {
						params: {
							phone: this.phone.validateForm.username,
							password: this.phone.validateForm.password
						}
					}).then((res)=>{
						if(res.data.code==200){
							this.$router.push('/');
						}else{
							this.snackbar.message = "手机号或密码不正确";
							this.openNormalSnackbar();	
						}
					}).catch((err)=>{
						console.log(err);
						this.snackbar.message = "手机号或密码不正确";
						this.openNormalSnackbar();
					})
				}
			});
		},
		sendEmail () {
			this.$refs.emailForm.validate().then((result) => {
				if(result){
					axios.get('/login', {
						params: {
							email: this.email.validateForm.username,
							password: this.email.validateForm.password
						}
					}).then((res)=>{
						if(res.data.code==200){	
							this.$router.push('/');
						}else{
							this.snackbar.message = "邮箱或密码不正确";
							this.openNormalSnackbar();
						}
					}).catch((err)=>{
						console.log(err);
						this.snackbar.message = "邮箱或密码不正确";
						this.openNormalSnackbar();
					})
				}
			});			
		},
		toggleLogin () {
			this.isEmail = !this.isEmail;
		},
		openNormalSnackbar () {
			if (this.snackbar.timer) clearTimeout(this.snackbar.timer);
			this.snackbar.open = true;
			this.snackbar.timer = setTimeout(() => {
			this.snackbar.open = false;
			}, this.snackbar.timeout);
		}
	}		
}
</script>
<style scoped>
	.Ptop4{
		padding-top: 4px;
	}
	.tit{
		position: fixed; 
		top: 40px; 
		left: 16%; 
		font-size: 30px; 
		font-weight: normal;
	}
	.form{
		position: fixed;
		padding: 0 16%;
		width: 100%;
		height: 224px;
		top: 50%;
		margin-top: -112px;
		.href{
			text-align: center;
			margin-top: 36px;			
			.to{
				font-size: 14px;
				color: #666;
			}
		}
	}

</style>