<template>
  <div>
    <div class="card shadow-nm" style="border-radius:25px">
      <div class="card-body">
        <h5 class="font-weight-bold">Transaction History</h5>
        <div class="mt-4 hideScroll" style="overflow-y: scroll; max-height:60vh">
          <p class="text-secondary"> This Week</p>
          <!-- {{transUser}} -->
          <div v-for="(item, index) in transUser" :key="index">
            <div v-if="item.status === 'Pending'" @click="popUpConfirm(item.id)" class="card border-0">
              <div class="row no-gutters">
                <div class="col-md-1 my-auto mx-auto">
                  <img :src="`${webURL}/images/${item.targetImage}`" class="card-img text-center" alt="..." />
                </div>
                <div class="col-md-11">
                  <div class="card-body">
                    <div>
                      <p class="float-right font-weight-bold mb-0 text-warning">
                        Rp.{{formatPrice(Number(item.amount))}}</p>
                    </div>
                    <p class="font-weight-bold mb-0">{{item.targetFirstName}} {{item.targetLastName}}</p>
                    <div>
                      <p v-if="item.info === 'Top Up'" class="card-text mb-0"><small class="text-muted">Top
                          Up</small></p>
                      <p v-else class="card-text mb-0"><small class="text-muted">{{item.status}}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else @click="detailTrans(item.id)" class="card border-0">
              <div class="row no-gutters">
                <div class="col-md-1 my-auto mx-auto">
                  <img :src="`${webURL}/images/${item.targetImage}`" class="card-img text-center" alt="...">
                </div>
                <div class="col-md-11">
                  <div class="card-body">
                    <div>
                      <p v-if="item.status ==='Canceled'" class="float-right font-weight-bold mb-0 text-secondary">
                        Rp.{{formatPrice(Number(item.amount))}}</p>
                      <div v-else>
                        <p v-if="item.type ==='in'" class="float-right font-weight-bold mb-0 text-success">+
                          Rp.{{formatPrice(Number(item.amount))}}</p>
                        <p v-else class="float-right font-weight-bold mb-0 text-danger">-
                          Rp.{{formatPrice(Number(item.amount))}}</p>
                      </div>
                    </div>
                    <p class="font-weight-bold mb-0">{{item.targetFirstName}} {{item.targetLastName}}</p>
                    <div>
                      <p v-if="item.info === 'Top Up'" class="card-text mb-0"><small class="text-muted">Top
                          Up</small></p>
                      <p v-else-if="item.status === 'Canceled'" class="card-text mb-0"><small
                          class="text-muted">Canceled</small></p>
                      <p v-else class="card-text mb-0"><small class="text-muted">Transfer</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal Confirm -->
            <!-- <div @click="detailTrans(item.id)" class="card border-0 mb-3">
              <div class="row no-gutters">
                <div class="col-md-1 my-auto mx-auto">
                  <img :src="`${webURL}/images/${item.targetImage}`" class="card-img text-center" alt="...">
                </div>
                <div class="col-md-11">
                  <div class="card-body">
                    <div>
                      <p v-if="item.status ==='Canceled'" class="float-right font-weight-bold mb-0 text-secondary">
                        Rp.{{formatPrice(Number(item.amount))}}</p>
                      <div v-else>
                        <p v-if="item.type ==='in'" class="float-right font-weight-bold mb-0 text-success">+
                          Rp.{{formatPrice(Number(item.amount))}}</p>
                        <p v-else class="float-right font-weight-bold mb-0 text-danger">-
                          Rp.{{formatPrice(Number(item.amount))}}</p>
                      </div>
                    </div>
                    <p class="font-weight-bold mb-0">{{item.targetFirstName}} {{item.targetLastName}}</p>
                    <div>
                      <p v-if="item.info === 'Top Up'" class="card-text mb-0"><small class="text-muted">Top
                          Up</small></p>
                      <p v-else-if="item.status === 'Canceled'" class="card-text mb-0"><small
                          class="text-muted">Canceled</small></p>
                      <p v-else class="card-text mb-0"><small class="text-muted">Transfer</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

            <b-modal id="confirmTrans2" hide-header hide-footer>
              <form @submit.prevent="submitTopUp()" class="my-4">
                <div class="row">
                  <div class="col">
                    <p class="font-weight-bold text-center mb-0">Confirm Transaction </p>
                    <table class="table-borderless table w-100 my-3">
                      <tr>
                        <td class="w-25 py-0 font-weight-bold">From</td>
                        <td class="w-75 py-0">{{pendingData.userFirstName}} {{pendingData.userLastName}}</td>
                      </tr>
                      <tr>
                        <td class="w-25 py-0 font-weight-bold">To</td>
                        <td class="w-75 py-0">{{pendingData.targetFirstName}} {{pendingData.targetLastName}}</td>
                      </tr>
                      <tr>
                        <td class="w-25 py-0 font-weight-bold">Date</td>
                        <td class="w-75 py-0">{{formatDate(pendingData.created_at)}}</td>
                      </tr>
                      <tr>
                        <td class="w-25 py-0 font-weight-bold">Info</td>
                        <td class="w-75 py-0">{{pendingData.info}}</td>
                      </tr>
                      <tr>
                        <td class="w-25 py-0 font-weight-bold">Amount</td>
                        <td class="w-75 py-0">{{pendingData.amount}}</td>
                      </tr>
                    </table>
                    <div class="text-center">
                      <button type="button" @click="confirmPendingTrans('Success')"
                        class="btn btnMain font-weight-bold px-4 w-25 mr-2 font-weight-bold"
                        style="border-radius:10px">Confirm</button>
                      <button type="button" @click="confirmPendingTrans('Canceled')"
                        class="btn btnSecondary font-weight-bold px-4 w-25 ml-2"
                        style="border-radius:10px">Cancel</button>
                    </div>
                  </div>
                </div>
              </form>
            </b-modal>
  </div>
</template>

<script>
import { paymentMixin } from '../helpers/mixin'
import { mapGetters, mapActions } from 'vuex'
export default {
  mixins: [paymentMixin],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      transUser: 'trans/transUser',
      webURL: 'webURL',
      pendingData: 'trans/transDetailUser',
      userId: 'auth/userId'
    })
  },
  methods: {
    ...mapActions({
      getUserTrans: 'trans/getUserTrans',
      transDetail: 'trans/detailTrans',
      confTrans: 'trans/confTrans'
    }),
    getTrans () {
      this.getUserTrans(this.queryTrans)
    },
    detailTrans (id) {
      this.transDetail(id)
        .then((res) => {
          this.$router.push('/status')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    popUpConfirm (id) {
      this.confirmedId = id
      this.transDetail(id)
        .then((res) => {
          this.$bvModal.show('confirmTrans2')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    confirmPendingTrans (status) {
      const data = {
        status
      }
      this.confTrans(data)
        .then(async (res) => {
          await this.transDetail(this.confirmedId)
            .then(async (res2) => {
              this.$bvModal.hide('confirmTrans2')
              this.swalAlert(`Transaction ${status}`, 'The Credit Already Transfered', 'success')
              this.linkTo('status')
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getTrans()
  }
}
</script>

<style>

</style>
