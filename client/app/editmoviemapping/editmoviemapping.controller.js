'use strict';
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/mapmovieEndpoints              ->  index
 * POST    /api/mapmovieEndpoints              ->  create
 * GET     /api/mapmovieEndpoints/:id          ->  show
 * PUT     /api/mapmovieEndpoints/:id          ->  update
 * DELETE  /api/mapmovieEndpoints/:id          ->  destroy
 */
(function(){

class EditmoviemappingComponent {
  constructor($http,$scope,$rootScope,$route) {
    this.message = 'Hello';
    this.$http=$http;
    this.$scope=$scope;
    this.$rootScope=$rootScope;
    this.$route=$route;
    this.$rootScope.IndexBar=true;
    this.AllTheatres=[]
    this.Theatres=[];
    this.TheatresSelected=[];
    this.TheatresSelectedFinal=[];
    this.Dates=[];
    this.Times=[];
    this.City='';
    this.Eror=false;
    this.Movie={};
    // this.City="Delhi";
    //EditingChanges Below
    this.mapmoviefromDB=[];
    this.tempT={};
    this.once=false;



  }

  $onInit(){
    this.$http.get('/api/moviesendpoints').then(response=>{
      console.log(response.data);
      this.Movieoptions=(response.data);
    });
    this.$http.get('/api/theatresendpoints').then(response=>{
      this.AllTheatres=response.data;
    });
    this.$http.get('/api/mapmovieEndpoints').then(response=>{
      this.mapmoviefromDB=(response.data);

      console.log('THis mapmoviefromDB:'+this.mapmoviefromDB);

    });

  console.log(this.Dates);
  }


  MovieSelected(){

    for(var j=this.mapmoviefromDB.length-1;j>=0;j--){

     if(this.mapmoviefromDB[j].MovieTitle._id!==this.Movie._id){
       console.log(this.mapmoviefromDB[j].MovieTitle);
    this.mapmoviefromDB.splice(j,1);
     }

     else {
       this.TheatresSelectedFinal.push(this.mapmoviefromDB[j].TheatreName);

        console.log(JSON.parse(this.mapmoviefromDB[j].MovieDates));



      //  for(var l=0;l<this.mapmoviefromDB[j].MovieDates.length;l++){
      //            if(this.Dates.indexOf(this.mapmoviefromDB[j].MovieDates[l])===-1)
      //              this.Dates.push((this.mapmoviefromDB[j].MovieDates[l]));
       //
      //          }//MovieDates
      //          for(var m=0;m<this.mapmoviefromDB[j].ShowTimings.length;m++){
      //            if(this.Times.indexOf(this.mapmoviefromDB[j].ShowTimings[m])===-1)
      //              this.Times.push((this.mapmoviefromDB[j].ShowTimings[m]));
       //
      //          }//ShowTimings

     }
   }
   if(this.TheatresSelectedFinal.length>0){
     var arr=(JSON.parse(this.mapmoviefromDB[0].MovieDates));
     for(var i=0;i<arr.length;i++){
       if(this.Dates.indexOf(arr[i])===-1)
       this.Dates.push(arr[i]);

     }
     var ar=(JSON.parse(this.mapmoviefromDB[0].ShowTimings));
     for(var i=0;i<ar.length;i++){
       if(this.Times.indexOf(ar[i])===-1)
       this.Times.push(ar[i]);

     }
     console.log(JSON.parse(this.mapmoviefromDB[0].MovieDates));
   }

  //  console.log(this.mapmoviefromDB);
  //  console.log(this.TheatresSelectedFinal);
  //
  //     console.log(this.mapmoviefromDB[j].TheatreName);
  //     for(var k=0;k<this.AllTheatres.length;k++){
  //       if(this.AllTheatres[k]._id==this.mapmoviefromDB[j].TheatreName&&this.mapmoviefromDB[j].MovieTitle===this.Movie._id){
  //         this.TheatresSelectedFinal.push(this.AllTheatres[k]);
  //         for(var l=0;l<this.mapmoviefromDB[j].MovieDates.length;l++){
  //           if(this.Dates.indexOf(this.mapmoviefromDB[j].MovieDates[l])===-1)
  //             this.Dates.push(this.mapmoviefromDB[j].MovieDates[l]);
  //
  //         }//MovieDates
  //         for(var m=0;m<this.mapmoviefromDB[j].ShowTimings.length;m++){
  //           if(this.Times.indexOf(this.mapmoviefromDB[j].ShowTimings[m])===-1)
  //             this.Times.push(this.mapmoviefromDB[j].ShowTimings[m]);
  //
  //         }//ShowTimings
  //       }//if
  //
  //     }//for AllTheatres
  //   }//for mapmoviefromDB
  }//MovieSelected Function

   CitySelected(){
    //  this.Theatres=[];


     for(var i=0;i<this.AllTheatres.length;i++){
       //If City is present then dont push it in wrong Theatre or full Theatre
       //For Pushing Left TO Right
       var found = false;
        for(var j = 0; j < this.TheatresSelectedFinal.length; j++) {
            if (this.TheatresSelectedFinal[j]._id === this.AllTheatres[i]._id) {
                found = true;
                break;
            }
      }
       console.log(this.TheatresSelectedFinal);
       if(this.AllTheatres[i].City===this.City&&this.TheatresSelectedFinal.indexOf(this.AllTheatres[i])===-1&&(!found)){
         this.Theatres.push(this.AllTheatres[i]);
       }
     }
    console.log(this.Theatres);
    console.log(this.Date);
   }


  selectT(t,id){//For going from Left To Right
    console.log(t);
    id=t._id;
    console.log(id);

  var s = angular.element( document.querySelector( '#\\00003'+id+'' ));
//Leading digits
//
// If the first character of an identifier is numeric, you’ll need to escape it based on its Unicode code point.
// For example, the code point for the character 1 is U+0031, so you would escape it as \000031 or \31 .
//
// Basically, to escape any numeric character, just prefix it with \3 and append a space character ( ). Yay Unicode!
    if(s.hasClass('tableBack')){

    console.log('tableback removed');
    s.removeClass('tableBack');
  }
    else {
      s.addClass('tableBack');
       console.log('table back added');

    }
  }
  select2T(t,id){//For going from Right To Left
    console.log(t);
    //id=t._id;
    console.log(id);

  var s = angular.element( document.querySelector( '#\\00003'+id+' ' ));
//Leading digits
//
// If the first character of an identifier is numeric, you’ll need to escape it based on its Unicode code point.
// For example, the code point for the character 1 is U+0031, so you would escape it as \000031 or \31 .
//
// Basically, to escape any numeric character, just prefix it with \3 and append a space character ( ). Yay Unicode!
    if(s.hasClass('tableBack')){

    console.log('tableback removed');
    s.removeClass('tableBack');
  }
    else {
      s.addClass('tableBack');
       console.log('table back added');

    }
  }

  pushRight(){
    //Push Left Items To Right
    var s;
    var id;
    // Go through removeValFromIndex in reverse order
    // and you can .splice() without messing up the
    // indexes of the yet-to-be-removed items.
  for(var i=this.Theatres.length-1;i>=0;i--){
    id=this.Theatres[i]._id;
     s = angular.element( document.querySelector( '#\\00003'+id+'' ));
     if(s.hasClass('tableBack')){
       this.TheatresSelectedFinal.push(this.Theatres[i]);
       this.Theatres.splice(i,1);
       s.removeClass('tableBack');
     }
    }
  }

  pushLeft(){
    //Push Right Items To Left
    var s;
    for(var i =this.TheatresSelectedFinal.length;i>=0;i--){
      s=angular.element(document.querySelector('#\\00003'+i+' '));
      if(s.hasClass('tableBack')){
        //If City is changed then dont push it in wrong Theatre or full Theatre
        //For Pushing RightTOLEFT

        if(this.City===this.TheatresSelectedFinal[i].City&&this.Theatres.indexOf(this.TheatresSelectedFinal[i])===-1)
        {
        this.Theatres.push(this.TheatresSelectedFinal[i]);
        }
        this.TheatresSelectedFinal.splice(i,1);
        s.removeClass('tableBack');
      }
    }

  }
  AddDates(){
    if(this.Dates.indexOf(this.Date)===-1)
    this.Dates.push(this.Date);
    console.log(this.Dates);
  }
  RemoveDates(t){
    console.log(t);
    var ind=this.Dates.indexOf(t);
    if(ind!==-1)
    this.Dates.splice(ind,1);
  }

  AddTimes(){
    if(this.Times.indexOf(this.Time)===-1)
    this.Times.push(this.Time);
    console.log(this.Times);
  }
  RemoveTimes(t){
    console.log(t);
    var ind=this.Times.indexOf(t);
    if(ind!==-1)
    this.Times.splice(ind,1);
  }

  PutSaveTheatre(k){
    console.log(this.mapmoviefromDB[k]._id);
    console.log(k);
    console.log(this.Dates);
    console.log(this.Times);
    // this.$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    this.$http.put('/api/mapmovieEndpoints/'+this.mapmoviefromDB[k]._id,angular.toJson({

            MovieTitle:(this.Movie),//Storing id for Obvious Reasons
            TheatreName:(this.mapmoviefromDB[k].TheatreName),//Storing Id For Obvious Reasons
            City:(this.City),
            MovieDates:angular.toJson(this.Dates),
            ShowTimings:angular.toJson(this.Times)

    })).then(response=>{
      console.log('Theatre Being PUT');
      console.log(response.data);
      console.log(response.status);
    });
  }

  PostSaveTheatre(i){

    this.$http.post('/api/mapmovieEndpoints',angular.toJson({

      MovieTitle:(this.Movie),//Storing id for Obvious Reasons
      TheatreName:(this.TheatresSelectedFinal[i]),//Storing Id For Obvious Reasons
      City:(this.City),
      MovieDates:angular.toJson(this.Dates),
      ShowTimings:angular.toJson(this.Times)
    })).then(response=>{
      console.log('THeatres being added POST');
      console.log(response.status);
    });

  }

  Save(){
    this.Eror=false;
    this.put=false;
    console.log(this.Movie);
    console.log((angular.equals(this.Movie,{})) );
    // console.log('object empty');
    console.log(this.City);
    console.log(this.TheatresSelectedFinal);
    console.log(this.Dates);
    console.log(this.Times);
    if( (!angular.equals(this.Movie,{}))&&this.City.length>0&&this.TheatresSelectedFinal.length>0&&this.Dates.length>0&&this.Times.length>0){
      console.log('All True');
      this.Eror=false;

      for(var i=0;i<this.TheatresSelectedFinal.length;i++){
        this.put=false;
        for(var k=0;k<this.mapmoviefromDB.length;k++){
          if(this.mapmoviefromDB[k].MovieTitle._id===this.Movie._id&&this.mapmoviefromDB[k].TheatreName._id===this.TheatresSelectedFinal[i]._id){
            this.PutSaveTheatre(k);//k for id_of_record
            this.put=true;
          }//ifMovieId And Theatre Id is already present^^
        }//mapmovieloop

          if(this.put===false)
            this.PostSaveTheatre(i);


      //
      //   var index = this.mapmoviefromDB.findIndex(x => x.TheatreName===this.TheatresSelectedFinal[i]._id);
      //
      //   if(index!==-1&&this.mapmoviefromDB[index].MovieTitle===this.Movie._id){
      //     console.log(this.mapmoviefromDB[index]._id);
      //     this.$http.delete('/api/mapmovieEndpoints/'+this.mapmoviefromDB[index]._id);
      //
      //     this.$http.post('/api/mapmovieEndpoints',{
      //       MovieTitle:this.Movie._id,//Storing id for Obvious Reasons
      //       TheatreName:this.TheatresSelectedFinal[i]._id,//Storing Id For Obvious Reasons
      //       City:this.City,
      //       MovieDates:this.Dates,
      //       ShowTimings:this.Times
      //     }).then(response=>{
      //       console.log('THeatres being added Delete And POST');
      //     });
      //
      //   }
      //   else{
      //     this.$http.post('/api/mapmovieEndpoints',{
      //       MovieTitle:this.Movie._id,//Storing id for Obvious Reasons
      //       TheatreName:this.TheatresSelectedFinal[i]._id,//Storing Id For Obvious Reasons
      //       City:this.City,
      //       MovieDates:this.Dates,
      //       ShowTimings:this.Times
      //     }).then(response=>{
      //       console.log('THeatres being added POST');
      //     });
      //   }
      //
      //
      }
        alert("Shows Edited Successfully");
        // console.log('Movie Mapped Successfully');
        //this.$route.reload();//Reload Page

    }
    else {
      console.log('Error here');
      this.Eror=true;
    }
  }
}//class

angular.module('yoManprojectfolderApp')
  .component('editmoviemapping', {
    templateUrl: 'app/editmoviemapping/editmoviemapping.html',
    controller: EditmoviemappingComponent,
    controllerAs: 'editmoviemappingCtrl'
  });

})();
