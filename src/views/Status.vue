<template>
<div>
  <div class="h-100 bg-main d-none d-lg-block d-md-block">
    <headers />
    <div class="container py-4">
      <div class="row">
        <div class="col-3">
          <!-- INi adalah Sidebar -->
          <Sidebar />
        </div>
        <div class="col-9">
          <Status />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <div class="d-block d-lg-none d-md-none bg-white" style="height:100vh">
  <div class="container">
    <div class="row">
      <div class="col-12 px-0">
        <mStatus />
      </div>
    </div>
  </div>
  <Footer />
  </div>
</div>

</template>

<script>
import headers from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Status from '../components/Status'
import mStatus from '../components/Status-M'
export default {
  components: {
    headers,
    Footer,
    Sidebar,
    Status,
    mStatus
  }
}
</script>
