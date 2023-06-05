!(function($){
	$.fancybox.defaults.transitionEffect = "circular";
	$.fancybox.defaults.transitionDuration = 500;
	$.fancybox.defaults.lang = "ru";
	$.fancybox.defaults.i18n.ru = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		ERROR: "Запрошенный контент не может быть загружен.<br/>Повторите попытку позже.",
		PLAY_START: "Начать слайдшоу",
		PLAY_STOP: "Остановить слайдшоу",
		FULL_SCREEN: "Полный экран",
		THUMBS: "Миниатюры",
		DOWNLOAD: "Скачать",
		SHARE: "Поделиться",
		ZOOM: "Увеличить"
	};
	$(document).on('click', 'a[href$=".xlsx"]', function(e){
		e.preventDefault();
		let base = window.location.origin + '/',
			reg = new RegExp("^" + base),
			href = this.href,
			test = this.href,
			go = false,
			arr = href.split('.'),
			ext = arr.at(-1).toLowerCase(),
			options = {};
		if(reg.test(href)){
			$(this).data('google', go);
			switch (ext){
				case "xlsx":
					go = window.location.origin + '/viewer/xlsx_viewer/?file=' + test;
					options = {
						src: go,
						type: 'iframe',
						opts : {
							afterShow : function( instance, current ) {
								$(".fancybox-content").addClass('xlsx_viewer');
							},
							afterLoad : function( instance, current ) {
								$(".fancybox-content").addClass('xlsx_viewer');
							},
						}
					};
					e.preventDefault();
					$.fancybox.open(options);
					return !1;
					break;
			}
		}
		return !1;
	})
}(jQuery));