(function () {

	let counter = 0;
    let funcRegistered = new Array(5);
	let functionForDocument;

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

				boxes[i].addEventListener('click', funcRegistered[i]['func'], isEnableUseCapture);
			}


			const isEnableUseCapture = $("[name=useCapture-document]").prop("checked");

			functionForDocument = function(e) {
				// 対象外のクリックイベントはスキップ
				if (e.target.localName !== 'button' || e.target.innerText !== 'Click!!') {
					return;
				}
				$('#document-listener > span').text(counter++);
			};
			document.addEventListener('click', functionForDocument, isEnableUseCapture);


		});

		$('#reset').click(function() {
			reset();
		});
	});

	function reset() {
		counter = 0;
		$('#document-listener > span').text('not fired');
		document.removeEventListener('click', functionForDocument);
		const boxes = document.querySelectorAll('.box');
		for (let i = 0; i < boxes.length; i++) {
			boxes[i].children[0].innerText = 'not fired';
			boxes[i].removeEventListener('click', funcRegistered[i]['func'], funcRegistered[i]['useCapture']);
			funcRegistered[i] = null;
		}
	}

})();
