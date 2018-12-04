$(document).ready(function () {
    var preloader    = $('#preloader'), // селектор прелоадера
        imagesCount  = $('img').length, // количество изображений
        dBody        = $('body'), //обращаемся к body
        percent      = 100 / imagesCount, // количество % на одну картинку
        progress     = 0, // точка отсчета
        imgSum       = 32, // количество картинок
        loadedImg    = 0,
        whiteLine    = $('.dws-progress-bar'); // счетчик загрузки картинок

    if (imagesCount >= imgSum && imagesCount > 0) {
        for (var i = 0; i < imagesCount; i++) { // создаем клоны изображений
            var img_copy        = new Image();
            img_copy.src        = document.images[i].src;
            img_copy.onload     = img_load;
            img_copy.onerror    = img_load;
        }

        function img_load () {
            progress += percent;
            loadedImg++;
            if (progress >= 100 || loadedImg == imagesCount) {
                preloader.delay(2000).animate({width: '0%'}, 2000, function(){
			    	$('.head_container').css({
			    		transform: 'translate3d(0, 0, 0)',
			    		opacity: '1'
			    	});

			    	$('.right-side').css({
			    		transform: 'translate3d(0, 0, 0)',
			    		opacity: '1'
			    	});
                    $('.right-side__bottom').css({
                        transform: 'translate3d(0, 0, 0)',
                        opacity: '1'
                    });
			    	dBody.css('overflow', 'unset');
			    });
            }
            whiteLine.css('width', progress + '%');
            
        }
    } else {
        preloader.remove();
    }
});