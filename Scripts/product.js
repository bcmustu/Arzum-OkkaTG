$(document).ready(function(){
	colorSelect();
});

function colorSelect() {
	var selectedColor = 'white'
	var sample = $('.productDetail .productImage img')
	var colorlessSampleSource = sample.attr('src')
	var baseSource = colorlessSampleSource.substr(0,colorlessSampleSource.lastIndexOf('.'));
	var fileType = colorlessSampleSource.substr(colorlessSampleSource.lastIndexOf('.'));
	sample.attr('src',baseSource+'-'+selectedColor+fileType);
	sample.css('transition','all 0.7s');

	$('.productDetail .productImageColorPalette .productColorSample').click(function(){
		var selectedColor = $(this).attr('id');
		sample.css('opacity','0');
		setTimeout(function(){
			setTimeout(function(){
				sample.css('opacity','1');
			},200);
			sample.attr('src',baseSource+'-'+selectedColor+fileType);
		},700);
	})
}