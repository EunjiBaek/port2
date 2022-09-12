//   function scrollProgress() {
//     let scrollTop =
//       (document.documentElement.scrollTop ||
//         window.scrollY ||
//         window.pageYOffset) + window.innerHeight;
//     const section1_tit = document.querySelector("#section1 h1");
//     if (scrollTop > section1_tit.offsetTop) {
//       let offset = (scrollTop - section1_tit.offsetTop) * 0.05;
//       document.querySelector("#section1 h1 >em:first-child").style.transform =
//         "translateX(" + -offset + "px)";
//       document.querySelector("#section1 h1 >em:last-child").style.transform =
//         "translateX(" + offset + "px)";
//     }
//   }
//   window.addEventListener("scroll", scrollProgress);
// gsap.registerPlugin(ScrollTrigger);
// const pageContainer = document.querySelector(".container");
// const scroller = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
// });

// scroller.on("scroll", ScrollTrigger.update);

// ScrollTrigger.scrollerProxy(".container", {
//   scrollTop(value) {
//     return arguments.length
//       ? scroller.scrollTo(value, 0, 0)
//       : scroller.scroll.instance.scroll.y;
//   },
//   getBoundingClientRect() {
//     return {
//       left: 0,
//       top: 0,
//       width: window.innerWidth,
//       height: window.innerHeight,
//     };
//   },
//   pinType: pageContainer.style.transform ? "transform" : "fixed",
// });

// window.addEventListener("load", function () {
//   let pinBoxes = document.querySelectorAll(".pin-wrap > *");
//   let pinWrap = document.querySelector(".pin-wrap");
//   let pinWrapWidth = pinWrap.offsetWidth;
//   let horizontalScrollLength = pinWrapWidth - window.innerWidth;

// Pinning and horizontal scrolling

//   gsap.to(".pin-wrap", {
//     scrollTrigger: {
//       scroller: pageContainer, //locomotive-scroll
//       scrub: true,
//       trigger: "#section3",
//       pin: true,
//       // anticipatePin: 1,
//       start: "top top",
//       end: pinWrapWidth,
//     },
//     x: -horizontalScrollLength,
//     ease: "none",
//   });

//   ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll

//   ScrollTrigger.refresh();
// });

// ScrollTrigger.addEventListener("refresh", () => scroller.update());

// ScrollTrigger.refresh();

window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  const pageContainer = document.querySelector("#main");
  pageContainer.setAttribute("data-scroll-container", "");

  const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true,
    getDirection: true,
  });

  scroller.on("scroll", function (t) {
    document.documentElement.setAttribute("data-direction", t.direction);
  });

  scroller.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroller.scrollTo(value, 0, 0)
        : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed",
  });

  let horizontalSections = document.querySelectorAll(".horizontal-scroll");

  horizontalSections.forEach((horizontalSection) => {
    let pinWrap = horizontalSection.querySelector(".pin-wrap");
    let pinWrapWidth = pinWrap.offsetWidth;
    let horizontalScrollLength = pinWrapWidth - window.innerWidth;
    gsap.to(pinWrap, {
      scrollTrigger: {
        scroller: "[data-scroll-container]",
        scrub: true,
        trigger: horizontalSection,
        pin: true,
        start: "top top",
        end: () => `+=${pinWrapWidth}`,
        invalidateOnRefresh: true,
      },
      x: -horizontalScrollLength,
      ease: "none",
    });
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());
  ScrollTrigger.refresh();
});

$(document).ready(function () {
  $(".button_su_inner").mouseenter(function (e) {
    var parentOffset = $(this).offset();

    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".su_button_circle").css({ left: relX, top: relY });
    $(this).prev(".su_button_circle").removeClass("desplode-circle");
    $(this).prev(".su_button_circle").addClass("explode-circle");
  });

  $(".button_su_inner").mouseleave(function (e) {
    var parentOffset = $(this).offset();

    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".su_button_circle").css({ left: relX, top: relY });
    $(this).prev(".su_button_circle").removeClass("explode-circle");
    $(this).prev(".su_button_circle").addClass("desplode-circle");
  });
});
