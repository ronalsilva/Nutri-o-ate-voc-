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

    menu: function(){
    	var menuOutObject;
		var menuOutTimer;

		$(".menu-departamento ul").each(function(){
			if(!$(this).find("li").length){
				$(this).remove();
			}
		});

		$(function() {
			$('.pageNav .menu-departamento h3').hover(
				function() {
					menuOutObject = $(this).next('ul');
					y = $(this).position().left;
					menuOutObject.css('left', y);

					if (!menuOutObject.is(':visible')) {
						hideMenuSubItems($('.pageNav .menu-departamento ul:visible'));
					}
					clearTimeout(menuOutTimer);
					menuOutObject.fadeIn();
				},

				function() {
					menuOutTimer = setTimeout(function() {
					hideMenuSubItems(menuOutObject);
				}, 10);
			});

			$('.pageNav .menu-departamento ul').hover(
				function() {
					menuOutObject = $(this);
					clearTimeout(menuOutTimer);
				},
				function() {
					menuOutTimer = setTimeout(function() {
					hideMenuSubItems(menuOutObject);
				}, 10);
			});

			$(".pageNav .menu-departamento ul").mouseover(function(){
			    $(this).prev('h3').addClass("active");
			});
			$(".pageNav .menu-departamento ul").mouseout(function(){
			    $(this).prev('h3').removeClass("active");
			});
		});

		function hideMenuSubItems(o) {
			o.fadeOut(10);
		}
    },

    newsletter: function(){
        function closeNews() {
            $('.lightboxOverlay').fadeOut(500, function(){
                $(this).remove();
            });
            
            $.cookie("newsletter", "ok", { path: '/', expires: 10 });
        }

        if(!$.cookie("newsletter")){
            newsLightbox = $(".newsLightbox");

            fns.lightboxOverlay.appendTo('body');
            fns.lightboxBlock.appendTo('.lightboxOverlay');         

            fns.lightbox(newsLightbox);
        
            $('.lightboxClose').click(function(e){
                e.preventDefault();
                closeNews();
            });
        }
        
        if($.cookie("newsletter") == "ok"){
            $('.newsLightbox').remove();
        }

        $(document).ajaxStop(function(){
            $.cookie("newsletter", "ok", { path: '/', expires: 10 });
            if ($(".newsLightbox fieldset").hasClass('success')) { // customização da output de sucesso

            };
        });

        fns.isMobile();
    },
    
    init: function () {
    	global.floatHeader();
    	global.menu();
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

	shelfSlider: function (dots, arrows, slidesToShow, slidesToScroll) { // carrossel de produtos
        $(".shelfCarousel").each(function() {
            $(this).find("ul").slick({
                dots: dots,
                arrows: arrows,
                slidesToShow: slidesToShow,
                slidesToScroll: slidesToScroll,
                pauseOnHover: false,
                autoplay: false,
                autoplaySpeed: 4000
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
		$(".navSidebar input[type='checkbox']").vtexSmartResearch();	
	},

	buscaVazia: function () {
		var pagina_busca = $('.search-result'),
	        busca_vazia = $('.busca-vazio');

		if (pagina_busca[0]) {
	        var url = window.location.toString().split('/'),
	            split_ft = url[3].split('?'),
	            termo = split_ft[0];
	        
	        if (busca_vazia[0]) {
	            pagina_busca.addClass('no-result');
	            $(".busca-vazio").append("<ul><li>Tente palavras menos específicas.</li><li>Digite pelo menos quatro caracteres no campo de busca.</li><li>Use os menus do site para navegar pelos departamentos de produtos</ul>");
				$(".navSidebar").remove();
	        } else {
	            var valorResult = $('.resultado-busca-termo:eq(0)').find('.value').text();
	            pagina_busca.addClass('resultado-encontrado');
	        };
	    }; 
	},

	searchWord: function () {
		var word = $(".resultado-busca-termo:eq(0)").find("strong").text();
		$(".navTopbar .titulo-sessao").html('<em>Você buscou por:</em>"' + word + '"');
	},

	init: function  () {
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

	init: function(){
		product.share();
		product.superZoom(300,300);
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
	$("body").prepend('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=801185559934326";fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>');
	$(".helperComplement").remove();
	
	global.init();

	if ($('body').hasClass("home")) {
	}

	if ($('body').hasClass("produto")) {
		product.init();
	};

	if ( $('body').hasClass("catalog")) {
		catalog.init();
	};

	if ($('body').hasClass("institutional")) {
		institutional.init();
	};
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