<template>
    <v-form id="create" v-model="valid" @submit.prevent="submitForm">
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
                hide-details
                required
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-btn type="submit">Enviar</v-btn>
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
        }),
        methods: {
            submitForm() {
                // Prepare the data object to send to the API
                const formData = {
                    name: this.name,
                    email: this.email,
                    ra: this.ra,
                    cpf: this.cpf
                };
                console.log("Form DATA -->", formData)
                // Make the Axios POST request
                axios.post('https://your-api-endpoint.com/your-route', formData)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
    }}}
</script>