$("input.postal-code").val(22743050)

vtexjs.checkout.getOrderForm().done(function(orderForm){ 
    console.log(orderForm.shippingData.address); 

	//$("input.postal-code").trigger('addressSearchResult.vtex', orderForm.shippingData.address);



});




//////////*********************/////////////////////////


vtexjs.checkout.getOrderForm().then(function(orderForm){ 
var postalCode = '22743-050'; // também pode ser sem o hífen 
var country = 'Brazil'; 
var address = {postalCode: postalCode, country: country}; 
return vtexjs.checkout.calculateShipping(address) }) 
.done(function(orderForm){ 
    console.log(orderForm.shippingData); 
    console.log(orderForm.totalizers); 
});



///*** get address ***///


var postalCode = '22250040';
var country = 'BRA';
var address = {postalCode: postalCode, country: country};

vtexjs.checkout.getAddressInformation(address).done(function(result){
    console.log(result);
});



///////////////////////////////////////////////////////////




 vtexjs.checkout.getOrderForm().done(function(orderForm){ 
    console.log(orderForm.orderFormId); 

    
	var data = JSON.stringify({  
	   "address":{  
	      "complement":"Casa 5",
	      "country":"BRA",
	      "number":"129",
	      "postalCode":"22743-050",
	      "receiverName":"Mathias ",
	   }
	}) 


	$.ajax({  
	   type:"POST",
	   url:"https://emetrixclub.vtexcommercestable.com.br/api/checkout/pub/orderForm/"+orderForm.orderFormId+"/attachments/shippingData",
	   data:data
	}).done(function( msg ){  
	   console.info(msg);
	})

    // 



});






//consulta

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();


function addParamToLink(href,utm) {
	var hl = href;
	if(href.indexOf("?")<0) {
		hl += "?utmi_cp="+utm;
	} else {
		hl += "&utmi_cp="+utm;
	}
	return hl;
}



function insertParam(key, value)
{
    key = encodeURI(key); value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; var x; while(i--) 
    {
        x = kvp[i].split('=');

        if (x[0]==key)
        {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
    //document.location.search = kvp.join('&'); 
}



var omx = {
	getEmpresa:function(idNome) {

		return $.ajax({
		    async: false,
		    type: "GET",
		    url: "/api/ds/pub/documents/CP",
		    headers: {
		      "accept": "application/vnd.vtex.masterdata.v10+json",
		      "content-type": "application/json; charset=utf-8"
		    },
		    data: {
		        "f": "id,cnpj,file,nome,utm",
		        "fq": "utm:"+idNome
		    }
		})
		

	},
	getFilial:function(id) {
		return $.ajax({
		    async: false,
		    type: "GET",
		    url: "/api/ds/pub/documents/CF?&pgsize=1000",
		    headers: {
		      "accept": "application/vnd.vtex.masterdata.v10+json",
		      "content-type": "application/json; charset=utf-8"
		    },
		    data: {
		        "f": "cnpjmatriz,complement,country,filialName,number,postalCode",
		        "fq": "cnpjmatriz:"+id
		    }
		})
	},
	getAddress:function(cep) {

		var postalCode = cep;
		var country = 'BRA';
		var address = {postalCode: postalCode, country: country};

		return vtexjs.checkout.getAddressInformation(address);

	},

	setAddress:function(address, number, nameShip) {

		console.log(address);
		console.log(number);
		console.log(nameShip);

		vtexjs.checkout.getOrderForm().done(function(orderForm){ 
		    console.log(orderForm.orderFormId); 



			var data = '{"address":{"complement":"","country":"BRA","number":'+number+',"postalCode":'+address.postalCode+',"receiverName":"'+nameShip+'"}}';
			    
			data = JSON.stringify(data)
			data = JSON.parse(data) 
			
			$.ajax({  
			   type:"POST",
			   url:"/api/checkout/pub/orderForm/"+orderForm.orderFormId+"/attachments/shippingData",
			   data:data
			}).done(function( msg ){  
			    console.log(msg);
 			    vtexjs.checkout.getOrderForm();
			});

		   // 



		});
		 
	}



}


function infoTopBar() {
	var t = JSON.parse($.cookie("adressSelected"));

	var html = '<div class="infolog"><div class="wrapper"><p>Olá, <b>'+$.cookie("adressNome")+'</b> da empresa '+$.cookie("utmi_cp")+'. O endereço selecionado é '+t.street+', '+$.cookie("adressNumber")+' - '+t.city+', '+t.state+'</p><span>Os dados estão corretos? <a id="changeAddress">Clique aqui para alterar</a></span></div></div>';

	$(".topBar.infoLogged").html(html);
}


$.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));


$(document).ready(function() {

	if(typeof $.cookie("utmi_cp") != "undefined" || typeof QueryString.utmi_cp != "undefined"){

		var ck = QueryString.utmi_cp || $.cookie("utmi_cp");
		console.log(ck);
		insertParam("utmi_cp", ck) ;

		$("a").each(function() {
			if($(this).attr("href")) {
				var href = $(this).attr("href");
				if(href.indexOf("checkout")<0) {
					var nh = addParamToLink(href,ck);
					$(this).attr("href", nh);
				}
			}

		});


		$.cookie("utmi_cp",ck);		

		if($.cookie("setAddress")=="true") {

			$(".lightBoxShop").remove();
			infoTopBar()


		} else {
			omx.getEmpresa(ck)
			.done(function(data) {
				$(".lightBoxShop__img").html('<img alt="'+data.Documents[0].nome+'" src="/arquivos/'+data.Documents[0].file+'"/>')
				var html = "";
				omx.getFilial(data.Documents[0].id).done(function(data) {
					
					var totalFilial = data.TotalRows;

					for(var i=0;i<=totalFilial;i++) {
						html += '<label class="lightBoxShop__un__unit"><input type="radio" value="'+data.Documents[i].postalCode+'" data-number="'+data.Documents[i].number+'" name="lightBoxShop__un"/><p>'+data.Documents[i].filialName+"</p></label>";
					}
					
					$(".lightBoxShop__un__wrap").html(html);
					if(!$.browser.device) {
						$(".lightBoxShop__un__wrap").mCustomScrollbar();

					}
					$(".lightBoxShop__un").append("<div class='lightBoxShop__un__details'></div>");
					//omx.getAddress(data.Documents[0].postalCode).c
				});

			})
			.fail(function() {
				alert("utm não validada");
			});

			
			$(".lightBoxShop").show();
		}


	} else {

		if( window.location.pathname.indexOf("checkout") < 0) {
			alert("coloque uma utm");
			$("body").html("Coloque uma utm válida");
		}
	}


	$(".lightBoxShop__submit").on("click", function(event) {
		event.preventDefault();

		var cep = $(".lightBoxShop__un__unit.active input").val();
		var number = $(".lightBoxShop__un__unit.active input").attr("data-number");
		var nome = $(".lightBoxShop__name input").val();


		if(typeof cep != "undefined" && nome != "") {
			omx.getAddress(cep).done(function(address) {
				//omx.setAddress(address);
				var t = JSON.stringify(address);

				$.cookie("adressSelected", t, { path: '/' });
				$.cookie("adressNumber", number, { path: '/' });
				$.cookie("adressNome", nome, { path: '/' });
				$.cookie("setAddress", "true", { path: '/' });

				$(".lightBoxShop").fadeOut("slow").remove();
				infoTopBar();
			});
		} else {
			alert("Coloque o seu nome e escolha uma unidade!");
		}
		



	});

	$(".lightBoxShop").on("click", ".lightBoxShop__un__unit", function(event) {
		event.preventDefault();

		$(".lightBoxShop__un__unit").removeClass("active");
		$(this).addClass("active");
		
		var cep = $(this).find("input").val();

		var postalCode = cep;
		var country = 'BRA';
		var address = {postalCode: postalCode, country: country};

		vtexjs.checkout.getAddressInformation(address).done(function(result){

			var address = "<h3>Endereço para entrega:</h3><p>"+result.street+"</p><p>"+result.neighborhood+" - "+result.city+"</p><p>Cep: "+result.postalCode+"</p>";
			$(".lightBoxShop__un__details").html(address);
		});

	});


	$(".topBar").on("click", "span a", function(event) {
		event.preventDefault();

		$.removeCookie('adressSelected', { path: '/' }); // => true
		$.removeCookie('adressNumber', { path: '/' }); // => true
		$.removeCookie('adressNome', { path: '/' }); // => true
		$.removeCookie('setAddress', { path: '/' }); // => true
		$.removeCookie('utmi_cp', { path: '/' }); // => true

		window.location.reload();
	});



	if(window.location.pathname.indexOf("checkout")>0) {
		var address = $.cookie("adressSelected");
		var number  = $.cookie("adressNumber");
		var nome    = $.cookie("adressNome");
		if(typeof address != "undefined" && typeof number != "undefined" && typeof nome != "undefined") {
			address = JSON.parse(address);
			omx.setAddress(address, number, nome);
		}
	}


});





///////

$.ajax({
    async: false,
    type: "GET",
    url: "/api/ds/pub/documents/CP",
    headers: {
      "accept": "application/vnd.vtex.masterdata.v10+json",
      "content-type": "application/json; charset=utf-8"
    },
    data: {
        "f": "id,cnpj,file,nome,utm"
    }
})
.done(function(data) {

	 console.log(data); 

	 getFilial(data.Documents[0].id);   

});



$.ajax({
    async: false,
    type: "GET",
    url: "/api/ds/pub/documents/CF",
    headers: {
      "accept": "application/vnd.vtex.masterdata.v10+json",
      "content-type": "application/json; charset=utf-8"
    },
    data: {
        "f": "cnpjmatriz,complement,country,filialName,number,postalCode"
    }
})
.done(function(data) {

	 console.log(data); 


});






////////////////////////////////////////////////////////////////


var data = JSON.stringify({  
   "address":{  
      "addressId":"7fb29d337c1b4b4797b7d054dcde8acd",
      "addressType":"residential",
      "city":"Armação dos Búzios",
      "complement":"Casa 5",
      "country":"BRA",
      "geoCoordinates":[  

      ],
      "neighborhood":"Centro",
      "number":"129",
      "postalCode":"28950-000",
      "receiverName":"Mathias Santoooooooos",
      "reference":null,
      "state":"RJ",
      "street":"Rua Deodoro de Azevedo tallllll"
   }
}) 


var orderFormId = "06bba3374d4e459f9eb3120441e7a35f"; 

$.ajax({  
   type:"POST",
   url:"/api/checkout/pub/orderForm/"+orderFormId+"/attachments/shippingData",
   data:data
}).done(function( msg ){  
   console.info(msg);
})