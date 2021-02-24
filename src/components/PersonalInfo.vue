<template>
  <div>
    <div class="card shadow-nm" style="border-radius:25px">
      <div class="card-body px-5">
        <h5 class="font-weight-bold mb-4">Personal Information</h5>
        <p class="text-secondary w-50 mb-2">We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
        <form action="" class="my-5">
          <div class="form-group">
            <label class="text-secondary">First Name</label>
            <input type="text" value="Robert" class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
          <div class="form-group">
            <label class="text-secondary">Last name</label>
            <input type="text" value="Chandler" class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
          <div class="form-group">
            <label class="text-secondary">Verified Email</label>
            <input type="email" value="pewdiepie1@gmail.com" class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
          <div class="form-group">
            <label class="text-secondary">Phone Number</label>
            <router-link to="/addphone" class=" float-right text-main"> Add Number</router-link>
            <router-link to="/managephone" class=" float-right text-main">Manage  / </router-link>
            <input type="text" value="+62 813-9387-7946" class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentMixin } from '../helpers/mixin'
export default {
  mixins: [paymentMixin],
  data () {
    return {
      amount: 0
    }
  },
  methods: {
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    }
  }
}
</script>

<style>

</style>
