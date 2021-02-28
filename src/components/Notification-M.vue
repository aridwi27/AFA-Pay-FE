<template>
  <div class="bg-main">
    <!-- <div class="card w-100 bg-theme text-white shadow-nm"
      style="border-bottom-left-radius: 25px;border-bottom-right-radius: 25px">
      <div class="card-body mt-3">
        <h5 @click="linkTo('home')" class="font-weigh-bold"><i class="fas fa-arrow-left mr-4"></i> Transaction</h5>
      </div>
    </div> -->
    <div class="card bg-main shadow-nm" style="border-radius:25px;min-height:88vh">
      <div class="card-body" style="background:#FAFCFF">
        <h5 @click="linkTo('home')" class="font-weight-bold mb-0"><i class="fas fa-arrow-left mr-4"></i> Notification
        </h5>
        <div class="mt-4 hideScroll">
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
          <div v-else style="height:80vh;overflow-y:scroll" class="hideScroll pb-4">
            <div v-for="(item, index) in transUser" :key="index">
             <!-- Start Canceled -->
                <div @click="detailTrans(item.id)" v-if="item.status === 'Canceled' " class="card shadow-nm">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-2">
                        <i class="fas fa-ban text-secondary fa-2x"></i>
                      </div>
                      <div class="col-10">
                        <small v-if="Number(loginId) === Number(item.target_id)"
                          class="text-secondary mb-0 d-block">Transfer From {{item.userFirstName}} {{item.userLastName}}
                          {{item.status}}</small>
                        <small v-else class="text-secondary mb-0 d-block">Transfer To {{item.targetFirstName}}
                          {{item.targetLastName}} {{item.status}}</small>
                        <p class="font-weight-bold mb-0">Rp. {{formatPrice(Number(item.amount))}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Cancel -->
                <!-- Start Pending -->
                <div v-else-if="item.status === 'Pending' " class="card shadow-nm">
                  <div @click="popUpConfirm(item.id)" class="card-body">
                    <div class="row">
                      <div class="col-2">
                        <i v-if="item.status === 'Pending'" class="far fa-clock text-warning fa-2x"></i>
                      </div>
                      <div class="col-10">
                        <small v-if="Number(loginId) === Number(item.target_id)"
                          class="text-secondary mb-0 d-block">Transfer From {{item.userFirstName}}
                          {{item.userLastName}}</small>
                        <small v-else class="text-secondary mb-0 d-block">Transfer To {{item.targetFirstName}}
                          {{item.targetLastName}}</small>
                        <p class="font-weight-bold mb-0">Rp. {{formatPrice(Number(item.amount))}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Pending -->
                 <!-- Start Success -->
                <div v-else class="card shadow-nm">
                  <div @click="detailTrans(item.id)" class="card-body">
                    <div class="row">
                      <div class="col-2">
                        <i v-if="Number(loginId) === Number(item.target_id)"
                          class="fas fa-arrow-up text-success fa-2x"></i>
                        <i v-else class="fas fa-arrow-down text-danger fa-2x"></i>
                      </div>
                      <div class="col-10">
                        <small v-if="item.info ==='Top Up'" class="text-secondary mb-0 d-block">Top Up Account
                          {{item.userFirstName}}</small>
                        <small v-else-if="Number(loginId) === Number(item.target_id)"
                          class="text-secondary mb-0 d-block">Transfer From {{item.userFirstName}}
                          {{item.userLastName}}</small>
                        <small v-else class="text-secondary mb-0 d-block">Transfer To {{item.targetFirstName}}
                          {{item.targetLastName}}</small>
                        <p class="font-weight-bold mb-0">Rp. {{formatPrice(Number(item.amount))}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Success -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="confirmTransM2" centered hide-header hide-footer>
      <div v-if="isLoadingConfirmM" class="row w-100">
        <div class="col-12 text-center">
          <p class="font-weight-bold text-center mb-0">Confirm Transaction </p>
          <b-spinner class="mt-4 pt-4" style="width: 2rem; height: 2rem;" variant="info"></b-spinner>
          <p class="mt-4 text-secondary">Please Wait</p>
        </div>
      </div>
      <form v-else @submit.prevent="submitTopUp()" class="my-4">
        <div class="row">
          <div class="col">
            <p class="font-weight-bold text-center mb-0">Confirm Transaction </p>
            <table class="table-borderless table w-100 my-3 font-nunito">
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
                <td class="w-75 py-0">Rp.{{formatPrice(Number(pendingData.amount))}}</td>
              </tr>
            </table>
        <div class="text-center">
          <button type="button" @click="confirmPendingTrans('Success')" class="btn btnMain font-weight-bold px-4 w-25 mr-2 font-weight-bold" style="border-radius:10px">Confirm</button>
          <button type="button" @click="confirmPendingTrans('Canceled')" class="btn btnSecondary font-weight-bold px-4 w-25 ml-2" style="border-radius:10px">Cancel</button>
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
      isLoadingConfirmM: true,
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
      ],
      optionRange: [
        { value: 'day', text: 'Day' },
        { value: 'week', text: 'Week' },
        { value: 'month', text: 'Month' },
        { value: 'year', text: 'Year' }
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
      this.swalLoading('Please Wait')
      this.transDetail(id)
        .then((res) => {
          this.swalLoadingClose()
          this.$router.push('/status')
        })
        .catch((err) => {
          this.swalLoadingClose()
          console.log(err)
        })
    },
    popUpConfirm (id) {
      this.confirmedId = id
      this.isLoadingConfirmM = true
      this.$bvModal.show('confirmTransM2')
      this.transDetail(id)
        .then((res) => {
          this.isLoadingConfirmM = false
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
              this.$bvModal.hide('confirmTransM2')
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
    },
    filterButton (status) {
      this.queryTrans.status = status
      this.getOrderLimitQuery(1)
    }
  },
  mounted () {
    this.getTrans()
  }
}
</script>

<style>

</style>
