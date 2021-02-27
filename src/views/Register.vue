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
          <router-link to="/"
            ><span style="color: #6379f4">Login</span></router-link
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
        alert('All Field Required')
      }
    }
  }
}
</script>
