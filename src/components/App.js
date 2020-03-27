import React, { Component } from 'react';

import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get(`${this.state.baseUrl}/posts`).then(res => {
      console.log(res.data)
      this.setState({
        posts: res.data
      })
    })
  }

  updatePost(id, text) {
    console.log(id)
    axios.put(`${this.state.baseUrl}/posts?id=${id}`,{text}).then(res => {
      console.log(res.data)
      this.setState({
        posts: res.data
      })
    })
  }

  deletePost(id) {
    axios.delete(`${this.state.baseUrl}/posts?id=${id}`).then(res=>{
      this.setState({posts: res.data})
    })
  }

  createPost(text) {
    axios.post(`${this.state.baseUrl}/posts`, {text}).then(res =>{
      this.setState({posts: res.data})
    })
  }

  render() {
    const posts = this.state.posts;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          
          <Compose
          createPostFn={this.createPost}
          />
          {posts.map(post => (
            <Post
              key={post.id}
              text={post.text}
              date={post.date}
              updatePostFn={this.updatePost}
              id={post.id}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
