<template>
  <div>
    <div class="card shadow-nm" style="border-radius:25px">
      <div class="card-body">
        <h5 class="font-weight-bold">Transaction History</h5>
        <div class="mt-4 hideScroll" style="overflow-y: scroll; max-height:60vh">
          <p class="text-secondary"> This Week</p>
          <div v-for="(item, index) in transUser" :key="index">
            <div class="card border-0 mb-3">
              <div class="row no-gutters">
                <div class="col-md-1 my-auto mx-auto">
                  <img :src="`${webURL}/images/${item.targetImage}`" class="card-img text-center" alt="...">
                </div>
                <div class="col-md-11">
                  <div class="card-body">
                  <div>
                    <p v-if="item.status ==='Pending'" class="float-right font-weight-bold mb-0 text-warning">
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
                      <p v-if="item.info === 'Top Up'" class="card-text mb-0"><small class="text-muted">Top Up</small></p>
                      <p v-else class="card-text mb-0"><small class="text-muted">{{item.status}}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    }
  },
  computed: {
    ...mapGetters({
      transUser: 'trans/transUser',
      webURL: 'webURL'
    })
  },
  methods: {
    ...mapActions({
      getUserTrans: 'trans/getUserTrans'
    }),
    getTrans () {
      this.getUserTrans(this.queryTrans)
    }

  },
  mounted () {
    this.getTrans()
  }
}
</script>

<style>

</style>
