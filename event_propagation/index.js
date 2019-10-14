(function(eventType, filterForWindowAndDocument) {

	let counter = 0;
	let funcRegistered = new Array(5);
	let funcForDocumentRegistered = {};
	let funcForWindowRegistered = {};

	document.addEventListener('DOMContentLoaded', function() {

		$('#setting').click(function() {

			if (funcRegistered[0]) {
				window.alert('already set callback.');
				return;
			}

			const boxes = document.querySelectorAll('.box');
			for (let i = 0; i < boxes.length; i++) {
				funcRegistered[i] = {};
				const isEnableUseCapture = $("[name=useCapture" + i + "]").prop("checked");
				const isStopPropagation = $("[name=stopPropagation" + i + "]").prop("checked");

				funcRegistered[i]['useCapture'] = isEnableUseCapture;
				funcRegistered[i]['func'] = (function(e) {
					this.children[0].innerText = counter++;
					if (isStopPropagation) {
						e.stopPropagation();
					}
				}).bind(boxes[i]);

				boxes[i].addEventListener(eventType, funcRegistered[i]['func'], isEnableUseCapture);
			}

			funcForDocumentRegistered['func'] = function(e) {
				// 対象外のクリックイベントはスキップ
				if (filterForWindowAndDocument(e)) {
					return;
				}
				$('#document-listener > span').text(counter++);
			};
			funcForWindowRegistered['func'] = function(e) {
				// 対象外のスクロールイベントはスキップ
				if (filterForWindowAndDocument(e)) {
					return;
				}
				$('#window-listener > span').text(counter++);
			};
            funcForDocumentRegistered['useCapture'] = $("[name=useCapture-document]").prop("checked");;
			document.addEventListener(eventType, funcForDocumentRegistered['func'], funcForDocumentRegistered['useCapture']);
            funcForWindowRegistered['useCapture'] = $("[name=useCapture-window]").prop("checked");
			window.addEventListener(eventType, funcForWindowRegistered['func'], funcForWindowRegistered['useCapture']);
		});

		$('#reset').click(function() {
			reset();
		});
	});

	function reset() {
		counter = 0;
		$('#window-listener > span').text('not fired');
		$('#document-listener > span').text('not fired');
		document.removeEventListener(eventType, funcForDocumentRegistered['func'], funcForDocumentRegistered['useCapture']);
		window.removeEventListener(eventType, funcForWindowRegistered['func'], funcForWindowRegistered['useCapture']);
		const boxes = document.querySelectorAll('.box');
		for (let i = 0; i < boxes.length; i++) {
			boxes[i].children[0].innerText = 'not fired';
			boxes[i].removeEventListener(eventType, funcRegistered[i]['func'], funcRegistered[i]['useCapture']);
			funcRegistered[i] = null;
		}
	}

})(EVENT_TYPE, FILTER_FUNC); // html内に広域変数として定義
