<template>
  <div>
    <div class="card shadow-nm" style="border-radius: 25px">
      <div class="card-body px-5">
        <h5 class="font-weight-bold mb-4">Change Pin</h5>
        <p class="text-secondary w-50 mb-2">
          Enter your
          <span class="font-weight-bold" v-if="pinConfirmed === true"
            >Current</span
          >
          <span class="font-weight-bold" v-else>New</span> 6 digits Zwallet PIN
          below to
          <span class="font-weight-bold" v-if="pinConfirmed !== true"
            >continue to the next steps.</span
          >
          <span class="font-weight-bold" v-else
            >finish change pin process.</span
          >
        </p>
        <!-- ConfirmPin -->
        <form
          v-if="pinConfirmed === true"
          action=""
          @submit.prevent="alertCode()"
          class="my-5"
        >
          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
              <div class="text-center mb-4">
                <PincodeInput v-model="code" :length="6" />
              </div>
              <button
                class="btn btnSub font-weight-bold w-100 p-2 mt-4 border-0"
              >
                Continue
              </button>
            </div>
            <div class="col-3"></div>
          </div>
        </form>
        <form v-else action="" @submit.prevent="alertCode()" class="my-5">
          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
              <div class="text-center mb-4">
                <PincodeInput v-model="newCode" :length="6" />
              </div>
              <button
                class="btn btnSub font-weight-bold w-100 p-2 mt-4 border-0"
              >
                Change Pin
              </button>
            </div>
            <div class="col-3"></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentMixin } from '../helpers/mixin'
import PincodeInput from 'vue-pincode-input'
import { mapActions, mapGetters } from 'vuex'
export default {
  mixins: [paymentMixin],
  components: {
    PincodeInput
  },
  data () {
    return {
      pinConfirmed: false,
      amount: 0,
      code: 0,
      newCode: 0
    }
  },
  computed: {
    ...mapGetters({
      detUser: 'auth/detailUser'
    })
  },
  methods: {
    ...mapActions({
      onInsert: 'auth/updateUser',
      getDetail: 'auth/userDetail'
    }),
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    },
    alertCode () {
      this.pinConfirmed = !this.pinConfirmed
      const data = {
        pin: parseInt(this.newCode)
      }
      if (this.pinConfirmed) {
        const check = confirm('Do you want to use this pin?')
        if (check) {
          this.pinConfirmed = true
        } else {
          this.pinConfirmed = false
        }
      } else {
        if (parseInt(this.code) === this.detUser.pin) {
          this.onInsert(data).then((response) => {
            alert('Change pin Success')
            this.pinConfirmed = true
            this.$router.push('/profile')
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.pinConfirmed = true
          alert('Wrong current pin')
        }
      }
    }
  }
}
</script>

<style>
</style>
