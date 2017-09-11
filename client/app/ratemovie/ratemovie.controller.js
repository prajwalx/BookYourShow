'use strict';

(function(){

class RatemovieComponent {
  constructor($scope,$rootScope,$http,socket,$sce,youtubeFactory) {
    this.message = 'Hello';
    this.$sce=$sce;
    this.$http=$http;
    this.$scope=$scope;
    this.$rootScope=$rootScope;
    this.$rootScope.IndexBar=false;
    this.socket=socket;

    this.youtubeFactory=youtubeFactory;

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

    // this.YoutubeUrl='https://www.youtube.com/embed/F-eMt3SrfFU';

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
    this.LoadTrailer();
    this.$http.get('/api/ratingendpoints').then(response=>{
      this.topMovies=response.data;
    });



  }
LoadTrailer(){
  this.youtubeFactory.getVideosFromSearchByParams({
        q: this.movie.Title+'-trailer-2017',
        order:'viewCount',

        key: 'AIzaSyDpjg0vprIQ5NpbKHlGVfLc5M-c4vH-YHs'
    }).then(response=>{
      console.log(response.data);
      // console.info('videos from search by query', data);
      // console.log(data.data.items[0].id.videoId);
      var ind=0;
      for(var i=0;i<response.data.items.length;i++){
      if(response.data.items[i].snippet.title.indexOf(this.movie.Title)!==-1||(response.data.items[i].snippet.description.indexOf(this.movie.Title)!==-1)){
        ind=i;

        break;
      }
      }
      // if(ind=)
      console.log('IND:'+ind);
      var vid='https://www.youtube.com/embed/'+response.data.items[ind].id.videoId;
      console.log(vid);
      // this.YoutubeUrl=vid;
      // this.GetVideo(vid);
      this.YoutubeUrl = this.$sce.trustAsResourceUrl(vid);
  //     $scope.setProject = function (id) {
  // $scope.currentProject = $scope.projects[id];
  // $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.currentProject.url);
// }
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
  TrimOneActor(str){
    var count=0;
    var oneActor='';
    for(var i=0;i<str.length;i++){
      if(count>=1)
      return oneActor;
      if(str.charAt(i)==',')
      count++;
      oneActor=oneActor+str.charAt(i);
    }
    return oneActor;
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
    return fourActors;
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
