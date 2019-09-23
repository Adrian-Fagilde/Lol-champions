var socket = io.connect('http://localhost:3000', {'forceNew': true});

socket.on('messages', function(data){
  console.log(data);
  render(data);
});


function render(data){
 var html = data.map(function(data,index){
   return(`<div>
     <strong>${data.author}</strong>:
     <em>${data.text}</em>
   </div>`);
 }).join(" ");

document.getElementById('messages').innerHTML = html;

}

function addMessage(e){
  var payload = {
    author:document.getElementById('username').value,
    text:document.getElementById('texto').value
  };
  socket.emit('new-message', payload);
  return false;
}
