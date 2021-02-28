<template>
  <div>
    <div class="card shadow-nm" style="border-radius: 25px">
      <div class="card-body" style="min-height: 88vh">
        <h5 @click="linkTo('personalinfo')" class="font-weight-bold mb-4">
          <i class="fas fa-arrow-left mr-4"></i> Manage Phone Number
        </h5>
        <p class="text-secondary text-center px-1" style="line-height: 30px">
          You can only delete the phone number and then you must add another
          phone number.
        </p>
        <!-- ConfirmPin -->
        <form action="" class="my-5">
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-5">
                <label class="text-secondary">Primary</label>
                <div class="input-group mb-3 text-secondary">
                  <!-- <span class="input-group-text bg-white border-0 shadow-sm"
                      >+62</span
                    > -->
                  <input
                    v-if="
                      detUser.handphone === '+62' ||
                      detUser.handphone === '+62-' ||
                      detUser.handphone === ''
                    "
                    type="text"
                    v-model="phone"
                    class="font-weight-bold classname form-control border-0 shadow-sm"
                  />
                  <input
                    v-else
                    type="text"
                    v-model="phone"
                    class="font-weight-bold classname form-control border-0 shadow-sm"
                  />
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"
                      ><i
                        @click.prevent="changeNum('delete')"
                        class="far fa-trash-alt"
                        style="cursor: pointer"
                      ></i
                    ></span>
                    <button
                      class="btn btnMain rounded"
                      @click.prevent="changeNum('update')"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
      code: 0,
      newCode: 0,
      phone: ''
    }
  },
  computed: {
    ...mapGetters({
      detUser: 'auth/detailUser'
    })
  },
  methods: {
    ...mapActions({
      upPhone: 'auth/updateUser',
      actionsDetUser: 'auth/userDetail'
    }),
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    },
    phoneNum () {
      this.actionsDetUser().then((result) => {
        if (result.handphone === '+62-' || result.handphone === '') {
          this.phone = '+62'
        } else {
          this.phone = result.handphone
        }
      })
    },
    changeNum (e) {
      if (e === 'delete') {
        if (this.detUser.handphone === '+62' || this.detUser.handphone === '+62-' || this.detUser.handphone === '') {
          this.swalAlert('You don\'t have active phone number', '', 'info')
        } else {
          const data = {
            handphone: '+62'
          }
          this.upPhone(data).then(async () => {
            await this.phoneNum()
            this.swalAlert('Successfully delete number', '', 'success')
            this.linkTo('personalinfo')
          }).catch((err) => {
            console.log(err)
          })
        }
      } else {
        if (this.phone.charAt(0) === '0') {
          const splitNum = this.phone.split('').slice(1, this.phone.length)
          const phoneNum = ['+62', ...splitNum].join('')
          const data = {
            handphone: phoneNum
          }
          this.upPhone(data).then(async () => {
            await this.phoneNum()
            this.swalAlert('Success update phone number', '', 'success')
            this.linkTo('personalinfo')
          }).catch((err) => {
            console.log(err)
          })
        } else if (this.phone.charAt(3) === '0' && this.phone.charAt(0) === '+') {
          const splitNum = this.phone.split('').slice(4, this.phone.length)
          const phoneNum = ['+62', ...splitNum].join('')
          const data = {
            handphone: phoneNum
          }
          this.upPhone(data).then(async () => {
            await this.phoneNum()
            this.swalAlert('Success update phone number', '', 'success')
            this.linkTo('personalinfo')
          }).catch((err) => {
            console.log(err)
          })
        } else if (this.phone.charAt(0) === '+') {
          const data = {
            handphone: this.phone
          }
          this.upPhone(data).then(async () => {
            await this.phoneNum()
            this.swalAlert('Success update phone number', '', 'success')
            this.linkTo('personalinfo')
          }).catch((err) => {
            console.log(err)
          })
        } else {
          const splitNum = this.phone.split('')
          const phoneNum = ['+62', ...splitNum].join('')
          const data = {
            handphone: phoneNum
          }
          this.upPhone(data).then(async () => {
            await this.phoneNum()
            this.swalAlert('Success update phone number', '', 'success')
          }).catch((err) => {
            console.log(err)
          })
        }
      }
    }
  },
  mounted () {
    this.phoneNum()
  }
}
</script>

<style>
</style>
