'use strict';

(function(){

class RatemovieComponent {
  constructor($scope,$rootScope,$http,socket) {
    this.message = 'Hello';
    this.$http=$http;
    this.$scope=$scope;
    this.$rootScope=$rootScope;
    this.$rootScope.IndexBar=false;
    this.movie=JSON.parse(sessionStorage.getItem("ratemovie"));
    console.log(this.movie);
    this.movie.Actors=this.TrimFourActors(this.movie.Actors);
    this.movie.Directors=this.TrimFourActors(this.movie.Directors);
    console.log(this.movie);
    this.MovieData=[];
    this.loaded=false;
    this.class="fa fa-spinner loader";
    this.RatingData=[];
    this.CurRate="0";
    this.socket=socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('ratingendpoint');
    });
  }

  $onInit(){
    this.$http.get('https://moviesapi.com/m.php?i='+(this.movie.Id)+'&type=movie&r=json').then((response)=>{

     console.log(response.data);
     this.MovieData=response.data;
     this.loaded=true;
     this.class="";
    });

    this.$http.get('/api/ratingendpoints').then(response=>{
      this.RatingData=response.data;
      this.socket.syncUpdates('ratingendpoint', this.RatingData);
      this.DisplayRating();

    });

  }
  DisplayRating(){
    for(var i=this.RatingData.length-1;i>=0;i--){
      if(this.RatingData[i].Movie!==this.movie.Title)
      this.RatingData.splice(i,1);
    }
    if(this.RatingData.length>=1)
    var avg=parseInt(this.RatingData[0].Rating);
    else {
      return;
    }
    if(!isNaN(avg))//is Number
    this.CurRate=avg.toString();

  }
  TrimFourActors(str){
    var count=0;
    var fourActors='';
    for(var i=0;i<str.length;i++){
      if(count>=3)
      return fourActors;
      if(str.charAt(i)==',')
      count++;
      fourActors=fourActors+str.charAt(i);
    }
  }
  SubmitRating(rating){
    console.log(rating);
    // this.DisplayRating();
    // console.log(this.RatingData[0]._id);
    this.Rate=false;
    var r=parseInt(rating);
    if(this.CurRate!=="0"){
            r=rating+(parseInt(this.CurRate));
            r=r/(this.RatingData.length+1);

            this.$http.put('/api/ratingendpoints/'+this.RatingData[0]._id,{
              Movie:this.movie.Title,
              Rating:r
            }).then(response=>{
              console.log(response.data);
              this.CurRate=r.toString();
              // this.RatingData.push(response.data);
              // this.DisplayRating();
            });
      }//if
      else{
        this.$http.post('/api/ratingendpoints',{
          Movie:this.movie.Title,
          Rating:r
        }).then(response=>{
          console.log(response.data);
          this.CurRate=r.toString();
          this.RatingData.push(response.data);
          // this.DisplayRating();
        });


      }
   }//

}//class

angular.module('yoManprojectfolderApp')
  .component('ratemovie', {
    templateUrl: 'app/ratemovie/ratemovie.html',
    controller: RatemovieComponent,
    controllerAs: 'ratemovieCtrl'
  });

})();
