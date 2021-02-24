<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 bg" style="padding-left: 7%; padding-right: 10%">
        <h3 class="pt-5 text-left" style="color: #ffffff">Zwallet</h3>
        <img
          class="img-fluid phone1"
          src="../assets/image/Group 57.png"
          alt=""
        />
        <h3 class="mb-5 text-left" style="color: #ffffff">
          App that Covering Banking Needs.
        </h3>
        <p
          class="text-left"
          style="color: rgba(255, 255, 255, 0.8); line-height: 1.8"
        >
          Zwallet is an application that focussing in banking needs for all
          users in the world. Always updated and always following world trends.
          5000+ users registered in Zwallet everyday with worldwide users
          coverage.
        </p>
      </div>
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

export default {
  components: {
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
      if (this.form.email !== '' && this.form.password !== '' && this.form.username !== '') {
        this.register(this.form).then((response) => {
          alert(response)
        }).catch((err) => {
          console.log(err)
        })
      } else {
        alert('All Field Required')
      }
    }
  }
}
</script>
