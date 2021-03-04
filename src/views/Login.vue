<template>
  <div>
    <div class="container-fluid d-none d-lg-block d-md-block" style="">
      <div class="row">
        <sidelog />
        <div class="col-md-6" style="
          background: #fafcff;
          padding-left: 3%;
          padding-right: 10%;
          padding-top: 5%;
        ">
          <h3 class="text-left mb-4" style="font-weight: bold">
            Start Accessing Banking Needs With All Devices and All Platforms With
            30.000+ Users
          </h3>
          <p class="text-left mb-5" style="color: rgba(58, 61, 66, 0.6); line-height: 1.8">
            Transfering money is eassier than ever, you can access AFA-Wallet
            wherever you are. Desktop, laptop, mobile phone? we cover all of that
            for you!
          </p>
          <form action="" @submit.prevent="onLogin" class="mt-5 mb-5">
            <div class="form-group mb-5">
              <div class="input-group">
                <b-input-group-prepend is-text>
                  <b-icon icon="envelope"></b-icon>
                </b-input-group-prepend>
                <input v-model="form.email" type="text" class="form-control" id="inlineFormInputGroupUsername"
                  placeholder="Email" />
              </div>
            </div>
            <div class="form-group mt-5">
              <div class="input-group">
                <b-input-group-prepend is-text>
                  <b-icon icon="lock"></b-icon>
                </b-input-group-prepend>
                <input v-model="form.password" type="password" class="form-control" placeholder="Password" />
              </div>
            </div>
            <p class="text-right mb-5" style="color: rgba(58, 61, 66, 0.8)">
              Forget Password?
            </p>
            <button type="submit" class="btn btn-block loginbtn" style="
              background: #dadada;
              box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
              border-radius: 12px;
              height: 64px;
              color: #88888f;
            ">
              Login
            </button>
          </form>
          <p class="text-center">
            Don't have account? Let's
            <router-link to="/register"><span style="color: #6379f4">Sign Up</span></router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="d-block d-lg-none d-md-none bg-white" style="height:100vh">
      <table class="h-25 w-100 mx-0 my-0 px-0 py-0">
        <tbody>
          <tr>
            <td class="align-middle text-center">
              <h1 class="text-main">AFA-Wallet</h1>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="card shadow-top" style="border-radius">
        <div class="card-body">
          <h3 class="text-center font-weight-bold mb-3">Login</h3>
          <p class="text-center text-secondary px-3">Login to your existing account to access
            all the features in AFA-Wallet.</p>
          <div>
            <form action=""  @submit.prevent="onLoginM">
              <div class="form-group my-5">
                <div class="input-group mb-5 text-secondary">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"><i class="far fa-envelope"></i></span>
                  </div>
                  <input v-model="formM.email" type="text" class="form-control border-0 shadow-sm"
                    placeholder="Enter your e-mail" />
                </div>
                <div class="input-group mb-3 text-secondary">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"><i class="fas fa-lock"></i></span>
                  </div>
                  <input v-model="formM.password" :type="typeNew" class="form-control border-0 shadow-sm"
                    placeholder="Your Password" />
                  <div class="input-group-prepend">
                    <span @click="onShowPass('new')" class="input-group-text bg-white border-0 shadow-sm"><i
                        :class="iconNew"></i></span>
                  </div>
                </div>
                <p class="text-secondary text-right mt-5">Forgot password</p>
                <button type="submit" class="btn btn-block loginbtn" style="
                  background: #dadada;
                  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
                  border-radius: 12px;
                  height: 64px;
                  color: #88888f;
                ">
                  Login
                </button>
              </div>
            </form>
            <p class="text-center">
              Don't have account? Let's
              <router-link to="/register"><span style="color: #6379f4">Sign Up</span></router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import sidelog from '../components/sidelog'
import { paymentMixin } from '../helpers/mixin'

export default {
  mixins: [paymentMixin],
  components: {
    sidelog
  },
  data () {
    return {
      typeCondOld: true,
      typeNew: 'password',
      iconNew: 'fas fa-eye-slash',
      form: {
        email: '',
        password: ''
      },
      formM: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      getUserDetail: 'auth/userDetail'
    }),
    onLogin () {
      this.swalLoading('Processing Data')
      if (this.form.username !== '' && this.form.password !== '') {
        this.login(this.form).then((response) => {
          if (response === "Email hasn't been registered") {
            this.swalLoadingClose()
            this.$swal('Data Not Register', 'Please Sign Up ', 'error')
          } else if (response === 'Wrong Password') {
            this.swalLoadingClose()
            this.$swal('Wrong Password', 'Please Check Your Password ', 'error')
          } else {
            this.getUserDetail()
              .then((response) => {
                if (response.pin === null) {
                  this.swalLoadingClose()
                  this.$router.push('/pin')
                } else {
                  this.swalLoadingClose()
                  this.swalToast('success', 'Login Success')
                  this.$router.push('/home')
                }
              })
          }
        })
      } else {
        this.swalLoadingClose()
        this.$swal('Empty Field', 'Please Fill All Data', 'error')
      }
    },
    onLoginM () {
      this.swalLoading('Processing Data')
      if (this.formM.username !== '' && this.formM.password !== '') {
        this.login(this.formM).then((response) => {
          if (response === "Email hasn't been registered") {
            this.swalLoadingClose()
            this.$swal('Data Not Register', 'Please Sign Up ', 'error')
          } else if (response === 'Wrong Password') {
            this.swalLoadingClose()
            this.$swal('Wrong Password', 'Please Check Your Password ', 'error')
          } else {
            this.getUserDetail()
              .then((response) => {
                if (response.pin === null) {
                  this.swalLoadingClose()
                  this.$router.push('/pin')
                } else {
                  this.swalLoadingClose()
                  this.swalToast('success', 'Login Success')
                  this.$router.push('/home')
                }
              })
          }
        })
      } else {
        this.swalLoadingClose()
        this.$swal('Empty Field', 'Please Fill All Data', 'error')
      }
    },
    onShowPass (e) {
      this.typeCondOld = !this.typeCondOld
      if (this.typeCondOld) {
        this.iconNew = 'fas fa-eye-slash'
        this.typeNew = 'password'
      } else {
        this.iconNew = 'fas fa-eye'
        this.typeNew = 'text'
      }
    }
  }
}
</script>
