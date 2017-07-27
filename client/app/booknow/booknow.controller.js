'use strict';

(function(){

class BooknowComponent {
  constructor($scope,$http,$rootScope) {
    this.message = 'Hello';
    this.$scope=$scope;
    this.$http=$http;
    this.$rootScope=$rootScope;

    this.$rootScope.IndexBar=true;
    //Getting Data from HOME Page
    this.Movie=JSON.parse(sessionStorage.getItem("Movie"));
    this.Dates=JSON.parse(sessionStorage.getItem("Dates"));
    
    this.Theatres=[];
    this.CopymapmoviefromDB=[];
    this.SelectedDate='';

    this.Ticket = {
      TheatreName:"",
      MovieName:"",
      Date:"0",
      Time:"0",
      SeatIDs: [''],
      Email:'',
      Phone:'',
      AllTimes:[''],
      TheatreLocation:''
    };

    //this.AllTheatres=JSON.parse(sessionStorage.getItem("Theatres"));
    // console.log(this.Dates);
    console.log(this.Movie);
    //console.log(this.AllTheatres);
     this.actors=this.TrimFourActors(this.Movie.Actors);
     this.directors=this.TrimFourActors(this.Movie.Directors);

  }
  $onInit(){
    this.$http.get('/api/mapmovieEndpoints').then(response=>{
      console.log(response.data);
      this.mapmoviefromDB=response.data;
      this.populateValidTheatres();
    });
  }

  populateValidTheatres(){
  for(var i=this.mapmoviefromDB.length-1;i>=0;i--){
    // if(this.mapmoviefromDB[i].MovieTitle._id===this.Movie._id&&!(this.findObjInArraybyID(this.Theatres,this.mapmoviefromDB[i].TheatreName))){
    // this.Theatres.push(this.mapmoviefromDB[i].TheatreName);
    // var dar=JSON.parse(this.mapmoviefromDB[i].MovieDates)//LOGIC FOR DATES  THINK
    if(this.mapmoviefromDB[i].MovieTitle._id!==this.Movie._id)
    this.mapmoviefromDB.splice(i,1);
    else{
      var dar=JSON.parse(this.mapmoviefromDB[i].MovieDates);
      this.mapmoviefromDB[i].MovieDates=[];
      this.mapmoviefromDB[i].MovieDates=dar;
      var shar=JSON.parse(this.mapmoviefromDB[i].ShowTimings);
      this.mapmoviefromDB[i].ShowTimings=[];
      this.mapmoviefromDB[i].ShowTimings=shar;

    }

    }
    console.log(this.mapmoviefromDB);
    this.CopymapmoviefromDB=this.mapmoviefromDB;
    var copymapmovfromDB=this.mapmoviefromDB;
  //Simple Populating Theatres ng-model this.mapmoviefromDB




  }
  findEleinArray(arr,ele){
    for (var i = 0; i < arr.length; i++) {
      if(arr[i]===ele)
      return true;
    }
    return false;
  }
  findObjInArraybyID(arr,obj){
    for(var i=0;i<arr.length;i++){
      if(arr[i]._id===obj._id)
      return true;
    }
    return false;

  }
  TrimFourActors(str){
    var count=0;
    var fourActors='';
    for(var i=0;i<str.length;i++){
      if(count>=4)
      return fourActors;
      if(str.charAt(i)==',')
      count++;
      fourActors=fourActors+str.charAt(i);
    }
  }

  SelectDate(date){
    this.mapmoviefromDB=this.CopymapmoviefromDB;


    var a=[];
    if(this.SelectedDate===date){
        this.SelectedDate='';
        console.log('SelectedDate:'+' ');


    }
    else{
        this.SelectedDate=date;
        console.log('SelectedDate:'+date);

        for(var i=this.mapmoviefromDB.length-1;i>=0;i--){
          if(this.findEleinArray(this.mapmoviefromDB[i].MovieDates,date))
          // this.mapmoviefromDB.splice(i,1);
          a.push(this.mapmoviefromDB[i]);
        }
        this.CopymapmoviefromDB=[]
        this.CopymapmoviefromDB=this.mapmoviefromDB;
        this.mapmoviefromDB=[];
        this.mapmoviefromDB=a;
    }

  }

  SelectTime(time,theatre,mapmoviefromDBindex){
    this.SelectedTheatre=theatre;
    if(this.SelectedTime===time){
        this.SelectedTime='';
        console.log('SelectedTime:'+' ');
    }
    else{
        this.SelectedTime=time;
        console.log('SelectedTime:'+time);
        if(this.SelectedDate!==''){
          this.Ticket.TheatreName=this.SelectedTheatre.TheatreName;
          this.Ticket.MovieName=this.Movie.Title;
          this.Ticket.Date=this.SelectedDate;
          this.Ticket.Time=this.SelectedTime;
          this.Ticket.AllTimes=mapmoviefromDBindex.ShowTimings;
          this.Ticket.TheatreLocation=theatre.Locations;
          sessionStorage.setItem("Ticket",JSON.stringify(this.Ticket));
          location.href="/booking";

        }
        else{
          alert('Please Select A Date');
        }
    }
  }
}

angular.module('yoManprojectfolderApp')
  .component('booknow', {
    templateUrl: 'app/booknow/booknow.html',
    controller: BooknowComponent,
    controllerAs: 'booknowCtrl'
  });

})();
