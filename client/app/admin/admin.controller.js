'use strict';

(function() {

  class AdminController {


    constructor(User,$scope,$rootScope,$http) {
      // Use the User $resource to fetch all users
      this.users = User.query();
      this.lod='N';
      this.$scope=$scope;
      this.$http=$http;
      this.$rootScope=$rootScope;
      this.$rootScope.IndexBar=true;
      this.$http.get('/api/ratingendpoints').then(response=>{
        this.RatingData=response.data;
        console.log(response.data);
      });
      this.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
 this.series = ['Series A', 'Series B'];

 this.data = [
   [65, 59, 80, 81, 56, 55, 40],
   [28, 48, 40, 19, 86, 27, 90]
 ];
      //this.var='e';




    }
    $onInit(){

    }


    delete(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }
    Load(y){
      this.lod=y;

      console.log("This.Lod : below");
      console.log(this.lod);

    }

    isLoaded(x){
      console.log("Is Loaded below:x");
      console.log(x);
      if(this.lod===x){
        console.log("True");

        return true;

      }
      console.log("False");
      return false;

    }





  }

  angular.module('yoManprojectfolderApp.admin')
    .controller('AdminController', AdminController);



})();
