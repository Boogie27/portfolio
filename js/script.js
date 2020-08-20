$(document).ready(function(){

// ====================================================
//  PRELOADER EFFECT
// ====================================================
    function remove_preloader(){
        var preloader = $(".light-skin");
        $(preloader).hide();
        displayName();
    }
    setTimeout(remove_preloader , 1000);

// =====================================================
//    DYNAMIC BANNER EFFECT
// =====================================================
    var imageCounter = 0;
   function dynamic_banner(){
         var bannerImage = $("img.banner-image");
        for(var i = 0; i < bannerImage.length; i++){
              $($(bannerImage)[i]).hide();
        }
        if(imageCounter > bannerImage.length - 1){
            imageCounter = 0;
        }
        $($(bannerImage)[imageCounter]).fadeIn();
        imageCounter++;
        setTimeout(dynamic_banner, 10500);
   }
   dynamic_banner();



// =====================================================
//    BANNER FADE IN EFFECT
// =====================================================
  function displayName (){
    var myName = $("h1.my-name");
    $(myName).css({
         opacity: 1,
         bottom: "-100px",
         transition: "all 0.5s ease"
    });

    var developer = $("li.developer p");
        $(developer).css({
             opacity: 1,
             left: 0,
             transition: "all 0.5s ease"
        });
    
    var mycvBtn = $(".mycv");
        $(mycvBtn).css({
            right: 0,
            opacity: 1,
            transition: "all 0.5s ease"
        });

    var hello = $(".hello p");
        $(hello).css({
            bottom: "-50px",
            opacity: 1,
            transition: "all 0.5s ease"
        });
  }
    // setTimeout(displayName, 1000);




// =====================================================
//    SCROLL EFFECT
// =====================================================
  var navLinks = $(".nav-links a");
      $(navLinks).click(function(e){
          e.preventDefault();
         var pageUrl = $(this).attr("href").substring($(this).attr("href").lastIndexOf("#") + 1);
        var dataScrollTop = parseInt($("#"+pageUrl).attr("data-scroll-top"));
        if(!dataScrollTop){
            dataScrollTop = 0;
        }

        if($(window).width() < 567){
            dataScrollTop = dataScrollTop + 25;
        }
         $("html, body").animate({
             scrollTop: $("#"+pageUrl).offset().top - dataScrollTop
         }, 700);
        if($(window).width() <= 767){
            close_nav();
        }
      });
// =====================================================
//    STICKY NAVIGATION
// =====================================================

var stickNavigation = $(".navigation");
var stickStartPoint = $("#sticky-nav-start-point");
var startPoint = stickStartPoint.offset().top;

function sticky_navigation(){
    var top = 0;
    var scroll = $(window).scrollTop();
    var dataTop = parseInt($(stickStartPoint).attr("data-top"));
    if(dataTop){
        top = dataTop;
    }
  
    if(scroll > (startPoint - top)){
        $(stickNavigation).addClass("sticky");
    }else{
        $(stickNavigation).removeClass("sticky");
    }
}

 sticky_navigation();
 
// function that activates sticky navigation on scroll;
$(window).scroll(function(e){
    sticky_navigation();
});

   

    
// =====================================================
//    NAVIGATION OPEN
// =====================================================
var openBtn = $(".logo .fa-bars");
    $(openBtn).click(function(e){ 
        open_nav();
    });

// =====================================================
//    NAVIGATION CLOSE
// =====================================================
 function close_nav(){
    var navigation = $(".link-container");
    $(navigation).slideUp(200);
 }
 function open_nav(){
    var navigation = $(".link-container");
    $(navigation).slideDown(200);
 }
var closeBtn = $(".link-container .cancle-btn .fa-times");
    $(closeBtn).click(function(e){ 
        close_nav();
    });



// =====================================================
//    SWIPPER 
// =====================================================
var swipperContainer = $(".swipper");

class Swipper{
     constructor(swipper){
        var action = this;
        this.isDown = false;
        this.isMoving = false;
        this.counter = 0;
        this.change = 0;
        this.itemsWidth = 0;
        this.initialPosition = 0;
        this.numberOfFrames = 0;
        this.transformMatrixValue = 0;
        this.swipperContainer = $(swipper);
        this.swipperFrame = $(this.swipperContainer).find(".portfolio-frame");
        this.caurosel = $(this.swipperContainer).find(".caurosel");
        this.swipperItem = $(this.swipperFrame).children();
        this.responsive() // responsiveness
        this.get_item();// get items width, padding e.t.c
        this.set_caurosel();
        this.swipperFrame.on("touchstart",function(){ 
            action.touchStart();  // touch start function
        })
        this.swipperFrame.on("touchmove", function(){ 
            action.touchMove();   // touch move function
        })
        this.swipperFrame.on("touchend", function(){ 
            action.touchEnd();   // touch end function
        });
        this.cauroselBtn();// function that handles caurosel click action;
    
     }




     responsive(){
         var frames = 3
       
         if($(window).width() <= 992){
            frames = 2;
        }
        if($(this.swipperContainer).width() <= 576){
            frames = 1;
        }

        var width = Math.round($(this.swipperContainer).width() / frames);

        if($(window).width() <= 992){
            $(window).on("resize", function(){
                $(this.swipperItem).css({
                    width: width+"px"
                });
            });
            $(this.swipperItem).css({
                width: width+"px"
            });
        }else{
            $(this.swipperItem).css("width", 33.33+"%");
        }
     }  //  end of responsiveness
  

     get_item(){
        var paddingLeft = parseInt($(this.swipperItem[0]).css("padding-left"));
        var paddingRight = parseInt($(this.swipperItem[0]).css("padding-right"));
       
        var padding = paddingRight + paddingLeft;
        this.itemsWidth = $(this.swipperItem[0]).width() + padding;
        $(this.swipperFrame).css({
            "transform": "translateX("+(-this.itemsWidth * this.counter)+"px)"
        });
        this.numberOfFrames = Math.round($(this.swipperContainer).width()/ this.itemsWidth);
     }

    //  append caurosel to the image sliders
     set_caurosel(){
         var items = this.swipperItem;
       
         $.each(this.caurosel, function(index, current){
               for(var i = 0; i < items.length; i++){
                    $(current).append('<i class="fa fa-circle"></i>');
               }  
         });
         $($(this.caurosel).children()[0]).addClass("active");
     }

    //  touch start 
    touchStart(){
       this.isDown = true;
       this.initialPosition = event.touches[0].clientX;
       var transformationMatrix = $(this.swipperFrame).css("transform");
      if(transformationMatrix != "none"){
          this.transformMatrixValue = parseInt(transformationMatrix.split(",")[4].trim())
      }
      $(this.swipperFrame).css({ transition: "none"});
    }

     //  touch start 
     touchMove(){
       if(this.isDown){
           var isMoving = event.touches[0].clientX;
           this.change = isMoving - this.initialPosition;

           $(this.swipperFrame).css({
               "transform": "translateX("+(this.change + this.transformMatrixValue)+"px)"
           });
          this.isMoving = true;
       }
    }

     //  touch start 
     touchEnd(){
         if(this.isMoving){
            if(this.change <= (-this.itemsWidth / 3)){
            this.counter++;
            }else if(this.change > (this.itemsWidth/3)){
                this.counter--;
            }
            if(this.counter < 0){
                this.counter = 0;
            }
            var number = this.counter + this.numberOfFrames;
             if(this.counter > (this.swipperItem.length - this.numberOfFrames)){
               this.counter = this.swipperItem.length - this.numberOfFrames;
             }
            
            $(this.swipperFrame).css({
                transform: "translateX("+(-this.itemsWidth * this.counter)+"px)",
                transition: "all 0.3s ease"
            });
         }
        //  switch caurose active
         $(this.caurosel).children().removeClass("active")
         $( $(this.caurosel).children()[this.counter]).addClass("active")
       
        this.isDown = false;
        this.isMoving = false;
    }

    // function that handles caurosel click action;
    cauroselBtn(){
        var counter = this.counter;
        var frame = this.swipperFrame;
        var itemsWidth = this.itemsWidth;
        $.each(this.caurosel, function(index, current){
              $.each($(this).children(), function(C_index, C_current){
                     $(C_current).click(function(){
                        $(current).children().removeClass("active");
                        $(this).addClass("active");
                         counter = C_index;
                         if(counter < 0){
                             counter = 0;
                         }
                        $(frame).css({
                            transform: "translateX("+(-itemsWidth * counter)+"px)",
                            transition: "all 0.3s ease"
                        });
                     });
              });
        });
    }


    //  end of swipper class
}

$.each(swipperContainer, function(index, current){
    var swipper = new Swipper(current);
});
   
       

// =====================================================
//    SKILLS PROGRESS BAR EFFECT
// =====================================================
function progress_bar(){
    var svgProgressBar = $(".skills-frame");
    $.each(svgProgressBar, function(index, current){
        var progressBar = $(this).find(".svg #bar");
        var stroke = parseInt($(current).find(".percentage h1").html());
           var strokeValues = (189 - (189 * stroke) / 100);
            $(progressBar).css({
                strokeDashoffset: strokeValues
            });
    });
}


var elementTop = $(window).scrollTop();
var skillsContainer = $(".skills-container").offset().top;
var inview = $(window).height();
var difference = ((skillsContainer - elementTop) + 300);

if(difference < inview){
    progress_bar();
}

// progress bar onscroll effect
// ============================
$(window).scroll(function(){
    var elementTop = $(this).scrollTop();
    var difference = ((skillsContainer - elementTop) + 300);

       if(difference < inview){
           progress_bar();
       }
});


















    // document ready end;
});