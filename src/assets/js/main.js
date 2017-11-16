var mr_firstSectionHeight;
var mr_nav;
var mr_navOuterHeight;
var mr_navScrolled = false;
var mr_navFixed = false;
var mr_outOfSight = false;
var mr_scrollTop = 0;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('../sw.js')
            .then(function (registration) {
                console.log('Service Worker registration successful:', registration.scope);
            }, function (err) {
                console.log('ServiceWorker registration failed:', err);
            });
    });
}



// Smooth scrolling

$(() => {
	var $scroller = $('#site-wrapper');
	$('a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $scroller.stop().animate({
        'scrollTop': $target.offset().top - $scroller.offset().top + $scroller.scrollTop()
    }, 900, 'swing', function () {
        window.location.hash = target;
    });
  });
})