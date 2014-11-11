var app = {
  init: function(){
    $(document).ready(function(){
      $('#sendButton').on('click', function() {
        var message = app.getMessage();
        app.send(message);
      });
      $('.requestMsg').on('click', app.fetch);
      $('.refreshButton').on('click', function() {
        $('#chats').html('');
        app.fetch();
      });
      $('.username').on('click', app.addFriend);

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
      data: 'order=-createdAt',
      success: function (data) {
        var arr = data.results;
        console.log('data', data);
        for(var i = 0; i < arr.length; i++){
          app.addMessage(arr[i]);
        }
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
      data: message,
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
        console.log('send complete');
      }
    });
  },
  clearMessages : function() {
    $('#chats').html('');
  },
  addMessage : function(message) {
    var chat = "";
    chat += "<span class='username'>" + message.username + "</span> Text: " + message.text
              + " Roomname: "+ message.roomname;
    $('#chats').append('<div>'+chat+'</div>');

  },
  addRoom : function(roomname){
    $('#roomSelect').append('<div id='+roomname+'></div>');
  },
  addFriend : function(username) {
    var arr = [];
    arr.push(username);
  },
  getMessage : function() {
    var message = document.getElementById('inputMessage').value;
    var obj = {'username': 'Silvia',
              'text' : message,
              'roomname' : 'WHotel'
              };
    return JSON.stringify(obj);
  }
};
app.init();
