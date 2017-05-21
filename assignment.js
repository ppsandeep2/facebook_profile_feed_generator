$(document).ready(function(){
    
     
              $(".feed").hide();


    



var myFacebookToken;


$('.btn-success').click(function(){
myFacebookToken=$('#token').val();





var id;
//For Obtaining Profile Details
$.ajax('https://graph.facebook.com/me?fields=id,name,languages,birthday,education,picture,hometown,gender,email,feed.include_hidden(true).limit(10),location&access_token=' + myFacebookToken, {

          success : function(response){
                    console.log(response);
                    console.log(response.name);
                    $("#pic").attr('src','https://graph.facebook.com/me/picture?type=large&access_token='+myFacebookToken)
                    var languages=jQuery.map(response.languages,showlang);
                     var education=jQuery.map(response.education,showedu);
                    id=response.id;
                    console.log(id);
                   
                    
                     $("#name").text(response.name);
                     $("#home").text(response.hometown.name);
                     $("#dob").text(response.birthday);
                     $("#gender").text(response.gender);
                     $("#email").text(response.email);
                     $("#languages").text(languages);
                     $("#education").text(education);
                     

                
                  function showlang(val)
                  {
                    if(val.name!==undefined && val.name!==null)
                    {
                    return val.name;
                    }


                  }
                function showedu(val){
                   

                    if(val.school.name!==undefined && val.school.name!==null)
                    {
                    return val.school.name;
                    }


                }
                   //For Feed           
                jQuery.map(response.feed.data,showfeed);
                                    
                                       

                function showfeed(val){
                                      if(val.id!==undefined && val.id!==null && val.from.id==id && val.type=="status"||"photo")//to show only your posts and only status and photo posts
                                    {
                 
                                      var cnt= "<div class='container'>"+
                "<div class='item_box'>"+
                "<div class='row'>"+
                "<div class='col-md-offset-1 col-md-10'>"+
                "<div class='profile-info'>"+
                "<div class='profile-photo'>"+
                "<img src="+"https://graph.facebook.com/me/picture?type=small&access_token="+myFacebookToken+"/>"+
                "</div>"+
                "<div class='profile-name'>"+
                "<div><a "+"id = "+"feed "+" href "+"= 'https://fb.com/"+ val.id + " '>"+val.from.name+
                "</a>"+ 
                "</div>";
                if(val.story!==undefined && val.story!==null){
                cnt=cnt+"<div>"+val.story+"</div>";
                }
                var string=val.created_time;
                string=string.replace(/T/g,' ');//putting space in date
                string = string.slice(0, -5);//trimming last 5 chars of date
                cnt=cnt+"<div class='time-ago' >"+string+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>";
                

                if(val.message!==undefined && val.message!==null)
                {
                cnt=cnt+"<div class='row'>"+
                "<div class='col-md-offset-1 col-md-10 profile-message'>"+
                "<p >" +val.message +
                "</p>"+
                "</div>"+
                "</div>"+
                "<br>";
                }

                
                if (val.link != undefined && val.name != undefined) 
                  {    
                  cnt=cnt+"<div class='row'>"+
                "<div class='col-md-offset-1 col-md-10 profile-message'>"+
                "<a href='"+val.link+"' >" +val.link +"</a>"+"<p>"+ val.name+
                "</p>"+
                "</div>"+
                "</div>"+
                "<br>";
                  }


                if(val.type=="photo"){
                cnt=cnt+"<div class='row'>"+
                "<div class='col-md-offset-1 col-md-10'>"+
                "<a  target='_blank' class='post-link'>"+
                "<div class='post-content'><img src = '"+ val.picture+"'/></div>"+
                "</a>"+
                "</div>"+
                "</div>"+
                "<br>"+
                "<br>";
                }

           

                                      
                  $('.feed').append(cnt +"<hr>");



                      }
              





                /*if(val.id!==undefined && val.id!==null && val.from.id==id && val.type=="link"){


                if(val.link!==undefined && val.link!==null){
                cnt=cnt+"<div class='row'>"+
                "<div class='col-md-offset-1 col-md-10'>";
                if(val.picture!== undefined && val.picture!==null)
                {
                cnt=cnt+"<div class='post-picture'><img src = '"+ val.picture +"'/></div>";
                }
                cnt=cnt+"<div class='post-link'><a = '"+ val.link+"'/></a>"+
                "</a>"+
                "<h4 class='post-content'>"+ val.name+"<h4/></div>";
                if(val.description!==undefined && val.description!==null){
                cnt=cnt+"<p>"+ val.description+"<p/></div>";}

                cnt=cnt+"</div>"+
                "</div>"+
                "<br>"+
                "<br>";

                }

                }*/

                                    

                }},

                error : function(request,errorType,errorMessage){

                    console.log(request);
                    console.log(errorType);
                    alert("Invalid Token");
                },

                timeout:2000, // in ms

                beforeSend : function(){

                    //$('.loader').show();

                },

                complete : function(){

                   //$('.loader').hide();

                }

            }//end argument list 



        )


    

});

 













//For profile and feed tabs

   $('.profile_tab').bind('click',(function(){
        
              $(".feed").hide(1000);
              $(".profile").show(1000);
              
    
    
    }));

$('.feed_tab').bind('click',(function(){        

             $(".profile").hide(1000);
             $(".feed").show(1000);
              
    
    
    }));






 
      


});