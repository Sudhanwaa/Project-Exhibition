const socket=io('http://localhost:8000');

//Get  DOM  elements in respective Js variables
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")

//Audio that will play on recieving messages
var Audio=new Audio('Uhh.mp3');

// Function which will append event info to the container
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        
    Audio.play();
    }

}
//If the form gets submitted, send the server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})

//Ask new user his name and let the server know
const name=prompt("Enter your name to join");

socket.emit('new-user-joined',name);

// If a new user joins , recieve the event from the server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})

//If server sends the message , recieve it 
socket.on('receive',data=>{
    append(`${data.name}:${data.message} joined the chat`,'left')
})
//If a user leace the chat , append the info to the user
socket.on('left',name=>{
    append(`${name} left the chat`,'right')
})