import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3030/api',
});

//ad external API link here 

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,
 
//Conversations

getConversations() {
  return service
    .get('/conversations')
    .then(res => res.data)
    .catch(errHandler);
},

getConversationbyId(conversationId) {
  return service
    .get('/conversations/'+conversationId)
    .then(res => res.data)
    .catch(errHandler);
},

editConversationbyId(conversationId) {
  return service
    .patch('/conversations/'+conversationId)
    .then(res => res.data)
    .catch(errHandler);
},

postConversations(data) {
  return service
    .post('/conversations', data)
    .then(res => res.data)
    .catch(errHandler);
},

deleteConversations(conversationId){
  return service
  .delete('/conversations/'+conversationId)
  .then(res => res.data)
  .catch(errHandler);
},

postMessages(conversationId){
  return service
    .post(`/conversations/${conversationId}/messages`)
    .then(res => res.data)
    .catch(errHandler);
},

getUsers() {
  return service
    .get('/users')
    .then(res => res.data)
    .catch(errHandler);
},

getFriends() {
  return service
    .get('/users/friends')
    .then(res => res.data)
    .catch(errHandler);
},

getUserbyId(id) {
  return service
    .get('/users/'+id)
    .then(res => res.data)
    .catch(errHandler);
},

editUserbyId(id,updates){
  return service
  .patch('/users/'+id,updates)
  .then(res => res.data)
  .catch(errHandler);
},

  
  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler);
  },
  
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        const { data } = res;
        localStorage.setItem('user', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        return data;
      })
      .catch(errHandler);
  },

  logout() {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
  },

  loadUser() {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token && user.name) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      return user;
    }
    return false;
  },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },


  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file)
    return service
      .post('/users/first-user/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },
};
