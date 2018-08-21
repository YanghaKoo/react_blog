import axios from 'axios'

export const FETCH_POSTS = 'FETCH_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const FETCH_POST = 'FETCH_POST'
export const DELETE_POST = 'DELETE_POST'

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=yangha93' // 아무거나 

// 액션 생성자 함수를 default로 export 시키자, 얘는 향후에 this.props.fetchPosts()로 쓰일 애임
export default function fetchPosts() {
  // 이러면 posts를 가져오는 게 되겠지 그 공식홈페이지 메뉴얼에서 제공하듯이
  const req = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return {
    type : FETCH_POSTS,
    payload : req
  }
}

export function createPost(values, callback) {
  
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,values)       // axios에서 post를 쓰면 이것의  1번째 인자는 url, 두번째 인자는 object임 넣을놈
    .then(()=>callback())    
    
  return {
    type : CREATE_POST,
    payload : request
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
  return {
    type : 'FETCH_POST',
    payload : request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(()=>{callback()})

  return {
    type : 'DELETE_POST',
    payload : id
  }
}
