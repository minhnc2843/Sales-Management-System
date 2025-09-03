<template>
    <div class="container mt-4">
        <h1 class="mb-4 text-primary text-center ">Danh sách người dùng</h1>
        <router-link :to="`/customers/add`" class="btn btn-success btn-sm mb-3">Thêm mới</router-link>
        <table class="table table-bordered table-striped table-hover">
            <thead class="table-secondary text-center">
                <tr>
                    <th>ID</th>
                    <th>Hình ảnh</th>
                    <th>Tên người dùng</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Vai trò</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="customer in paginatedCustomers" :key="customer.id">
                    <td>{{ customer.id }}</td>
                    <td><img :src="customer.image" alt="Hình ảnh" class="img-thumbnail" width="50" height="50"/></td>
                    <td>{{ customer.name }}</td>
                    <td>{{ customer.phone }}</td>
                    <td>{{ customer.email }}</td>               
                    <td>{{ customer.address }}</td>
                    <td>{{ customer.role }}</td>
                    <td>
                        <router-link :to="`/customers/detail/${customer.id}`" class="btn btn-primary btn-sm me-2">Chi tiết</router-link>
                        <router-link :to="`/customers/edit/${customer.id}`" class="btn btn-warning btn-sm me-2">Sửa</router-link>
                        <button class="btn btn-danger btn-sm" @click="deletecustomer(customer.id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center mt-3">
            <vue-awesome-paginate
                :total-items="customers.length"
                :items-per-page="itemsperPage"
                :max-pages-shown="5"
                :show-ending-buttons="true"
                :show-breakpoint-buttons="false"
                v-model="Page"
            />
        </div>
    </div>
</template>

<script setup lang="js">
import { ref, onMounted, computed } from "vue";
import instanceAxios from '@/ultis/configAxios.js';

const customers = ref([]);
const Page = ref(1);
const itemsperPage = 5;

const paginatedCustomers = computed(() => {
    const start = (Page.value - 1) * itemsperPage;
    const end = start + itemsperPage;
    return customers.value.slice(start, end);
});

const getCustomers = async () => {
    try {
        const response = await instanceAxios.get("/customers");
        customers.value = response.data;
    } catch (error) {
        console.log(error);
    }
};

const deletecustomer = async (id) => {
    const checked = confirm("Xác nhận xóa?");
    if (!checked) return;
    try {
        await instanceAxios.delete(`/customers/${id}`);
        getCustomers();
    } catch (error) {
        console.error("Lỗi khi xóa khách hàng:", error);
       
    }
};

onMounted(getCustomers);
</script>

<style>
.pagination-container {
    display: flex;
    column-gap: 10px;
}
.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}
.paginate-buttons:hover {
    background-color: #d8d8d8;
}
.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}
.active-page:hover {
    background-color: #2988c8;
}
</style>