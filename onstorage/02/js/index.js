(function () {
	$(function () {

		if (!window.localStorage) {
			alert('LocalStorage is not available on your browser.');
		}

		$('#itemInput').on('change', function () {
			var itemValue = $('#itemInput').val();
			localStorage.setItem('itemKey', itemValue);
		});
	});

	window.onstorage = function (e) {
		log('onstorage: key=' + e.key + ', oldValue=' + e.oldValue + ', newValue=' + e.newValue);
		$('#itemInput').val(e.newValue);
	};
})();

