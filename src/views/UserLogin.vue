<template>
    
    
    
    <v-form id="login" v-model="valid" @submit.prevent="login">
        <v-app-bar :elevation="2">
        <v-app-bar-title>Login</v-app-bar-title>
        </v-app-bar>
    
        <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field
                    v-model="username"
                    label="Usuário"
                    required
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
            <v-text-field
                v-model="password"
                label="Senha"
                hide-details
                required
            ></v-text-field>
            </v-col>
        </v-row>

        <v-row v-if="showEmailField">
        <v-col cols="12" md="4">
            <v-text-field
            v-model="email"
            label="E-mail"
            hide-details
            :rules="emailRules"
            required
            ></v-text-field>
        </v-col>
        </v-row>

        <v-row>
            
            <v-btn v-if="showLogin" type="submit">Login</v-btn>
            <v-btn v-if="showSend" @click="createUser">Enviar</v-btn>
            <v-btn v-if="showCreate" @click="createForm">Cadastrar</v-btn>
            <v-btn v-if="showBack" @click="loginForm">Voltar</v-btn>
            
        </v-row>
        </v-container>
    </v-form>
</template>
<script>
    import authService from '@/services/authService';
    import axios from 'axios';
    
    export default {
        data: () => ({
            valid: false,
            username: '',
            password: '',
            email: '',
            nameRules: [
                value => {
                    if (value) return true

                    return 'Name is required.'
                },
                value => {
                    if (value?.length <= 10) return true

                    return 'Name must be less than 10 characters.'
                },
            ],
            emailRules: [
                value => {
                    if (value) return true

                    return 'E-mail is requred.'
                },
                value => {
                    if (/.+@.+\..+/.test(value)) return true

                    return 'E-mail must be valid.'
                },
            ],
            showEmailField: false,
            showLogin: true,
            showSend: false,
            showCreate: true,
            showBack: false
        }),
        methods: {
            async login() {

                const login = await authService.login({ username: this.username, password: this.password })

                if ( login ) {
                    this.$router.push('/students')
                } else {
                    console.error('Login error')
                }

            },
            createForm() {
                this.showEmailField = true,
                this.showLogin = false,
                this.showSend = true,
                this.showCreate = false,
                this.showBack = true
            },
            loginForm() {
                this.username = '',
                this.password = '',
                this.email = '',

                this.showEmailField = false,
                this.showLogin = true,
                this.showSend = false,
                this.showCreate = true,
                this.showBack = false
            },
            createUser() {
                const formData = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                };
                
                axios.post('http://localhost:4033/user/create', formData)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                
                    this.loginForm()
                
            }
        }
}
</script>