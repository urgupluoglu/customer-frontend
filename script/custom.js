var HOST = "http://localhost/back-end"
$(document).ready(function() {
    console.log("document loaded");
    // get customer list and show it as landing page
    $.get(HOST + "/customerList", function(response) {
    	$.each(response, function(index, value) {
    		var date = new Date(value.creationDate);
    		var div = '\
    		<div class="card box-shadow">\
		  		<div class="card-header">\
		  			<h2>'  + value.id + '. ' + value.name + '</h2>\
		  		</div>\
		  		<div class="card-body">\
		  			Address: ' + value.address + '<br/>Phone: ' + value.phone + '<br />Status: ' + value.status + '\
		  			<center>\
			  			<div class="btn-group">\
			  				<button onClick="showNotes(this, ' + value.id + ')" type="button" class="btn btn-sm btn-block btn-outline-primary mt-3 mr-2">Show Notes</button>\
			  				<button onClick="addNoteTo(this, ' + value.id + ')" id="addNote" type="button" class="btn btn-sm btn-block btn-outline-primary mt-3 ml-2">Add a Note</button>\
			  			</div>\
			  		</center>\
			  		<div class="notes"></div>\
		  		</div>\
		  		<div class="card-footer">\
	  				' + (date.toString()) + '\
	  			</div>\
		  	</div>';

	  		$('.card-columns').append(div);
    	})
    });
});

function showNotes(dom, customerId) {
	$.ajaxSetup({
	    headers: {
	        'Content-Type': 'application/json',
	        'Accept': 'application/json'
	    },
	    dataType: "json"
	});
	var param = { 'id': customerId };
	$.post(HOST + "/noteList", JSON.stringify(param), function(response) {
		if (response.length > 0)
			$(dom).parent().parent().parent().find('.notes').html("<br /><h5>Notes:</h5>");
		$.each(response, function(index, value) {
			$(dom).parent().parent().parent().find('.notes').append(value.id + ". " + value.text + "<br />");
		});
	});
}

function addNoteTo(dom, customerId) {
	$(dom).parent().parent().parent().find('.notes').html("<br /><h5>Write your note:</h5>");
	$(dom).parent().parent().parent().find('.notes').append("<textarea class='noteArea' style='height:100px; width:300px'></textarea>");
	$(dom).parent().parent().parent().find('.notes').append("<button onClick='saveNote(this, " + customerId + ")' type='button' class='btn btn-sm btn-success w-50'>Save</button>");
}

function saveNote(buttonDom, customerId) {
	$.ajaxSetup({
	    headers: {
	        'Content-Type': 'application/json',
	        'Accept': 'application/json'
	    },
	    dataType: "json"
	});
	var param = { 'text': $(buttonDom).parent().find('.noteArea').val(), 'customerId': customerId };
	$.post(HOST + "/note", JSON.stringify(param), function(response) {
		if (response.id > 0) {
			alert("Added!");
			$(buttonDom).parent().html("");
		}
	});
}