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
  constructor($http,$scope,socket,$rootScope) {
    this.message = 'Hello';
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.$rootScope = $rootScope;

    this.TheatreData = [];
    this.add=true;
    this.save=false;
    this.TheatreDetails='';
    this.TheatreDetails = {TheatreNameModal:"",
  StateModal:"",
  CityModal:"",
  LocationsModal:""};
    $scope.$on('$destroy',function () {
      socket.unsyncUpdates('theatresendpoint');

    });
  }
  $onInit(){
    this.$http.get('/api/theatresendpoints').then(response=>{
      this.TheatreData = response.data;
      console.log(response.data);
      this.$rootScope.IndexBar=true;  //Showing IndexBar from IndexHTML
      this.socket.syncUpdates('theatresendpoint',this.TheatreData)
    });
  }
  RegisterUser(){
    this.$http.post('/api/theatresendpoints',{
      TheatreName:this.TheatreDetails.TheatreName,
      State: this.TheatreDetails.State,
      City:this.TheatreDetails.City,
      Locations:this.TheatreDetails.Locations

    }).then(response=>{
      this.TheatreData.push(response.data);
      console.log(response.data);
    });

    // this.TheatreData.push(this.TheatreDetails);
    // console.log(this.TheatreDetails);
    // this.TheatreData.push(this.TheatreDetails);

    // this.TheatreDetails.TheatreName='';
    // this.TheatreDetails.State='';
    // this.TheatreDetails.City='';
    // this.TheatreDetails.Location='';

    alert("Theatre Added Successfully");
  }

  GetUser(User){
    this.save=true;
    this.$http.get('/api/theatresendpoints/'+User._id).then(response=>{
      console.log(response.data);
      console.log(User._id);
      this.TheatreID=User._id;

      this.TheatreDetails.TheatreNameModal=response.data.TheatreName;
      this.TheatreDetails.StateModal=response.data.State;
      this.TheatreDetails.CityModal=response.data.City;
      this.TheatreDetails.LocationsModal=response.data.Locations;

    });
    this.index = this.TheatreData.findIndex(x => x._id==User._id);

    console.log(this.index);

  }

  SaveUser(){
    this.$http.put('/api/theatresendpoints/'+this.TheatreID,{
      TheatreName:this.TheatreDetails.TheatreNameModal,
      State: this.TheatreDetails.StateModal,
      City:this.TheatreDetails.CityModal,
      Locations:this.TheatreDetails.LocationsModal
    }).then(response=>{
    // this.TheatreData.push(response.data);
    this.TheatreData[this.index]=response.data;
    });
    // this.TheatreDetails.TheatreName=this.TheatreDetails.TheatreNameModal;
    // this.TheatreDetails.State=this.TheatreDetails.StateModal;
    // this.TheatreDetails.City=this.TheatreDetails.CityModal;
    // this.TheatreDetails.Locations=this.TheatreDetails.LocationsModal;
    // this.TheatreData.push(this.TheatreDetails);
    alert("Theatre Edited Successfully");
  }

  DeleteUser(x){
    var index=this.TheatreData.indexOf(x);

    var y = confirm('Are you sure you want to delete this record ?');
    if (y) {
      this.$http.delete('/api/theatresendpoints/' + x._id);
      if(index>-1){
        this.TheatreData.splice(index,1);
      }
    }
    console.log('Theatre removed');
  }

}//classEnds

angular.module('yoManprojectfolderApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
    controllerAs: 'theatreCtrl'
  });

})();
