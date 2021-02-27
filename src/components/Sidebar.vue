<template>
  <div class="card border-0 h-100 shadow-nm" style="border-radius: 25px">
    <div class="card-body px-0">
      <ul class="side-nav list-group" style="min-height: 60vh">
        <li
          @click="goto('home')"
          style="cursor: pointer"
          :class="`list-group-item pl-4 side-nav-item ${$route.name === 'home' ? 'onroute ' : ''}`"
        >
          <i class="fas fa-th-large ml-3 mr-4"></i>Dashboard
        </li>
        <li
          @click="goto('search')"
          style="cursor: pointer"
          :class="`list-group-item pl-4 side-nav-item ${$route.name === 'search' ? 'onroute ' : ''}`"
        >
          <i class="fas fa-arrow-up ml-3 mr-4"></i>Transfer
        </li>
        <li
          @click="goto('topup')"
          style="cursor: pointer"
          :class="`list-group-item pl-4 side-nav-item ${$route.name === 'topup' ? 'onroute ' : ''}`"
        >
          <i class="fas fa-plus ml-3 mr-4"></i>Top Up
        </li>
        <li
          @click="goto('profile')"
          style="cursor: pointer"
          :class="`list-group-item pl-4 side-nav-item ${$route.name === 'profile' ? 'onroute ' : ''}`"
        >
          <i class="far fa-user ml-3 mr-4"></i>Profile
        </li>
        <li
          @click="logout()"
          style="cursor: pointer"
          class="list-group-item pl-4 side-nav-item"
        >
          <i class="fas fa-sign-out-alt ml-3 mr-4"></i>Logout
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
