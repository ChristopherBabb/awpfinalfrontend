import React from "react";
import Question from "./Question";
import { Link } from "@reach/router";

export default class Questions extends React.Component {
  whatToRender() {
    if (this.props.empty) return <h2>Be the first to ask a question</h2>;
    if (!this.props.empty && this.props.posts.length) {
      const posts = this.props.posts.map((post) => {
        return (
          <Question
            editPost={(editedPost) => this.props.editPost(editedPost)}
            question={post}
            key={post._id}
          ></Question>
        );
      });
      return <ul>{posts}</ul>;
    }
  }

  render() {
    return (
      <>
        {this.whatToRender()}
        <Link to="/ask" className="questions__ask_button">
          + Ask Question!
        </Link>
      </>
    );
  }
}
