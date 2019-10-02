(function () {

	let counter = 0;

	document.addEventListener('DOMContentLoaded', function() {

		$('#setting').click(function() {

			const boxes = document.querySelectorAll('.box');
			for (let i = 0; i < boxes.length; i++) {
				const isEnableUseCapture = $("[name=useCapture" + i + "]").prop("checked");
				const isStopPropagation = $("[name=stopPropagation" + i + "]").prop("checked");
				boxes[i].addEventListener('click', function(e) {
					boxes[i].children[0].innerText = counter++;
					if (isStopPropagation) {
						e.stopPropagation();
					}
				}, isEnableUseCapture);
			}


			const isEnableUseCapture = $("[name=useCapture-document]").prop("checked");

			document.addEventListener('click', function(e) {
				// 対象外のクリックイベントはスキップ
				if (e.target.localName !== 'button' || e.target.innerText !== 'Click!!') {
					return;
				}
				$('#document-listener > span').text(counter++);
			}, isEnableUseCapture);


		});
	});

})();
