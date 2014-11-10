// YOUR CODE HERE:
$(document).ready(function(){
  $('#sendButton').on('click', sendMessage);
  $('.requestMsg').on('click', retrieveMessages);
  $('.refreshButton').on('click', function() {
    $('.displayMessage').html('');
    retrieveMessages();
  });
  setInterval(function() {
    $('.displayMessage').html('');
    retrieveMessages();
  }, 30000);
});

var retrieveMessages = function() {
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
   // data: JSON.stringify(message),
    contentType: 'application/json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf');
    },
    success: function (data) {
      $('.displayMessage').html(JSON.stringify(data));
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    },
    complete:function(){
      console.log('complete');
    }
  });
};

var sendMessage = function(){
 $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox.jsonp',
    type: 'PUT',
    data: {
      "username":"Stephan",
      "text":"hello stephan",
      "roomname":"silvia"
      //JSON.stringify(message)
    },
    dataType: 'jsonp',
    contentType: 'application/json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf');
    },
    success: function (data) {
      $('.displayMessage').html(JSON.stringify(data));
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    },
    complete:function(){
      console.log('complete');
    }
  });
};
