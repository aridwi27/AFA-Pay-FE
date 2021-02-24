<template>
  <div>
    <!-- Carrd Saldo -->
    <div class="row">
      <div class="card w-100 bg-theme text-white shadow" style="border-radius:25px">
        <div class="card-body p-4">
          <div class="row">
            <div class="col-md-8 col-lg-10">
              <p class="my-2">Balance</p>
              <h1 class="font-weight-bold">Rp. {{formatPrice(50000)}}</h1>
              <p>+{{formatPrice(62895610787856)}}</p>
            </div>
            <div class="col-md-4 col-lg-2 my-auto">
              <div class="d-flex flex-column align-items-center">
                <button class="btn btn-warning d-block w-100 mb-2">
                  <p class="font-weight-bold mb-0"><i class="fas fa-arrow-up"></i> Transfer</p>
                </button>
                <button class="btn btn-warning d-block w-100 mt-2">
                  <p class="font-weight-bold mb-0"><i class="fas fa-plus"></i> Top Up</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Chart & History -->
    <div class="row mt-4">
      <div class="col-lg-6 col-md-6 pl-0">
        <div class="card shadow" style="border-radius:25px">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <h1><i class="fas fa-arrow-down" style="color:green"></i></h1>
                <p class="mb-0">Income</p>
                <p class="font-weight-bold">Rp. {{formatPrice(2120000)}}</p>
              </div>
              <div class="col-6">
                <h1><i class="fas fa-arrow-up" style="color:red"></i></h1>
                <p class="mb-0">Expense</p>
                <p class="font-weight-bold">Rp. {{formatPrice(1560000)}}</p>
              </div>
            </div>
            <div class="row">
              <img src="https://i.ibb.co/8gqzyhG/chart-Sample.png" class="img-fluid" alt="" >
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 pr-0">
        <div class="card shadow" style="border-radius:25px">
          <div class="card-body">
            <p>Nanti ada History</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentMixin } from '../helpers/mixin'
export default {
  mixins: [paymentMixin]
}
</script>

<style>

</style>
