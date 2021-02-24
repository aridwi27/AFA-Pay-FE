<template>
  <div>
    <div class="card shadow-nm" style="border-radius:25px">
      <div class="card-body px-5">
        <h5 class="font-weight-bold mb-4">Change Pin</h5>
        <p class="text-secondary w-50 mb-2">Enter your current 6 digits Zwallet PIN below to continue to the next steps.
        </p>
        <!-- ConfirmPin -->
        <form v-if="pinConfirmed === true" action="" @submit.prevent="alertCode()" class="my-5">
          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
              <div class="text-center mb-4">
                <PincodeInput v-model="code" :length="6" />
              </div>
              <button class="btn btnSub font-weight-bold w-100 p-2 mt-4 border-0">Continue</button>
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
              <button class="btn btnSub font-weight-bold w-100 p-2 mt-4 border-0">Change Pin</button>
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
  methods: {
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    },
    alertCode () {
      this.pinConfirmed = !this.pinConfirmed
      alert(this.code)
    }
  }
}
</script>

<style>

</style>
