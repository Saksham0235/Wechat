// // node server which handles all the socket io connection

// // (7000) - it is the port number on which we want to listen
// const io=require("socket.io")(9000)
const io = require("socket.io")(9000, {
  cors: {
    origin: "*",
  },
});
const users = {};

// socket.id is the unique id of every indivdiual/soscket connection

// io.on is for listening  incoming socket events like numbr of people messaging each other
// socket.on handling the particfular events


// as io makes connection
io.on("connection", (socket) => {
  // socket.on listening events as users joined it set the name in the users
  socket.on("new-user-joined", (name) => {
    // console.log("New user joined in as ", name);
    users[socket.id] = name;
    // if someone sends message broadcasting it to the other users that has joined
    socket.broadcast.emit('user-joined', name);
  });
  // If a user sends message then it will be received by others
  socket.on("send", message => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id] });
  });

 // If a user leaves then it will be received by others
  socket.on("disconnect", message => {
    socket.broadcast.emit("Left", users[socket.id] );
    // after they left delete that user 
    delete users[socket.id];
  });






});






