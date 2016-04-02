Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function(){
  $('head').append( '<title>NITH Events Portal</title>' );
  this.render("navbar", {to:"header"});
  this.render("eventList", {to:"main"});
});

Router.route('/pastEvents', function(){
  $('head').append( '<title>NITH Events Portal</title>' );
  this.render("navbar", {to:"header"});
  this.render("pastEventList", {to:"main"});
});
Router.route('/event/:_id', function(){
  Session.set("eventId", this.params._id);
  this.render("navbar", {to:"header"});
  this.render("eventPage", {to:"main"});
});

Router.route('/addEvent', function(){
  this.render("navbar", {to:"header"});
  if(Meteor.userId()){
    this.render("addEventForm", {to:"main"});
  } else {
    this.render("loginForm", {to:"main"});
  }
});

Router.route('/editEvent/:_id', function(){
  Session.set("eventId", this.params._id);
  this.render("navbar", {to:"header"});
  eventData = Events.findOne({_id:this.params._id});
  if(eventData.author == Meteor.userId()){
    this.render("editEventForm", {to:"main"});
  }
});


// EventPage Template helpers

Template.eventPage.helpers({
  eventData: function(){
    Event = Events.findOne({_id:Session.get("eventId")});
    Event.begin = new Date(Event.startTime);
    return Event;
  }
});


// Eventlist template helpers

Template.eventList.helpers({
  events: function(){
    date = Session.get("current_date");
    date = Date.parse(date);
    date = date.toString();
    eventList = Events.find({});

    return eventList;
  }
});


// afQuickField helpers and events

Template.afQuickField.events({
  'change .fileInput': function(event, template) {
  FS.Utility.eachFile(event, function(file){
      var fileObj = new FS.File(file);
      Posters.insert(fileObj, function(err, fileObj){
          if(!err){
            console.log(fileObj);
          }
        });
      });
    }
});
