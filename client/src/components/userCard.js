import React from 'react';
import './userCard.css';

import Avatar from './UI/CAvatar';

const NOT_AVAILABLE = "N/A"

const User = ({
  email,
  password,
  name = "John Doe",
  image = require('../assets/no-image-person.jpg'),
  surname = NOT_AVAILABLE,
  city = NOT_AVAILABLE,
  state = NOT_AVAILABLE,
  requests = 0,
  trades = 0,
}) => {
  return (
    <div className='user__container'>
      <div className='user__header'>
        <div className="favoris">{"favorite"}</div>
        <Avatar className='user__avatar' image={image.default}/>
        <h3 className="user_login--name">{name}</h3>
      </div>
      <section className='user__login-information'>
        <span className='user_login--email'>
          Email: <span>{email}</span>
        </span>
        <span className='user_login--password'>
          Password: <span>{password}</span>
        </span>
      </section>
      <section className='user__trade-information'>
        <span className='user__trade-badge'>
          trades: <span>{trades}</span>
        </span>
        <span className='user__trade-badge'>
          requests: <span>{requests}</span>
        </span>
      </section>
      <div className="user__background"/>
    </div>
  );
};

export default User;

/*
const UserSchema = Mongoose.Schema({
  email: String,
  password: String,
  name: String,
  surname: String,
  city: String,
  state: String,
  requests: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'booktrade_BookRequest'
  }],
  trades: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'booktrade_BookTrade'
  }]
});
*/
