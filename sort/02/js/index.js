(function () {
	$(function () {

		var list = [
			{ index: 1, value: 1 },
			{ index: 2, value: 1 },
			{ index: 3, value: 1 },
			{ index: 4, value: 1 },
			{ index: 5, value: 1 },
			{ index: 6, value: 1 },
			{ index: 7, value: 1 },
			{ index: 8, value: 1 },
			{ index: 9, value: 1 },
			{ index: 10, value: 1 },
			{ index: 11, value: 1 },
		];

		for (var i = 0; i < list.length; i++) {
			$('#sortTableBody').append('<tr><td>' + (i + 1) + '</td><td>' + list[i].index + '</td></tr>');
		}

		list.sort(function (a, b) {
			if (a.value === b.value) {
				if (a.index < b.index) {
					return -1;
				} else {
					return 1;
				}
			}
			if (a.value < b.value) {
				return -1;
			} else {
				return 1;
			}
		});

		for (var i = 0; i < list.length; i++) {
			$('#sortTableBody > tr:eq(' + (i) + ')').append('<td>' + list[i].index + '</td>');
		}
	});
})();

