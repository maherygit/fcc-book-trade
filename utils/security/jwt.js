const jwt = require('jsonwebtoken');
const ISSUER = 'https://married-pasta.glitch.me';

function getToken(payload){
  payload.issuer = ISSUER; 
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: '2 hours',
  });  
  return token;
}

function getTokenFromHeader(req){
  const token = req.header('Authorization').replace('Bearer ', '');
  return token;
}

function verifyToken(token){
  try {
    const result = jwt.verify(token, process.env.SECRET);
    if(result.issuer != ISSUER) {
      throw new Error("Token issuer is incorrect");
    }
    return result;
  } catch(err){
    return {
      error : err,
      message: "failed to verify token", 
    }
  }
}

module.exports =  { getToken, getTokenFromHeader, verifyToken  } ;