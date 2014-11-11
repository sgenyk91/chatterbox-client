var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
};
var app = {
  init: function(){
    $(document).ready(function(){
      $('#sendButton').on('click', app.send);
      $('.requestMsg').on('click', app.fetch);

      $('.refreshButton').on('click', function() {
        $('#chats').html('');
        app.fetch();
      });

      setInterval(function() {
        $('#chats').html('');
        app.fetch();
      }, 30000);
    });
  },
  server: 'https://api.parse.com/1/classes/chatterbox',
  fetch : function() {
    $.ajax({
      // always use this url
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
  /*      var arr = data.results;
        console.log('data', data);
        for(var i = 11; i < arr.length; i++){
         // console.log('test');
          var chat = "";
          chat += "username: " + arr[i].username + " text: " + arr[i].text
              + " roomname: "+ arr[i].roomname;
          $('#chats').append('<div>'+i+'====>'+chat+'</div>');
        }*/
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      },
      complete:function(){
        console.log('complete');
      }
    });
  },
  send : function(message){
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',

      success : function (data) {
        $('#chats').html(JSON.stringify(data));
        console.log('success!!!');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      },
      complete:function(){
        console.log('complete');
      }
    });
  },
  clearMessages : function() {
    $('#chats').html('');
  },
  addMessage : function(message) {
    var chat = "";
    chat += "username: " + message.username + " text: " + message.text
              + " roomname: "+ message.roomname;
    $('#chats').append('<div>'+chat+'</div>');
  }
};
app.init();

