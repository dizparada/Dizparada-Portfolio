$(document).foundation();
document.addEventListener('DOMContentLoaded', function () {
	particleground(document.getElementById('particles'), {
		dotColor: '#ffffff',
		lineColor: 'transparent'
	});
	var intro = document.getElementById('intro');
	intro.style.marginTop = -intro.offsetHeight / 4 + 'px';
}, false);
$(document).ready(function () {
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
	$.getJSON('https://api.dribbble.com/v1/users/dizparada/shots?per_page=100&access_token=0490d74b329b794531c155af97b6c3f2250aa7dd24926d7abf7f727e65373e3d&callback=?', function (resp) {
		if (resp.data.length > 0) {
			$.each(resp.data.reverse(), function (i, val) {
				if(val.tags.includes("portfolio"))
				$('.cards').prepend(
					'<li class="cards__item"><a href="' + val.html_url + '"> <div class="card"><div class="card__image"><img src="' + val.images.hidpi + '" /></div> <div class="card__content"><div class="card__title"><h4>' + val.title + '</h4></div><p class="card__text">' + (val.description || "") + '</p></div></div></div></div></a></li>'
				);
			});
		} else {
			$('.cards').append('<li>No shots.</li>');
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