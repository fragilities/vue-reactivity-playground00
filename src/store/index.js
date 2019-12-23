import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

var axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    comments: []
  },
  mutations: {
    setPosts(state, posts) {
      console.log('VUEX MUTATION: setPosts')

      state.posts = posts
    },

    addPost(state, post) {
      console.log('VUEX MUTATION: addPost\nIncoming post data:', post)

      state.posts.push(post)
      console.log('VUEX MUTATION: addPost completed\nShowing current data:', state.posts)
    },

    setComments(state, comments) {
      console.log('VUEX MUTATION: setComments')

      state.comments = comments
    }
  },
  actions: {
    async fetchPosts({commit}) {
      try {
        console.log('VUEX ACTION: fetchPosts')

        const {data} = await axiosInstance.get('/posts')

        commit('setPosts', data)
        
        return data
      }
      catch(err) {
        console.log(err.response.data.message)
      }
    },

    async fetchComments({commit}) {
      try {
        console.log('VUEX ACTION: fetchComments')

        const {data} = await axiosInstance.get('/comments')
        
        commit('setComments', data)
      }
      catch(err) {
        console.log(err.response.data.message)
      }
    }
  },
  modules: {
  }
})
