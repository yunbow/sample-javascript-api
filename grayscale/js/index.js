(function () {
	$(function () {

		grayscale($("#test3"))

		function grayscale(selector) {
			var canvas = document.createElement('canvas');
			var canvasContext = canvas.getContext('2d');
			var img = new Image();
			img.onload = function () {
				var imgW = img.width;
				var imgH = img.height;
				canvas.width = imgW;
				canvas.height = imgH;

				canvasContext.drawImage(img, 0, 0);
				var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

				for (var y = 0; y < imgPixels.height; y++) {
					for (var x = 0; x < imgPixels.width; x++) {
						var i = (y * 4) * imgPixels.width + x * 4;
						var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
						imgPixels.data[i] = avg;
						imgPixels.data[i + 1] = avg;
						imgPixels.data[i + 2] = avg;
					}
				}

				canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
				selector.attr("src", canvas.toDataURL());
			};
			img.src = selector.attr("src");
		}
	});
})();

