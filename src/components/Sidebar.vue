<template>
  <div class="card border-0 h-100 shadow-nm" style="border-radius: 25px;">
    <div class="card-body px-0">
      <ul class="side-nav list-group" style="min-height: 60vh">
        <li @click="goto('home')" class="list-group-item pl-4 side-nav-item">
            <i class="fas fa-th-large ml-3 mr-4"></i>Dashboard
        </li>
        <li @click="goto('search')" class="list-group-item pl-4 side-nav-item">
            <i class="fas fa-arrow-up ml-3 mr-4"></i>Transfer
        </li>
        <li @click="goto('topup')" class="list-group-item pl-4 side-nav-item">
            <i class="fas fa-plus ml-3 mr-4"></i>Top Up
        </li>
        <li @click="goto('profile')" class="list-group-item pl-4 side-nav-item">
            <i class="far fa-user ml-3 mr-4"></i>Profile
        </li>
        <li @click="logout()" class="list-group-item pl-4 side-nav-item">
            <i class="fas fa-sign-out-alt ml-3 mr-4"></i>Logout
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goto (route) {
      if (this.$route.name !== route) {
        this.$router.push(`/${route}`)
      }
    },
    logout () {
      alert('Logout')
    }
  }
}
</script>

<style>
</style>
