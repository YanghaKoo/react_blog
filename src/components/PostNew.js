import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostNew extends Component {
  renderField = field => {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-danger">{field.meta.touched ? field.meta.error : ''}</div>
      </div>
    );
  };

  // handleSubmit 안에 들어가는 함수이므로 values객체에 title, categories, content가 객체로 들어가있음
  // action Creater를 불러야함 여기서, posting the post to the api 할놈!
  onSubmit = (values) => {
    this.props.createPost(values, ()=>{
      this.props.history.push('/')
    })
  }

  render() {
    const { handleSubmit } = this.props // 이게 어디서 온거냐면 -> reduxForm, connect 에서 redux 정보들을 props로 가져오듯이
                                        // handleSubmit의 역할은, reduxForm에서 기본 제공되는데, 
                                        // validation이 제대로 완료 되면(ready to be submitted 되면) 그러면 인자에 있는
                                        // callback 함수(여기선 onSubmit())을 불러오란 거지
                                        // 그 onSubmit의 인자인 values엔 우리가 폼에 작성한 녀석들이 들어있고!!

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="title" 
          label="Title" 
          component={this.renderField} />
        <Field
          name="categories"
          label="Categories"
          component={this.renderField}
        />
        <Field
          name="content"
          label="Post Content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

const validate = values => {
  //console.log(values) ->  {title : 'asd', catefories : 'qqq', content : 'asdasd' } 이런식으로 Field에 있는 정보들이 들어가 있음
  const errors = {};

  // Validate the Inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }
  if (!values.content) {
    errors.content = "Enter some content!";
  }
  return errors; // 빈 객체 {}가 return 되면 에러가없는거고 errors가 뭐가 들어있다면 에러가 있는거임
};

export default reduxForm({
  validate: validate,
  form: "PostsNewForm"
})(
  connect(null,{createPost})(PostNew)
);
