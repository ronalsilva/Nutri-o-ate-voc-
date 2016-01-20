var fns = {
	lightboxOverlay:    $('<div class="lightboxOverlay"></div>'),

    lightboxBlock:      $('<div class="lightboxOverlayInner"></div><div class="lightboxBlock"><a href="#" class="lightboxClose"></a><div class="lightboxInner"></div></div>'),

    lightbox: function(content) {
        $(content).appendTo(".lightboxInner");

        var pageHeight = $(window).height();
        var pageWidth = $(window).width();
        var contentWidth = $(content).outerWidth();
        var contentHeight = $(content).outerHeight();
        var maxWidthContent = pageWidth * 0.8;
        var maxHeightContent = pageHeight * 0.8;

        if (contentWidth > maxWidthContent) {
            var contentWidthFinal = maxWidthContent;
        } else {
            var contentWidthFinal = contentWidth;
        }

        if (contentHeight > maxHeightContent) {
            var contentHeightFinal = maxHeightContent;
        } else {
            var contentHeightFinal = contentHeight;
        }

        $('.lightboxOverlay').css({
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'background-color': 'rgba(0,0,0,0.6)',
            'height': '100%',
            'width': '100%',
            'z-index': '5005'
        });

        $('.lightboxOverlay').addClass("open");

        console.log(contentHeightFinal);
        console.log(contentWidthFinal);

        $('.lightboxBlock').css("position", "fixed");
        $('.lightboxBlock').css("top", Math.max(0, ((pageHeight - contentHeightFinal) / 2)) + "px");
        $('.lightboxBlock').css("left", Math.max(0, ((pageWidth - contentWidthFinal) / 2) + $(window).scrollLeft()) + "px");

        $(".lightboxInner").css({
            'max-height': contentHeightFinal,
            'max-width': contentWidthFinal
        });
        // $(".lightboxInner " + content).css({'max-height': contentHeightFinal});

        $('.lightboxClose').click(function() {
            $('.lightboxOverlay').removeClass("open");
            $(".lightboxInner").empty();
        });

        $('.lightboxOverlayInner').click(function() {
            $('.lightboxOverlay').removeClass("open");
            $(".lightboxInner").empty();
        });
    },

	tabs: function(){
		$(".tabNav").on("click", ".tabLink", function() {
	        var ref = $(this).attr("data-ref");
	        $(".tabLink, .tabContent").removeClass("active");
	        $(this).addClass("active");
	        $(".tabsItems").find("."+ref).addClass("active");
	    });  
	},

	isMobile: function(){
		var userAgent = navigator.userAgent.toLowerCase();
		if( userAgent.search(/(android|avantgo|blackberry|iemobile|nokia|lumia|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i)!= -1 ){           
			$('.lightboxOverlay').remove();
		};
	},

	shareWindow: function(urlProduct, urlMediaProduct){
		var facebook = "https://www.facebook.com/sharer/sharer.php?u=" + urlProduct,
		twitter = "https://twitter.com/home?status=" + urlProduct,
		pinterest = "https://pinterest.com/pin/create/button/?url=" + urlProduct + "&media=" + urlMediaProduct,
		gplus = "https://plus.google.com/share?url=" + urlProduct;

		$(".shareProduct .facebook").attr("href", facebook);
		$(".shareProduct .twitter").attr("href", twitter);
		$(".shareProduct .pinterest").attr("href", pinterest);
		$(".shareProduct .gplus").attr("href", gplus);

		$(".shareProduct a").on("click", function(){
        	newwindow=window.open($(this).attr('href'),'','height=400,width=400');
        	if (window.focus) {newwindow.focus()}
        	return false;	
		});
	},

	imageFull: function(){
		$(".fullGallery .box-banner").each(function() {
           var bImg = $(this).find("img").attr("src");
           $(this).wrap("<div class='bannerImg' style='background:url("+bImg+") no-repeat center;'></div>");
           $(this).find("img").remove();
        });			
	},
}

var global = {
    floatHeader: function(){
    	var floatingBar=$(".floatHeader"),
    	logo = $(".pageHeader .logo .logoImg");
    	search = $(".pageHeader .searchBox .busca");
    	smartCart = $(".pageHeader .miniCart");
    	
	    $(window).bind("scroll",function(){
	        if($(this).scrollTop()>100){
	            floatingBar.fadeIn(100);
	            logo.addClass("floatElement");
	            search.addClass("floatElement");
	            smartCart.addClass("floatElement");
	        }
	        else{
	            logo.removeClass("floatElement");
	            search.removeClass("floatElement");
	            smartCart.removeClass("floatElement");
	            floatingBar.fadeOut(100);
	        }
	    }); 	
    },
    
    shelfDiscount: function(){
    	$('.shelf .flagDiscountHighlight').each(function() {
	        var descpct = $(this).text().replace(',', '.');
	        descpct = descpct.replace(' %', '');
	        descpct = parseFloat(descpct);
	        descpct = Math.ceil(descpct);
	        if ((descpct == "0") || (descpct == 0)) {
	            $(this).hide();
	        } else {
            	$(this).show();
            	$(this).html(descpct + "% off");
	        }
	    });
    },

    init: function () {
    	global.floatHeader();
    	global.shelfDiscount();
    }
}

var slider = {
	fullSlider: function (dots, arrows) { // banner tv fullscreen
        $(".fullGallery .box-banner").each(function() {
           var bImg = $(this).find("img").attr("src");
           $(this).find("a").attr("style","background:url("+bImg+") no-repeat center;");
           $(this).find("img").remove();
        });
        
        $(".mainGallery").slick({
            dots: dots,
            arrows: arrows,
            pauseOnHover: false,
            autoplay: false,
            autoplaySpeed: 4000
        });
    },

    fullSliderTabs: function (dots, arrows) { // banner tv fullscreen com abas
        var arrayDots = [];
        $(".fullGallery .box-banner").each(function() {
           var bImg = $(this).find("img").attr("src");
           $(this).find("a").attr("style","background:url("+bImg+") no-repeat center;");
           if(!$(this).hasClass('slick-cloned')) {
                var dotText = $(this).find('img').attr('alt');
                arrayDots.push(dotText)
            }
           $(this).find("img").remove();
        });
        
        $(".mainGallery").slick({
            dots: dots,
            arrows: arrows,
            pauseOnHover: false,
            autoplay: false,
            autoplaySpeed: 4000
        });

        $('.mainGallery .slick-dots li').each(function (i) {
            $(this).find('button').text(arrayDots[i]);
        });
    },

	singleSlider: function (dots, arrows) {
		$(".mainGallery").slick({
			dots: dots,
			arrows: arrows,
			pauseOnHover: false,
			autoplay: true,
  			autoplaySpeed: 4000
		});
	},

	shelfSlider: function (dots, arrows, slidesToShow, slidesToScroll) { 
		$(".shelfCarousel").each(function() {
            $(this).find("ul").slick({
                dots: dots,
                arrows: arrows,
                slidesToShow: slidesToShow,
                slidesToScroll: slidesToScroll,
                pauseOnHover: false,
                autoplay: false,
                autoplaySpeed: 4000,
            });
        });
    },

	multipleSlider: function (slidesToShow, slidesToScroll, vertical) {
		$(".carouselGallery").slick({
		    infinite: true,
		    slidesToShow: slidesToShow,
			slidesToScroll: slidesToScroll,
		    speed: 500,
		    vertical: vertical
		});
	},
}

var catalog = {
	smartResearch: function(){
		$(".navSidebar input[type='checkbox']").vtexSmartResearch({
	        callback:function() {
	           global.shelfDiscount();
	        }
	    });
	},

	toggleFilter: function(){
		$(".refino").each(function(){
			$(this).find("h5").on("click", function(){
				$(this).next("div").slideToggle();
				$(this).toggleClass("active");
			})
		})
	},

	switchView: function () {
        var typeGrid = $(".switchView").find("span"),
            grid3 = $(".view3Col"),
            grid2 = $(".view2Col"),
            vitrinePrateleira = $(".resultItemsWrapper");

        grid3.addClass('active');

        typeGrid.on("click", function () {

            if (!$(this).hasClass("active")) {
                $(".vitrine > ul").hide(0).delay(300).fadeIn(400);
            };

            typeGrid.removeClass('active');
            $(this).addClass('active');

            if (grid3.hasClass('active')) {
                vitrinePrateleira.removeClass("col2");
                vitrinePrateleira.addClass("col3");
        		$(".productList li").removeClass("last");
        		$(".productList li:nth-child(3n)").addClass("last");

            } else if (grid2.hasClass('active')) {
                vitrinePrateleira.removeClass("col3");
                vitrinePrateleira.addClass("col2");
        		$(".productList li").removeClass("last");
        		$(".productList li:nth-child(2n)").addClass("last");
            }
        });
    },

	searchWord: function () {
	  	var url = window.location.toString().split('/'),
        split_ft = url[3].split('?'),
        termo = split_ft[0];

		// var word = $(".resultado-busca-termo:eq(0)").find("strong").text();
		$(".topInfo .titulo-sessao").html('Resultado da busca: <em>"' + termo + '"</em>');
	},

	init: function  () {
		catalog.smartResearch();
		catalog.toggleFilter();
		catalog.searchWord();
		catalog.switchView();
	}
}

var product = {
    share: function(){
		var urlProduct = window.location.href;
		var urlMediaProduct = $("#image img").attr("src");
		
		fns.shareWindow(urlProduct, urlMediaProduct);
	},

	superZoom: function (width, height) {
		window.LoadZoom = function (pi) {
			if($(".image-zoom").length<=0) return false;			
			var optionsZoom = {
				zoomWidth: width,
				zoomHeight: height,
				preloadText: ''
			};			
	    	$(".image-zoom").jqzoom(optionsZoom);
		}
	    LoadZoom(0);
	},

	retingLightbox: function () {
		$("#lnkPubliqueResenha").on("click", function (event) {
			event.preventDefault();
			var stars = $('#resenha .avalie-produto').clone();
			var lightboxStars = '\
				<div class="lb"><div class="lbBg"></div>\
				   	<div class="lbContent">\
						<span class="closeLB">x</span>\
						<p class="title">O que você achou desse produto?</p>\
						<div class="rateStars">'+stars+'</div>\
						<a href="#" class="bt-continuar">Fazer avaliação do produto</a>\
				   	</div>\
				</div>';
			
			$('body').prepend(lightboxStars);

		})
		$(document).on("click", ".lb .bt-continuar, .closeLB", function(event) {
	        event.preventDefault();
	        $(".lb").fadeOut("slow").remove();
	    });
	},

	init: function(){
		product.share();
		product.superZoom(530,530);
		product.retingLightbox();
	}
}

var institutional = {
	linkSidebar: function (){
        $(".institutionalLinks li a").each(function(){
            var link = $(this).attr('href');
            var url = window.location.pathname;
            if(link == url){
                $(this).addClass("current");
            }
        });
    },

    init: function(){
    	institutional.linkSidebar();
    }
}

$(document).ready(function () {
	$(".helperComplement").remove();
	
	global.init();
	
	fns.tabs();

  	
	if ($('body').hasClass("home")) {		
		//carrega produtos categorias
  		//  $(".categoriesHighlight .column").each(function () {
		// 	var url = "/buscapagina?fq=C%3a%2f12%2f&PS=12&sl=ef3fcb99-de72-4251-aa57-71fe5b6e149f&cc=12&sm=0&PageNumber=1";
		// 	var container = $(this).find(".categoryProducts");

		// 	$.ajax({
		// 	  	url: url
		// 	}).done(function( data ) {
		// 		container.html(data);

		// 		$(".helperComplement").remove();

		//         container.find("ul").slick({
		//             dots: false,
		//             arrows: true,
		//             slidesToShow: 1,
		//             infinite: false,
		//             vertical: true,
		//         });
		// 	});
		// });

		slider.shelfSlider(false, true, 3, 3);

		slider.singleSlider(true, false);

        // carousel vertical produtos categorias
		$(".categoriesHighlight .categoryProducts").each(function() {
	        $(this).find("ul").slick({
	            dots: false,
	            arrows: true,
	            slidesToShow: 1,
	            vertical: true,
	            adaptiveHeight: true
	        });
	    });
	}

	if ($('body').hasClass("product")) {
		slider.shelfSlider(false, true, 4, 4);

		slider.singleSlider(true, true);

		product.init();
	};

	if ( $('body').hasClass("catalog")) {
		catalog.init();
		slider.singleSlider(true, true);

		$(".orderBy:eq(0)").appendTo(".sortOptions");
	};

	if ($('body').hasClass("institutional")) {
		institutional.init();
	};
});


$(document).ajaxStop(function () {
	$(".helperComplement").remove();
});


//plugins
$.fn.countSlider = function () {
    var slidesToShow = $(this).attr("data-slidesToShow");
	slidesToShow = parseInt(slidesToShow);

	$(this).slick({
	    slidesToShow: slidesToShow,
	    slidesToScroll: slidesToShow,
	    speed: 500,
	    infinite:false,
	    dots: true,
	    dotsClass: 'custom_paging',
	    customPaging: function (slider, i) {
	 		//FYI just have a look at the object to find aviable information
	 		//press f12 to access the console
	 		//you could also debug or look in the source
	 		return (i + 1);
		}
	});
	var totalSlide = $(this).slick('getSlick');
	totalSlide = totalSlide.slideCount;
	totalSlideMath = totalSlide/slidesToShow;
	totalSlideMath = Math.ceil(totalSlideMath);
	
	$(this).append('<div class="slideNumbers"><div class="numbers"><span class="slideNumbersItem current">'+1+ ' </span><span class="slideNumbersItem sep"> de</span> <span class="slideNumbersItem total">'+totalSlideMath+'</span></div></div>');

	$(this).on('afterChange', function(event, slick, currentSlide, nextSlide){
		var slidesToShow = $(this).find(".custom_paging .slick-active").text();
		$(this).find(".slideNumbersItem.current").text(slidesToShow);		
	});

	var slideNum = $(this).find(".slideNumbers");
	$(this).find("button").appendTo(slideNum);
};

$.fn.centerImg = function () {
    this.css("position","relative");
    this.css("left", ( $(window).width() - this.attr('width') ) / 2+$(window).scrollLeft() + "px");
    return this;
}