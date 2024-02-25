<template>
<div>

<v-app-bar :elevation="2">
    <v-app-bar-title>Lista de alunos</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="createStudent">
    Cadastrar
    </v-btn>
    <v-btn text @click="logout">
    Logout
    </v-btn>
</v-app-bar>

<v-text-field v-model="search" label="Pesquisar" solo prepend-inner-icon="mdi-magnify"></v-text-field>


    <v-data-table :headers="headers" :items="studentList" item-key="id" :search="search">
    <template v-slot:item="{ item }">
        <tr>
        <td>{{ item.ra }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.cpf }}</td>
        <td>
            <v-btn @click="editStudent(item.id)" >Editar</v-btn>
            <v-btn @click="deleteStudent(item.id)" >Excluir</v-btn>
        </td>
        </tr>
    </template>
    </v-data-table>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            studentList: [],
            headers: [
                { text: 'RA', value: 'ra' },
                { text: 'Nome', value: 'name' },
                { text: 'E-mail', value: 'email' },
                { text: 'CPF', value: 'cpf' },
                { text: 'Ações', sortable: false },
            ],
            search: '',
        };
    },
    computed: {
        filteredStudents() {
            return this.studentList.filter(student =>
                student.ra.includes(this.search) ||
                student.name.includes(this.search) ||
                student.email.includes(this.search) ||
                student.cpf.includes(this.search)
            );
        },
    },
    mounted() {
        this.fetchStudents();
    },
    methods: {
        async fetchStudents() {
            try {
                
                const response = await axios.get('http://localhost:4033/student');
                
                this.studentList = response.data;
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        },
        editStudent(studentId) {
            console.log('Editing student:', studentId);
            
            this.$router.push({ name: 'editstudent', params: { id: studentId } });
        },
        async deleteStudent(studentId) {
            try {
                await axios.post(`http://localhost:4033/student/delete/${studentId}`);
                
                this.studentList = this.studentList.filter(student => student.id !== studentId);
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        },
        logout() {
            this.$router.push({ name: 'logout' });
        },
        createStudent() {
            this.$router.push({ name: 'createstudent' });
        }
    }
};
</script>
