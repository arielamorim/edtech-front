<template>
    <div>
    
    <v-app-bar :elevation="2">
        <v-app-bar-title>Logout efetuado com sucesso</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="login">
        Login
        </v-btn>
    </v-app-bar>
    </div>
</template>

<script>
import authService from '@/services/authService';

export default {
    mounted() {
        authService.logout();
    },
    methods: {
        async login() {
            try {
                this.$router.push({ name: 'login'});
            } catch (error) {
                console.error('Error logging out:', error);
            }
        }
    }
};
</script>