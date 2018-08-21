import React, { Component } from 'react';
import {connect} from 'react-redux'
import { fetchPost, deletePost } from '../actions'
import { Link } from 'react-router-dom' 

class PostShow extends Component {
  
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchPost(id)
  }

  onDeleteClick = () => {
    const {id} = this.props.match.params
    this.props.deletePost(id, ()=>{
      this.props.history.push("/")
    })    
  }

  render() {
    const {posts} = this.props
    if(!posts){
      return <div>loading...</div>
    }

    return (
      <div>
        <Link to={"/"}>Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
          >Delete Post</button>
        <h3>{posts.title}</h3>
        <h6>Categories : {posts.categories}</h6>
        <p>{posts.content}</p>
      </div>
    );
  }
}

// 두번째 인자인 ownProps는 현재 PostShow 컴포넌트에서의 this.props와 완벽하게 동일하다
const mapStateToProps = ({posts}, ownProps) =>{
  return { posts : posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchPost,deletePost})(PostShow);