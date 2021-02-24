<template>
  <div>
    <div class="card shadow-nm" style="border-radius:25px">
      <div class="card-body">
        <h5 class="font-weight-bold">Transaction History</h5>
        <div class="mt-4 hideScroll" style="overflow-y: scroll; max-height:60vh">
          <p class="text-secondary"> This Week</p>
          <div v-for="(item, index) in sampleHistory" :key="index">
            <div class="card border-0 mb-3">
              <div class="row no-gutters">
                <div class="col-md-1 my-auto mx-auto">
                  <img :src="`${item.image}`" class="card-img text-center" alt="...">
                </div>
                <div class="col-md-11">
                  <div class="card-body">
                    <p v-if="item.type ==='in'" class="float-right font-weight-bold mb-0 text-success">+ Rp.{{formatPrice(item.amount)}}</p>
                    <p v-if="item.type ==='out'" class="float-right font-weight-bold mb-0 text-danger">- Rp.{{formatPrice(item.amount)}}</p>
                    <p class="font-weight-bold mb-0">{{item.name}}</p>
                    <p class="card-text mb-0"><small class="text-muted">{{item.status}}</small></p>
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
export default {
  mixins: [paymentMixin],
  data () {
    return {
      sampleHistory: [
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', status: 'Transfer', type: 'in', amount: 50000 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', status: 'Transfer', type: 'out', amount: 50000 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', status: 'Transfer', type: 'in', amount: 50000 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', status: 'Transfer', type: 'in', amount: 50000 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', status: 'Transfer', type: 'out', amount: 50000 }
      ]
    }
  }

}
</script>

<style>

</style>
