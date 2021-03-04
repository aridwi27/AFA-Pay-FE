<template>
<div>
  <div class="container-fluid d-none d-lg-block d-md-block" style="">
    <div class="row">
      <sidelog />
        <div class="col-md-6" style="
          background: #fafcff;
          padding-left: 5%;
          padding-right: 10%;
          padding-top: 5%;
        ">
      <form action="" @submit.prevent="submit()">
          <h2 class="font-weight-bold mb-5" style="padding-right: 10%; line-height: 2">
            Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That
            You Created Yourself.
          </h2>
          <p style="
            color: rgba(58, 61, 66, 0.6);
            line-height: 2;
            padding-right: 8%;
          ">
            Create 6 digits pin to secure all your money and your data in AFA-Wallet
            app. Keep it secret and don’t tell anyone about your AFA-Wallet account
            password and the PIN.
          </p>
          <div class="mt-5" style="margin-left: 20%; margin-bottom: 20%">
            <PincodeInput v-model="code" :length="6" />
          </div>
          <button class="btn btn-primary btn-block w-70" style="
            background: #6379f4;
            box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
            border-radius: 12px;
            height: 57px;
          " type="submit">
            Confirm
          </button>
      </form>
        </div>
    </div>
  </div>
  <div class="d-block d-lg-none d-md-none bg-white" style="height:100vh">
    <table class="h-25 w-100 mx-0 my-0 px-0 py-0">
        <tbody>
          <tr>
            <td class="align-middle text-center">
              <h1 class="text-main">AFA-Wallet</h1>
            </td>
          </tr>
        </tbody>
      </table>
      <form action="" @submit.prevent="submitM()" >
      <div class="card shadow-top" style="border-radius;min-height:75vh">
        <div class="card-body">
          <h3 class="text-center font-weight-bold mb-3">Login</h3>
          <p class="text-center text-secondary px-3">Create a PIN that’s contain 6 digits number for security purpose in AFA-Wallet.</p>
          <div class="pt-3">
          <div class="mb-5 text-center" style=" margin-bottom: 20%">
            <PincodeInput v-model="codeM" :length="6" />
          </div>
          <div style="height:25vh">
            &nbsp;
          </div>
          <button class="btn btn-primary btn-block w-70" style="
            background: #6379f4;
            box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
            border-radius: 12px;
            height: 57px;
          " type="submit">
            Confirm
          </button>
          </div>
        </div>
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
      code: '',
      codeM: ''
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
      if (this.code.length === 6) {
        this.insertPin(data)
          .then((response) => {
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
      } else {
        this.swalAlert('Please Check Your Pin', '', 'error')
      }
    },
    submitM () {
      this.swalLoading('Processing Data')
      const data = { pin: this.codeM }
      if (this.codeM.length === 6) {
        this.insertPin(data)
          .then((response) => {
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
      } else {
        this.swalAlert('Please Check Your Pin', '', 'error')
      }
    }
  }
}
</script>
