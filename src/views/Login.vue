<template>
  <div class="container-fluid">
    <div class="row">
      <sidelog />
      <div
        class="col-md-6"
        style="
          background: #fafcff;
          padding-left: 3%;
          padding-right: 10%;
          padding-top: 5%;
        "
      >
        <h3 class="text-left mb-4" style="font-weight: bold">
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h3>
        <p
          class="text-left mb-5"
          style="color: rgba(58, 61, 66, 0.6); line-height: 1.8"
        >
          Transfering money is eassier than ever, you can access Zwallet
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </p>
        <form action="" @submit.prevent="onLogin" class="mt-5 mb-5">
          <div class="form-group mb-5">
            <div class="input-group">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope"></b-icon>
              </b-input-group-prepend>
              <input
                v-model="form.email"
                type="text"
                class="form-control"
                id="inlineFormInputGroupUsername"
                placeholder="Username"
              />
            </div>
          </div>
          <div class="form-group mt-5">
            <div class="input-group">
              <b-input-group-prepend is-text>
                <b-icon icon="lock"></b-icon>
              </b-input-group-prepend>
              <input
                v-model="form.password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
          </div>
          <p class="text-right mb-5" style="color: rgba(58, 61, 66, 0.8)">
            Forget Password?
          </p>
          <button
            type="submit"
            class="btn btn-block loginbtn"
            style="
              background: #dadada;
              box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
              border-radius: 12px;
              height: 64px;
              color: #88888f;
            "
          >
            Login
          </button>
        </form>

        <p class="text-center">
          Don't have account? Let's
          <router-link to="/register"
            ><span style="color: #6379f4">Sign Up</span></router-link
          >
        </p>
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
      form: {
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
      this.swalLoading('Process Login')
      if (this.form.username !== '' && this.form.password !== '') {
        this.login(this.form).then((response) => {
          if (response === "Email hasn't been registered") {
            this.$swal.close()
            this.$swal('Data Not Register', 'Please Sign Up ', 'error')
          } else if (response === 'Wrong Password') {
            this.$swal.close()
            this.$swal('Wrong Password', 'Please Check Your Password ', 'error')
          } else {
            this.getUserDetail()
              .then((response) => {
                if (response.pin === null) {
                  this.swalLoading('Process Login')
                  this.$router.push('/pin')
                } else {
                  this.swalToast('success', 'Login Success')
                  this.$router.push('/home')
                }
              })
          }
        })
      } else {
        alert('All Field Required')
      }
    }
  }
}
</script>
