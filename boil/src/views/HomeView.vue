<template>
  <form>
  <h1>CPM</h1>
    <label>Czynność:</label>
    <input type="text" v-model="newTask"  required @keydown.enter.prevent/>    
    <label>Czas trwania:</label>
    <input type="text" v-model="newduration" required @keydown.enter.prevent/> 
    <label>Czynność poprzedzająca (oddzielaj przecinkiem):</label>
    <input type="text" v-model="tempDependecie" @keyup="addDependecie" @keydown.enter.prevent/>
    <div v-for="newdependencie in newdependencies" :key="newdependencie" class="pill">
    {{ newdependencie }}
    </div>
      <div class="buttonContainer">
    <button type="submit" v-on:click.prevent="submitForm()" @keydown.enter.prevent>
      Submit task
    </button>   
  </div> 
    <div v-for="(task, index,) in tasks" :key="task.id" class="items">
      <div>Czynność: {{ task.taskName }}<br> Czas trwania: {{ task.duration }}<br>
      Czynności poprzedzające: {{ task.dependencie }}</div>
      <div class="remove-item" @click="removeTask(index)">
        &times;
      </div>
    </div>
  </form>  
  </template>
<script>
  export default {
    data() {
      return {
        idFortask: 0,
        newTask:'',
        tempDependecie: '',
        tasks: [],
        newduration: '',
        newdependencies: []        
      }
    },
    mounted() {    
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  },
    methods: {
      addDependecie(e){
        if(e.key === ',' && this.tempDependecie){
          e.preventDefault();
          const cleanedDependecie = this.tempDependecie.replace(/^,+|,+$/g, '').toUpperCase();
          if (!this.newdependencies.includes(cleanedDependecie)){
            this.newdependencies.push(cleanedDependecie)
          }          
          this.tempDependecie = ''
        }
      },
      submitForm() {
      // Perform form validation if needed
      if (this.newTask.trim() === '' || this.newduration.trim() === '') {
        // Handle validation error (show a message, prevent submission, etc.)
        console.log('Validation error: Please fill in all required fields.');
        return;
      }
      
      this.addtasks();
    },
      addtasks() {   
        this.tasks.push({
          id: this.idFortask,
          taskName: this.newTask,
          duration: parseInt(this.newduration),
          dependencie: this.newdependencies
        }) 

        localStorage.setItem('tasks', JSON.stringify(this.tasks));

        this.newTask = '';
        this.idFortask++;
        this.newduration = '' ;
        this.newdependencies = [];
      },
      removeTask(index){
        this.tasks.splice(index, 1);

        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }    
  }
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
h1{
  color: #333;
  text-align: center;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;

}
.items{
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;  
  font-weight: bold;
  border-style: solid;
  border-radius: 10px;
  padding: 10px;
  color: black !important;
}
.remove-item{
  cursor: pointer;
  font-size: 24px;
  color: red;
  margin-left: 14px;
  &:hover{
    color: black;
  }  
}
.buttonContainer{
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
button{
    margin: 20px;
    padding: 10px 30px;
    background-color: lightgrey;
    cursor: pointer;
}
.pill{
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}
</style>
