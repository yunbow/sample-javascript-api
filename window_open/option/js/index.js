(function () {
	$(function () {

		$('#openWindButton').on('click', function () {
			var option =
				'top=' + $('#topInput').val() +
				',left=' + $('#leftInput').val() +
				',width=' + $('#widthInput').val() +
				',height=' + $('#heightInput').val() +
				',menubar=' + $('#menubarSelect').val() +
				',toolbar=' + $('#toolbarSelect').val() +
				',location=' + $('#locationSelect').val() +
				',status=' + $('#statusSelect').val() +
				',resizable=' + $('#resizableSelect').val() +
				',scrollbars=' + $('#scrollbarsSelect').val();
			log('window.open option: ' + option);
			window.open('sub_window.html', 'windowName1', option);
		});
	});
})();

