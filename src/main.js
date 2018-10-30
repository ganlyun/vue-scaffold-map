import Vue from 'vue'
import App from './App.vue'
import { loadScript } from 'esri-loader'

const options = {
  url: 'http://localhost:8080/arcgis/3.16/init.js'
};
loadScript(options)

new Vue({
  el: '#app',
  render: h => h(App)
})

