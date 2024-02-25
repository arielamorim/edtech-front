<template>
<v-form id="edit" v-model="valid" @submit.prevent="submitForm">
    <v-app-bar :elevation="2">
    <v-app-bar-title>Editar cadastro</v-app-bar-title>
    </v-app-bar>

    <v-container>
    <v-row>
        <v-col cols="12" md="4">
        <v-text-field v-model="name" :rules="nameRules" label="Nome" required hide-details></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="4">
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" hide-details required></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="4">
        <v-text-field v-model="ra" label="Registro Academico" hide-details required></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="4">
        <v-text-field v-model="cpf" label="CPF" hide-details required></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-btn type="submit">Salvar</v-btn>
        <v-btn @click="cancelEdit">Cancelar</v-btn>
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
            if (value) return true;
            return 'Name is required.';
        }
    ],
    emailRules: [
        value => {
            if (value) return true;
            return 'E-mail is required.';
        },
        value => {
            if (/.+@.+\..+/.test(value)) return true;
            return 'E-mail must be valid.';
        },
    ],
}),
mounted() {
    // Fetch student data and populate form fields for editing
    const studentId = this.$route.params.id;
    axios.get(`http://localhost:4033/student/${studentId}`)
    .then(response => {
        const student = response.data;
        this.name = student.name;
        this.email = student.email;
        this.ra = student.ra;
        this.cpf = student.cpf;
    })
    .catch(error => {
        console.error('Error fetching student:', error);
    });
},
methods: {
    submitForm() {
    
        const formData = {
        name: this.name,
        email: this.email,
        ra: this.ra,
        cpf: this.cpf,
    };
    
    // Make the Axios PUT request to update student record
    const studentId = this.$route.params.id;
    axios.put(`http://localhost:4033/student/update/${studentId}`, formData)
        .then(response => {
        
        this.$router.push({ name: 'students'});
        })
        .catch(error => {
        console.error('Error:', error);
        });
    },
    cancelEdit () {
        this.$router.push({ name: 'students'});
    }
},
};
</script>
