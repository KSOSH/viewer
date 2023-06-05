! function(e) {
		var t = {};

		function n(r) {
				if (t[r]) return t[r].exports;
				var o = t[r] = {
						i: r,
						l: !1,
						exports: {}
				};
				return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
		}
		n.m = e, n.c = t, n.d = function(e, t, r) {
				n.o(e, t) || Object.defineProperty(e, t, {
						enumerable: !0,
						get: r
				})
		}, n.r = function(e) {
				"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
						value: "Module"
				}), Object.defineProperty(e, "__esModule", {
						value: !0
				})
		}, n.t = function(e, t) {
				if (1 & t && (e = n(e)), 8 & t) return e;
				if (4 & t && "object" == typeof e && e && e.__esModule) return e;
				var r = Object.create(null);
				if (n.r(r), Object.defineProperty(r, "default", {
								enumerable: !0,
								value: e
						}), 2 & t && "string" != typeof e)
						for (var o in e) n.d(r, o, function(t) {
								return e[t]
						}.bind(null, o));
				return r
		}, n.n = function(e) {
				var t = e && e.__esModule ? function() {
						return e.default
				} : function() {
						return e
				};
				return n.d(t, "a", t), t
		}, n.o = function(e, t) {
				return Object.prototype.hasOwnProperty.call(e, t)
		}, n.p = "", n(n.s = 1)
}([, function(e, t, n) {
		"use strict";
		n.r(t);
		const r = {
				toolbar: {
						undo: "Отменить",
						redo: "Восстановить",
						print: "Печать",
						paintformat: "Формат по образцу",
						clearformat: "Очистить Формат",
						format: "Формат",
						fontName: "Шрифт",
						fontSize: "Размер Шрифта",
						fontBold: "Жирный",
						fontItalic: "Наклонный",
						underline: "Подчёркнутый",
						strike: "Зачёркнутый",
						color: "Цвет Текста",
						bgcolor: "Цвет Заливки",
						border: "Границы",
						merge: "Объеденить Ячейки",
						align: "Горизонтальное выравнивани",
						valign: "Вертикальное выравнивание",
						textwrap: "Перенос текта",
						freeze: "Заморозить ячейку",
						autofilter: "Автофильтр",
						formula: "Функции",
						more: "Подробнее"
				},
				contextmenu: {
						copy: "Копировать",
						cut: "Вырезать",
						paste: "Вставить",
						pasteValue: "Вставить данные",
						pasteFormat: "Вставить формат",
						hide: "Скрыть",
						insertRow: "Вставить строку",
						insertColumn: "Вставить колонку",
						deleteSheet: "Удалить",
						deleteRow: "Удалить строку",
						deleteColumn: "Удалить колонку",
						deleteCell: "Удалить ячейку",
						deleteCellText: "Удалить текст в ячейке",
						validation: "Проверка данных",
						cellprintable: "Включить экспорт",
						cellnonprintable: "Отключить экспорт",
						celleditable: "Включить редактирование",
						cellnoneditable: "Отключить редактирование"
				},
				print: {
						size: "Размер бумаги",
						orientation: "Ориентация страницы",
						orientations: ["Альбомный", "Книжный"]
				},
				format: {
						normal: "Нормальный",
						text: "Обычный текст",
						number: "Число",
						percent: "Процент",
						rmb: "RMB",
						usd: "USD",
						eur: "EUR",
						date: "Дата",
						time: "Время",
						datetime: "Дата и Время",
						duration: "Продолжительность"
				},
				formula: {
						sum: "Sum",
						average: "Average",
						max: "Max",
						min: "Min",
						_if: "IF",
						and: "AND",
						or: "OR",
						concat: "Concat"
				},
				validation: {
						required: "it must be required",
						notMatch: "it not match its validation rule",
						between: "it is between {} and {}",
						notBetween: "it is not between {} and {}",
						notIn: "it is not in list",
						equal: "it equal to {}",
						notEqual: "it not equal to {}",
						lessThan: "it less than {}",
						lessThanEqual: "it less than or equal to {}",
						greaterThan: "it greater than {}",
						greaterThanEqual: "it greater than or equal to {}"
				},
				error: {
						pasteForMergedCell: "Unable to do this for merged cells"
				},
				calendar: {
						weeks: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
						months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Остябрь", "Ноябрь", "Декабрь"]
				},
				button: {
						next: "Далее",
						cancel: "Отменить",
						remove: "Удалить",
						save: "Сохранить",
						ok: "ОК"
				},
				sort: {
						desc: "Сортировка Z -> A",
						asc: "Сортировка A -> Z"
				},
				filter: {
						empty: "Пусто"
				},
				dataValidation: {
						mode: "Режим",
						range: "Диапозон ячеек",
						criteria: "Критерии",
						modeType: {
								cell: "Ячейка",
								column: "Столбец",
								row: "Строка"
						},
						type: {
								list: "Лист",
								number: "Число",
								date: "Дата",
								phone: "Телефон",
								email: "Email"
						},
						operator: {
								be: "between",
								nbe: "not betwwen",
								lt: "less than",
								lte: "less than or equal to",
								gt: "greater than",
								gte: "greater than or equal to",
								eq: "equal to",
								neq: "not equal to"
						}
				}
		};
		window && window.x_spreadsheet && (window.x_spreadsheet.$messages = window.x_spreadsheet.$messages || {}, window.x_spreadsheet.$messages.ru = r), t.default = r
}]);