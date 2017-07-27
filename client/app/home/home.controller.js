'use strict';

(function(){

class HomeComponent {
  constructor($http, $scope, socket,$rootScope,$timeout)  {
    this.message = 'Hello';

      this.$http = $http;
      this.socket = socket;
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$timeout=$timeout;


      //Dynamic
      this.mapmoviefromDB=[];
      this.Movies=[];
      this.Theatres=[];
      this.Dates=[];
      this.LocalDB=false;
      this.AllMovies=[];
      this.filteredMovies=[];
      this.AllDates=[];
      this.DateFilterMovies=[];

      this.RatingData=[];



  }

  $onInit(){
    this.$rootScope.IndexBar=true;
    this.$http.get('/api/mapmovieEndpoints').then(response=>{
      console.log(response.data);
      this.mapmoviefromDB=response.data;
      this.PopulateMovies();
      this.PopulateTheatres();
      this.PopulateDates();
    });

    this.$http.get('/api/ratingendpoints').then(response=>{
      this.RatingData=response.data;
    });

  }

  SearchMovie(){
    console.log(this.SearchMovieQuery);
    // this.Movies=[];

  }

TheatreFilter(Tid){
  if(this.SelectedId===Tid){
    this.SelectedId='';
    if(this.DateFilterMovies.length>=1)
    this.Movies=this.DateFilterMovies;
    else
    this.Movies=this.AllMovies;

    this.filteredMovies=[];
    return;
  }
  this.SelectedId=Tid;//for NG-class Active

  this.filteredMovies=[];
  this.Movies=[];

  for(var i=0;i<this.mapmoviefromDB.length;i++){
    var found=false;
    for(var j=0;j<this.filteredMovies.length;j++){
      if(this.filteredMovies[j]._id===this.mapmoviefromDB[i].MovieTitle._id){
        found=true;
        break;
      }
    }

    if(!found&&this.mapmoviefromDB[i].TheatreName._id===Tid){
      this.filteredMovies.push(this.mapmoviefromDB[i].MovieTitle);
    }


  }
  // this.Movies=this.filteredMovies;
  //  For Comlex Filters
  if(this.DateFilterMovies.length>=1){
    for(var i=0;i<this.DateFilterMovies.length;i++){
      if(this.IDobjinArray(this.filteredMovies,this.DateFilterMovies[i])){
        this.Movies.push(this.DateFilterMovies[i]);
      }
    }
  }
  else{
    this.Movies=this.filteredMovies;
  }


  // var ele=angular.element(document.querySelector('#\\00003'+Tid+''));//changing color dom
  // console.log(ele);
  // if(ele.hasClass('active')){
  //   ele.removeClass('active');
  // }
  // else {
  //   ele.addClass('active');
  //
  //   for(var i=0;i<this.mapmoviefromDB.length;i++){
  //     var found=false;
  //         for(var j=this.filteredMovies.length-1;j>=0;j--){
  //                 if(this.filteredMovies[j]._id===this.mapmoviefromDB[i].MovieTitle._id){
  //                   found=true;
  //                   if(this.mapmoviefromDB[i].TheatreName._id!==Tid){
  //                     this.filteredMovies.splice(j,1);
  //                   }
  //                 }
  //         }
  //     if(!found&&this.mapmoviefromDB[i].TheatreName._id===Tid){
  //     this.filteredMovies.push(this.mapmoviefromDB[i].MovieTitle);
  //     }
  //
  //
  //   }
  //   console.log('filteredMovies'+this.filteredMovies);
  //   this.Movies=this.filteredMovies;
  // }
  // console.log(Tid);
}
objInArray(arr,obj){
  for(var i=0;i<arr.length;i++){
    if(arr[i]===obj)
    return true;
  }
  return false;

}
IDobjinArray(arr,obj){
  for(var i=0;i<arr.length;i++){
    if(arr[i]._id===obj._id)
    return true;
  }
  return false;
}
DateFilter(date){
  if(this.SelectedDateId===date){
    this.SelectedDateId='';
    if(this.filteredMovies.length>0)
    this.Movies=this.filteredMovies;
    else
      this.Movies=this.AllMovies;
      this.DateFilterMovies=[];
      return;
  }
  // if(this.filteredMovies.length<1){
  //
  //
  // this.Movies=this.AllMovies;
  // }
  this.DateFilterMovies=[];
  this.SelectedDateId=date;
  console.log(date);
  for(var i=0;i<this.mapmoviefromDB.length;i++){
    var dar=JSON.parse(this.mapmoviefromDB[i].MovieDates);
    var found=false;
    for(var j=0;j<this.DateFilterMovies.length;j++){
      if(this.DateFilterMovies[j]._id===this.mapmoviefromDB[i].MovieTitle._id&&this.objInArray(dar,date)){
        found=true;
        break;
      }
    }
    if(!found&&this.objInArray(dar,date)){
      this.DateFilterMovies.push(this.mapmoviefromDB[i].MovieTitle);
      console.log(this.DateFilterMovies+'DATE:'+date);
    }
  }
  this.Movies=[];
  // this.Movies=this.DateFilterMovies;

  //For COmplex Filters
  if(this.filteredMovies.length>=1){
    for(var i=0;i<this.filteredMovies.length;i++){
      if(this.IDobjinArray(this.DateFilterMovies,this.filteredMovies[i])){
        this.Movies.push(this.filteredMovies[i]);
      }
    }
  }
  else{
    this.Movies=this.DateFilterMovies;
  }


}
  PopulateMovies(){
    for(var i=0;i<this.mapmoviefromDB.length;i++){
      var found=false;
          for(var j=0;j<this.Movies.length;j++){
                  if(this.Movies[j]._id===this.mapmoviefromDB[i].MovieTitle._id){
                    found=true;
                    break;
                  }
          }
      if(!found){
      this.Movies.push(this.mapmoviefromDB[i].MovieTitle);
      }

    }
    console.log(this.Movies);
    this.AllMovies=this.Movies;
    console.log(this.AllMovies);
    if(this.Movies.length>0)
    this.LocalDB=true;
  }


  PopulateTheatres(){
    for(var i=0;i<this.mapmoviefromDB.length;i++){
      var found=false;
          for(var j=0;j<this.Theatres.length;j++){
                  if(this.Theatres[j]._id===this.mapmoviefromDB[i].TheatreName._id){
                    found=true;
                    break;
                  }
          }
      if(!found){
      this.Theatres.push(this.mapmoviefromDB[i].TheatreName);
      }

    }
    console.log(this.Theatres);
    if(this.Movies.length>0)
    this.LocalDB=true;
  }

  PopulateDates(){

    for(var i=0;i<this.mapmoviefromDB.length;i++){
      var dar=JSON.parse(this.mapmoviefromDB[i].MovieDates);
      // console.log(dar);

      for(var k=0;k<dar.length;k++){
        this.AllDates.push(dar[k]);
      }

                  // if(dar.findIndex(this.AllDates[j])!==-1 ){
                  //   found=true;
                  //   break;
                  // }



      // if(!found){
      // this.AllDates.concat(dar);
      // }

    }
    this.AllDates.sort();
    console.log(this.AllDates);

    for(var i=0;i<this.AllDates.length;i++){
      var found=false;
      for(var j=0;j<this.Dates.length;j++){
        if(this.Dates[j]===this.AllDates[i]){
          found=true;
          break;
        }
      }
      if(!found){
        this.Dates.push(this.AllDates[i]);
      }
    }
    console.log(this.Dates);
    if(this.Movies.length>0)
    this.LocalDB=true;

  }

  booknow(movie){
    sessionStorage.setItem("Movie",JSON.stringify(movie));
    sessionStorage.setItem("Dates",JSON.stringify(this.Dates));
    sessionStorage.setItem("Theatres",JSON.stringify(this.Theatres));
    location.href='/booknow';
  }

  OpenRateMovie(movie){
    console.log(movie);
    sessionStorage.setItem("ratemovie",JSON.stringify(movie));
    location.href="/ratemovie";

  }



}//Class

angular.module('yoManprojectfolderApp')
  .component('home', {
    templateUrl: 'app/home/home.html',
    controller: HomeComponent,
    controllerAs: 'homeCtrl'
  });

})();
