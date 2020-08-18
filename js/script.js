$(document).ready(function(){
    
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
         var navigation = $(".link-container");
         $(navigation).slideDown();
    });

// =====================================================
//    NAVIGATION CLOSE
// =====================================================
var closeBtn = $(".link-container .cancle-btn .fa-times");
    $(closeBtn).click(function(e){ 
         var navigation = $(".link-container");
         $(navigation).slideUp();
    });



// =====================================================
//    SWIPPER 
// =====================================================
var swipperContainer = $(".swipper");

class Swipper{
     constructor(swipper){
        var action = this;
        this.swipperContainer = $(swipper);
        this.swipperFrame = $(this.swipperContainer).children();
        this.swipperItem = $(this.swipperFrame).children();
        this.responsive()
     }

     responsive(){
         var frames = 3
        if($(this.swipperContainer).width() <= 876){
            frames = 2;
        }
        if($(this.swipperContainer).width() <= 576){
            frames = 1;
        }

        var width = Math.round($(this.swipperContainer).width() / frames);
        $(this.swipperItem).css({
            width: width+"px"
        });
     }
}

var swipper = new Swipper(swipperContainer);






    // document ready end;
});