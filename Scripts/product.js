$(document).ready(function(){
	colorSelect();
    articleMaxiSliderCloseSetup();
    triggerAdditionalPhotos();
});


$(window).load(function(){
    //Extracting Url hash, opening fullscreen slider, and defining the opening slide number
        slideNoToInitiate = parseInt((window.location.hash).substring(1));
        if (slideNoToInitiate >= 0) {
            setupArticleMaxiSlider(slideNoToInitiate);
        };
    //
});



function colorSelect() {
	var selectedColor = 'white'
	var sample = $('.productDetail .productImage img')
	var colorlessSampleSource = sample.attr('src')
	var baseSource = colorlessSampleSource.substr(0,colorlessSampleSource.lastIndexOf('.'));
	var fileType = colorlessSampleSource.substr(colorlessSampleSource.lastIndexOf('.'));
	sample.attr('src',baseSource+selectedColor+fileType);
	sample.css('transition','all 0.7s');

	$('.productDetail .productImageColorPalette .productColorSample').click(function(){
		var selectedColor = $(this).attr('id');
		sample.css('opacity','0');
		setTimeout(function(){
			setTimeout(function(){
				sample.css('opacity','1');
			},200);
			sample.attr('src',baseSource+selectedColor+fileType);
		},700);
	})
}


$(window).on("orientationchange", function (event) {
    // maxiSlider quick actions like hide / show
    articleMaxiSliderQuickChanges();

    // orientationchange is triggered right after the action. So, wait a bit to get correct values like wH and wW
    var timer = null;

    if (timer != null) {
        clearTimeout(timer);
    }

    timer = setTimeout(function () {
        articleMaxiSlider(true);
    }, 500);
});



// Triggers maxi slider in overlay
var maxiArticleSlider = null;
var initialSliderHtml = null;
var slideNoToInitiate = 0;

// called by mini slider on page
function setupArticleMaxiSlider(slideNo) {
    slideNoToInitiate = slideNo;
    articleMaxiSlider(false);

    $('#articleMaxiSlider').css({ opacity: 0 }).show();
    $('.divOverlay').stop(true, false).fadeIn(function () {
        $('#articleMaxiSlider').stop(true, false).animate({ opacity: 1 });
    });
}
// End

// reset slider quickly if orientation change
function articleMaxiSliderQuickChanges() {
    $('#articleMaxiSlider').hide();
    maxiArticleSlider.destroy();
    $('#articleMaxiSlider').empty().html(initialSliderHtml);
}
// End

function articleMaxiSlider(isOrientationChange) {
    // save slider html for orientation change which resets the slider
    if (initialSliderHtml == null) {
        initialSliderHtml = $('#articleMaxiSlider').html();
    }

    if (isOrientationChange) {
        $('#articleMaxiSlider').show();
    }

    // slider layout values
    var ratio = 0.85;
    var captionH = (deviceIs == "tablet") ? parseInt($('#articleMaxiSlider .divCaptionContainer').css('height')) : 0;
    var gapValForCaption = (deviceIs == "tablet") ? parseInt($('#articleMaxiSlider .divCaptionContainer').css('marginTop')) : 0;
    var gapValForScreen = parseInt(wH * (1 - ratio) / 5);
    var sliderH = wH * ratio;
    var sliderW = wW - (gapValForScreen * 2);
    var sponsorHeight = 0;


    // disable touchmove and allow the touch for divCaptionContainer
    $('body').bind('touchmove', function (e) {
        $('#articleMaxiSlider .divCaptionContainer div').bind("touchmove", function (e) {
            e.stopPropagation();
        });

        e.preventDefault();
    });

    setInterval(function(){
        $('.articleMaxiSlider .divImgContainer iframe').height($('.articleMaxiSlider .divImgContainer iframe').width() * 0.6);
    });
    // set slider dynamic style
    $('#articleMaxiSlider').css({
        height: sliderH,
        width: sliderW,
        marginTop: gapValForScreen*1.85,
        marginLeft: gapValForScreen
    });

    // set table dynamic style
    $('#articleMaxiSlider table').css({
        height: sliderH
    });

    // set image container dynamic style
    $('#articleMaxiSlider .divImgContainer').css({
        height: (isLandscape) ? (sliderH - captionH - gapValForCaption - sponsorHeight/4) : 'auto'
    });

    // trigger slider
    $('#articleMaxiSlider').royalSlider({
        autoHeight: (isLandscape) ? true : false,
        autoWidth: (isPortrait) ? true : false,
        arrowsNav: false,
        fadeinLoadedSlide: false,
        slidesSpacing: 0,
        controlNavigationSpacing: 0,
        controlNavigation: 'none',
        imageScaleMode: 'none',
        imageScalePadding: 0,
        arrowsAutoHide: false,
        imageAlignCenter: false,
        loop: false,
        loopRewind: false,
        numImagesToPreload: 1,
        keyboardNavEnabled: true,
        usePreloader: true,
        startSlideId: slideNoToInitiate
    });

    maxiArticleSlider = $("#articleMaxiSlider").data('royalSlider');


    currentSlide = maxiArticleSlider.currSlideId;
    history.pushState({}, '', 'urun-makina.html#'+currentSlide);

    maxiArticleSlider.ev.on('rsAfterSlideChange', function (event) {
        slideNoToInitiate = maxiArticleSlider.currSlideId;
        currentSlide = maxiArticleSlider.currSlideId;
        history.pushState({}, '', 'urun-makina.html#'+currentSlide);
    });
}
// End

// close article maxi slider setup which uses touchstart instead of click
function articleMaxiSliderCloseSetup() {
    $('.divOverlay div.close').on("click", function (ev) {
    	ev.stopPropagation();
        $('.divOverlay').stop(true, false).fadeOut(function () {
            slideNoToInitiate = 0;
            articleMaxiSliderQuickChanges();
            history.pushState({}, '', 'urun-makina.html');
        });
    $('body').unbind('touchmove');
    });
    $('.divOverlay').on("click", function (ev) {
        $('.divOverlay').stop(true, false).fadeOut(function () {
            slideNoToInitiate = 0;
            articleMaxiSliderQuickChanges();
            history.pushState({}, '', 'urun-makina.html');
        });
    $('body').unbind('touchmove');
    });
    $('#articleMaxiSlider').on("click", function (ev) {
    	ev.stopPropagation();
    });
}
// End


function triggerAdditionalPhotos() {

    $('#additionalPhotosSlider').royalSlider({
        autoHeight: true,
        arrowsNav: true,
        fadeinLoadedSlide: false,
        arrowsAutoHide: false,
        slidesSpacing: 0,
        controlNavigationSpacing: 0,
        controlNavigation: 'none',
        imageScaleMode: 'none',
        imageAlignCenter: true,
        loop: false,
        loopRewind: false,
        numImagesToPreload: 9,
        keyboardNavEnabled: true,
        usePreloader: true,
        addActiveClass: true
    });

}



