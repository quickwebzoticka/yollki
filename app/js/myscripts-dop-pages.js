$(document).ready(function() {

	var   ulPos,
		  winPos,
		  borderPos,
		  leftMenu,
		  menu,
		  accordionItem,
		  accordionItemHeader;

	accordionItem = $('.accordion-item__content');
	accordionItemHeader = $('.accordion-item__header');

	$('body').on('click', '.accordion-item__header', function(event) {
		event.preventDefault();
		accordionItemHeader.removeClass('accordion-item__header__active');
		accordionItem.removeClass('accordion-item__content__active');
		$(this).siblings('.accordion-item__content').toggleClass('accordion-item__content__active');
		$(this).addClass('accordion-item__header__active');
	});

	menu = $('.menu');
	winPos = $(window).scrollTop();
	leftMenu = $('.left-menu');

	//измерение ширины экрана
	var width = parseInt($('html').css('width'), 10);

	function fullMenu(){
		$('.left-menu').removeClass('left-menu_active');
		$('.logo').removeClass('logo_active');
		$('.nav').css('opacity', '1');
		$('.nav').slideDown('slow');
		if (width <= 1024) {
			$('.menu').addClass('menu_active')
		} else {
			$('.menu').fadeOut('fast');
		}
		
	};

	function shortMenu(){
		$('.left-menu').addClass('left-menu_active');
		$('.logo').addClass('logo_active');
		if (width <= 1024) {
			$('.menu').removeClass('menu_active');
			$('.nav').slideUp('slow');
		} else {
			$('.menu').fadeIn('fast');
			$('.nav').fadeOut('fast');
		}
	};

	function rightSideActive(){
		$('.right-side__bottom').addClass('right-side__bottom_active');
	};

	function rightSideDeactive(){
		$('.right-side__bottom').removeClass('right-side__bottom_active');
	};

	function parallax(){
		$('.nature_trees').css('transform', 'translate3d(0, ' + -(winPos * 0.3 - 300) + 'px, 0)');
	};

	function openMenu() {
		menu.click(function(event) {
			if (width <= 1024) {
			  if (menu.hasClass('menu_active')) {
			  	shortMenu();
			  	leftMenu.css('height', '79px');
			  } else {
			  	fullMenu();
			  	leftMenu.css('height', '100%');
			  }
			} else {
				fullMenu();
			}
		});
	};
	function closeMenu() {
		$(document).click( function(event){
			if (width > 1920 && winPos < 900) {
			  return;
			} else {
			  if( $(event.target).closest(".left-menu").length) 
	        	return;
		      event.stopPropagation();
		      shortMenu();
			}
			  
	    });
	};

  	function openContacts() {
	  	$('.head_contact-info').addClass('head_contact-info_active');
	  	$('.head_contact-info_wrapper').addClass('head_contact-info_wrapper_active');
	  	shortMenu();
  	};

	 function activateAnim() {
	 	if (winPos >= ulPos - 500) {
			$('.redline').addClass('redline_active');
			ulPos = 99999999;
		};

		if (winPos >= borderPos - 500) {
			$('.minutes_p').addClass('minutes_p_active');
			$('.minutes_border').addClass('minutes_border_active');
			ulPos = 99999999;
		};
	 };

	//отслеживание проскролленной высоты документа
	$(window).scroll(function(){
		winPos = $(window).scrollTop();
		activateAnim();
		parallax();
		if (width > 1920) {
			if (winPos >= 900) {
				shortMenu();
			} else {
				fullMenu();
			};
		} else {
			shortMenu();
		}
		if (width > 1024) {
			if (winPos > 700) {
				rightSideActive();
			} else {
				rightSideDeactive();
			}
			
		}
		
	});	
	 //подключение якоря для скролифая при смещении карты
	  if (width < 1450) {
	  	$('.consult .map').addClass('smooth-slide');
  	};

	 //вывод количества слайдов
	  if (width >= 1330 && width < 1450) {

	    var swiper = new Swiper('.swiper-container', {
	      slidesPerView: 3,
	      spaceBetween: 10,
	      loop: false,
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
	    });

	    shortMenu();

	  } else if (width < 1330) {

	  	var swiper = new Swiper('.swiper-container', {
	      slidesPerView: 2,
	      spaceBetween: 10,
	      loop: false,
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
	    });

	    shortMenu();

	  } else {

	    var swiper = new Swiper('.swiper-container', {
	      slidesPerView: 4,
	      spaceBetween: 10,
	      loop: true,
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
	    });
	  };

	  //включение скролифая только на больших экранах
	  // if (width >= 1024) {
	  //   $.scrollify({
		 //    section : ".smooth-slide",
		 //    sectionName : "section-name",
		 //    interstitialSection : "",
		 //    easing: "easeOutExpo",
		 //    scrollSpeed: 1100,
		 //    offset : 0,
		 //    scrollbars: true,
		 //    setHeights: false,
		 //    overflowScroll: false,
		 //    updateHash: false,
		 //    touchScroll:true,
		 //  });

	    //выключение скроллифи при ховере на левое меню
	  //   leftMenu.hover(function() {
			// 	$.scrollify.disable();
		 //    },
		 //    function(){
		 //    	$.scrollify.enable();
		 //    });
	  // };

	//выключение обычного скролла при скролле левого меню
    leftMenu.bind('mousewheel DOMMouseScroll', function(e) {
	    var scrollTo = null;
	    if (e.type == 'mousewheel') {
	        scrollTo = (e.originalEvent.wheelDelta * -1);
	    }
	    else if (e.type == 'DOMMouseScroll') {
	        scrollTo = 40 * e.originalEvent.detail;
	    }
	    if (scrollTo) {
	        e.preventDefault();
	        $(this).scrollTop(scrollTo + $(this).scrollTop());
	    }
	});
	//открытие меню по клику .menu
	openMenu();
	//параллакс
	parallax();
	//активация анимации
	activateAnim();
	//закртыие меню при клике вне
 	closeMenu();

	//инициализация галереи Архитектуры
	var swiperArch = new Swiper('.swiper-container-arch', {
      slidesPerView: 1,
      navigation: {
        nextEl: '.swiper-button-next-arch',
        prevEl: '.swiper-button-prev-arch',
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });

	//открывания подменю
	  $('.has_sub').click(function(event) {
	  	$(this).children('.submenu').toggle('fast');
	  	$(this).toggleClass('has_sub_active');
	  });

	 //открытие контактов 
	  $('.head_contacts').click(openContacts);
	  $('.li_contacts').click(openContacts);

	 //закрытие контактов
	  $('.cross').click(function(event) {
	  	$('.head_contact-info').removeClass('head_contact-info_active');
	  	$('.head_contact-info_wrapper').removeClass('head_contact-info_wrapper_active');
	  	if (width > 1920 && winPos < 900) {
	  		fullMenu();
	  	}
	  });

	 //переключение текстов
	  $('.icons').click(function(event) {
	  	$('.icons').removeClass('icons_active');
	  	$(this).addClass('icons_active');

	  	let i = $(this).index('.icons');
	  	let t = $('.text-1');
	  	t.removeClass('text-1_active');
  		t.eq(i).addClass('text-1_active');
	  });

	  $('.img-popup').magnificPopup({ //инициализация магнифик
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 500
		}
	  });

	  var number,
	  	  images;

	  images = $('.img-wrapper');

	  function getNumber() {
	  	number = $('.floor__name .number').html();
	  	number = parseInt(number);
	  	return number;
	  }

	  function switchImg(number) {
	  	$('.img-wrapper').removeClass('img__active');
  		$('.img-wrapper:eq(' + (number - 1) + ')').addClass('img__active');
	  }

  	  $(document).on('click', '.floor__arrow-up', function(event) {
  	  	event.preventDefault();
  	  	let number = getNumber();
  	  	if (number >= 1 && number < 12) {
  	  		number = ++number;
  	  		$('.floor__name .number').html(number);
  	  	}
  	  	switchImg(number);
  	  });

  	  $(document).on('click', '.floor__arrow-down', function(event) {
  	  	event.preventDefault();
  	  	let number = getNumber();
  	  	if (number > 1 && number <= 12) {
  	  		number = --number;
  	  		$('.floor__name .number').html(number);
  	  	}
  	  	switchImg(number);
  	  });


  	  function calculationIpoteka() {
  	  	var a, b, c, result, summ;
  	  	a = $('#appartment-cost').val();
  	  	b = $('#appartment-firstpayment').val();
  	  	c = $('#appartment-term').val();
  	  	result = $('#appartment-output');
  	  	add = $('#appartment-output-add');

  	  	if (a > 0 && b > 0 && c > 0) {
			summ = parseInt((a - b) / (c * 12));
	  		result.text(summ);
	  		add.text(' руб.');
  	  	}

  	  	if (a < 0 || b < 0 || c < 0) {
  	  		result.text('Некорректные данные');
  	  		add.text('');
  	  	}
  	  }
  	  $('.ipoteka-input').keyup(function(event) {
  	  	calculationIpoteka();
  	  });

  	  $(document).on('click', '.grid-item', function(event) {
  	  	event.preventDefault();
  	  	let a = $('.grid-item');
  	  	a.removeClass('grid-item__active');
  	  	$(this).addClass('grid-item__active');
  	  	
  	  	let b = $(this).find('.text').html(),
  	  		c = $('.main-text h2'),
  	  		d = c.offset().top - 100;
  	  	console.log(c);
  	  	c.html(b);

  	  	$('body, html').animate({scrollTop: d}, 1000);
  	  });

  	  let windowWidth = $(window).innerWidth();
  	  console.log(windowWidth);

  	  if (windowWidth <= 1366) {
  	  	moveBtn();
  	  }

  	  $(window).resize(function(){
  	  	windowWidth = $(window).innerWidth();
  	  	if (windowWidth <= 1366) {
  	  		moveBtn();
  	  	} else {
  	  		moveBackBtn();
  	  	}
  	  });

  	  function moveBtn() {
  	  	let a = $('.dop-page__wrapper .main-text .both-side .right-side .btn-wrapper');
  	  	a.append($('.dop-page__wrapper .main-text .both-side .left-side .wrapper_flex'));
  	  };

  	  function moveBackBtn() {
  	  	let a = $('.dop-page__wrapper .main-text .both-side .left-side');
  	  	a.append($('.dop-page__wrapper .main-text .both-side .right-side .btn-wrapper .wrapper_flex'));
  	  };

  	  $(document).on('click', '.btn-go-top', function(){
  	  	let grid = $('.grid').offset().top - 100;

  	  	$('body, html').animate({scrollTop: grid}, 1000);

  	  });
});