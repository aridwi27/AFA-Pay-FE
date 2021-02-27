<template>
  <div class="card border-0 h-100 shadow-nm" style="border-radius: 25px">
    <div class="card-body px-0">
      <ul class="side-nav list-group" style="min-height: 60vh">
        <li
          @click="goto('home')"
          style="cursor: pointer"
          :class="`list-group-item side-nav-item ${$route.name === 'home' || $route.name === 'history' || $route.name === 'status' ? 'onroute ' : ''}`"
        >
          <div class="row">
            <div class="col-12 col-lg-3 col-md-12 text-center">
              <i class="fas fa-th-large"></i>
            </div>
            <div class="col-12 col-lg-9 col-md-12 text-md-center text-lg-left text-sm-center text-center">
              Dashboard
            </div>
          </div>
        </li>
        <li @click="goto('search')" style="cursor: pointer"
          :class="`list-group-item side-nav-item ${$route.name === 'search' || $route.name === 'transfer' ? 'onroute ' : ''}`">
          <div class="row">
            <div class="col-12 col-lg-3 col-md-12 text-center">
              <i class="fas fa-arrow-up"></i>
            </div>
            <div class="col-12 col-lg-9 col-md-12 text-md-center text-lg-left text-sm-center text-center">
              Transfer
            </div>
          </div>
        </li>
        <li
          @click="goto('topup')"
          style="cursor: pointer"
          :class="`list-group-item side-nav-item ${$route.name === 'topup' ? 'onroute ' : ''}`"
        >
          <div class="row">
            <div class="col-12 col-lg-3 col-md-12 text-center">
              <i class="fas fa-plus"></i>
            </div>
            <div class="col-12 col-lg-9 col-md-12 text-md-center text-lg-left text-sm-center text-center">
              Top Up
            </div>
          </div>
        </li>
        <li
          @click="goto('profile')"
          style="cursor: pointer"
          :class="`list-group-item side-nav-item ${$route.name === 'profile' || $route.name === 'personalinfo' ||$route.name === 'changepassword' || $route.name === 'managephone' || $route.name === 'addphone' ? 'onroute ' : ''}`"
        >
          <div class="row">
            <div class="col-12 col-lg-3 col-md-12 text-center">
              <i class="far fa-user"></i>
            </div>
            <div class="col-12 col-lg-9 col-md-12 text-md-center text-lg-left text-sm-center text-center">
              Profile
            </div>
          </div>
        </li>
        <li
          @click="logout()"
          style="cursor: pointer"
          class="list-group-item side-nav-item"
        >
          <div class="row">
            <div class="col-12 col-lg-3 col-md-12 text-center">
              <i class="fas fa-sign-out-alt"></i>
            </div>
            <div class="col-12 col-lg-9 col-md-12 text-md-center text-lg-left text-sm-center text-center">
              Logout
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { paymentMixin } from '../helpers/mixin'
export default {
  mixins: [paymentMixin],
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      onLogout: 'auth/logout'
    }),
    goto (route) {
      if (this.$route.name !== route) {
        this.$router.push(`/${route}`)
      }
    },
    logout () {
      this.swalLogout('Do you want to logout?', '', 'warning').then((result) => {
        if (result) {
          this.onLogout()
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style>
</style>
