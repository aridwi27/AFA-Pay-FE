<template>
  <div>
    <div class="card shadow-nm" style="border-radius: 25px">
      <div class="card-body">
        <h5 class="font-weight-bold">Transfer Money</h5>
        <div v-if="targetData.first_name === ''" class="row w-100">
          <div class="col-12 py-5 my-5 text-center">
            <h1 class="mt-4 text-secondary">Please Re-Select Your Target</h1>
          </div>
        </div>
        <div v-else>
          <div class="card border-0 mb-3 shadow-sm">
            <div class="row no-gutters pr-1">
              <div class="col-md-1 my-auto mx-auto">
                <img
                  :src="`${webURL}/images/${targetData.image}`"
                  class="card-img text-center"
                  alt="..."
                />
              </div>
              <div class="col-md-11">
                <div class="card-body">
                  <p class="font-weight-bold mb-0">
                    {{ targetData.first_name }} {{ targetData.last_name }}
                  </p>
                  <p class="card-text mb-0">
                    <small
                      v-if="
                        targetData.handphone === '+62' ||
                        targetData.handphone === '+62-'
                      "
                      class="text-danger font-italic"
                      >No Phone Number Detected</small
                    >
                    <small v-else class="text-muted">{{
                      targetData.handphone
                    }}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showConfirm === false">
            <div class="mt-4">
              <p class="text-secondary mb-0">
                Type the amount you want to transfer and then
              </p>
              <p class="text-secondary mb-0">
                press continue to the next steps.
              </p>
            </div>
            <form @submit.prevent="buildTransferdata()" action="">
              <div class="text-center">
                <div class="row">
                  <input
                    type="number"
                    required
                    min="1"
                    v-model="amount"
                    :max="userData.credit"
                    @keyup="formatAmount()"
                    class="form-control border-0 text-main text-center"
                    placeholder="0.00"
                    style="
                      font-size: 72px;
                      overflow-y: hidden;
                      color: var(--main-theme);
                      resize: none;
                      box-shadow: none;
                    "
                  />
                </div>
                <p class="font-weight-bold mb-0 mb-4">
                  Rp. {{ formatPrice(userData.credit) }} Available
                </p>
                <div class="row mt-4">
                  <div class="col-3"></div>
                  <div class="col-6">
                    <div class="input-group mb-3 text-secondary">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text bg-white border-top-0 border-left-0 border-right-0"
                          ><i class="fas fa-pencil-alt"></i
                        ></span>
                      </div>
                      <input
                        required
                        v-model="info"
                        type="text"
                        class="form-control border-top-0 border-left-0 border-right-0"
                        placeholder="Add some notes"
                      />
                    </div>
                  </div>
                  <div class="col-3"></div>
                </div>
              </div>
              <div class="text-right">
                <button
                  type="submit"
                  class="btn btnMain font-weight-bold px-4"
                  style="border-radius: 10px"
                  @submit.prevent="buildTransferdata()"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
          <div v-else>
            <div class="form-group">
              <label class="text-secondary">Amount</label>
              <input
                readonly
                type="text"
                :value="`Rp. ${formatPrice(finalData.amount)}`"
                class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
              />
            </div>
            <div class="form-group">
              <label class="text-secondary">Balance Left</label>
              <input
                readonly
                type="text"
                :value="`Rp. ${formatPrice(
                  userData.credit - finalData.amount
                )}`"
                class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
              />
            </div>
            <div class="form-group">
              <label class="text-secondary">Date & Time</label>
              <input
                readonly
                type="text"
                :value="formatDate(new Date())"
                class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
              />
            </div>
            <div class="form-group">
              <label class="text-secondary">Notes</label>
              <input
                readonly
                type="text"
                :value="`${finalData.info}`"
                class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
              />
            </div>
            <div class="text-right">
              <b-button v-b-modal.modal-center>Continue</b-button>
              <b-modal
                id="modal-center"
                centered
                title="BootstrapVue"
                hide-header
                hide-footer
              >
                <form action="" @submit.prevent="doTransfer()">
                  <div class="px-3 mt-3">
                    <h5 style="color: #3a3d42" class="mt- d-inline">
                      Enter PIN to Transfer
                    </h5>
                    <i class="fas fa-times float-right"></i>
                    <p
                      style="color: rgba(58, 61, 66, 0.6); width: 70%"
                      class="my-4"
                    >
                      Enter your 6 digits PIN for confirmation to continue
                      transferring money.
                    </p>
                  </div>
                  <div class="text-center">
                    <PincodeInput v-model="code" :length="6" />
                  </div>
                  <button
                    type="submit"
                    class="btn btnMain font-weight-bold mt-5 mb-2 px-4 float-right"
                    style="border-radius: 10px"
                  >
                    Continue
                  </button>
                </form>
              </b-modal>
              <!-- <button
              @click="doTransfer()"
              class="btn btnMain font-weight-bold px-4"
              style="border-radius: 10px"
            >
              Continue
            </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { paymentMixin } from '../helpers/mixin'
import PincodeInput from 'vue-pincode-input'
export default {
  mixins: [paymentMixin],
  components: {
    PincodeInput
  },
  data () {
    return {
      showConfirm: false,
      amount: null,
      info: '',
      finalData: {},
      code: ''
    }
  },
  computed: {
    ...mapGetters({
      targetData: 'auth/targetData',
      userData: 'auth/detailUser',
      webURL: 'webURL'
    })
  },
  methods: {
    ...mapActions({
      actionTrans: 'trans/addTrans',
      transDetail: 'trans/detailTrans',
      confTrans: 'trans/confTrans',
      getUserDetail: 'auth/userDetail'
    }),
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    },
    buildTransferdata () {
      const buildFinalData = {
        user_id: this.userData.id,
        target_id: this.targetData.id,
        amount: this.amount,
        type: 'out',
        info: this.info
      }
      this.finalData = buildFinalData
      this.showConfirm = true
    },
    doTransfer () {
      const pin = parseInt(this.code)
      this.swalLoading('Checking Your Pin')
      this.getUserDetail().then((response) => {
        if (response.pin !== pin) {
          this.swalLoadingClose()
          this.code = ''
          this.swalAlert('Your Pin Wrong', 'Please Check Your Pin', 'error')
        } else {
          this.actionTrans(this.finalData)
            .then(async (res) => {
              await this.transDetail(res.data.id).then((result) => {
                this.swalLoadingClose()
                this.showConfirm = false
                this.amount = 0
                this.info = ''
                this.finalData = {}
                this.linkTo('home')
                this.swalAlert('Transaction Success', 'Please wait for confirmation', 'info')
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style>
</style>
