<template>
  <div>
    <div class="h-100 bg-main">
      <headers />
      <div class="container py-4">
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
              padding-top: 2%;
            "
          >
            <p style="font-weight: bold">How To Top Up</p>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >1
                  </span>
                  Go to the nearest ATM or you can use E-Banking.
                </p>
              </div>
            </div>

            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >2
                  </span>
                  Type your security number on the ATM or E-Banking.
                </p>
              </div>
            </div>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >3
                  </span>
                  Select “Transfer” in the menu
                </p>
              </div>
            </div>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >4
                  </span>
                  Type the virtual account number that we provide you at the
                  top.
                </p>
              </div>
            </div>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >5
                  </span>
                  Type the amount of the money you want to top up.
                </p>
              </div>
            </div>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >6
                  </span>
                  Read the summary details
                </p>
              </div>
            </div>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >7
                  </span>
                  Press transfer / top up
                </p>
              </div>
            </div>
            <div
              class="card mb-5"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >8
                  </span>
                  You can see your money in Zwallet within 3 hours.
                </p>
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
