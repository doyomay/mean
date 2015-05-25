angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$scope","UserSvc",function(o,n){o.$on("login",function(n,t){o.currentUser=t}),o.logout=function(){n.logout().then(function(n){console.log(n),o.currentUser=null,sessionStorage.clear()})}}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(o,n){o.login=function(t,e){n.login(t,e).then(function(n){o.$emit("login",n.data),sessionStorage.setItem("username",n.data)})}}]),angular.module("app").controller("PostsCtrl",["$scope","PostsSvc",function(o,n){o.addPost=function(){o.postBody&&n.create({username:"doyomay",body:o.postBody}).success(function(n){o.postBody=null})},n.fetch().success(function(n){o.posts=n}),o.$on("ws:new_post",function(n,t){o.$apply(function(){o.posts.unshift(t)})})}]),angular.module("app").service("PostsSvc",["$http",function(o){this.fetch=function(){return o.get("/api/posts")},this.create=function(n){return o.post("/api/posts",n)}}]),angular.module("app").controller("RegisterCtrl",["$scope","UserSvc",function(o,n){o.createUser=function(o,t){n.createUser(o,t).then(function(o){console.log(o)})}}]),angular.module("app").config(["$routeProvider","$locationProvider",function(o,n){n.html5Mode({enabled:!0,requireBase:!1}),o.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"})}]),angular.module("app").service("UserSvc",["$http",function(o){var n=this;n.getUser=function(){return o.get("/api/users")},n.login=function(t,e){return o.post("/api/sessions",{username:t,password:e}).then(function(t){return n.token=t.data,o.defaults.headers.common["X-Auth"]=t.data,n.getUser()})},n.createUser=function(n,t){return o.post("/api/users",{username:n,password:t}).then(function(o){console.log(o)})},n.logout=function(){return o.get("api/users/logout").then(function(o){console.log(o)})}}]),angular.module("app").run(["$rootScope","$timeout",function(o,n){!function t(){var e="ws://localhost:3000",s=new WebSocket(e);s.onopen=function(){console.log("conectado a websocket")},s.onmessage=function(n){console.log(n);var t=JSON.parse(n.data);o.$broadcast("ws:"+t.topic,t.data)},s.onclose=function(o){console.log("WebScoket closed. Reconnection ..."),n(t,1e4)}}()}]),angular.module("app").service("WebSocketSvc",["$rootScope",function(o){function n(){return"https"===window.location.protocol?"wss://"+window.location.host:"ws://"+window.location.host}var t;this.connect=function(){t=new WebSocket(n()),t.onmessage=function(n){var t=JSON.parse(n.data);o.$broadcast("ws:"+t.topic,t.data)}},this.send=function(o,n){var e=JSON.stringify({topic:o,data:n});t.send(e)}}]).run(["WebSocketSvc",function(o){o.connect()}]);