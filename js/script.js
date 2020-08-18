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
        this.swipperItem = $(this.swipperFrame).children();
        this.responsive() // responsiveness
        this.get_item();
        this.swipperFrame.on("touchstart",function(){ 
            action.touchStart();  // touch start function
        })
        this.swipperFrame.on("touchmove", function(){ 
            action.touchMove();   // touch move function
        })
        this.swipperFrame.on("touchend", function(){ 
            action.touchEnd();   // touch end function
        });
        
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
        console.log(padding)
        this.itemsWidth = $(this.swipperItem[0]).width() + padding;
        $(this.swipperFrame).css({
            "transform": "translateX("+(-this.itemsWidth * this.counter)+"px)"
        });
        this.numberOfFrames = Math.round($(this.swipperContainer).width()/ this.itemsWidth);
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
       
        this.isDown = false;
        this.isMoving = false;
    }


    //  end of swipper class
}

$.each(swipperContainer, function(index, current){
    var swipper = new Swipper(current);
});
   
       
    







    // document ready end;
});