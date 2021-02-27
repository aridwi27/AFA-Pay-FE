<template>
  <div class="container-fluid">
    <div class="row">
      <sidelog />
<form action="" @submit.prevent="submit()">
        <div
        class="col-md-6"
        style="
          background: #fafcff;
          padding-left: 5%;
          padding-right: 10%;
          padding-top: 5%;
        "
      >
        <h2
          class="font-weight-bold mb-5"
          style="padding-right: 10%; line-height: 2"
        >
          Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That
          You Created Yourself.
        </h2>
        <p
          style="
            color: rgba(58, 61, 66, 0.6);
            line-height: 2;
            padding-right: 8%;
          "
        >
          Create 6 digits pin to secure all your money and your data in Zwallet
          app. Keep it secret and don’t tell anyone about your Zwallet account
          password and the PIN.
        </p>
        <div class="mt-5" style="margin-left: 20%; margin-bottom: 20%">
          <PincodeInput v-model="code" :length="6" />
        </div>
        <button
          class="btn btn-primary btn-block w-70"
          style="
            background: #6379f4;
            box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
            border-radius: 12px;
            height: 57px;
          "
          type="submit"
        >
          Confirm
        </button>
      </div>
</form>
    </div>
  </div>
</template>

<script>
import sidelog from '../components/sidelog'
import PincodeInput from 'vue-pincode-input'
import { mapActions } from 'vuex'
import { paymentMixin } from '../helpers/mixin'

export default {
  mixins: [paymentMixin],
  data () {
    return {
      code: null
    }
  },
  components: {
    sidelog,
    PincodeInput
  },
  methods: {
    ...mapActions({
      insertPin: 'auth/updateUser'
    }),
    submit () {
      this.swalLoading('Processing Data')
      const data = { pin: this.code }
      this.insertPin(data).then((response) => {
        if (response.message === 500) {
          this.swalLoadingClose()
          this.swalAlert('Something wrong with pin', '', 'error')
        } else {
          this.swalLoadingClose()
          this.swalAlert('Register Pin Success', '', 'success')
          this.$router.push('/home')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
 <style scoped>
</style>
