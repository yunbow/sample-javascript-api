(function () {
	$(function () {

		if (!window.localStorage) {
			alert('LocalStorage is not available on your browser.');
		}

		$('#setItemButton').on('click', function () {
			var itemValue = $('#itemInput').val();
			localStorage.setItem('itemKey', itemValue);
		});

		$('#getItemButton').on('click', function () {
			var itemValue = localStorage.getItem('itemKey');
			log('itemValue=' + itemValue);
		});

		$('#removeButton').on('click', function () {
			localStorage.removeItem('itemKey');
		});

		$('#clearButton').on('click', function () {
			localStorage.clear();
		});
	});

	window.onstorage = function (e) {
		log('onstorage: key=' + e.key + ', oldValue=' + e.oldValue + ', newValue=' + e.newValue);
	};
})();

