this.Events = new Mongo.Collection("events");
Posters = new FS.Collection("posters", {
  stores: [new FS.Store.FileSystem("posters", {path: 'public/event_posters/'})]
}); //Store Path needs to be changed

// Event Schema
Events.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Name of the Event",
    max: 200
  },
  description: {
    type: String,
    label: "Description of the Event",
    max: 200
  },
  venue: {
    type: String,
    label: "Venue for the event",
    max: 200
  },
  startTime: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "datetimepicker"
      }
    },
    label: "Start Date and Time"
  },
  endTime: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "datetimepicker"
      }
    },
    label: "End Date and Time"
  },
  targetAudience: {
    type: String,
    label: "Target Audience",
    max: 200,
    optional: true
  },
  addedOn: {
    type: String,
    optional:true
  },
  author: {
    type: String,
    optional:true
  },
  poster: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Posters',
        accept: 'image/*',
        label: 'Choose file',
        previewTemplate: 'myFilePreview'
      }
    }
  },
  contactPerson:{
    type: String,
    max: 50,
    label: "Whom to Contact?"
  },
  contactNumber:{
    type: String,
    max: 12,
    label: "Contact Number"
  }
}));
