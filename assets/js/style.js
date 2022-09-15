const header = document.querySelector("#header");
const mainText = document.querySelector(".main-text");
const scroll = document.querySelector(".scroll-dowm");

//로딩소스
let loader = document.querySelector(".loader");
let loaderText = document.querySelector(".loader-text");
let num = 0;
let interval = setInterval(progress);

function Isloading() {
  progress();
}

Isloading();

function progress() {
  num++;
  loaderText.innerText = num + "%";

  if (num === 100) {
    clearInterval(interval);
    setTimeout(() => {
      loader.style.display = "none";

      gsap.from(header, { duration: 0.8, opacity: 0, delay: 0.1 });
      gsap.from(mainText, { duration: 0.8, y: -20, opacity: 0, delay: 1 });
      gsap.from(scroll, { duration: 1, y: -20, opacity: 0, delay: 1.3 });
    }, 500);
  }
}

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

// 메인 이펙트
function loading() {
  setTimeout(() => {
    const tl = gsap.timeline();
    tl.to("#header", { duration: 0.5, top: 0 });
  }, 10500);
}
loading();

//Javascript
//기본 세팅
