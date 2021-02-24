<template>
  <div>
    <div class="card shadow" style="border-radius:25px">
      <div class="card-body px-5">
        <div class="text-center">
          <h1 class="mt-4"><i class="text-success fas fa-2x fa-check-circle"></i></h1>
          <p class="font-weight-bold">Transaction Success</p>
        </div>
        <form action="">
          <div class="form-group">
            <label class="text-secondary">Amount</label>
            <input readonly type="text" value="Rp. 100.000" class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
          <div class="form-group">
            <label class="text-secondary">Balance Left</label>
            <input readonly type="text" value="Rp. 20.000" class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
          <div class="form-group">
            <label class="text-secondary">Date & Time</label>
            <input readonly type="text" value="May 11, 2020 - 12.20" class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
          <div class="form-group">
            <label class="text-secondary">Notes</label>
            <input readonly type="text" value="For buying some socks" class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm">
          </div>
        </form>
        <p class="font-weight-bold mt-4">Transfers To</p>
        <div class="card border-0 mb-4 shadow-sm">
          <div class="row no-gutters pr-1">
            <div class="col-md-1 my-auto mx-auto">
              <img src="../assets/image/Rectangle 25.png" class="card-img text-center" alt="...">
            </div>
            <div class="col-md-11">
              <div class="card-body">
                <p class="font-weight-bold mb-0">Samuel Suhi</p>
                <p class="card-text mb-0"><small class="text-muted">+6289blabla</small></p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mt-4 pt-4">
          <button class="btn ml-4 btnSecondary"><i class="text-secondary fas fa-share-alt"></i></button>
          <button class="btn ml-4 btnSecondary"><i class="fas fa-download"></i> Download PDF</button>
          <button class="btn ml-4 btnMain">Back To Home</button>
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
      amount: 0
    }
  },
  methods: {
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    }
  }
}
</script>

<style>

</style>
