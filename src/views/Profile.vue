<template>
  <div>
    <div class="h-100 bg-main">
      <headers />
      <div class="container py-5">
        <div class="row">
          <div class="col-md-3">
            <!-- INi adalah Sidebar -->
            <Sidebar />
          </div>
          <div
            class="col-md-9"
            style="
              background: #ffffff;
              box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
              border-radius: 25px;
              padding-top: 5%;
            "
          >
            <div class="text-center">
              <img
                src="../assets/image/Rectangle 25.png"
                class="rounded mx-auto d-block"
                alt="..."
              />
              <button class="btn mb-3" style="color: #7a7886">
                <img src="" alt="" /><img
                  src="../assets/image/pencil.png"
                  alt=""
                />
                Edit
              </button>
              <h4 class="font-weight-bold mb-3" style="color: #4d4b57">
                Robert Chandler
              </h4>
              <p style="color: #7a7886">+62 813-9387-7946</p>
            </div>
            <div
              class="card w-50 mb-3"
              style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              "
            >
              <div class="card-body">
                <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
                  Personal Information
                </h5>
                <img
                  src="../assets/image/arrow-left.png"
                  class="float-right"
                  alt=""
                />
              </div>
            </div>
            <div
              class="card w-50 mb-3"
              style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              "
            >
              <div class="card-body">
                <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
                  Change Password
                </h5>
                <img
                  src="../assets/image/arrow-left.png"
                  class="float-right"
                  alt=""
                />
              </div>
            </div>
            <div
              class="card w-50 mb-3"
              style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              "
            >
              <div class="card-body">
                <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
                  Change PIN
                </h5>
                <img
                  src="../assets/image/arrow-left.png"
                  class="float-right"
                  alt=""
                />
              </div>
            </div>
            <div
              class="card w-50 mb-5"
              style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              "
            >
              <div class="card-body">
                <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
                  Logout
                </h5>
              </div>
            </div>
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
export default {
  components: {
    headers,
    Sidebar,
    Footer
  }
}
</script>
