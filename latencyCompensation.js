Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
  Session.setDefault("result", 'Watch how fast I change thanks to latency compensation');

  Template.hello.helpers({
    messages: function () {
      return Messages.find();
    }
  });

  Template.hello.events({
    'click .add-message-btn': function () {
      $textarea = $('textarea');
      var text = $textarea.val();
      $textarea.val('');

      Meteor.call('addMessage', text, function(err, res) {
        if (err) {
          alert(err.message);
          $textarea.val(text);
        } else {
          console.log('response from the server');
        }
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  'addMessage': function(text) {
    console.log('message: ', text);
    //simulate longer response from server
    if (Meteor.isServer) {
      Meteor._sleepForMs(2000);
      throw new Meteor.Error('Something wrong happened on the server');
    }

    Messages.insert({
      text: text
    });
  }
});