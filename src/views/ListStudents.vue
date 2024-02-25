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

<v-dialog v-model="dialogDelete" max-width="500">
    <v-card>
    <v-card-title>Confirmar Exclusão</v-card-title>
    <v-card-text>
        Tem certeza de que deseja excluir este aluno?
    </v-card-text>
    <v-card-actions>
        <v-btn color="error" text @click="dialogDelete = false">Cancelar</v-btn>
        <v-btn color="success" text @click="deleteStudent">Confirmar</v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>

    <v-data-table :headers="headers" :items="studentList" item-key="id" :search="search">
    <template v-slot:item="{ item }">
        <tr>
        <td>{{ item.ra }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.cpf }}</td>
        <td>
            <v-btn @click="editStudent(item.id)" >Editar</v-btn>
            <v-btn @click="confirmDelete(item.id)" >Excluir</v-btn>
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
            dialogDelete: false,
            deleteStudentId: null
        };
    },
    computed: {
        filteredStudents: {
            get() {
                return this.studentList.filter(student =>
                    student.ra.toLowerCase().includes(this.search.toLowerCase()) ||
                    student.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    student.email.toLowerCase().includes(this.search.toLowerCase()) ||
                    student.cpf.toLowerCase().includes(this.search.toLowerCase())
                );
            },
            set(value) {
            }
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
        confirmDelete(studentId) {
            this.deleteStudentId = studentId;
            this.dialogDelete = true;
        },
        async deleteStudent() {
            try {
                await axios.post(`http://localhost:4033/student/delete/${this.deleteStudentId}`);
                this.studentList = this.studentList.filter(student => student.id !== this.deleteStudentId);
                this.filteredStudents = this.studentList;
                this.dialogDelete = false;
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
