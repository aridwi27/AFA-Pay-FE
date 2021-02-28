<template>
  <div>
    <div class="bg-main">
    <div class="card w-100 bg-theme shadow-nm" style="border-bottom-left-radius: 25px;border-bottom-right-radius: 25px">
      <div class="card-body text-white text-center mt-3">
        <h3 class="font-weigh-bold">Transfer Details</h3>
      </div>
    </div>
    </div>
    <div class="card shadow-nm" style="border-radius:25px">
      <div v-if="transDetailUser.id === 0" class="card-body my-auto px-5">
        <h1 class="p-5 text-center my-5 text-secondary">Please Select Your Transaction</h1>
      </div>
      <div v-else class="card-body bg-main">
        <div>
          <div class="text-center">
          <div v-if="transDetailUser.status === 'Success'">
            <h1 class="mt-4"><i class="text-success fas fa-2x fa-check-circle"></i></h1>
            <p class="font-weight-bold">Transaction Success</p>
          </div>
          <div v-else>
            <h1 class="mt-4"><i class="text-danger fas fa-2x fa-times-circle"></i></h1>
            <p class="font-weight-bold">Transaction Canceled</p>
            <p class="px-5 text-secondary">Your transaction are canceled by yourself or your friends.</p>
          </div>
        </div>
        <div>
          <div v-if="transDetailUser.user_id === Number(loginId) " class="row">
            <div class="col-6 mb-3">
              <div class="card shadow-nm" style="border-radius:15px">
                <div class="card-body">
                  <p class="text-secondary mb-0">Amount</p>
                  <p class="font-weight-bold mb-0">Rp. {{formatPrice(Number(transDetailUser.amount))}}</p>
                </div>
              </div>
            </div>
            <div class="col-6 mb-3">
              <div class="card shadow-nm" style="border-radius:15px">
                <div class="card-body">
                  <p class="text-secondary mb-0">Balance Left</p>
                  <p class="font-weight-bold mb-0">Rp. {{formatPrice(Number(transDetailUser.creditLeft))}}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="col-12 px-0 mb-3">
              <div class="card shadow-nm" style="border-radius:15px">
                <div class="card-body">
                  <p class="text-secondary mb-0">Amount</p>
                  <p class="font-weight-bold mb-0">Rp. {{formatPrice(Number(transDetailUser.amount))}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 mb-3">
              <div class="card shadow-nm" style="border-radius:15px">
                <div class="card-body">
                  <p class="text-secondary mb-0">Date</p>
                  <p class="font-weight-bold mb-0">{{formatDateOnly(transDetailUser.created_at)}}</p>
                </div>
              </div>
            </div>
            <div class="col-6 mb-3">
              <div class="card shadow-nm" style="border-radius:15px">
                <div class="card-body">
                  <p class="text-secondary mb-0">Time</p>
                  <p class="font-weight-bold mb-0">{{formatTimeOnly(transDetailUser.created_at)}}</p>
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="card shadow-nm" style="border-radius:15px">
                <div class="card-body">
                  <p class="text-secondary mb-0">Date</p>
                  <p class="font-weight-bold mb-0">{{transDetailUser.info}}</p>
                </div>
              </div>
            </div>
        </div>
        <div>
          <p class="font-weight-bold mb-0 my-2">From</p>
          <div class="row">
            <div class="col-12 mb-3">
              <div class="card shadow-nm" style="border-radius:15px">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-2 col-lg-2 col-3 my-auto mx-auto">
                      <img :src="`${webURL}/images/${transDetailUser.userImage}`" class="card-img text-center"
                        alt="...">
                    </div>
                    <div class=" col-lg-10 col-md-10 col-9 my-auto">
                      <p class="font-weight-bold mb-0">{{transDetailUser.userFirstName}} {{transDetailUser.userLastName}}</p>
                      <p class="mb-0 text-secondary">{{transDetailUser.userHandphone}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="font-weight-bold mb-0 my-2">To</p>
          <div class="row">
            <div class="col-12 mb-3">
              <div class="card shadow-nm" style="border-radius:15px">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-2 col-lg-2 col-3 my-auto mx-auto">
                      <img :src="`${webURL}/images/${transDetailUser.targetImage}`" class="card-img text-center"
                        alt="...">
                    </div>
                    <div class=" col-lg-10 col-md-10 col-9 my-auto">
                      <p class="font-weight-bold mb-0">{{transDetailUser.targetFirstName}} {{transDetailUser.targetLastName}}</p>
                      <p class="mb-0 text-secondary">{{transDetailUser.targetHandphone}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Div COnfirm Button -->
        <div class="text-center mt-4 pt-4" >
          <button @click="linkTo('home')" class="btn w-100 px-4 py-3 btnMain" style="border-radius:10px">Back To Home
          </button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentMixin } from '../helpers/mixin'
import { mapGetters, mapActions } from 'vuex'
export default {
  mixins: [paymentMixin],
  data () {
    return {
      isLoading: true,
      amount: 0,
      loginId: localStorage.getItem('id')
    }
  },
  computed: {
    ...mapGetters({
      transDetail: 'trans/transDetail',
      transDetailUser: 'trans/transDetailUser',
      webURL: 'webURL'
    })
  },
  methods: {
    ...mapActions({
      getTransDetail: 'trans/detailTrans'
    }),
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    }
  }
}
</script>

<style>

</style>
