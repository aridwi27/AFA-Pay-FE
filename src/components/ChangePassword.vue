<template>
  <div>
    <div class="card shadow-nm" style="border-radius: 25px">
      <div class="card-body px-5">
        <h5 class="font-weight-bold mb-4">Change Password</h5>
        <p class="text-secondary w-50 mb-2">
          You must enter your current password and then type your new password
          twice.
        </p>
        <form action="" @submit.prevent="onChange" class="my-5">
          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
              <div class="form-group my-5">
                <div class="input-group mb-3 text-secondary">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"
                      ><i class="fas fa-lock"></i
                    ></span>
                  </div>
                  <input
                    v-model="curPassword"
                    type="password"
                    class="form-control border-0 shadow-sm"
                    placeholder="Current Password"
                  />
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"
                      ><i class="fas fa-eye-slash"></i
                    ></span>
                  </div>
                </div>
              </div>
              <div class="form-group my-5">
                <div class="input-group mb-3 text-secondary">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"
                      ><i class="fas fa-lock"></i
                    ></span>
                  </div>
                  <input
                    v-model="newPassword"
                    type="password"
                    class="form-control border-0 shadow-sm"
                    placeholder="New Password"
                  />
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"
                      ><i class="fas fa-eye-slash"></i
                    ></span>
                  </div>
                </div>
              </div>
              <div class="form-group my-5">
                <div class="input-group mb-3 text-secondary">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"
                      ><i class="fas fa-lock"></i
                    ></span>
                  </div>
                  <input
                    v-model="confNewPassword"
                    type="password"
                    class="form-control border-0 shadow-sm"
                    placeholder="Confirm New Password"
                  />
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"
                      ><i class="fas fa-eye-slash"></i
                    ></span>
                  </div>
                </div>
              </div>
              <button
                class="btn btn-secondary font-weight-bold w-100 p-3 mt-4 border-0"
                style="background: #dadada; color: #88888f"
              >
                Change Password
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
import { mapActions } from 'vuex'

export default {
  mixins: [paymentMixin],
  data () {
    return {
      form: {
        password: '',
        newPassword: '',
        confNewPassword: ''
      },
      amount: 0
    }
  },
  methods: {
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    },
    ...mapActions({
      changePass: 'auth/changePass'
    }),
    onChange () {
      if (this.form.password && this.form.newPassword && this.form.confNewPassword) {
        if (this.form.newPassword !== this.form.confNewPassword) {
          alert('New Password Not Match')
        } else {
          const data = {
            password: this.form.password,
            newPassword: this.form.newPassword
          }
          this.changePass(data).then((response) => {
            console.log(response)
          }).then((err) => {
            console.log(err)
          })
        }
      } else {
        alert('All Field Required')
      }
    }
  }
}
</script>

<style>
</style>
