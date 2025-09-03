<template>
  <div class="bg-success text-white py-3 p-md">
        <div class="container d-flex justify-content-between align-items-center">
          <h2>Wellcome Admin Dashboard</h2>
          <nav>
            <ul class="nav">
              <li class="nav-item">               
                <router-link to="/products" class="nav-link text-white">Sản phẩm</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/customers" class="nav-link text-white">Khách hàng</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/donhangs" class="nav-link text-white">Lịch sử đơn hàng</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/thongke" class="nav-link text-white">Thống kê</router-link>
              </li>
              <li class="nav-item" >
             <a href="/"  class="btn text-white nav-link text-center mt-1"><h5 >Dăng xuất</h5></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
  

</template>

<script>

</script>

<style scoped>
 .nav .nav-link {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
  }
  .nav .nav-link:hover {
    text-decoration: underline;
  }
</style>