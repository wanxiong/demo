import Vue from 'vue'
import filters from './filter'

Object.keys(filters).forEach(k =>  Vue.filter(k, filters[k]))