/*global $, window, WOW*/

$(function () {
    
    "use strict";
    
    var win = $(window),
        htmlBody = $("html, body"),
        scrollToTop = $(".scroll-top"),
        navBar = $(".navbar"),
        countersCheck = false;
        
    
    /*========== Loading  ==========*/
    $(".loading").animate({
        "top": "-100%" 
    }, 700, function () {
        $(this).remove();
    });
    
    /*========== Navbar Animation On Scroll  ==========*/
    function activeNavbar() {
        
        if (win.scrollTop() > 20) {
            navBar.addClass("active-nav");
        } else {
            navBar.removeClass("active-nav");
        }
        
    }
    
    activeNavbar();
    
    win.on("scroll", function () {
        activeNavbar();
    });
    
    /*========== Mobile Menu  ==========*/
    $(".navbar .menu-toggle").on("click", function () {
        navBar.toggleClass("menu-active");
    });
    
    /*========== Smooth Scroll  ==========*/
    $(".navbar .navbar-nav > li:not('.nav-brand') > a").on("click", function (e) {
		if ($(this).attr('href').charAt(0) === "#") {
			e.preventDefault();
		}
        var selector = $(this);
        htmlBody.animate({
            scrollTop: $(selector.attr("href")).offset().top - 62
        }, 600);
    });
    
    /*========== Add Class Active to Menu Links on Scrolling  ==========*/
    win.on("scroll", function () {
        $("section").each(function () {
            if (win.scrollTop() >= $(this).offset().top - 63) {
                $(".navbar .navbar-nav > li > a[href='#" + $(this).attr("id") + "']").addClass("active").parent().siblings().find("a").removeClass("active");
            }
        });
    });
	
	/*========== Start Scroll For Link To Go Section  ==========*/
    $(".home .main-btn, .call-to-action .main-btn").on("click", function (e) {
		if ($(this).attr('href').charAt(0) === "#") {
			e.preventDefault();
		}
        var selector = $(this); 
        htmlBody.animate({
            scrollTop: $(selector.attr("href")).offset().top - 62
        }, 800);
    });
	
	$(".header .main-btn").on("click", function (e) {
		if ($(this).attr('href').charAt(0) === "#") {
			e.preventDefault();
		}
        var selector = $(this); 
        htmlBody.animate({
            scrollTop: $(selector.attr("href")).offset().top
        }, 800);
    });
	
	/*========== Scroll To Top  ==========*/
    function scrollUp() {
        if (win.scrollTop() >= 1100) {
            scrollToTop.addClass("active");
        } else {
            scrollToTop.removeClass("active");
        }
    }
    
    scrollUp();
    
    win.on("scroll", function () {
        scrollUp();
    });
    
    scrollToTop.on("click", function (e) {
        e.preventDefault();
        htmlBody.animate({
            scrollTop: 0
        }, 800);
    });
    
    /*========== Start Portfolio Trigger Filterizr Js  ==========*/
    $("#control li").on('click', function () {
        $(this).addClass('active').siblings("li").removeClass('active');
    });
    // The Filterizr
    $('#filtr-container').filterizr({
        animationDuration: 0.4
    });
    
    /*========== Start Magnigic Popup Js ==========*/
    if ($('.portfolio-content .item')[0]) {

        $('.portfolio-content .item').magnificPopup({
            delegate: '.icon-img',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
    
    /*========== counters  ==========*/
    if (!countersCheck && $(this).scrollTop() >= $(".counters").offset().top - 400) {
        $(".counters .counter-number").countTo();
        countersCheck = true;
    }
    
    win.on("scroll", function () {
        if (!countersCheck && $(this).scrollTop() >= $(".counters").offset().top - 400) {
            $(".counters .counter-number").countTo();
            countersCheck = true;
        }
    });
    
    /*========== Owl Carousel Js Testimonial  ==========*/
    $(".testimonials .owl-carousel").owlCarousel({
        items: 3,
        autoplay: true,
        smartSpeed: 500,
        margin: 30,
        loop: true,
        autoplayHoverPause: true,
        responsiveClass: true,
		responsive: {
            0: {
                items: 1
            },
            991: { 
                items: 3
            }
        }
    });
	
	/*========== Ajax Contact Form  ==========*/
	$('.contact-form').on("submit", function () {
		
		var myForm = $(this),
			data = {};
		
		myForm.find('[name]').each(function() {
			
			var that = $(this),
				name = that.attr('name'),
				value = that.val();
			
			data[name] = value;
			
		});
		
		$.ajax({
			
			url: myForm.attr('action'),
			type: myForm.attr('method'),
			data: data,
			success: function (response) {
				
				if (response == "success") {
								
					$(".contact-form").find(".form-message").addClass("success");
					$(".form-message span").text("Message Sent!");
					
				} else {
					
					$(".contact-form").find(".form-message").addClass("error");
					$(".form-message span").text("Error Sending!");
					
				}
			}
			
		});
		
		return false;
		
	});
    
    /*========== Fire wow js Plugin  ==========*/
    new WOW().init();
    
});