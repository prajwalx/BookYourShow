'use strict';

(function(){

class BookingComponent {
  constructor() {
    this.message = 'Hello';
    $(document).ready(function () {
      $('.seat').click(function () {
        $(this).toggleClass('seatStyle');

      });

    });
  }
}

angular.module('yoManprojectfolderApp')
  .component('booking', {
    templateUrl: 'app/booking/booking.html',
    controller: BookingComponent,
    controllerAs: 'bookingCtrl'
  });

})();
