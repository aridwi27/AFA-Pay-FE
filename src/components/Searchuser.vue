<template>
  <div class="card shadow p-4 border-0" style="border-radius: 20px; width: 100%; height: 100%">
    <div>
      <span style="font-size: 15px; font-weight: 800">Search Reciever</span>
      <form action="">
        <div class="form-group">
          <i class="fa fa-search position-absolute pl-3" style="color: #bdbbbb; padding-top: 10px"></i>
          <input class="mt-3 form-control border-0" style="background: #f5f5f5; border-radius: 10px; padding-left: 40px"
            type="text" placeholder="Search reciever here" />
        </div>
      </form>
      <div @click="createTrans()" v-for="user in sampleUser" :key="user.id" class="row card shadow-sm border-0 mt-2 p-2 mx-2">
        <div class="d-flex ml-2">
          <img width="50px" :src="user.image" alt="image" />
          <div class="ml-2" >
            <span style="font-weight: 800" class="d-block">{{
              user.name
            }}</span>
            <span style="font-size: 12px" class="d-block">{{
              user.phone
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sampleUser: [
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', phone: '+62', id: 1 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', phone: '+62', id: 2 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', phone: '+62', id: 3 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', phone: '+62', id: 4 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', phone: '+62', id: 5 }
      ]
    }
  },
  methods: {
    createTrans () {
      this.$router.push('/transfer')
    }
  }
}
</script>
