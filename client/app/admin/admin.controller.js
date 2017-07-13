'use strict';

(function() {

  class AdminController {


    constructor(User) {
      // Use the User $resource to fetch all users
      this.users = User.query();
      this.lod='N';
      
      //this.var='e';




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
