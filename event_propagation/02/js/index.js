(function () {

	let counter = 0;

	document.addEventListener('DOMContentLoaded', function() {

		$('#setting').click(function() {

			const boxes = document.querySelectorAll('.box');
			for (let i = 0; i < boxes.length; i++) {
				const isEnableUseCapture = $("[name=useCapture" + i + "]").prop("checked");
				const isStopPropagation = $("[name=stopPropagation" + i + "]").prop("checked");
				boxes[i].addEventListener('scroll', function(e) {
					boxes[i].children[0].innerText = counter++;
					if (isStopPropagation) {
						e.stopPropagation();
					}
				}, isEnableUseCapture);
			}


			const isEnableUseCapture = $("[name=useCapture-document]").prop("checked");

			document.addEventListener('scroll', function(e) {
				// 対象外のスクロールイベントはスキップ
				if (e.target.nodeName === '#body') {
					return;
				}
				$('#document-listener > span').text(counter++);
			}, isEnableUseCapture);

			const isEnableUseCaptureWindow = $("[name=useCapture-window]").prop("checked");

			window.addEventListener('scroll', function(e) {
				// 対象外のスクロールイベントはスキップ
				if (e.target.nodeName === '#body') {
					return;
				}
				$('#window-listener > span').text(counter++);
			}, isEnableUseCaptureWindow);

			// const aa = document.querySelector(`#scroll-box`);
			// aa.addEventListener('scroll', function(e) {
			// 	console.dir(e);
			// });

		});
	});

})();
