<template>
  <h1>CPM</h1>
  <form>
    <div id="addTask-container">
      <label>Czynność:</label>
      <input type="text" v-model="newTask"  required @keydown.enter.prevent/>    
      <label>Czas trwania:</label>
      <input type="text" v-model="newDuration" required @keydown.enter.prevent/> 
      <label>Czynność poprzedzająca (oddzielaj przecinkiem):</label>
      <input type="text" v-model="tempDependecie" @keyup="addDependecie" @keydown.enter.prevent/>
      <div v-for="newdependencie in newDependencies" :key="newdependencie" class="pill">
        {{ newdependencie }}
      </div>
      <div class="buttonContainer">
        <button type="submit" v-on:click.prevent="submitForm()" @keydown.enter.prevent>
          Add task
        </button>   
      </div>
    </div>
    <div id="items-container">
      <div v-for="(task, index,) in tasks" :key="task.id" class="items">
        <div>
          Czynność: {{ task.taskName }}<br> Czas trwania: {{ task.duration }}<br>
          Czynności poprzedzające: {{ task.dependencie }}
        </div>
        <div class="remove-item" @click="removeTask(index)">
         &times;
        </div>
      </div>
    </div>
  </form>
  <div id="graph-container">
    <button type="submit" v-on:click.prevent="generateGraph()" @keydown.enter.prevent>
      Generate graph
    </button>
    <span id="cpmResult">CpmResult:{{cpmString}} CpmTime:{{cpmTime}}</span>
  </div>
  <div>
    <Graph :foo=elements ></Graph>
  </div>
  </template>
<script>
//import { Task, findCPM } from '../components/CpmMethod';
import {Activity, ActivityList} from '../components/CpmMethod'
import { defineComponent } from 'vue';
import Graph from '../components/Graph.vue';

  export default {
    components: {
      Graph
    },
    data() {
      return {
        //idFortask: 0,
        newTask:'',
        tempDependecie: '',
        tasks: [],
        newDuration: '',
        newDependencies: [],
        cpmString: '',
        cpmTime: '',
        elements: [],
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
          if (!this.newDependencies.includes(cleanedDependecie)){
            this.newDependencies.push(cleanedDependecie)
          }          
          this.tempDependecie = ''
        }
      },
      submitForm() {
      // Perform form validation if needed
      if (this.newTask.trim() === '' || this.newDuration.trim() === '') {
        // Handle validation error (show a message, prevent submission, etc.)
        console.log('Validation error: Please fill in all required fields.');
        return;
      }
      
      this.addtasks();
    },
      addtasks() {
        //const myTask = new Task(this.newTask, parseInt(this.newDuration), this.newDependencies);
        this.tasks.push({
          //id: this.idFortask,
          taskName: this.newTask,
          duration: parseInt(this.newDuration),
          dependencie: this.newDependencies
        }) 
        //this.tasks.push(myTask);
        // tasks.addActivity(new Activity(
        //   {id: this.newTask, duration: parseInt(this.newDuration), predecessors: this.newDependencies}
        // ))
        //console.log(this.table);

        localStorage.setItem('tasks', JSON.stringify(this.tasks));

        this.newTask = '';
        //this.idFortask++;
        this.newDuration = '';
        this.newDependencies = [];
      },
      removeTask(index){
        this.tasks.splice(index,1);
        //table.removeTask(index);
        console.log(this.tasks);

        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      generateGraph() {
        // if(this.tasks.length < 2) console.log("Add tasks before generating graph")
        // else
        // {
        //   let CpmPath = tasks.getCriticalPath(tasks[tasks.length - 1]);
        //   console.log(CpmPath);
        // }
        if(this.tasks.length < 2) console.log("Add tasks before generating graph")
        else
        {
          let table = new ActivityList();
          for (const task of this.tasks) {
            table.addActivity(new Activity(
              {id: task.taskName, duration: task.duration, predecessors: task.dependencie}
            ))
          }
          let CpmPath = table.getCriticalPath();
          this.cpmTime = CpmPath.let;
          let pom = "";
          while(CpmPath){
            pom += CpmPath.id;
            CpmPath = CpmPath.predecessors[0];
          }
          this.elements = table.getList();
          this.cpmString = pom.split("").reverse().join("->");
        }
      }
    }    
  }
</script>
<style>
#app{
  display: flex;
  flex-direction: column;
}
h1{
  font-size: 45px;
  background-color: whitesmoke;
  text-align: center;
  color: #555;
  border-radius: 5px;
}
form {
  display: flex;
  flex-direction: row;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
#addTask-container{
  min-width: 300px;
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
#items-container{
  margin-left: 30px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.items{
  margin: 5px;
  display: flex;
  flex-direction: column;
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
#graph-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
#cpmResult{
  color: black;
}
</style>