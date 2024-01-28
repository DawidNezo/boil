<script>
  export default {
    defineComponent() {
      return {
        name: 'Graph',
      }
    },
    props: {
      foo: {
        type: Array,
        required: true,
      },
    },
    mounted() {   
      // console.log(this.foo);
    },
  }
</script>
<script setup>
import { VueFlow } from '@vue-flow/core';
import { ref, toRef, watch } from 'vue';
import { defineComponent } from 'vue';

const props = defineProps(['foo']);

const elements = ref([]);

watch(props, (newVal, oldVal) => {
  elements.value = [];
  Object
      .entries(newVal.foo)
      .map(([key, value]) => ({ key, value }))
      .forEach(({ key, value }) => {
        elements.value.push({
          id: value.id,
          label:
            'Earliest End Time: ' + value.eet + 
            '<br>Latest End Time: ' + value.let,
          position: { x: Math.floor(Math.random() * 501), y: Math.floor(Math.random() * 501) },
        });
        
        value.predecessors.forEach((predecessor) => {
          if (predecessor.id == 'start') {
            elements.value.push({
              id: predecessor.id,
              label:
                'Earliest Start Time: ' + value.est + 
                '<br>Latest Start Time: ' + value.lst,
              position: { x: Math.floor(Math.random() * 501), y: Math.floor(Math.random() * 501) },
            });
          }

          elements.value.push({
            id: `e${predecessor.id}-${value.id}`,
            target: value.id,
            source: predecessor.id,
            label: value.id + ' ' + value.duration,
          });
        });
      });  
    });
</script>

<template >
  <div style="border-style: solid; width: 100%; height: 500px;">
    <VueFlow style="width: 100%; height: 500px;" v-model="elements"></VueFlow>
  </div>
</template>

<style>
/* import the required styles */
@import "@vue-flow/core/dist/style.css";

/* import the default theme (optional) */
@import "@vue-flow/core/dist/theme-default.css";
</style>