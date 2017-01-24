/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

document.addEventListener('DOMContentLoaded', function () {
	particleground(document.getElementById('particles'), {
		dotColor: '#ffffff',
		lineColor: '#ffffff'
	});
	var intro = document.getElementById('intro');
	intro.style.marginTop = -intro.offsetHeight / 2 + 'px';
}, false);


