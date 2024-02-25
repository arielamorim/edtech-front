<template>
    <v-form id="create" v-model="valid" @submit.prevent="submitForm">
        <v-app-bar :elevation="2">
        <v-app-bar-title>Cadastrar aluno</v-app-bar-title>
        </v-app-bar>
        <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nome"
                    required
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                hide-details
                required
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field
                    v-model="ra"
                    label="Registro Academico"
                    hide-details
                    required
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
            <v-text-field
                v-model="cpf"
                label="CPF"
                :rules="cpfRules"
                hide-details
                required
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-btn type="submit">Enviar</v-btn>
            <v-btn @click="cancelCreate">Cancelar</v-btn>
        </v-row>
        </v-container>
    </v-form>
</template>
<script>
    import axios from 'axios';
    
    export default {
        data: () => ({
            valid: false,
            name: '',
            cpf: '',
            email: '',
            ra: '',
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
            cpfRules:[
                v => !!v || 'CPF é obrigatório',
                v => (v && /^[0-9]{11}$/.test(v)) || 'CPF inválido',
            ]
        }),
        methods: {
            submitForm() {
                
                const formData = {
                    name: this.name,
                    email: this.email,
                    ra: this.ra,
                    cpf: this.cpf
                };
                
                axios.post('http://localhost:4033/student/create', formData)
                    .then(response => {
                        console.log(response.data);
                        this.$router.push({ name: 'students'})

                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            },
            cancelCreate() {
                this.$router.push({ name: 'students'})
            }
    }}
</script>