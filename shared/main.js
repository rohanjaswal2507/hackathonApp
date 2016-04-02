Meteor.methods({
  addEvent: function(newEvent){
    user = Meteor.users.findOne({_id:Meteor.userId()});
    if (user.emails){
      if (Meteor.userId()){
        newEvent.startTime = Date.parse(newEvent.startTime);
        newEvent.endTime = Date.parse(newEvent.endTime);
        newEvent.author = Meteor.userId();
        Events.insert(newEvent);
      }
    } else {
        alert("You are not authorized to post an Event");
    }
  }
});
