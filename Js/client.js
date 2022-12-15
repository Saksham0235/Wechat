
// // for connection with index.html
const socket=io('http://localhost:9000');

// getting DOM elements in js
const form=document.getElementById('send-container');
const messageinput=document.getElementById('messageImp');
const messaggecontainer=document.querySelector('.container');
// audio for receiving messages
var audio=new Audio('Notification.mp3');

// function for appending things to the container
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    // classlist.add - for adding classname 
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messaggecontainer.append(messageElement);
    // If this append function runs then play this audio an only if they sent a message
    if(position=='left'){
        audio.play();
    }
   

}

// Messgae writting and sending 
form.addEventListener('submit',(error)=>{
    error.preventDefault();
    const message = messageinput.value;
    append(`You: ${message}`,'right');
    // message sent we triggered the socekt.emit
    socket.emit('send',message);
    messageinput.value='';
})

// for every functioning happening functions defined in index.js are listened from here


// asking new users name before joining
const name =prompt("Enter Your name to join");
socket.emit('new-user-joined',name);

// Whenever new user jooined this function performs
socket.on('user-joined',name=>{
    // if any user joined 
    append(`${name} joined the chat`,'right');
})


// Whenever  new messgae sent i should be redceived by others this function makes sure
socket.on('receive',data=>{
    // if any user joined and sent message
    append(`${data.name}:${data.message}`,'left');
})

// if any user Left 
socket.on('Left',name=>{
    append(`${name} left the Chat`,'left');
})

