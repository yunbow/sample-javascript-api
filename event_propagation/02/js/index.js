(function () {

	let counter = 0;
	let functions = [];
	let functionForDocument;
	let functionForWindow;

	document.addEventListener('DOMContentLoaded', function() {

		$('#setting').click(function() {

			const boxes = document.querySelectorAll('.box');
			for (let i = 0; i < boxes.length; i++) {
				const isEnableUseCapture = $("[name=useCapture" + i + "]").prop("checked");
				const isStopPropagation = $("[name=stopPropagation" + i + "]").prop("checked");

				functions[i] = (function(e) {
					this.children[0].innerText = counter++;
					if (isStopPropagation) {
						e.stopPropagation();
					}
				}).bind(boxes[i]);

				boxes[i].addEventListener('scroll', functions[i], isEnableUseCapture);
			}

			functionForDocument = function(e) {
				// 対象外のスクロールイベントはスキップ
				if (e.target.nodeName === '#body') {
					return;
				}
				$('#document-listener > span').text(counter++);
			};
			functionForWindow = function(e) {
				// 対象外のスクロールイベントはスキップ
				if (e.target.nodeName === '#body') {
					return;
				}
				$('#window-listener > span').text(counter++);
			};
			const isEnableUseCapture = $("[name=useCapture-document]").prop("checked");
			document.addEventListener('scroll', functionForDocument, isEnableUseCapture);
			const isEnableUseCaptureWindow = $("[name=useCapture-window]").prop("checked");
			window.addEventListener('scroll', functionForWindow, isEnableUseCaptureWindow);

		});

		$('#reset').click(function() {
			reset();
		});
    });

	function reset() {
		counter = 0;
		$('#window-listener > span').text('not fired');
		$('#document-listener > span').text('not fired');
		document.removeEventListener('scroll', functionForDocument);
		window.removeEventListener('scroll', functionForWindow);
		const boxes = document.querySelectorAll('.box');
		for (let i = 0; i < boxes.length; i++) {
			boxes[i].children[0].innerText = 'not fired';
			boxes[i].removeEventListener('scroll', functions[i]);
			functions[i] = null;
		}
	}

})();
