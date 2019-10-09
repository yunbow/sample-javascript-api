(function () {

	let counter = 0;
	let funcRegistered = new Array(5);
	let functionForDocument;
	let functionForWindow;

	document.addEventListener('DOMContentLoaded', function() {

		$('#setting').click(function() {

			if (funcRegistered[0]) {
				window.alert('already set callback.');
				return;
			}

			const boxes = document.querySelectorAll('.box');
			for (let i = 0; i < boxes.length; i++) {
				funcRegistered[i] = {}
				const isEnableUseCapture = $("[name=useCapture" + i + "]").prop("checked");
				const isStopPropagation = $("[name=stopPropagation" + i + "]").prop("checked");

				funcRegistered[i]['useCapture'] = isEnableUseCapture;
				funcRegistered[i]['func'] = (function(e) {
					this.children[0].innerText = counter++;
					if (isStopPropagation) {
						e.stopPropagation();
					}
				}).bind(boxes[i]);

				boxes[i].addEventListener('scroll', funcRegistered[i]['func'], isEnableUseCapture);
			}

			functionForDocument = function(e) {
				// 対象外のスクロールイベントはスキップ
				if (e.target.nodeName === '#body' || e.target.nodeName === '#document') {
					return;
				}
				$('#document-listener > span').text(counter++);
			};
			functionForWindow = function(e) {
				// 対象外のスクロールイベントはスキップ
				if (e.target.nodeName === '#body' || e.target.nodeName === '#document') {
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
		document.removeEventListener('scroll', functionForDocument, true);
		window.removeEventListener('scroll', functionForWindow, true);
		const boxes = document.querySelectorAll('.box');
		for (let i = 0; i < boxes.length; i++) {
			boxes[i].children[0].innerText = 'not fired';
			boxes[i].removeEventListener('scroll', funcRegistered[i]['func'], funcRegistered[i]['useCapture']);
			funcRegistered[i] = null;
		}
	}

})();
