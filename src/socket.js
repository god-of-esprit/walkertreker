import io from "socket.io-client";
import { ENDPOINT } from 'react-native-dotenv';

// configuring socket.io
// local
// to connect to local server, 1) start the server 2) get local ip address 3) update const endpoint to point at that ip address at port 5000

// LOCAL eyecue endpoint KIM:
// const endpoint = 'http://localhost:5000/'

// LOCAL eyecue endpoint WARD
// const endpoint = 'http://192.168.0.104:5000/';

// kim's home ip:
// const endpoint = 'http://192.168.1.5:5000'

// Ward' home ip:
// const endpoint = 'http://10.0.0.5:5000';

// remote:
// const endpoint = "walkertrekker.herokuapp.com";

const endpoint = ENDPOINT

const socket = io(endpoint, {
  transports: ["websocket"]
});

module.exports = socket;
