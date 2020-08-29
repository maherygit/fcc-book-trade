const User = ({ email, password, name, surname, city, state, requests, trades }) => {
  
  return (
    <div className="user__container">
      <h2>User profile</h2>
      <section className="user__login-information">
        <span className="user_login--email">Email: </span><span></span>
        <span className="user_login--password">Password: </span><span></span>
      </section>
    </div>
  );
  
}


export default User;


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
