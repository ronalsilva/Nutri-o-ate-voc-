/* 2.0 */

!function(e,n,r){function o(e){return e}function t(e){return i(decodeURIComponent(e.replace(a," ")))}function i(e){return 0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")),e}function u(e){return c.json?JSON.parse(e):e}var a=/\+/g,c=e.cookie=function(i,a,p){if(a!==r){if(p=e.extend({},c.defaults,p),null===a&&(p.expires=-1),"number"==typeof p.expires){var s=p.expires,f=p.expires=new Date;f.setDate(f.getDate()+s)}return a=c.json?JSON.stringify(a):String(a),n.cookie=[encodeURIComponent(i),"=",c.raw?a:encodeURIComponent(a),p.expires?"; expires="+p.expires.toUTCString():"",p.path?"; path="+p.path:"",p.domain?"; domain="+p.domain:"",p.secure?"; secure":""].join("")}for(var l=c.raw?o:t,d=n.cookie.split("; "),m=i?null:{},x=0,g=d.length;g>x;x++){var k=d[x].split("="),h=l(k.shift()),j=l(k.join("="));if(i&&i===h){m=u(j);break}i||(m[h]=u(j))}return m};c.defaults={},e.removeCookie=function(n,r){return null!==e.cookie(n)?(e.cookie(n,null,r),!0):!1}}(jQuery,document);


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
    	var floatingBar = $(".floatHeader"),
        search = $(".pageHeader .searchBox .busca");
    	shippingInfo = $(".pageHeader .shippingInfo");
    	smartCart = $(".pageHeader .miniCart");
    	$(".floatHeader wrapper").append(smartCart);

    	var width = $( window ).width();

	    $(window).bind("scroll",function(){
	        if($(this).scrollTop()>100){
	            floatingBar.fadeIn(100);
                search.addClass("floatElement");
	            shippingInfo.addClass("floatElement");
	            smartCart.addClass("floatElement");
	        }
	        else{
                search.removeClass("floatElement");
	            shippingInfo.removeClass("floatElement");
	            smartCart.removeClass("floatElement");
	            floatingBar.fadeOut(100).css("height", "auto");               
	        }
	    }); 	
    },

    userLogged: function(){
		$(".listLinks").append("<li><a href='/no-cache/user/logout'>sair</a></li>");
    	
    	vtexjs.checkout.getOrderForm().done(function(data){
	        if (data.loggedIn){
	           $('.welcomeMsg').addClass('userLogged')
	        }  
	   	});

		setTimeout( function(){ 
			$(".userLogged").on("click", function(){
				$(".listLinks").slideToggle();
			});
	    }, 4000);
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

    carouselCart: function () {
        var numItens = $(".vtexsc-productList").find("tr").length - 1;
        var buttonTop = $("<span>").addClass("btnTop");
        var buttonBot = $("<span>").addClass("btnBottom");
        var tableCart = $(".vtexsc-productList");
        var cartWrap = $(".vtexsc-wrap");
        cartWrap.after("<div class='carouselCart'></div>");
        $(".carouselCart").append(buttonTop).append(buttonBot);
        var hItem = 75;
        
        buttonTop.on("click", function() {
            slide = tableCart.position().top;
            pos_slide = (slide + hItem);
            if (slide >= 0) {
                tableCart.animate({
                    top: "0"
                });
            } else {
                tableCart.animate({
                    top: (pos_slide) + "px"
                });
            }
        });

        buttonBot.on("click", function() {
            slide = tableCart.position().top;
            pos_slide = (slide - hItem);

            if (numItens > 2) {
                if (slide <= (-hItem * (numItens - 1)) + 76) {
                    tableCart.animate({
                        top: slide + "px"
                    });

                } else {
                    tableCart.animate({
                        top: (pos_slide) + "px"
                    });
                }
            };
        });

        if (numItens <= 2) {
            buttonTop.hide();
            buttonBot.hide();
        }
    },

	addButtonCart: function() {
        var linkCarrinho = $("<a>").attr({
            class: "linkGoCart",
            href: "/checkout/#/cart"
        }).text("ver carrinho");
        if ($(".linkCarrinho-cart").length < 1) {
            linkCarrinho.insertAfter(".cartCheckout");
        };
    },


    calcPriceMulti:function(num, multi) {
        var n = multi;
        n = parseFloat(n);

        var p = parseFloat(num.replace("R$ ","").replace(",","."));
        p = p*n;
        p = p.toFixed(2);
        p = p.toString();
        p = p.replace(".",",");
        return p;
    },

    priceKit:function() {

        //produto
        var n = $("td.value-field.Multiplicador-Kits");
        if(n.length>0) {
          var n = $("td.value-field.Multiplicador-Kits").text();
          n = parseFloat(n);         

          if($(".skuListPrice").length>0) {
               y = global.calcPriceMulti($(".skuListPrice").text(), n)          
               $(".skuListPrice").text("R$ "+y);                        
           }
           x = global.calcPriceMulti($(".skuBestPrice").text(), n)          
           $(".skuBestPrice").text("R$ "+x);

           z = global.calcPriceMulti($(".economia-de .economia").text(), n)          
           $(".economia-de .economia").text("R$ "+z);
        }

        //vitrine
        

            $(".shelf li").each(function() {
                var _this = $(this);

                _this.addClass(_this.find(".category").text().toLowerCase().replace(/\s/g,"-"));

                if(_this.find(".multipleItem li").length > 0 && _this.find(".multipleItem li").text() != "" && _this.attr("class").indexOf("calculedmultipleItem") < 0) {
                    
                    _this.addClass("calculedmultipleItem");

                    var n = _this.find(".multipleItem li").text();
                    n = parseFloat(n);

                    if(_this.find(".oldPrice").length>0) {
                        y = global.calcPriceMulti(_this.find(".oldPrice").text(), n)          
                        _this.find(".oldPrice").text("R$ "+y);                        
                    }
                    x = global.calcPriceMulti(_this.find(".bestPrice").text(), n)          
                    _this.find(".bestPrice").text("R$ "+x);
                }
            });


            
            console.log($.cookie("utmi_cp"));
            if($.cookie("utmi_cp")) {
                if($.cookie("utmi_cp").indexOf("vendab2b")>=0) {
                    $(".venda-b2b").show();
                    console.log("5");
                } else {
                    if($(".shelf li.venda-b2b").length > 0) {
                        $(this).hide();
                        if($(".shelf li.venda-b2b").length == $(".shelf > ul > li").length) {
                           // window.location = "/Sistema/buscavazia";                    
                        }
                    }

                }

                if($.cookie("utmi_cp").indexOf("multiplus")>=0) {
                    $(".logo .logoImg").attr("href","/campanha/multiplus/?utmi_cp=multiplus");
                }
                if($.cookie("utmi_cp").indexOf("santander")>=0) {
                    $(".logo .logoImg").attr("href","/campanha/santander/?utmi_cp=santander");
                }
                if($.cookie("utmi_cp").indexOf("vendab2b")>=0) {
                    $(".logo .logoImg").attr("href","/venda-b2b?utmi_cp=vendab2b");
                }
                if($.cookie("utmi_cp").indexOf("multiplus")<0 || $.cookie("utmi_cp").indexOf("santander")<0 || $.cookie("utmi_cp").indexOf("vendab2b")<0) {
                    $(".pageHeader .searchBox").css('visibility', 'visible');
                } 
            }
            
        
        

        
    },

    searchPrevent:function() {
        $(".fulltext-search-box, .btn-buscar").attr("id","omBusca");

        function redirectSearch() {
            var term = $(".fulltext-search-box").val();
            window.location = "/"+term;
        }
        $('.fulltext-search-box').keypress(function (k) {
                console.log("4");
            if (k.which === 13) {
                event.preventDefault();
                redirectSearch();

                return false;
            }
            return true;
        });
        $('.btn-buscar').click(function () {
             redirectSearch();
        });
    },
    
    init: function () {
    	global.floatHeader();
    	global.shelfDiscount();	
        global.userLogged();    
        global.priceKit();  
    	global.searchPrevent();	
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
        if($(".navSidebar input[type='checkbox']").length>0) {
            $(".navSidebar input[type='checkbox']").vtexSmartResearch({
                shelfCallback:function() {
                   global.priceKit();
                   global.shelfDiscount();
                }
            });
        }
		
	},

	toggleFilter: function(){
		$(".refino").each(function(){
			$(this).find("h5").on("click", function(){
				$(this).next("div").slideToggle();
				$(this).toggleClass("active");
			})
		});
	},

	switchView: function () {

        if($(".switchView").length>0) {
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
        }
        
    },

    searchEmptyWord: function () {
		var word = decodeURI(window.location.search);
		word = word.replace("?ft=","");
		$(".box-emptySearch h3 span em").text(word);
	},

	searchWord: function () {
		var word = $(".resultado-busca-termo:eq(0)").find("strong").text();
		$(".titulo-sessao").html('Resultado da busca: "<em>' + word + '</em>"');
	},

	init: function  () {
		catalog.smartResearch();
		catalog.toggleFilter();
		catalog.switchView();
		catalog.searchWord();
	}
}

var product = {
    share: function(){
		var urlProduct = window.location.href;
		var urlMediaProduct = $("#image img").attr("src");
		
		fns.shareWindow(urlProduct, urlMediaProduct);
	},

	productUnaviable: function(){
		if ($( ".priceProduct" ).html() == "" ){
			$('body').addClass("productUnaviable");
			$(".sku-notifyme-button-ok").val("Avise-me quando chegar");
		} else {
			$('body').removeClass("productUnaviable");
		};	
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

	ratingLightbox: function () {
		var stars = $("#resenha .avalie-produto").clone().html();
		$("#lnkPubliqueResenha").on("click", function (event) {
			event.preventDefault();
			
			$("body").prepend('\
				<div class="lb"><div class="lbOverlay"></div>\
				   	<div id="ratingContent" class="lbContent">\
						<span class="closeLB">x</span>\
						<p class="title">O que você achou desse produto?</p>\
						<div class="rateStars">'+stars+'</div>\
						<a href="#" class="bt-continuar">Fazer avaliação do produto</a>\
				   	</div>\
				</div>');

		})
		$(document).on("click", ".lb .bt-continuar, .closeLB", function (event) {
	        event.preventDefault();
	        $(".lb").fadeOut("slow").remove();
	    });
	},

	changeStars: function () {
		$('#ratingContent span.ratingStar').on("click", function () {
			$(document).ajaxStop(function () {	
	    		$('#ratingContent .rateStars').html( $("#resenha .avalie-produto").clone());
			})
	    })
	},

	reguaOvos: function () {
		if ($('td.Regua-de-Ovos').length > 0 ) {
			var hImg = $('td.Regua-de-Ovos img').height()
			$('td.Regua-de-Ovos').parents('tr').css('background','#fff').css('height', hImg + 40);
		};
	},

	nutritionalChart: function () {
		if ($('td.Tabela-nutricional img').length < 1) {
			$(".tabLink:eq(1)").remove();
		} else {
			$('.nutricional').prepend($('td.Tabela-nutricional img'));			
		};
	},

    gift: function(){
        if ($('td.Foto-brinde').length > 0) {
            $("td.Foto-brinde").hide();
            var img =  $("td.Foto-brinde").html();
            $(".mainProductInfo").append("<div class='gift'><p>Brinde:</p>" + img + "</div>");
        }
    },

	addCart:function(url) {
    	$.ajax({
    		type:'POST',
            url:url,
            async:false
        } )
        .done(function(data) {         	
    		var tit = $(".productName:eq(0)").text();
    		var img = '<img src="'+$("#image-main").attr("src")+'"/>';
    		var success = 'Adicionado com sucesso!';
        	
            $("body").prepend('\
               <div class="lb"><div class="lbOverlay"></div>\
                   <div id="buyContent" class="lbContent">\
                       <span class="closeLB">x</span>\
                       <div class="buyAdd__img">'+img+'</div>\
                       <p class="success">'+success+'</p>\
                       <p class="title">'+tit+'</p>\
                       <a href="/checkout/#/cart" class="bt-finalizar" target="_top">Finalizar compra</a>\
                       <a href="#" class="bt-continuar">Continuar comprando</a>\
                   </div>\
               </div>')
             vtexjs.checkout.getOrderForm().done(function() {
                global.carouselCart();
                global.addButtonCart();
             });

            
        })
        .fail(function() {
            alert("ocorreu um erro!")
        });
    },

    qtdProd:function() {

        function updateBtQtd(q) {
            var hlink = $("a.buy-button.buy-button-ref").attr("href");
            console.log("DASSS:"+hlink);
            hlink = hlink.split("qty=");

            var t = "/checkout/cart/add?sku=98&qty=1&seller=1&redirect=true&sc=1"
            var hlinkt2 = hlink[1].split("seller")[1]

            $("a.buy-button.buy-button-ref").attr("href", hlink[0]+"qty="+q+"&seller"+hlinkt2);
        }

        $(".qtdProd .more").on("click", function(event) {
           event.preventDefault();
           var tVal = parseInt($("input[name=qtdProd]").val());
           tVal = tVal+1;
           $("input[name=qtdProd]").val(tVal)
           updateBtQtd(tVal);
        });

        $(".qtdProd .less").on("click", function(event) {
           event.preventDefault();
           var tVal = parseInt($("input[name=qtdProd]").val());
           if(tVal>1) {
            tVal = tVal-1;
            $("input[name=qtdProd]").val(tVal);
            updateBtQtd(tVal);            
           }
        });

        $("input[name=qtdProd]").on("keyup change", function(event) {
            var tVal = $(this).val();
            updateBtQtd(tVal);
        });

    },

    buyProduct:function() {
        $(document).on("click",".buyProductButton .buy-button", function(event) {
            var _this = $(this)
            var link = $(this).attr("href");

            if(link.indexOf("/checkout/cart/")!=-1) {
                event.preventDefault();
                link = link.replace('redirect=true','redirect=false');
                product.addCart(link,false);

                
            } 
        });

        $(document).on("click", ".lb .bt-continuar, .closeLB", function(event) {
	        event.preventDefault();
	        $(".lb").fadeOut("slow").remove();
	    });
    },

    quantDiscount: function(){

        

        if($("em.valor-de.price-list-price").is(":visible")) {
            var valFrom = parseFloat($(".priceProduct .skuListPrice").text().replace(',', '.').replace('R$ ', ''));
            var valTo = parseFloat($(".priceProduct .skuBestPrice").text().replace(',', '.').replace('R$ ', ''));
            
            descpct = valTo/valFrom*100;
            descpct = 100-descpct;
            descpct = Math.ceil(descpct);

            if ((descpct == "0") || (descpct == 0)) {
                //$(this).hide();
            } else {
               $(".mainProductInfo").prepend("<div class='flagDiscountHighlight'>"+descpct + "% off</div>");
            }
        }

       
    },


	init: function(){
		$(document).ajaxStop(function () {			
		    product.changeStars();
			product.ratingLightbox();
			product.productUnaviable();
		})
		product.share();
		product.superZoom(530,530);
		product.reguaOvos();
		product.nutritionalChart();
        product.buyProduct();
        product.gift();
        product.qtdProd();
		product.quantDiscount();
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

	$(".shippingInfo ul").slick({
	    slidesToShow: 1,
		slidesToScroll: 1,
	    vertical: true,
	    arrows: false,
	    dots: false,
	    autoplay: true,
	    autoplaySpeed: 8000
	});		

	setTimeout( function(){ 
      $(".portal-minicart-ref").show();
    }, 5000);

	  	
	if ($('body').hasClass("home")) {		

        $(".collapseBox .filterItem").each(function(){
            $(this).find(".title").on("click", function(){
                $(this).next("ul").slideToggle();
                $(this).toggleClass("active");
            })
        });

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

	//busca vazia
	if ($('body').hasClass("resultado-busca")) {
		catalog.searchEmptyWord();
	};

	if ($('body').hasClass("search-result")) {
		var numbersearch = $(".resultado-busca-numero:eq(0)");
		$(".titulo-sessao").append(numbersearch);
	};

	if ($('body').hasClass("brands")) {
        var dataUrl = decodeURI(window.location.pathname).replace(/^\//,'').replace(/\-/g, " ");
		$("h2.titulo-sessao").text(dataUrl);
	};

    
});


$(document).ajaxStop(function () {
	$(".helperComplement").remove();

	
});


$(window).load(function() {
    global.carouselCart();
    global.addButtonCart();
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