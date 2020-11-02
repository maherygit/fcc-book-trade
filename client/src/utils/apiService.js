import axios from 'axios';
const GLITCH_URL = 'https://married-pasta.glitch.me'
const LOCALURL='http://localhost:8080'

export default axios.create({
  baseURL: LOCALURL,
});