'use strict';

(function(){
  /**
   * Using Rails-like standard naming convention for endpoints.
   * GET     /api/theatresendpoints              ->  index
   * POST    /api/theatresendpoints              ->  create
   * GET     /api/theatresendpoints/:id          ->  show
   * PUT     /api/theatresendpoints/:id          ->  update
   * DELETE  /api/theatresendpoints/:id          ->  destroy
   */

class TheatreComponent {
  constructor($http,$scope,socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;

    this.TheatreData = [];
    this.add=true;
    this.save=false;
    this.TheatreDetails='';
    $scope.$on('$destroy',function () {
      socket.unsyncUpdates('theatresendpoint');

    });
  }
  $onInit(){
    this.$http.get('/api/theatresendpoints').then(response=>{
      this.TheatreData = response.data;
      console.log(response.data);
      this.socket.syncUpdates('theatresendpoint',this.TheatreData)
    });
  }
  RegisterUser(){
    this.$http.post('/api/theatresendpoints',{
      TheatreName:this.TheatreDetails.TheatreName,
      State: this.TheatreDetails.State,
      City:this.TheatreDetails.City,
      Locations:this.TheatreDetails.Locations

    });
    this.TheatreData.push(this.TheatreDetails);
    console.log(this.TheatreDetails);
    // this.TheatreData.push(this.TheatreDetails);

    // this.TheatreDetails.TheatreName='';
    // this.TheatreDetails.State='';
    // this.TheatreDetails.City='';
    // this.TheatreDetails.Location='';

    alert("Theatre Added Successfully");
  }
}

angular.module('yoManprojectfolderApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
    controllerAs: 'theatreCtrl'
  });

})();
