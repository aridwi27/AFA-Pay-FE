<template>
  <div class="h-100">
    <headers />
    <div class="h-75">Test</div>
    <Footer />
  </div>
</template>

<script>
import headers from '../components/Header'
import Footer from '../components/Footer'
export default {
  components: {
    headers,
    Footer
  }
}
</script>
