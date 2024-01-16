'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const scrollTo=document.querySelector('.btn--scroll-to')

const section_1=document.getElementById('section--1')
const navLinks=document.querySelector('.nav__links')

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



scrollTo.addEventListener('click',function(){
section_1.scrollIntoView({behavior:'smooth'})
})

navLinks.addEventListener('click',function(e){
    e.preventDefault()

    if(e.target.classList.contains('nav__link')){
        const id=    e.target.getAttribute('href')

        document.querySelector(id).scrollIntoView({behavior:'smooth'})
    }
})



const tabCont=document.querySelector('.operations__tab-container')

const opsContent=document.querySelectorAll('.operations__content')
const tabs=document.querySelectorAll('.operations__tab')


tabCont.addEventListener('click',function(e){
const clicked=e.target.closest('.operations__tab');

if(!clicked) return 


opsContent.forEach(el=>el.classList.remove('operations__content--active'))



tabs.forEach(el=>el.classList.remove('operations__tab--active'))

clicked.classList.add('operations__tab--active')

document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

console.log(clicked.dataset.tab);

})


const navBar=document.querySelector('.nav')


function navBarFade(e,opacity){

  if(e.target.classList.contains('nav__link')){

    const link=e.target
    
    const otherLinks=link.closest('.nav').querySelectorAll('.nav__link')
    
    otherLinks.forEach(el=>{
      if(el!==link){
        el.style.opacity=opacity
      }
    })

const logo=link.closest('.nav').querySelector('.nav__logo')

logo.style.opacity=opacity


}
}

navBar.addEventListener('mouseover',function(e){
  navBarFade(e,0.5)



})

navBar.addEventListener('mouseout',function(e){
  navBarFade(e,1)
})
    



const callback=entries=>{

  const [entry]=entries;
 if(!entry.isIntersecting){
  navBar.classList.add('sticky')
 }
 else{
  navBar.classList.remove('sticky')
 }
}
const header= document.querySelector('.header');

const headerInt=new IntersectionObserver(callback,{
  root:null,
  threshold:0,
  rootMargin:'-90px',
})

headerInt.observe(header)

const sections= document.querySelectorAll('.section')

const callback1=(entries,observer)=>{
  const [entry]=entries
  if(!entry.isIntersecting){
    return
  }

  else{
    entry.target.classList.remove('section--hidden')
  }
  // obs.unobserve(entry.target)

  observer.unobserve(entry.target)
}

const secObs=new IntersectionObserver(callback1,{
  root:null,
  threshold:0.15
})

sections.forEach(entry=>{
  secObs.observe(entry)
  entry.classList.add('section--hidden')
 } )


 const imgTarget=document.querySelectorAll('img[data-src]')
 console.log(imgTarget);
 

 const callback2=(entries,obs)=>{
  const [entry]=entries;
  if(!entry.isIntersecting) return
    entry.target.src=entry.target.dataset.src
  

  entry.target.addEventListener('load',function(){


    entry.target.classList.remove('lazy-img')
  })

  obs.unobserve(entry.target)
 }


 const imgObserver=new IntersectionObserver(callback2,{
  root:null,
  threshold:0.15,
  rootMargin:'200px'
 })

 imgTarget.forEach(entry=>imgObserver.observe(entry))




 const sliderLeft=document.querySelector('.slider__btn--left')
 const sliderRight=document.querySelector('.slider__btn--right')
let currSlide=0;

const slides=document.querySelectorAll('.slide')
const totalSlides=slides.length

 slides.forEach((e,i)=>{
  e.style.transform=`translateX(${i*100}%)`;
 });

 sliderRight.addEventListener('click',function(){
  if(currSlide<totalSlides-1){
  currSlide++
  }
  else{
    currSlide=0
  }

  slides.forEach((e,i)=>{
    e.style.transform=`translateX(${(i-currSlide)*100}%)`;
   });

 })


sliderLeft.addEventListener('click',function(){
 
  if(currSlide===0){
  currSlide=totalSlides-1
  }
  else{
    currSlide--
  }

  slides.forEach((e,i)=>{
    e.style.transform=`translateX(${(i-currSlide)*100}%)`;
   });

 })

 //1:-100,0,100
const dotConatiner=document.querySelector('.dots')

const createDots= function(){
  slides.forEach((_,i)=>{
  dotConatiner.insertAdjacentHTML('beforeend',`<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`)
 })
}
 createDots()

 const dost=document.querySelectorAll('.dots__dot')
 console.log(dost);

 dost.forEach(element=>{

  element.addEventListener('click',function(){

   currSlide= element.dataset.slide
   slides.forEach((e,i)=>{
    e.style.transform=`translateX(${(i-currSlide)*100}%)`;
    element.classList.add('dots__dot--active')
    
   });
  })
 })

 document.addEventListener('keydown',function(e){

if(e.key==="ArrowLeft"){if(currSlide===0){
  currSlide=totalSlides-1
  }
  else{
    currSlide--
  }

  slides.forEach((e,i)=>{
    e.style.transform=`translateX(${(i-currSlide)*100}%)`;
   });}

   if(e.key==="ArrowRight"){
    if(currSlide<totalSlides-1){
      currSlide++
      }
      else{
        currSlide=0
      }
    
      slides.forEach((e,i)=>{
        e.style.transform=`translateX(${(i-currSlide)*100}%)`;
       });
    
   }


 })