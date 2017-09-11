'use strict';

(function(){

class BookingComponent {
  constructor($scope,$rootScope,$http) {
    this.message = 'Hello';
    this.$scope=$scope;
    this.$rootScope=$rootScope;
    this.$http=$http;
    this.$rootScope.IndexBar=false;
    this.NoOfSeat='1';
     this.seatClass="";
     this.count='0';
     this.seatsBooked=[];//Array for storing seatsBooked in sessionStorage
     this.seatsBookedfromDB=[];//Array for Blocking Seats Already BOOKED

     console.log(JSON.parse(sessionStorage.getItem("Ticket")));
     this.Ticket=JSON.parse(sessionStorage.getItem("Ticket"));

     $(document).ready(function () {


       $('#myModal2').modal('show');
     })

     this.Summary = {
       price:"0",
       Tclass:"GOLD",
       InternetHandling:"0",
       SubT:"0"
     };
    // var n=(this.NoOfSeat);


    // $(document).ready(function () {
    //
    //   $('.seat').click(function () {
    //     // console.log(this.NoOfSeat);
    //     console.log(angular.element('.Selector').scope.test());
    //     $(this).toggleClass('seatStyle');
    //
    //   });
    //
    //
    // });
  }
  $onInit(){
    //load Ids from MongoDB and set class as seatDisable the edit test function
    this.$http.get('/api/SeatsBookedEndPoints').then(response=>{
      this.seatsBookedfromDB=response.data;
      console.log('seatsBookedfromDB:');
      console.log(this.seatsBookedfromDB);
      this.FilterSeatsBookedAlready();
    });


  }

  FilterSeatsBookedAlready(){
    for(var i=this.seatsBookedfromDB.length-1;i>=0;i--){

      if(this.Match(this.seatsBookedfromDB[i],this.Ticket)){
        this.DisableIDs(JSON.parse(this.seatsBookedfromDB[i].SeatIDs));
        console.log('Disabling'+this.seatsBookedfromDB[i].SeatIDs);
      }
      else{
        //this.EnableIDs(JSON.parse(this.seatsBookedfromDB[i].SeatIDs));
        // console.log('Else:Enabling'+this.seatsBookedfromDB[i].SeatIDs);
      }
    }//for-loop

  }
  Match(TicketBooked,Ticket){
    console.log(TicketBooked,Ticket);
    if(TicketBooked.Date===Ticket.Date&&TicketBooked.MovieName===Ticket.MovieName&&
    TicketBooked.TheatreLocation===Ticket.TheatreLocation&&TicketBooked.TheatreName===Ticket.TheatreName&&
  TicketBooked.Time===Ticket.Time){
    console.log('MATCH TRUE');
  return true;

  }

  return false;
  }
  DisableIDs(arr){
    console.log(arr);
    for(var i=0;i<arr.length;i++){
      var s=angular.element(document.querySelector(arr[i]));
      s.removeClass('seat');
      s.addClass('seatDisable');
    }
  }
  EnableIDs(arr){
    console.log(arr);
    //return;
    for(var i=0;i<arr.length;i++){
      var s=angular.element(document.querySelector(arr[i]));
      if(s.hasClass('seatDisable')){
        s.removeClass('seatDisable');
        s.addClass('seat');
      }
    }
  }
  //id of Seat #A2, #A1 Test:test
  test(id){
    console.log("id:"+id);
      console.log("No of Seat:"+this.NoOfSeat);

      var x=parseInt(this.count);
      var n=parseInt(this.NoOfSeat);
      var s = angular.element( document.querySelector(id) );

      if(s.hasClass('seatDisable'))
      return;

      if(s.hasClass('seatStyle')){

        this.index = this.seatsBooked.indexOf(id);
        console.log("This Index:"+this.index);
        this.seatsBooked.splice(this.index,1);//1 implies no of element to be deleted
        x--;//reducing count
        s.removeClass('seatStyle');//removing style
        console.log("Spliced"+this.seatsBooked);

      }
      else if(x<n){
        //If Seats are empty
        x++;
        s.addClass('seatStyle');

        this.seatsBooked.push(id);
        sessionStorage.setItem('LastSeatID',id);
        console.log("Added"+this.seatsBooked);
        // sessionStorage.setItem('seatsArray',JSON.stringify(this.seatsBooked));
      }
      else{
        //Removing class from one seat And Adding to other seat
        s.addClass('seatStyle');
        var lid=sessionStorage.getItem('LastSeatID');
        var lastElement=angular.element(document.querySelector( lid));
        lastElement.removeClass('seatStyle');
        sessionStorage.setItem('LastSeatID',id);

        //Updating Array
        this.ind=this.seatsBooked.indexOf(lid);
        this.seatsBooked.splice(this.ind,1);
        this.seatsBooked.push(id);


        console.log("same");
      }

     this.count=x.toString();
     console.log("Counter:"+this.count);


     //Generating Summary in TEST FUNCTION------------------------------------------------------
     this.GenSummary();

  }

  resetSeats(){
    // var myseatClass=angular.element(document.querySelector('.seat'));
    // myseatClass.removeClass('seatStyle');
    // console.log('why not removing');
    // this.count='0';

    for(var i=this.seatsBookedfromDB.length-1;i>=0;i--){
      this.EnableIDs(JSON.parse(this.seatsBookedfromDB[i].SeatIDs));
      console.log('EnablingIDS'+this.seatsBookedfromDB[i].SeatIDs);
    }
    //this.EnableIDs(JSON.parse(this.seatsBookedfromDB[i].SeatIDs));
    //When No.of Seats ae changed we reset all seats
    var arlen=this.seatsBooked.length;console.log(arlen);
    for(var i=arlen-1;i>=0;i--){
      var myseat=angular.element(document.querySelector(this.seatsBooked[i]));
      myseat.removeClass('seatStyle');
      console.log('remove: '+i);
      this.seatsBooked.pop();

    }
    this.count='0';
    this.Summary={
      price:"0",
      InternetHandling:"0",
      SubT:"0",
      Tclass:"GOLD"
    };
    console.log(this.seatsBooked);


  }

   //Summary function
   GenSummary(){
     var c=parseInt(this.count);
     var p=c*160.00;
     var ih=c*20;
     var st=p+ih;
     this.Summary.price=p.toString();

     this.Summary.InternetHandling=ih.toString();
     this.Summary.SubT=st.toString();
     //sessionStorage.setItem("Summary",JSON.stringify(this.Summary));
     //sessionStorage.setItem("seatsBooked",JSON.stringify(this.seatsBooked));
     //console.log(JSON.parse(sessionStorage.getItem("Summary")));
   }
// test(){
//   console.log(this.NoOfSeat);
//   console.log(this.seatClass);
//   var x=parseInt(this.count);
//   var n=parseInt(this.NoOfSeat);
//     if(this.seatClass==="seatStyle"){
//     this.seatClass="";
//     // var x=((parseInt(this.count)));
//     x--;
//     this.count=x.toString();}
//     else if( x<n ){
//       this.seatClass="seatStyle";
//       x++;
//       this.count=x.toString();
//     }
//   console.log(this.count);
//
// }
      SetNoOFSEAT(num){//FROM MODAL
        this.NoOfSeat=num;
      }

      Submit(){
        this.eroo=false;
        var x=parseInt(this.count);
        var n=parseInt(this.NoOfSeat);
        if(x==n){
          sessionStorage.setItem("Summary",JSON.stringify(this.Summary));
          sessionStorage.setItem("seatsBooked",JSON.stringify(this.seatsBooked));
          this.Ticket.SeatIDs=this.seatsBooked;
          sessionStorage.setItem("Ticket",JSON.stringify(this.Ticket));
          location.href='/payment';

        }
        else{
          this.eroo=true;
        }

      }


}//class

angular.module('yoManprojectfolderApp')
  .component('booking', {
    templateUrl: 'app/booking/booking.html',
    controller: BookingComponent,
    controllerAs: 'bookingCtrl'
  });

})();
