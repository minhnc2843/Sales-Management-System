<template>
    <div class="container mt-4">
        <h1 class="text-center text-primary mb-4">Chi tiết người dùng</h1>
        <div class="card shadow-lg p-4">
            <div class="row">
              
                <div class="col-md-5 text-center">
                    <img :src="customer.image" alt="Hình ảnh sản phẩm" class="img-fluid rounded shadow-sm" style="max-height: 500px;">
                    <li class="list-group-item mt-5"><strong>Vai Trò:</strong> {{ customer.role }}</li>
                </div>
                
               
                <div class="col-md-7">
                    <ul class="list-group">
                        <li class="list-group-item"><strong>ID:  </strong> {{ customer.id }}</li>
                        <li class="list-group-item"><strong>Tên người dùng: </strong> {{ customer.name }}</li>
                        <li class="list-group-item"><strong>Điện thoại:   {{ customer.phone}}   </strong> </li>
                        <li class="list-group-item"><strong>Email: </strong> {{ customer.email}}</li>
                        <li class="list-group-item"><strong>Địa chỉ:</strong> {{ customer.address}}</li>
                       
                    </ul>
                </div>
            </div>

            <!-- Nút hành động -->
            <div class="d-flex justify-content-center mt-4">
                <router-link to="/customers" class="btn btn-success me-2">
                    <i class="bi bi-arrow-left"></i> Quay lại danh sách
                </router-link>
                <router-link :to="`/customers/edit/${customer.id}`" 
                class="btn btn-warning btn-sm me-2">Sửa Thông Tin</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import instanceAxios from '@/ultis/configAxios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const customer = ref({});
const route = useRoute();

const getcustomer = async () => {
    try {
        const { data } = await instanceAxios.get(`/customers/${route.params.id}`);
        customer.value = data;
    } catch (error) {
        console.error("Lỗi khi call API khách hàng:", error);
    }
};


onMounted(() => {
    getcustomer();
});
</script>

