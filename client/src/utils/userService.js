import apiCall from './apiService';


const getUsers = async () => {
  let users = null;
  try{
    users = await apiCall.get("/users");
    console.log("apiCall - users list get");
    return users.data.users;
  } catch(err){
      console.log("error while getting the users",err);
      return { 
        error: err.Error
      }
  };
};


const getUserById = async (userid) => {
  let user = null;
  try {
    user =  await apiCall.get(`/users/${userid}`).data;
    return { user };
  } catch (err){
    console.log(`error while getting the user ${userid}`, err);    return { 
      error : err
    };
  }
};


const registerUser = async ( email, password ) => {
  let user = null;
  try {
    user =  await apiCall.post('/users/register', { email, password });
    console.log("registerUser back ", JSON.stringify(user));
    return { user };
  } catch (err){
    console.log("error while registering the user", err.response.data.error);
    return { 
      error : err.response.data.error
    };
  }
};

const logUser = async ( email, password ) => {
  let user = null;
  try {
    user =  await apiCall.post('/users/login', { email, password });
    return { user };
  } catch (err){
    console.log("error while logging the user", err.response.data.error);
    return { 
      error : err.response.data.error
    };
  }
};


const clearUsers = async () => {
  let res = null;
  try {
    res =  await apiCall.delete("/users");
    return { status : "OK", details : res };
  } catch (err){
    console.log("error while clearing the users", err.response.data.error);
    return { 
      error : err.response.data.error
    };
  }
}

export default { getUsers, getUserById, registerUser, logUser, clearUsers };