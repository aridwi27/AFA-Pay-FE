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
                    v-model="form.curPassword"
                    :type="typeOld"
                    class="form-control border-0 shadow-sm"
                    placeholder="Current Password"
                  />
                  <div class="input-group-prepend">
                    <span
                      @click="onShowPass('old')"
                      class="input-group-text bg-white border-0 shadow-sm"
                      ><i :class="iconOld"></i
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
                    v-model="form.newPassword"
                    :type="typeNew"
                    class="form-control border-0 shadow-sm"
                    placeholder="New Password"
                  />
                  <div class="input-group-prepend">
                    <span
                      @click="onShowPass('new')"
                      class="input-group-text bg-white border-0 shadow-sm"
                      ><i :class="iconNew"></i
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
                    v-model="form.confNewPassword"
                    :type="typeConf"
                    class="form-control border-0 shadow-sm"
                    placeholder="Confirm New Password"
                  />
                  <div class="input-group-prepend">
                    <span
                      @click="onShowPass('conf')"
                      class="input-group-text bg-white border-0 shadow-sm"
                      ><i :class="iconConf"></i
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
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [paymentMixin],
  data () {
    return {
      form: {
        curPassword: '',
        newPassword: '',
        confNewPassword: ''
      },
      amount: 0,
      iconOld: 'fas fa-eye-slash',
      iconNew: 'fas fa-eye-slash',
      iconConf: 'fas fa-eye-slash',
      typeCondOld: true,
      typeCondNew: true,
      typeCondConf: true,
      typeOld: 'password',
      typeNew: 'password',
      typeConf: 'password'
    }
  },
  computed: {
    ...mapGetters({
      detUser: 'auth/detailUser'
    })
  },
  methods: {
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    },
    ...mapActions({
      changePass: 'auth/changePass',
      actionsDetUser: 'auth/userDetail'
    }),
    onChange () {
      if (this.form.curPassword && this.form.newPassword && this.form.confNewPassword) {
        if (this.form.newPassword !== this.form.confNewPassword) {
          this.swalAlert('Error Change Password', 'New Password Not Match', 'error')
        } else {
          const data = {
            password: this.form.curPassword,
            newPassword: this.form.newPassword
          }
          this.changePass(data).then((response) => {
            if (response.code === 500) {
              this.swalAlert('Error Change Password', response.message, 'error')
            } else {
              this.swalAlert(response.message, '', 'success')
              this.$router.push('/profile')
            }
          }).then((err) => {
            console.log(err)
          })
        }
      } else {
        alert('All Field Required')
      }
    },
    onShowPass (e) {
      if (e === 'old') {
        this.typeCondOld = !this.typeCondOld
        if (this.typeCondOld) {
          this.iconOld = 'fas fa-eye-slash'
          this.typeOld = 'password'
        } else {
          this.iconOld = 'fas fa-eye'
          this.typeOld = 'text'
        }
      } else if (e === 'new') {
        this.typeCondNew = !this.typeCondNew
        if (this.typeCondNew) {
          this.iconNew = 'fas fa-eye-slash'
          this.typeNew = 'password'
        } else {
          this.iconNew = 'fas fa-eye'
          this.typeNew = 'text'
        }
      } else {
        this.typeCondConf = !this.typeCondConf
        if (this.typeCondConf) {
          this.iconConf = 'fas fa-eye-slash'
          this.typeConf = 'password'
        } else {
          this.iconConf = 'fas fa-eye'
          this.typeConf = 'text'
        }
      }
    }
  },
  mounted () {
    this.actionsDetUser()
  }
}
</script>

<style>
</style>
