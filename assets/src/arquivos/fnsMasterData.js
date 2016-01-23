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
		    url: "/api/ds/pub/documents/CF",
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
	setAddress:function(address) {

		vtexjs.checkout.getOrderForm().done(function(orderForm){ 
		   console.log(orderForm.orderFormId); 

		   
			var data = address;


			$.ajax({  
			   type:"POST",
			   url:"/api/checkout/pub/orderForm/"+orderForm.orderFormId+"/attachments/shippingData",
			   data:data
			}).done(function( msg ){  
			   console.info(msg);
			});

		   // 



		});
		 
	}
}


omx.getEmpresa(QueryString.utmp).done(function(data) {
	$(".lightBoxShop__img").html('<img alt="'+data.Documents[0].nome+'" src="/arquivos/'+data.Documents[0].file+'"/>')
	var html = "";
	omx.getFilial(data.Documents[0].id).done(function(data) {
		
		$.each(data.Documents, function(i) {
			html += '<label class="lightBoxShop__un__unit"><input type="radio" value="'+this.postalCode+'" name="lightBoxShop__un"/><p>'+this.filialName+"</p></label>";
		});
		$(".lightBoxShop__un__wrap").html(html);
		//omx.getAddress(data.Documents[0].postalCode).c
	});

});

$(".lightBoxShop__submit").on("click", function(event) {
	event.preventDefault();

	var cep = $(".lightBoxShop__un__wrap input:checked").val();
	console.log(cep);

	omx.getAddress(cep).done(function(address) {
		omx.setAddress(address);
	});



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