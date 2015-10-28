!function(){"use strict";angular.module("mean",["ui.router","ui.bootstrap","angular-jwt","angular-storage","mean.users","mean.articles"])}(),function(){"use strict";angular.module("mean.articles",["ui.router","ui.bootstrap","toastr"])}(),function(){"use strict";angular.module("mean.users",["ui.router","ui.bootstrap","angular-jwt","angular-storage","ngMessages"])}(),function(){"use strict";function e(e){e.state("main.articles",{url:"/articles",templateUrl:"app/articles/views/articles.view.html",controller:"ArticlesController",controllerAs:"ArticlesCTRL"}).state("main.create-article",{url:"/article/create",templateUrl:"app/articles/views/create-article.view.html",controller:"CreateArticleController",controllerAs:"CACTRL",data:{requiresLogin:!0}}).state("main.edit-article",{url:"/article/:id/edit",templateUrl:"app/articles/views/edit-article.view.html",controller:"EditArticleController",controllerAs:"EACTRL",data:{requiresLogin:!0}}).state("main.article",{url:"/article/:id",templateUrl:"app/articles/views/article.view.html",controller:"ArticleController",controllerAs:"ArticleCTRL"})}angular.module("mean.articles").config(e),e.$inject=["$stateProvider"]}(),function(){"use strict";function e(e,t,r){r.html5Mode(!0).hashPrefix("!"),e.tokenGetter=["store",function(e){return e.get("jwt")}],t.interceptors.push("jwtInterceptor")}angular.module("mean").config(e),e.$inject=["jwtInterceptorProvider","$httpProvider","$locationProvider"]}(),function(){"use strict";function e(e,t){e.otherwise(function(e,t){e.get("$state").transitionTo("main.not-found",null,{location:!1})}),t.state("main",{"abstract":!0,url:"",templateUrl:"app/core/views/main.view.html"}).state("main.index",{url:"/",templateUrl:"app/core/views/index.view.html",controller:"MainController",controllerAs:"MainCTRL"}).state("main.not-found",{url:"/404",templateUrl:"app/core/views/404.view.html"}).state("main.not-authorize",{url:"/403",templateUrl:"app/core/views/403.view.html"})}angular.module("mean").config(e),e.$inject=["$urlRouterProvider","$stateProvider"]}(),function(){"use strict";function e(e,t,r,n){e.$on("$stateChangeStart",function(e,i){i.data&&i.data.requiresLogin&&(!r.get("jwt")||n.isTokenExpired(r.get("jwt")))&&(e.preventDefault(),t.go("main.not-authorize"))})}angular.module("mean").run(e),e.$inject=["$rootScope","$state","store","jwtHelper"]}(),function(){"use strict";function e(e,t){t.state("main.signin",{url:"/signin",templateUrl:"app/users/views/signin.view.html",controller:"SigninController",controllerAs:"SigninCTRL",data:{bypassUser:!0}}).state("main.register",{url:"/register",templateUrl:"app/users/views/register.view.html",controller:"RegisterController",controllerAs:"RegisterCTRL",data:{bypassUser:!0}})}angular.module("mean.users").config(e),e.$inject=["$urlRouterProvider","$stateProvider"]}(),function(){"use strict";function e(e,t,r,n,i){e.$on("$stateChangeStart",function(e,r){r.data&&r.data.bypassUser&&i.isSignin()&&(e.preventDefault(),t.go("main.articles"))})}angular.module("mean.users").run(e),e.$inject=["$rootScope","$state","store","jwtHelper","AuthFactory"]}(),function(){"use strict";function e(e,t,r,n){function i(n){return t.go("main.articles"),e.post("/api/articles",{article:n}).success(function(e){r.success("Create article success"),t.go("main.article",{id:e._id})}).error(function(){r.error("Something wrong, please try again")})}function a(r){return e.get("/api/article/"+r).success(function(e){u.articles=e}).error(function(){t.go("main.not-found")})}function o(n){return e.put("/api/article/"+n._id).success(function(e){u.articles=e,r.success("Update article success"),t.go("main.article",{id:e._id})}).error(function(){r.error("Something wrong, please try again")})}function s(t){return e["delete"]("/api/article/"+t).success(function(){r.success("Delete article success")}).error(function(){r.error("Something wrong, please try again")})}function c(){return e.get("/api/articles").success(function(e){u.articles=e})}function l(e){return n.currentUser.username===e?!0:!1}var u={};return u.articles=[],u.create=i,u.read=a,u.update=o,u["delete"]=s,u.findAll=c,u.hasAuthorize=l,u}angular.module("mean.articles").factory("ArticlesFactory",e),e.$inject=["$http","$state","toastr","AuthFactory"]}(),function(){"use strict";function e(e,t,r,n){function i(e){return r.post("/api/auth/signin",e).success(u).error(function(e){d.error=e.message})}function a(){e.remove("jwt"),d.currentUser=null,n.go("main.index")}function o(e){return r.post("/api/auth/register",e).success(u).error(function(e){d.error=e.message})}function s(e){return r.post("/api/auth/verify",{username:e}).success(function(e){d.verify=!0}).error(function(e){d.verify=!1})}function c(){return d.currentUser}function l(){return null!==d.getCurrentUser()?!0:!1}function u(r){d.error=null,e.set("jwt",r.token),d.currentUser=t.decodeToken(e.get("jwt")),n.go("main.articles")}var d={};return d.currentUser=e.get("jwt")?t.decodeToken(e.get("jwt")):null,d.verify=!1,d.error=null,d.signin=i,d.signout=a,d.register=o,d.verifyUsername=s,d.getCurrentUser=c,d.isSignin=l,d}angular.module("mean.users").factory("AuthFactory",e),e.$inject=["store","jwtHelper","$http","$state"]}(),function(){"use strict";function e(){}angular.module("mean").controller("MainController",e)}(),function(){"use strict";function e(e,t){var r=this;r.articleID=t.id,r.article={},e.read(r.articleID).then(function(){r.article=e.articles})}angular.module("mean.articles").controller("ArticleController",e),e.$inject=["ArticlesFactory","$stateParams"]}(),function(){"use strict";function e(e,t){function r(r){if(t.hasAuthorize(r.author.username)){var i=e.open({templateUrl:"app/articles/views/delete-article.view.html",controller:"DeleteArticleController",controllerAs:"DACTRL",resolve:{article:function(){return r}}});i&&i.result.then(function(){n.articles.splice(n.articles.indexOf(r),1)})}}var n=this;n.articles=[],n.confirmDelete=r,t.findAll().then(function(){n.articles=t.articles})}angular.module("mean.articles").controller("ArticlesController",e),e.$inject=["$uibModal","ArticlesFactory"]}(),function(){"use strict";function e(e,t){function r(t){console.log(t),t&&(n.article.createdAt=new Date,e.create(n.article))}var n=this;n.article={title:"",content:"",author:{username:t.getCurrentUser().username}},n.submit=r}angular.module("mean.articles").controller("CreateArticleController",e),e.$inject=["ArticlesFactory","AuthFactory"]}(),function(){"use strict";function e(e,t,r){function n(){r["delete"](t._id),e.close()}function i(){e.dismiss("cancel")}var a=this;a.article=t,a.confirm=n,a.cancel=i}angular.module("mean.articles").controller("DeleteArticleController",e),e.$inject=["$modalInstance","article","ArticlesFactory"]}(),function(){"use strict";function e(e,t,r){function n(e){e&&t.update(i.article)}var i=this;i.articleID=e.id,i.article={},i.submit=n,t.read(i.articleID).then(function(){var e=t.articles.author.username;t.hasAuthorize(e)?i.article=t.articles:r.go("main.not-authorize")})}angular.module("mean.articles").controller("EditArticleController",e),e.$inject=["$stateParams","ArticlesFactory","$state"]}(),function(){"use strict";function e(e){function t(){n.isShowPwd=!n.isShowPwd,n.pwdType=n.isShowPwd?"text":"password"}function r(t){t&&e.register(n.credentials).error(function(){n.error=e.error})}var n=this;n.credentials={},n.credentials.username="",n.credentials.password="",n.error=null,n.verify=e.verify,n.isShowPwd=!1,n.pwdType="password",n.showPwd=t,n.register=r}angular.module("mean.users").controller("RegisterController",e),e.$inject=["AuthFactory"]}(),function(){"use strict";function e(e){function t(){n.isShowPwd=!n.isShowPwd,n.pwdType=n.isShowPwd?"text":"password"}function r(t){t&&e.signin(n.credentials).error(function(){n.error=e.error})}var n=this;n.credentials={},n.credentials.username="",n.credentials.password="",n.error=null,n.isShowPwd=!1,n.pwdType="password",n.showPwd=t,n.signin=r}angular.module("mean.users").controller("SigninController",e),e.$inject=["AuthFactory"]}(),function(){"use strict";function e(e,t){function r(r,n,i,a){function o(r,n){var i=r||n;return e.verifyUsername(i).then(function(){return!0},function(){return t.reject("exists")})}a.$asyncValidators.unique=o}var n={link:r,require:"ngModel",restrict:"A"};return n}angular.module("mean.users").directive("verifyUnique",e),e.$inject=["AuthFactory","$q"]}(),function(){"use strict";function e(){function e(e,t,r,n){function i(){return s.$viewValue}function a(){return s.$error.unique}function o(){return n.$submitted}var s=n[r.validateOn];t.append('<span class="help-block"></span>'),e.$watchGroup([i,a,o],function(){if(angular.equals({},s.$error)||!s.$dirty&&!n.$submitted)t.removeClass("has-error"),t.find("span").text(""),s.$dirty&&r.validateOnSuccess&&t.addClass("has-success");else{var e;t.addClass("has-error");for(var i in s.$error)i&&(e=i);console.log(s.$valid),t.find("span").text(r[e+"Msg"])}})}var t={link:e,restrict:"A",require:"^form"};return t}angular.module("mean.users").directive("validateOn",e)}(),function(){"use strict";function e(){var e={bindToController:!0,controller:"NavbarController",controllerAs:"NavbarCTRL",restrict:"E",templateUrl:"app/core/directives/navbar.view.html"};return e}function t(e){function t(){e.signout()}function r(e){e.preventDefault(),e.stopPropagation(),n.status.isopen=!n.status.isopen}var n=this;n.user=e.getCurrentUser,n.status={isopen:!1},n.signout=t,n.toggleDropdown=r}angular.module("mean").controller("NavbarController",t).directive("navbar",e),t.$inject=["AuthFactory"]}();