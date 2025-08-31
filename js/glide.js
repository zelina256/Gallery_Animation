// set and cache variables
var w, container, carousel, item, radius, itemLength, rY, ticker, fps; 
var mouseX = 0;
var mouseY = 0;
var mouseZ = 0;
var addX = 0;


// fps counter created by: https://gist.github.com/sharkbrainguy/1156092,
// no need to create my own :)
var fps_counter = {
  
  tick: function () 
  {
    // this has to clone the array every tick so that
    // separate instances won't share state 
    this.times = this.times.concat(+new Date());
    var seconds, times = this.times;
    
    if (times.length > this.span + 1) 
    {
      times.shift(); // ditch the oldest time
      seconds = (times[times.length - 1] - times[0]) / 1000;
      return Math.round(this.span / seconds);
    } 
    else return null;
  },

  times: [],
  span: 20
};
var counter = Object.create(fps_counter);



$(document).ready( init )

function init()
{
  w = $(window);
  container = $( '#contentContainer' );
  carousel = $( '#carouselContainer' );
  item = $( '.carouselItem' );
  itemLength = $( '.carouselItem' ).length;
  fps = $('#fps');
  rY = 360 / itemLength;
  radius = Math.round( (250) / Math.tan( Math.PI / itemLength ) );
  
  // set container 3d props
  TweenMax.set(container, {perspective:600})
  TweenMax.set(carousel, {z:-(radius)})
  
  // create carousel item props
  
  for ( var i = 0; i < itemLength; i++ )
  {
    var $item = item.eq(i);
    var $block = $item.find('.carouselItemInner');
    
    //thanks @chrisgannon!        
    TweenMax.set($item, {rotationY:rY * i, z:radius, transformOrigin:"50% 50% " + -radius + "px"});
    
    animateIn( $item, $block )						
  }
  
  // set mouse x and y props and looper ticker
  window.addEventListener( "mousemove", onMouseMove, false );
  ticker = setInterval( looper, 1000/60 );			
}

function animateIn( $item, $block )
{
  var $nrX = 360 * getRandomInt(2);
  var $nrY = 360 * getRandomInt(2);
    
  var $nx = -(2000) + getRandomInt( 4000 )
  var $ny = -(2000) + getRandomInt( 4000 )
  var $nz = -4000 +  getRandomInt( 4000 )
    
  var $s = 1.5 + (getRandomInt( 10 ) * .1)
  var $d = 1 - (getRandomInt( 8 ) * .1)
  
  TweenMax.set( $item, { autoAlpha:1, delay:$d } )	
  TweenMax.set( $block, { z:$nz, rotationY:$nrY, rotationX:$nrX, x:$nx, y:$ny, autoAlpha:0} )
  TweenMax.to( $block, $s, { delay:$d, rotationY:0, rotationX:0, z:0,  ease:Expo.easeInOut} )
  TweenMax.to( $block, $s-.5, { delay:$d, x:0, y:0, autoAlpha:1, ease:Expo.easeInOut} )
}

function onMouseMove(event)
{
  mouseX = -(-(window.innerWidth * .5) + event.pageX) * .0025;
  mouseY = -(-(window.innerHeight * .5) + event.pageY ) * .01;
  mouseZ = -(radius) - (Math.abs(-(window.innerHeight * .5) + event.pageY ) - 200);
}

// loops and sets the carousel 3d properties
function looper()
{
  addX += mouseX
  TweenMax.to( carousel, 1, { rotationY:addX, rotationX:mouseY, ease:Quint.easeOut } )
  TweenMax.set( carousel, {z:mouseZ } )
  fps.text( 'Framerate: ' + counter.tick() + '/60 FPS' )	
}

function getRandomInt( $n )
{
  return Math.floor((Math.random()*$n)+1);	
}


(function() {
  "use strict";

  var carousel = document.getElementsByClassName('carousel')[0],
      slider = carousel.getElementsByClassName('carousel__slider')[0],
      items = carousel.getElementsByClassName('carousel__slider__item'),
      prevBtn = carousel.getElementsByClassName('carousel__prev')[0],
      nextBtn = carousel.getElementsByClassName('carousel__next')[0];
  
  var width, height, totalWidth, margin = 20,
      currIndex = 0,
      interval, intervalTime = 4000;
  
  function init() {
      resize();
      move(Math.floor(items.length / 2));
      bindEvents();
    
      timer();
  }
  
  function resize() {
      width = Math.max(window.innerWidth * .25, 275),
      height = window.innerHeight * .5,
      totalWidth = width * items.length;
    
      slider.style.width = totalWidth + "px";
    
      for(var i = 0; i < items.length; i++) {
          let item = items[i];
          item.style.width = (width - (margin * 2)) + "px";
          item.style.height = height + "px";
      }
  }
  
  function move(index) {
    
      if(index < 1) index = items.length;
      if(index > items.length) index = 1;
      currIndex = index;
    
      for(var i = 0; i < items.length; i++) {
          let item = items[i],
              box = item.getElementsByClassName('item__3d-frame')[0];
          if(i == (index - 1)) {
              item.classList.add('carousel__slider__item--active');
              box.style.transform = "perspective(1200px)"; 
          } else {
            item.classList.remove('carousel__slider__item--active');
              box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
          }
      }
    
      slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
  }
  
  function timer() {
      clearInterval(interval);    
      interval = setInterval(() => {
        move(++currIndex);
      }, intervalTime);    
  }
  
  function prev() {
    move(--currIndex);
    timer();
  }
  
  function next() {
    move(++currIndex);    
    timer();
  }
  
  
  function bindEvents() {
      window.onresize = resize;
      prevBtn.addEventListener('click', () => { prev(); });
      nextBtn.addEventListener('click', () => { next(); });    
  }




  
  init();
  
})();