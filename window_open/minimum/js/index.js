(function () {
	$(function () {

		$('#openWindButton').on('click', function () {
			var option =
				'top=10,left=10' +
				',width=' + $('#widthInput').val() +
				',height=' + $('#heightInput').val() +
				',menubar=no,toolbar=no,location=no,status=no' + 
				',resizable=no,scrollbars=no';
			log('window.open option: ' + option);
			window.open('sub_window.html', 'windowName1', option);
		});
	});
})();

