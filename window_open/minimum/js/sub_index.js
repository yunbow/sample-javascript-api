(function () {
	$(function () {
		showSize();
	});

	window.onresize = function(){
		showSize();
	}

	function showSize(){
		$('#widthLabel').text($(window).width());
		$('#heightLabel').text($(window).height());
	}
})();

