import React from "react";
import { Router } from "@reach/router";
import Questions from "./Questions";
import AskQuestion from "./AskQuestion";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      empty: false,
    };
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch(method, body, id) {
    const baseUrl =
      id !== undefined
        ? `https://awpmandatoryexpressdb.herokuapp.com/posts/${id}`
        : "https://awpmandatoryexpressdb.herokuapp.com/posts";
    let raw = [];
    if (!method && !body) {
      raw = await fetch(baseUrl);
    }
    if (method && body) {
      raw = await fetch(baseUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        method: method.toUpperCase(),
        body: JSON.stringify(body),
      });
    }

    const posts = await raw.json();

    if (posts) {
      this.setState((_) => ({
        posts,
        empty: false,
      }));
      return;
    }
    this.setState((_) => ({
      empty: true,
    }));
  }

  addPost(newPost) {
    this.fetch("post", newPost);
  }

  editPost(editedPost) {
    this.fetch("put", editedPost, editedPost._id);
  }

  render() {
    return (
      <>
        <div class="page-title">
          <h1 class="title">Q and A</h1>
        </div>
        <Router>
          <AskQuestion
            path="/ask"
            addPost={(post) => this.addPost(post)}
          ></AskQuestion>
          <Questions
            path="/"
            editPost={(editedPost) => this.editPost(editedPost)}
            empty={this.state.empty}
            posts={this.state.posts}
          ></Questions>
        </Router>
      </>
    );
  }
}
