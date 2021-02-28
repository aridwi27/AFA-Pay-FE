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
          <AddPhone />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <div class="d-block d-lg-none d-md-none bg-white" style="height:100vh">
  <div class="container">
    <div class="row">
      <div class="col-12 px-0">
        <mAddPhone />
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
import AddPhone from '../components/AddPhone'
import mAddPhone from '../components/AddPhone-M'
// import SearchUser from '../components/Searchuser'
export default {
  components: {
    headers,
    Footer,
    Sidebar,
    AddPhone,
    mAddPhone
    // SearchUser
  }
}
</script>
