/*
 *		This file contains the javascript code for the portfolio
 */

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html    = template(data);
	$('#portfolio-content').html(html);
}

$(document).ready(function(){
	// Compile Handlebars template
	var source   = $("#portfolio-template").html();
	var template = Handlebars.compile(source);

	showTemplate(template, portfolio);
});