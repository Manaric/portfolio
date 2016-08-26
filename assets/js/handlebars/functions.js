/*
 *		This file contains the javascript code for the portfolio
 */

/**
  * Helper function that instantiates a template and displays the results in the content div
  * @param template This is the compiled HTML + Handlebars code
  * @param data This is the array of objects that will be insterted into the site
  * @param id This is the ID of the div where the template will be put
  */
function showTemplate(template, data, id){
	var html    = template(data);
	$(id).html(html);
}

var portfolio_template, modal_template;
var portfolio_id, modal_id;

/**
  * Main function, that will load when page starts and will compile and deploy everything.
  */
$(document).ready(function(){

	// Set IDs
	portfolio_id = "#portfolio-items";
	modal_id = "#modal";

	// Compile Handlebars templates
	var source   = $("#portfolio-template").html();
	portfolio_template = Handlebars.compile(source);

	var source   = $("#modal-template").html();
	modal_template = Handlebars.compile(source);

	showTemplate(portfolio_template, portfolio, portfolio_id);
	showTemplate(modal_template, portfolio, modal_id);
	
	// These are functions that are developed to show the past portfolio
	// portfolioMaker();
	// movility();
});


/**
  * This is a script that will set the portfolio on the site
  */
function portfolioMaker(){
	(function($) {
	  "use strict";
	  var $container = $('.portfolio'),
	    $items = $container.find('.portfolio-item'),
	    portfolioLayout = 'fitRows';
	    
	    if( $container.hasClass('portfolio-centered') ) {
	      portfolioLayout = 'masonry';
	    }
	        
	    $container.isotope({
	      filter: '*',
	      animationEngine: 'best-available',
	      layoutMode: portfolioLayout,
	      animationOptions: {
	      duration: 750,
	      easing: 'linear',
	      queue: false
	    },
	    masonry: {
	    }
	    }, refreshWaypoints());
	    
	    function refreshWaypoints() {
	      setTimeout(function() {
	      }, 1000);   
	    }
	        
	    $('nav.portfolio-filter ul a').on('click', function() {
	        var selector = $(this).attr('data-filter');
	        $container.isotope({ filter: selector }, refreshWaypoints());
	        $('nav.portfolio-filter ul a').removeClass('active');
	        $(this).addClass('active');
	        return false;
	    });
	    
	    function getColumnNumber() { 
	      var winWidth = $(window).width(), 
	      columnNumber = 1;
	    
	      if (winWidth > 1200) {
	        columnNumber = 5;
	      } else if (winWidth > 950) {
	        columnNumber = 4;
	      } else if (winWidth > 600) {
	        columnNumber = 3;
	      } else if (winWidth > 400) {
	        columnNumber = 2;
	      } else if (winWidth > 250) {
	        columnNumber = 1;
	      }
	        return columnNumber;
	      }       
	      
	      function setColumns() {
	        var winWidth = $(window).width(), 
	        columnNumber = getColumnNumber(), 
	        itemWidth = Math.floor(winWidth / columnNumber);
	        
	        $container.find('.portfolio-item').each(function() { 
	          $(this).css( { 
	          width : itemWidth + 'px' 
	        });
	      });
	    }
	    
	    function setPortfolio() { 
	      setColumns();
	      $container.isotope('reLayout');
	    }
	      
	    $container.imagesLoaded(function () { 
	      setPortfolio();
	    });
	    
	    $(window).on('resize', function () { 
	    setPortfolio();          
    });
  })(jQuery);
}

function movility(){
	$(document).ready(function(){
	
	var items = $('#stage li'),
		itemsByTags = {};
	
	// Looping though all the li items:
	
	items.each(function(i){
		var elem = $(this),
			tags = elem.data('tags').split(',');
		
		// Adding a data-id attribute. Required by the Quicksand plugin:
		elem.attr('data-id',i);
		
		$.each(tags,function(key,value){
			
			// Removing extra whitespace:
			value = $.trim(value);
			
			if(!(value in itemsByTags)){
				// Create an empty array to hold this item:
				itemsByTags[value] = [];
			}
			
			// Each item is added to one array per tag:
			itemsByTags[value].push(elem);
		});
		
	});

	// Creating the "Everything" option in the menu:
	createList('Everything',items);

	// Looping though the arrays in itemsByTags:
	$.each(itemsByTags,function(k,v){
		createList(k,v);
	});
	
	$('#filter a').live('click',function(e){
		var link = $(this);
		
		link.addClass('active').siblings().removeClass('active');
		
		// Using the Quicksand plugin to animate the li items.
		// It uses data('list') defined by our createList function:
		
		$('#stage').quicksand(link.data('list').find('li'));
		e.preventDefault();
	});
	
	$('#filter a:first').click();
	
	function createList(text,items){
		
		// This is a helper function that takes the
		// text of a menu button and array of li items
		
		// Creating an empty unordered list:
		var ul = $('<ul>',{'class':'hidden'});
		
		$.each(items,function(){
			// Creating a copy of each li item
			// and adding it to the list:
			
			$(this).clone().appendTo(ul);
		});

		ul.appendTo('#container');

		// Creating a menu item. The unordered list is added
		// as a data parameter (available via .data('list'):
		
		var a = $('<a>',{
			html: text,
			href:'#',
			data: {list:ul}
		}).appendTo('#filter');
	}
});
}