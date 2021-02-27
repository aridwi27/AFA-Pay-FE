<template>
  <div>
    <div class="card shadow-nm" style="border-radius:25px">
      <div class="card-body">
        <h5 class="font-weight-bold">Transaction History</h5>
        <div class="mt-4 hideScroll" >
          <div v-if="isLoading" class="row w-100">
            <div class="col-12 py-5 my-5 text-center">
              <b-spinner style="width: 4rem; height: 4rem;" variant="info"></b-spinner>
              <h5 class="mt-4">Preparing Your Data ...</h5>
            </div>
          </div>
          <div v-else-if="transUser.length < 1" class="row w-100">
            <div class="col-12 py-5 my-5 text-center">
              <h1 class="mt-4 text-secondary">You Don't Have Any Transaction Data</h1>
            </div>
          </div>
          <div v-else>
            <div v-for="(item, index) in transUser" :key="index">
              <div class="card border-0">
                <div class="row no-gutters">
                  <div class="col-md-1 my-auto mx-auto">
                    <img v-if="Number(loginId) === Number(item.target_id)" :src="`${webURL}/images/${item.userImage}`"
                      class="card-img text-center" alt="...">
                    <img v-else :src="`${webURL}/images/${item.targetImage}`" class="card-img text-center" alt="...">
                  </div>
                  <!-- Start Canceled -->
                  <div v-if="item.status === 'Canceled'" class="col-md-11">
                    <div @click="detailTrans(item.id)" class="card-body">
                      <p class="float-right font-weight-bold mb-0 text-secondary">
                        Rp.{{formatPrice(Number(item.amount))}}
                      </p>
                      <div>
                        <p v-if="Number(loginId) === Number(item.target_id)" class="font-weight-bold mb-0">
                          {{item.userFirstName}} {{item.userLastName}}</p>
                        <p v-else class="font-weight-bold mb-0">{{item.targetFirstName}} {{item.targetLastName}}</p>
                      </div>
                      <p class="card-text mb-0"><small class="text-muted">{{item.status}}</small></p>
                    </div>
                  </div>
                  <!-- End Canceled -->
                  <!-- Start Pending -->
                  <div v-else-if="item.status === 'Pending'" class="col-md-11">
                    <div @click="popUpConfirm(item.id)" class="card-body">
                      <p class="float-right font-weight-bold mb-0 text-warning">Rp.{{formatPrice(Number(item.amount))}}
                      </p>
                      <div>
                        <p v-if="Number(loginId) === Number(item.target_id)" class="font-weight-bold mb-0">
                          {{item.userFirstName}} {{item.userLastName}}</p>
                        <p v-else class="font-weight-bold mb-0">{{item.targetFirstName}} {{item.targetLastName}}</p>
                      </div>
                      <p class="card-text mb-0"><small class="text-muted">{{item.status}}</small></p>
                    </div>
                  </div>
                  <!-- End Pending -->
                  <!-- Start Success -->
                  <div v-else class="col-md-11">
                    <div @click="detailTrans(item.id)" class="card-body">
                      <div>
                        <p v-if="Number(loginId) === Number(item.target_id)"
                          class="float-right font-weight-bold mb-0 text-success">+
                          Rp.{{formatPrice(Number(item.amount))}}
                        </p>
                        <p v-else class="float-right font-weight-bold mb-0 text-danger">-
                          Rp.{{formatPrice(Number(item.amount))}}</p>
                      </div>
                      <div>
                        <p v-if="Number(loginId) === Number(item.target_id)" class="font-weight-bold mb-0">
                          {{item.userFirstName}} {{item.userLastName}}</p>
                        <p v-else class="font-weight-bold mb-0">{{item.targetFirstName}} {{item.targetLastName}}</p>
                      </div>
                      <p class="card-text mb-0"><small class="text-muted">{{item.status}}</small></p>
                    </div>
                  </div>
                  <!-- EndSuccess -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-12 text-center hideScroll" style="overflow-x:scroll">
            <b-form-group>
              <b-form-radio-group id="btn-radios-2" @change="getTrans()" v-model="queryTrans.page"
                button-variant="outline-primary" :options="optionPage" buttons></b-form-radio-group>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-3 col-6">
            <b-form-select v-model="queryTrans.sort" @change="getOrderLimitQuery(1)" size="sm" :options="optionSort">
            </b-form-select>
          </div>
          <div class="col-lg-3 col-md-3 col-6">
            <b-form-select v-model="queryTrans.order" @change="getOrderLimitQuery(1)" size="sm" :options="optionOrder">
            </b-form-select>
          </div>
          <div class="col-lg-3 col-md-3 col-6">
            <b-form-select v-model="queryTrans.limit" @change="getOrderLimitQuery(1)" size="sm" :options="optionLimit">
            </b-form-select>
          </div>
          <div class="col-lg-3 col-md-3 col-6">
            <b-form-select v-model="queryTrans.status" @change="getOrderLimitQuery(1)" size="sm"
              :options="optionStatus">
            </b-form-select>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="confirmTrans2" hide-header hide-footer>
      <form @submit.prevent="submitTopUp()" class="my-4 font-nunito">
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
                class="btn btnSecondary font-weight-bold px-4 w-25 ml-2" style="border-radius:10px">Cancel</button>
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
      loginId: localStorage.getItem('id'),
      isLoading: true,
      optionLimit: [
        { value: 5, text: 'Limit 5' },
        { value: 10, text: 'Limit 10' },
        { value: 15, text: 'Limit 15' }
      ],
      optionSort: [
        { value: 'asc', text: 'Ascending' },
        { value: 'desc', text: 'Descending' }
      ],
      optionStatus: [
        { value: '', text: 'All' },
        { value: 'Pending', text: 'Pending' },
        { value: 'Success', text: 'Success' },
        { value: 'Canceled', text: 'Canceled' }
      ],
      optionOrder: [
        { value: 'created_at', text: 'Date' },
        { value: 'amount', text: 'Amount' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      transUser: 'trans/transUser',
      transRecap: 'trans/transRecap',
      webURL: 'webURL',
      pendingData: 'trans/transDetailUser',
      optionPage: 'trans/optionPage'
    })
  },
  methods: {
    ...mapActions({
      getUserTrans: 'trans/getUserTrans',
      transDetail: 'trans/detailTrans',
      confTrans: 'trans/confTrans'
    }),
    getTrans () {
      this.isLoading = true
      this.getUserTrans(this.queryTrans)
        .then(() => {
          this.isLoading = false
        })
    },
    getOrderLimitQuery (page) {
      this.queryTrans.page = page
      this.getTrans()
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
