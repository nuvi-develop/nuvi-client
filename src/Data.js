import config from './config';

export default class Data {
  /**
   * Getting data from REST API
   * @param  {string}  path                routing path
   * @param  {String}  [method='GET']      method
   * @param  {Object}  [body=null]         object that passed as req.body
   * @param  {Boolean} [requireAuth=false] is it require authentication?
   * @param  {Object}  [credentials=null]  encoded credentials for authentication
   * @return {Object}                      data from REST API
   */
  api(path, method='GET', body=null, requireAuth=false, credentials=null){
    const url = config.baseUrl + path
    const options = {
      method,
      headers :{
        'Content-Type': 'application/json; charset=utf-8',
      }
    };

    // if there is body, put in on options
    if(body!==null){
      options.body = JSON.stringify(body)
    }

    //if it require auth, put options headers an encoded credential
    if(requireAuth){
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url,options);
  }


  async getSupplyAndLeft(schoolName,grade,classNumber){
    const data = await this.api('/supplyandleft');
    if(data.status===200){
      return data.json();
    } else {
      return null
    }


  }

  async getSchool(text){
    const data = await this.api(`/schoolList/${text}`)
    return data.json()
  }

  /**
   * getting userdata from REST API
   * @param  {String}  username [username]
   * @param  {String}  pssword  [password]
   * @return {Promise}          user data frm REST API
   */
  async getUser(emailAddress,password){
    const response = await this.api('/users','GET',null,true,{emailAddress:emailAddress,password:password});
    if(response.status === 200){
      return response.json();
    } else if(response.status ===401 || response.status ===404) {
      return null;
    } else {
      throw new Error('error from getUser')
      };
  }

  /**
   * creating user to REST API
   * @param  {Object}  user data passed to it
   * @return {Promise}      empty array or errors
   */
  async createUser(user){
    const response = await this.api('/users', 'POST', user);
    if(response.status === 201){
      return []
      //errors from sequelize validation
    } else if (response.status ===400){
      return response.json().then(data =>{
        return data.error.errors
      })
      //errors from express-validator( actually using this)
    } else if( response.status === 422){
      return response.json().then(data => {
        return data.errors.map(error => {
          return {
            message:error.msg
          }
        })
      })
    } else {
      throw new Error('error from createUser')
    }
  }

  async getPosts(currentPage,contentPerPage){
    const response = await this.api(`/posts?pageNum=${currentPage}&contentPerPage=${contentPerPage}`);

    if(response.status ===200){
      return response.json();
    } else if(response.status ===404){
      return null;
    } else {

      throw new Error('Error from getPosts');
    }
  }

  async getOnePost(id){
    const response = await this.api(`/posts/${id}`);
    if(response.status === 200){
      return response.json();
    } else if (response.status === 404){
      return null;
    } else {
      throw new Error('Error from getOnePost');
    }
  }

  async createPost(post,auth){
    const credentials = {
      emailAddress:auth.emailAddress,
      password:auth.password
    }

    const response = await this.api('/posts','POST',post,true,credentials);
    if(response.status == 201){
      return [];
    } else if(response.status === 422){
      return response.json()
    } else {
      throw new Error('Error from createPost')
    }
  }

  async updatePost(id,post,auth){
    const credentials = {
      emailAddress:auth.emailAddress,
      password:auth.password
    }
    const response = await this.api(`/posts/${id}`,'PUT',post,true,credentials);

    if(response.status===204){
      return [];
    } else if(response.status === 422){
      return response.json()
    } else {
      throw new Error('Error from updatePost')
    }
  }

  async deletePost(id,auth){
    const credentials = {
      emailAddress:auth.emailAddress,
      password:auth.password
    }
    const response = await this.api(`/posts/${id}`,'DELETE',null,true,credentials);
    if(response.status===204){
      return [];
    } else {
      return response.json();
    }
  }

  /*
   * RPLIY
   */

  async getRepliesOfPost(id){
    const response = await this.api(`/replies/post/${id}`);
    if(response.status===200){
      return response.json();
    } else if(response.status ===404) {
      return [];
    } else {
      throw new Error('Error from getRepliesOfPost.');
    }
  };

  async createReply(reply){
    const response = await this.api('/replies',"POST",reply);
    if(response.status === 201){
      return response.json();
    } else {
      throw new Error('Error from createRply.');
    }
  };

  async updateReply(id,newReply){
    const response= await this.api(`/replies/${id}`,'PUT',newReply);
    if(response.status === 204) {
      return []
    } else {
      throw new Error('Error from updateReply.');
    }
  };

  async deleteReply(id){
    const response = await this.api(`/replies/${id}`,'DELETE');
    if(response.status === 204) {
      return [];
    } else {
      throw new Error('Error from deleteReply.');
    }
  }



}
