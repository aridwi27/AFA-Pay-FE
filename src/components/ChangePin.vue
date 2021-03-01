<template>
  <div>
    <div class="card shadow-nm" style="border-radius: 25px">
      <div class="card-body px-5">
        <h5 class="font-weight-bold mb-4">Change Pin</h5>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-12">
            <p class="text-secondary">
              Enter your
          <span class="font-weight-bold" v-if="pinConfirmed === false"
            >Current</span
          >
          <span class="font-weight-bold" v-else>New</span> 6 digits AFA-Wallet PIN
          below to
          <span class="font-weight-bold" v-if="pinConfirmed == false"
            >continue to the next steps.</span
          >
          <span class="font-weight-bold" v-else
            >finish change pin process.</span
          >
            </p>
          </div>
        </div>
        <!-- ConfirmPin -->
        <form
          v-if="pinConfirmed === false"
          action=""
          @submit.prevent="alertCode()"
          class="my-5"
        >
          <div class="row">
            <div class="d-none d-md-block d-lg-block col-3 col-lg-3 col-md-1"></div>
            <div class="col-12 col-lg-6 col-md-10">
              <div class="text-center mb-4">
                <PincodeInput v-model="code" :length="6" />
              </div>
              <button
                class="btn btnSub font-weight-bold w-100 p-2 mt-4 border-0"
              >
                Continue
              </button>
            </div>
            <div class="d-none d-md-block d-lg-block col-3 col-lg-3 col-md-1"></div>
          </div>
        </form>
        <form v-else action="" @submit.prevent="alertCode('e')" class="my-5">
          <div class="row">
            <div class="d-none d-md-block d-lg-block col-3 col-lg-3 col-md-1"></div>
            <div class="col-lg-6 col-md-12 col-12">
              <div class="text-center mb-4">
                <PincodeInput v-model="newCode" :length="6" />
              </div>
              <button
                class="btn btnSub font-weight-bold w-100 p-2 mt-4 border-0"
              >
                Change Pin
              </button>
            </div>
            <div class="d-none d-md-block d-lg-block col-3 col-lg-3 col-md-1"></div>
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
      code: '',
      newCode: ''
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
    alertCode (e) {
      // this.pinConfirmed = !this.pinConfirmed
      const data = {
        pin: parseInt(this.newCode)
      }
      if (this.pinConfirmed) {
        if (e === 'e') {
          this.swalConfirm('Do you want to use this pin?', '', 'warning').then((result) => {
            if (result) {
              this.swalLoading('Changing Pin')
              this.onInsert(data).then(async (response) => {
                await this.swalAlert('Change Pin Success', '', 'success')
                this.$router.push('/profile')
              }).catch((err) => {
                console.log(err)
              })
            } else {
              this.pinConfirmed = true
            }
          })
        }
      } else {
        if (parseInt(this.code) === this.detUser.pin) {
          this.swalAlert('Insert New Pin', '', 'info')
          this.pinConfirmed = true
        } else {
          this.pinConfirmed = false
          this.swalAlert('Wrong current pin', '', 'error')
        }
      }
    }
  }
}
</script>

<style>
</style>
