<template>
  <div>
    <div class="card shadow-nm" style="border-radius:25px">
      <div v-if="transDetailUser.id === 0" class="card-body my-auto px-5">
        <h1 class="p-5 text-center my-5 text-secondary">Please Select Your Transaction</h1>
      </div>
      <div v-else class="card-body px-5">
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
        <form action="">
          <div class="form-group">
            <label class="text-secondary">Amount</label>
            <input readonly type="text" :value="`Rp. ${formatPrice(Number(transDetailUser.amount))}`"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
          <div v-if="transDetailUser.user_id === Number(loginId) " class="form-group">
            <label v-if="transDetailUser.type === 'in'" class="text-secondary">Balance Now</label>
            <label v-else class="text-secondary">Balance Left</label>
            <input readonly type="text" :value="`Rp. ${formatPrice(Number(transDetailUser.creditLeft))}`"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
          <div class="form-group">
            <label class="text-secondary">Date & Time</label>
            <input readonly type="text" :value="`${formatDate(transDetailUser.created_at)}`"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
          <div class="form-group">
            <label class="text-secondary">Notes</label>
            <input readonly type="text" :value="`${transDetailUser.info}`"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
        </form>
        <div>
          <p v-if="transDetailUser.info !== 'Top Up' " class="font-weight-bold mb-0 mt-4">Transfers To</p>
          <p v-else class="font-weight-bold mb-0 mt-4">Top Up Of</p>
        </div>
        <div class="card border-0 mb-4 shadow-sm">
          <div class="row no-gutters pr-1">
            <div class="col-md-1 my-auto mx-auto">
              <img :src="`${webURL}/images/${transDetailUser.targetImage}`" class="card-img text-center" alt="...">
            </div>
            <div class="col-md-11">
              <div class="card-body">
                <p class="font-weight-bold mb-0">{{transDetailUser.targetFirstName}} {{transDetailUser.targetLastName}}
                </p>
                <p v-if="transDetailUser.targetHandphone === '+62' || transDetailUser.targetHandphone === '+62-'" class="text-danger font-italic"><small>No Phone Number Detected</small></p>
                <p v-else class="card-text mb-0"><small class="text-muted">{{transDetailUser.targetHandphone}}</small></p>
              </div>
            </div>
          </div>
        </div>
        <!-- Div COnfirm Button -->
        <div class="text-right mt-4 pt-4" v-if="transDetailUser.status === 'Success'">
          <button class="btn ml-4 px-4 py-3 btnSecondary" style="border-radius:10px"><i
              class="text-secondary fas fa-share-alt"></i></button>
          <button class="btn ml-4 px-4 py-3 btnSecondary" style="border-radius:10px"><i class="fas fa-download"></i>
            Download PDF</button>
          <router-link to="/home" class="btn ml-4 px-4 py-3 btnMain" style="border-radius:10px">Back To Home
          </router-link>
        </div>
        <div class="text-right mt-4 pt-4" v-else>
          <router-link to="/home" class="btn ml-4 px-4 py-3 btnMain" style="border-radius:10px">Back To Home
          </router-link>
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
