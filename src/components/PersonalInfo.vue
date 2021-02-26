<template>
  <div>
    <div class="card shadow-nm" style="border-radius: 25px">
      <div class="card-body px-5">
        <h5 class="font-weight-bold mb-4">Personal Information</h5>
        <p class="text-secondary w-50 mb-2">
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </p>
        <form action="" class="my-5">
          <div class="form-group">
            <label class="text-secondary">First Name</label>
            <input
              type="text"
              v-model="detUser.first_name"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
            />
          </div>
          <div class="form-group">
            <label class="text-secondary">Last name</label>
            <input
              type="text"
              v-model="detUser.last_name"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
            />
          </div>
          <div class="form-group">
            <label class="text-secondary">Verified Email</label>
            <input
              type="email"
              v-model="detUser.email"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
            />
          </div>
          <div class="form-group">
            <label class="text-secondary">Phone Number</label>
            <router-link to="/addphone" class="float-right text-main">
              Add Number</router-link
            >
            <router-link to="/managephone" class="float-right text-main"
              >Manage /
            </router-link>
            <input
              readonly
              v-if="detUser.handphone === '+62'"
              type="text"
              value="-"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
            />
            <input
              readonly
              v-else
              type="text"
              :value="detUser.handphone"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { paymentMixin } from '../helpers/mixin'
export default {
  mixins: [paymentMixin],
  data () {
    return {
      amount: 0,
      data: {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      detUser: 'auth/detailUser'
    })
  },
  methods: {
    ...mapActions({
      actionsDetUser: 'auth/userDetail'
    }),
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    }
  }
}
</script>

<style>
</style>
