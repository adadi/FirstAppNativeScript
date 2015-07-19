var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");
var layout = require("ui/layouts/grid-layout");
var listViewModule = require("ui/list-view");
var contacts = new observableArray.ObservableArray([]);
var evenements = new observableArray.ObservableArray([]);
var posts = new observableArray.ObservableArray([]);

var pageData = new observableModule.Observable();
var page;
var list;
var http = require("http");

exports.onPageLoaded = function(args) {
  page = args.object;

  page.cssFile = "main.css";
  pageData.set("contacts", contacts);
  pageData.set("evenements", evenements);
  pageData.set("posts", posts);
  var listEvenement = viewModule.getViewById(page, "listEvenement");

  listEvenement.on(listViewModule.ListView.itemLoadingEvent, function (args) {
    var tappedItemIndex = args.index;
    if(tappedItemIndex==0){
      evenements.unshift({ name: "evenement "+evenements.length,image:"~/profile.png"});
    }
    if(tappedItemIndex==(evenements.length-1)){
      evenements.push({ name: "evenement "+evenements.length,image:"~/profile.png"});
    }

  });
  var listPost = viewModule.getViewById(page, "listPost");

  listPost.on(listViewModule.ListView.itemLoadingEvent, function (args) {
    var tappedItemIndex = args.index;
    console.log(tappedItemIndex);
    if(tappedItemIndex==0){
      posts.unshift({ name: "post "+posts.length,image:"~/profile.png"});
    }
    if(tappedItemIndex==(posts.length-1)){
      posts.push({ name: "post "+posts.length,image:"~/profile.png"});
    }

  });
  page.bindingContext = pageData;

  console.log("name *****************************************");
  http.getJSON("http://api.randomuser.me/?results=10").then(function (r) {
    // Argument (r) is JSON!
    console.log(r.results.length);
    for(var i=0;i<r.results.length;i++){
      console.log(r.results[i].user.name.first);
      console.log(r.results[i].user.picture.thumbnail);
      contacts.push(r.results[i].user);
    }
  }, function (e) {
    // Argument (e) is Error!
    console.log("error *****************************************");
    console.log(e);
  });

  for(var i=0;i<20;i++)
  evenements.push({ name: "evenement :"+i });
  for(var i=0;i<20;i++)
  posts.push({ name: "post :"+i });


};
