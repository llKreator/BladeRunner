import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    apiKey: 'f6785433329d39cecf1524248ac70a0f',
    urls: [
      'https://api.themoviedb.org/3/movie/78/images?api_key=f6785433329d39cecf1524248ac70a0f&language=en-US&include_image_language=null,en',
      'https://api.themoviedb.org/3/movie/335984/images?api_key=f6785433329d39cecf1524248ac70a0f&language=en-US&include_image_language=null,en'
    ],
    bladeRunner: [],
    bladeRunner2049: []
  },
  mutations: {
    dafaultFillBR (state, payload) {
      state.bladeRunner.push(payload)
    },
    dafaultFillBR2049 (state, payload) {
      state.bladeRunner2049.push(payload)
    },
    addComment (state, payload) {
      if (payload.comment) {
        let elem
        if ((elem = state.bladeRunner.find(e => e.id === payload.id))) {
          elem.comments.push(payload.comment)
        }
        else if (
          (elem = state.bladeRunner2049.find(e => e.id === payload.id))
        ) {
          elem.comments.push(payload.comment)
        }
      }
    },
    addLike (state, payload) {
      state.bladeRunner.find(e => e.id === payload.id) ? state.bladeRunner.find(e => e.id === payload.id).likes++
        : state.bladeRunner2049.find(e => e.id === payload.id).likes++
    }
  },
  getters: {
    elemById: state => (id) => {
      return state.bladeRunner.find(elem => elem.id === id) ? state.bladeRunner.find(elem => elem.id === id)
        : state.bladeRunner2049.find(elem => elem.id === id)
    },
    allItems: state => {
      return [...state.bladeRunner, ...state.bladeRunner2049]
    }
  }
})
