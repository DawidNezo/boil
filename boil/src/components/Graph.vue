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

const elements = ref([])

watch(props, (newVal, oldVal) => {
  elements.value = [];
  Object
      .entries(newVal.foo)
      .map(([key, value]) => ({ key, value }))
      .forEach(({ key, value }) => {
        console.log(value);
        elements.value.push({
          id: value.id,
          label: value.id + ' duration: ' + value.duration,
          position: { x: Math.floor(Math.random() * 201), y: Math.floor(Math.random() * 201) },
        });
        value.predecessors.forEach((predecessor) => {
          elements.value.push({
            id: `e${predecessor}-${value.id}`,
            target: value.id,
            source: predecessor.id,
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