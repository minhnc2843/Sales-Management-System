import { defineStore } from 'pinia';
import instanceAxios from '@/ultis/configAxios.js';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);

    // Kiểm tra đăng nhập từ localStorage
    const checkAuth = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            user.value = JSON.parse(storedUser);
        }
    };

    // Hàm đăng nhập
    const login = async (username, password) => {
        try {
            const { data } = await instanceAxios.get('/customers');
            const foundUser = data.find(
                (u) => u.username === username && u.password === password
            );

            if (foundUser) {
                user.value = foundUser;
                localStorage.setItem('user', JSON.stringify(foundUser));
                return { success: true, role: foundUser.role };
            } else {
                return { success: false, message: 'Sai tài khoản hoặc mật khẩu' };
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            return { success: false, message: 'Lỗi kết nối' };
        }
    };

    // Hàm đăng xuất
    const logout = () => {
        user.value = null;
        localStorage.removeItem('user');
    };

    return { user, checkAuth, login, logout };
});
