<template>
  <div>
    <div class="card shadow-nm" style="border-radius:25px">
      <div class="card-body">
        <h5 class="font-weight-bold">Transfer Money</h5>
        <div class="card border-0 mb-3 shadow-sm">
          <div class="row no-gutters pr-1">
            <div class="col-md-1 my-auto mx-auto">
              <img :src="`${webURL}/images/${targetData.image}`" class="card-img text-center" alt="...">
            </div>
            <div class="col-md-11">
              <div class="card-body">
                <p class="font-weight-bold mb-0">{{targetData.first_name}} {{targetData.last_name}}</p>
                <p class="card-text mb-0"><small class="text-muted">{{targetData.handphone}}</small></p>
              </div>
            </div>
          </div>
        </div>
      <div v-if="showConfirm===false">
          <div class="mt-4">
          <p class="text-secondary mb-0">Type the amount you want to transfer and then</p>
          <p class="text-secondary mb-0">press continue to the next steps.</p>
        </div>
        <form @submit.prevent="buildTransferdata()" action="">
        <div class="text-center">
          <div class="row">
            <input type="number" required min="1" v-model="amount" @keyup="formatAmount()"
              class="form-control border-0 text-main text-center" placeholder="0.00"
              style="font-size:72px;overflow-y:hidden;color:var(--main-theme);resize:none;box-shadow: none;">
          </div>
          <p class="font-weight-bold mb-0 mb-4">Rp. {{formatPrice(userData.credit)}} Available</p>
          <div class="row mt-4">
            <div class="col-3"></div>
            <div class="col-6">
              <div class="input-group mb-3 text-secondary">
                <div class="input-group-prepend ">
                  <span class="input-group-text bg-white border-top-0 border-left-0 border-right-0"><i
                      class="fas fa-pencil-alt"></i></span>
                </div>
                <input required v-model="info" type="text" class="form-control border-top-0 border-left-0 border-right-0"
                  placeholder="Add some notes">
              </div>
            </div>
            <div class="col-3"></div>
          </div>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btnMain font-weight-bold px-4" style="border-radius:10px">Continue</button>
        </div>
        </form>
      </div>
      <div v-else>
        <h1>Konfirmasi</h1>
      </div>
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
      showConfirm: false,
      amount: 0,
      info: '',
      finalData: {}
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
      actionTrans: 'trans/addTrans'
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
      // this.actionTrans(finalData)
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
    }
  }
}
</script>

<style>

</style>
