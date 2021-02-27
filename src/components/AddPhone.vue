<template>
  <div>
    <div class="card shadow-nm" style="border-radius: 25px">
      <div class="card-body px-5">
        <h5 class="font-weight-bold mb-4">Add Phone Number</h5>
        <p class="text-secondary w-50 mb-2">
          Add at least one phone number for the transfer ID so you can start
          transfering your money to another user.
        </p>
        <!-- ConfirmPin -->
        <form @submit.prevent="addPhone" class="my-5">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
              <div class="form-group my-5">
                <div class="input-group mb-3 text-secondary">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"
                      ><i class="fas fa-phone-alt"></i
                    ></span>
                  </div>
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"
                      >+62</span
                    >
                  </div>
                  <input
                    v-model="newPhone"
                    type="number"
                    class="form-control border-0 shadow-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <button
                class="btn btnSub font-weight-bold w-100 p-3 mt-4 border-0"
              >
                Add Phone Number
              </button>
            </div>
            <div class="col-2"></div>
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
      code: 0,
      newCode: 0,
      newPhone: ''
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
    addPhone () {
      this.swalLoading('Submitting Data')
      if (this.newPhone.charAt(0) === '0') {
        const splitNum = this.newPhone.split('').slice(1, this.newPhone.length)
        const phoneNum = ['+62', ...splitNum].join('')
        const data = {
          handphone: phoneNum
        }
        this.onInsert(data).then((response) => {
          this.swalLoadingClose()
          this.getDetail()
          this.swalAlert('Phone Number Addedr', '', 'success')
          this.linkTo('personalinfo')
        }).catch((err) => {
          console.log(err)
        })
      } else {
        const splitNum = this.newPhone.split('')
        const phoneNum = ['+62', ...splitNum].join('')
        const data = {
          handphone: phoneNum
        }
        this.onInsert(data).then((response) => {
          this.swalLoadingClose()
          this.getDetail()
          this.swalAlert('Phone Number Added', '', 'success')
          this.linkTo('personalinfo')
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>
