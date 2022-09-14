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
  // 햄버거메뉴
  $(".btn-menu").click(function () {
    $(".slide_menu_wrap").addClass("show");
  });

  $("nav.slide_menu a").click(function (e) {
    $(".slide_menu_wrap").removeClass("show");
  });

  $(".mgnb-close").click(function (e) {
    $(".slide_menu_wrap").removeClass("show");
  });

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

  // 모달팝업 script
  const get = (target) => {
    return document.querySelector(target);
  };

  const getAll = (target) => {
    return document.querySelectorAll(target);
  };

  const $modal = get(".modal");
  const $modalCancelButton = get(".modal_button.cancel");
  const $body = get("body");
  const $modal_header = document.querySelector(
    ".modalContent > .modal_header > span"
  );
  const $modal_subtitle = document.querySelector(
    ".modalContent > .sub_title > span"
  );
  const $modal_body = document.querySelector(".modalContent > .modal_body");
  const $detail_page_btn = getAll(".detail_page_btn");

  // 모달내용 비우기
  $modal_header.innerHTML = undefined;
  $modal_subtitle.innerHTML = undefined;
  $modal_body.innerHTML = undefined;

  const toggleModal = () => {
    $modal.classList.toggle("show");
    $body.classList.toggle("scroll_lock");
    document.querySelector("html").classList.toggle("scroll_lock");
  };

  $detail_page_btn.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
      e.preventDefault();
      toggleModal();
      $modal_body.scrollTop = "0";
      let $header = elem.getAttribute("data-header"),
        $value = elem.getAttribute("data-value");
      $modal_header.textContent = $header;
      $modal_subtitle.textContent = $value;

      let idx = Array.from($detail_page_btn).indexOf(e.currentTarget);
      $modal_body.innerHTML = "";
      if (idx === 0) {
        $modal_body.innerHTML = `<img src="./assets/img/publishing_detail/Kauction_renewal_detail.png" alt="" style="box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);">`;
      } else if (idx === 1) {
        $modal_body.innerHTML = `<img src="./assets/img/publishing_detail/megabox_detail.png" alt="" style="box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);">`;
      } else {
        $modal_body.innerHTML = `<img src="./assets/img/publishing_detail/nike_detail.png" alt="" style="box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);">`;
      }
    });
  });

  $modalCancelButton.addEventListener("click", () => {
    toggleModal();
  });

  window.addEventListener("click", (e) => {
    if (e.target === $modal) {
      toggleModal();
    }
  });
});
