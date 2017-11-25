(function () {
	$(function () {

		$('#openWindButton').on('click', function () {
			var option ='left=100,top=100,width=500,height=200,menubar=no,toolbar=no,location=no,status=no,resizable=no,scrollbars=no';
			log('window.open option: ' + option);
			window.open('sub_window.html', 'windowName1', option);
		});

		var updateTimer = function() {
			updateTask = setTimeout(function () {
				window.focus();
				log("window.focus");
				updateTimer();	
			}, 5000);
		}
	
		updateTimer();
	});
})();

