<template>
<div>
    <div class="container-fluid d-none d-lg-block d-md-block" style="">
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
        <p class="text-left mb-5" style="color: rgba(58, 61, 66, 0.6)">
          Transfering money is eassier than ever, you can access Zwallet
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </p>
        <form action="" @submit.prevent="signUp" class="mt-5 mb-5">
          <div class="form-group mb-5">
            <div class="input-group">
              <b-input-group-prepend is-text>
                <b-icon icon="person"></b-icon>
              </b-input-group-prepend>
              <input
                v-model="form.username"
                type="text"
                required
                class="form-control"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div class="form-group mb-5">
            <div class="input-group">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope"></b-icon>
              </b-input-group-prepend>
              <input
                v-model="form.email"
                type="email"
                required
                class="form-control"
                id="inlineFormInputGroupUsername"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div class="form-group mt-5 mb-5">
            <div class="input-group">
              <b-input-group-prepend is-text>
                <b-icon icon="lock"></b-icon>
              </b-input-group-prepend>
              <input
                v-model="form.password"
                type="password"
                required
                class="form-control"
                placeholder="Enter your Password"
              />
            </div>
          </div>

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
            Sign Up
          </button>
        </form>
        <p class="text-center">
          Already have an account? Let's
          <router-link to="/login"
            ><span style="color: #6379f4">Login</span></router-link
          >
        </p>
      </div>
    </div>
  </div>

    <div class="d-block d-lg-none d-md-none bg-white" style="height:100vh">
      <table class="h-25 w-100 mx-0 my-0 px-0 py-0">
        <tbody>
          <tr>
            <td class="align-middle text-center">
              <h1 class="text-main">Zwallet</h1>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="card shadow-top" style="border-radius">
        <div class="card-body">
          <h3 class="text-center font-weight-bold mb-3">Sign Up</h3>
          <p class="text-center text-secondary px-3">Create your account to access Zwallet.</p>
          <div>
            <form action="" @submit.prevent="signUpM" >
              <div class="form-group my-5">
                <div class="input-group my-5 text-secondary">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"><i class="far fa-user"></i></span>
                  </div>
                  <input v-model="formM.username" type="text" class="form-control border-0 shadow-sm"
                    placeholder="Enter your username" />
                </div>
                <div class="input-group my-5 text-secondary">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"><i class="far fa-envelope"></i></span>
                  </div>
                  <input v-model="formM.email" type="text" class="form-control border-0 shadow-sm"
                    placeholder="Enter your e-mail" />
                </div>
                <div class="input-group my-5 text-secondary">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"><i class="fas fa-lock"></i></span>
                  </div>
                  <input v-model="formM.password" :type="typeNew" class="form-control border-0 shadow-sm"
                    placeholder="Create your password" />
                  <div class="input-group-prepend">
                    <span @click="onShowPass('new')" class="input-group-text bg-white border-0 shadow-sm"><i
                        :class="iconNew"></i></span>
                  </div>
                </div>
                <button type="submit" class="btn btn-block loginbtn mt-5" style="
                  background: #dadada;
                  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
                  border-radius: 12px;
                  height: 64px;
                  color: #88888f;
                ">
                  Sign Up
                </button>
              </div>
            </form>
            <p class="text-center">
              Already have an account? Let's <router-link to="/login"><span style="color: #6379f4">Login</span></router-link>
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
        password: '',
        username: ''
      },
      formM: {
        email: '',
        password: '',
        username: ''
      }
    }
  },
  methods: {
    ...mapActions({
      register: 'auth/signUp'
    }),
    signUp () {
      this.swalLoading('Process Register')
      if (this.form.email !== '' && this.form.password !== '' && this.form.username !== '') {
        this.register(this.form).then((response) => {
          if (response === 'Email has been registered') {
            this.$swal.close()
            this.$swal('Email registed', 'Please Change Email ', 'error')
          } else {
            this.$swal.close()
            this.$swal('Register Email Success', 'You can Login Now ', 'success')
            this.$router.push('/login')
          }
        })
      } else {
        this.swalLoadingClose()
        this.$swal('Empty Field', 'Please Fill All Data', 'error')
      }
    },
    signUpM () {
      this.swalLoading('Process Register')
      if (this.formM.email !== '' && this.formM.password !== '' && this.formM.username !== '') {
        this.register(this.formM).then((response) => {
          if (response === 'Email has been registered') {
            this.$swal.close()
            this.$swal('Email registed', 'Please Change Email ', 'error')
          } else {
            this.$swal.close()
            this.$swal('Register Email Success', 'You can Login Now ', 'success')
            this.$router.push('/login')
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
