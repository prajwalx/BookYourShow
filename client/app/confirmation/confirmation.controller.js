'use strict';

(function(){

class ConfirmationComponent {
  constructor($scope,$http,$rootScope) {
    this.message = 'Hello';
    this.$scope=$scope;
    this.$http=$http;
    this.$rootScope=$rootScope;

    this.$rootScope.IndexBar=false;
    this.Movie=JSON.parse(sessionStorage.getItem("Movie"));
    console.log(this.Movie);
    this.Ticket=JSON.parse(sessionStorage.getItem("Ticket"));
    console.log(this.Ticket);
    this.d=moment(this.Ticket.Date,'DD/MM/YYYY',true).format('ddd D MMM YY');

    // this.t=moment(this.Ticket.Time, "HH:mm:ss").format("hh:mm a");
    this.t=this.Ticket.Time;
    this.Summary=JSON.parse(sessionStorage.getItem("Summary"));
    console.log(this.Summary);
    this.cur=moment().format("ddd-D-M-YY ");
    console.log(this.cur);
    this.ti=moment().format("hh:mm a");
    console.log(this.ti);
  }
}

angular.module('yoManprojectfolderApp')
  .component('confirmation', {
    templateUrl: 'app/confirmation/confirmation.html',
    controller: ConfirmationComponent,
    controllerAs: 'confirmationCtrl'
  });

})();
