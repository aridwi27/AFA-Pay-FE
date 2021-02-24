<template>
  <div class="h-100 bg-main">
    <headers />
    <div class="container py-4">
      <div class="row">
        <div class="col-3">
          <!-- INi adalah Sidebar -->
            <Sidebar />
        </div>
        <div class="col-9">
          <Success />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import headers from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Success from '../components/Success'
export default {
  components: {
    headers,
    Footer,
    Sidebar,
    Success
  }
}
</script>
