
$(document).ready(function () {
	new Particles(document.getElementById("particles"), {

		// size of the particles
		size: { 
			min: 0,
			max: 2
		},
	
		// density of particles on the canvas
		density: 2000,  
	
		// speed of the particules
		speed: 1, 
	
		// number of times per second the canvas is refreshed
		fps: 60, 
	
		// color of the particles
		color: "#C38BC0" 
		
	});
	// Add smooth scrolling to all links
  $('.scroll').on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
	});
	// Set the Access Token
// The accessToken was obtained by calling the https://dribbble.com/oauth/token endpoint
var accessToken = '9dc972d649b9c5a33bc96cefb19414a5020d713de13146887aacf401816f04fd';
// Call Dribble v2 API
$.ajax({
	url: 'https://api.dribbble.com/v2/user/shots?per_page=100&access_token='+accessToken,
	type: 'GET',
	success: function(data) {  
		if (data.length > 0) { 
			$.each(data, function(i, val) {
		if(val.tags.includes("portfolio")){
				$('.cards').append(
					'<div class="cards__item"><a href="' + val.html_url + '"> <div class="card"><div class="card__image"><img src="' + val.images.hidpi + '" /></div> <div class="card__content"><div class="card__title"><h4>' + val.title + (val.description || "") + '</h4></div></div></div></div></div></a></div>'
				);
			}
			})
		}
		else {
			$('.cards').append('<div>Sorry, I haven´t worked much these days :(</div>');
		}
	}
});
	if ($('.cd-stretchy-nav').length > 0) {
		var stretchyNavs = $('.cd-stretchy-nav');

		stretchyNavs.each(function () {
			var stretchyNav = $(this),
				stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');

			stretchyNavTrigger.on('click', function (event) {
				event.preventDefault();
				stretchyNav.toggleClass('nav-is-visible');
			});
		});

		$(document).on('click', function (event) {
			(!$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span')) && stretchyNavs.removeClass('nav-is-visible');
		});
	}
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function () {
		(!window.requestAnimationFrame) ? setTimeout(function () {
			showBlocks(timelineBlocks, offset);
		}, 100): window.requestAnimationFrame(function () {
			showBlocks(timelineBlocks, offset);
		});
		($('.professional-container').offset().top <= $(window).scrollTop() + $(window).height() * offset) && $('.professional-container').addClass('fade-in');
		($('.projects-container').offset().top <= $(window).scrollTop() + $(window).height() * offset) && 
		$('.projects-container').addClass('fade-in');
	});


	function hideBlocks(blocks, offset) {
		blocks.each(function () {
			($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function () {
			($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
});