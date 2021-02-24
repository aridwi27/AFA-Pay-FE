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
        <form action="" class="mt-5 mb-5">
          <div class="form-group mb-5">
            <div class="input-group">
              <b-input-group-prepend is-text>
                <b-icon icon="person"></b-icon>
              </b-input-group-prepend>
              <input
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
                type="text"
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
import sidelog from '../components/sidelog'
export default {
  components: {
    sidelog
  }
}
</script>
