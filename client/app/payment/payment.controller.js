'use strict';
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/SeatsBookedEndPoints              ->  index
 * POST    /api/SeatsBookedEndPoints              ->  create
 * GET     /api/SeatsBookedEndPoints/:id          ->  show
 * PUT     /api/SeatsBookedEndPoints/:id          ->  update
 * DELETE  /api/SeatsBookedEndPoints/:id          ->  destroy
 */


(function(){

class PaymentComponent {
  constructor($scope,$rootScope,$http) {
    this.message = 'Hello';
    this.$scope=$scope;
    this.$rootScope=$rootScope;
    this.$http=$http;
    this.$rootScope.IndexBar=false;

    this.Summary=JSON.parse(sessionStorage.getItem("Summary"));
    console.log(this.Summary);
    this.seatsBooked=JSON.parse(sessionStorage.getItem("seatsBooked"));
    console.log(this.seatsBooked);
    this.Ticket=JSON.parse(sessionStorage.getItem("Ticket"));

      //moment JS TO convert Date&Time
      this.d=moment(this.Ticket.Date,'DD/MM/YYYY',true).format('ddd D MMMM YYYY');

      // this.t=moment(this.Ticket.Time, "HH:mm:ss").format("hh:mm a");
      this.t=this.Ticket.Time;
      // this.Ticket.Time=t;
      // console.log(t);
      // this.Ticket.Date=d;



    // console.log(d);
    console.log(this.Ticket);
  }
  $onInit(){
    this.$http.get("https://api.ipify.org?format=json").then(response=>{
      console.log(response.data);
      this.ip=response.data.ip;
    });
  }

  PayNow(){
    // alert('PAyNOW SUCCESS');
    console.log("CONTROLLER");
    console.log(this.Ticket);
    this.$http.post('/api/SeatsBookedEndPoints',{
      Date: this.Ticket.Date,
      Email: this.Ticket.Email,
      MovieName: this.Ticket.MovieName,
      Phone: this.Ticket.Phone,
      SeatIDs: JSON.stringify(this.Ticket.SeatIDs),
      TheatreLocation: this.Ticket.TheatreLocation,
      TheatreName: this.Ticket.TheatreName,
      Time: this.Ticket.Time

    }).then(response=>{
      console.log('response From DB:');
      console.log(response.data);
      location.href='/confirmation';
    });
  }
}//Class

angular.module('yoManprojectfolderApp')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    controllerAs: 'paymentCtrl'
  });

})();
