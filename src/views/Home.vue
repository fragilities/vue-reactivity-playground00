<template>
  <div class="home">
    <p>this is from mapState posts</p>
    <div v-for="post in posts" :key="post.id">
      <p>{{post.title}}</p>
      <p>{{post.author}}</p>
    </div>
    
    <hr>

    <p> this is from data dataPosts</p>
    <div v-for="post in dataPosts" :key="post.id + 'a'">
      <p>{{post.title}}</p>
      <p>{{post.author}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: 'home',

  data() {
    return {
      dataPosts: [],
      dataComments: []
    }
  },
  
  methods: {
    ...mapActions(['fetchPosts', 'fetchComments']),
    ...mapMutations(['addPost'])
  },

  computed: {
    ...mapState(['posts', 'comments'])
  },

  beforeCreate() {
    console.log('VM LIFECYCLE: beforeCreate')
    // this.fetchPosts()
    // this.fetchPosts() will get an error message: Error in beforeCreate hook: "TypeError: this.fetchPosts is not a function"
  },

  created() {
    console.log('VM LIFECYLCLE: created')

    // Using "then" will virtually making fetchPosts to fetchComments transition synchronous
    // console.log output:
    // fetchPosts -> setPosts -> fetchComments -> setComments
    this.fetchPosts().then(posts => {
      this.fetchComments()

      // the DOM that uses dataPosts will normally show the same data as posts from the store
      this.dataPosts = posts
    })

    // Without "then", however, the fetching will be invoked asynchronously
    // console.log output:
    // fetchPosts -> fetchComments -> setPosts -> setComments
    // this.fetchPosts()then
    // this.fetchComments()
  },

  mounted() {
    console.log('Manually adding data to posts in the store')
    this.addPost({
      id: 2,
      title: 'Second post for the store posts',
      author: 'zoezachary'
    })

    console.log('Manually adding data to data dataPosts')
    this.dataPosts.push({
      id: 2,
      title: 'Second post for data dataPosts',
      author: 'zoezachary'
    })

    console.log('current posts:', this.posts)
    console.log('current dataPosts:', this.dataPosts)
  }
}
</script>
