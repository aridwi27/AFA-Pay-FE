<template>
  <div class="card border-0 shadow h-100" style="border-radius:25px">
    <div class="card-body px-0">
      <ul class="side-nav list-group" style="min-height:60vh">
        <li v-for="(item, index) in navList" :key="index" class="list-group-item pl-4 side-nav-item">
          <router-link :to="`${item.to}`" class="router-link-nav" >
            <i :class="`${item.icon} ml-3 mr-4`"></i>{{item.text}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [{ icon: 'fas fa-th-large', text: 'Dashboard', to: '/home' },
        { icon: 'fas fa-arrow-up', text: 'Transfer', to: '/transfer' },
        { icon: 'fas fa-plus', text: 'Top Up', to: '/home' },
        { icon: 'far fa-user', text: 'Profile', to: '/home' },
        { icon: 'fas fa-sign-out-alt ', text: 'Logout', to: '/home' }
      ]
    }
  }
}
</script>

<style>

</style>
