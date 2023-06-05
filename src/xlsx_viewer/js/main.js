!(function(){
	if (!String.prototype.trim) {
		(function() {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function() {
				return this.replace(rtrim, '');
			};
		})();
	}

	function stox(wb){
		var out=[];
		wb.SheetNames.forEach(function(name){
			var o={name:name,rows:{}};
			var ws=wb.Sheets[name];
			if(!ws||!ws["!ref"])
				return;
			var range=XLSX.utils.decode_range(ws["!ref"]);
			range.s={r:0,c:0};
			var aoa=XLSX.utils.sheet_to_json(ws,{raw:false,header:1,range:range});
			aoa.forEach(function(r,i){
				var cells={};
				r.forEach(function(c,j){
					cells[j]={text:c};
					var cellRef=XLSX.utils.encode_cell({r:i,c:j});
					if(ws[cellRef]!=null&&ws[cellRef].f!=null){
						cells[j].text="="+ws[cellRef].f;
					}
				});
				o.rows[i]={cells:cells};
			});
			o.merges=[];
			(ws["!merges"]||[]).forEach(function(merge,i){
				if(o.rows[merge.s.r]==null){
					o.rows[merge.s.r]={cells:{}};
				}
				if(o.rows[merge.s.r].cells[merge.s.c]==null){
					o.rows[merge.s.r].cells[merge.s.c]={};
				}
				o.rows[merge.s.r].cells[merge.s.c].merge=[merge.e.r-merge.s.r,merge.e.c-merge.s.c];
				o.merges[i]=XLSX.utils.encode_range(merge);
			});
			out.push(o);
		});
		return out;
	}
	function xtos(sdata){
		var out=XLSX.utils.book_new();
		sdata.forEach(function(xws){
			var ws={};
			var rowobj=xws.rows;
			var minCoord={r:0,c:0},
				maxCoord={r:0,c:0};
				for(var ri=0;ri<rowobj.len;++ri){
					var row=rowobj[ri];
					if(!row)
						continue;
					Object.keys(row.cells).forEach(function(k){
						var idx=+k;
						if(isNaN(idx))
							return;
						var lastRef=XLSX.utils.encode_cell({r:ri,c:idx});
						if(ri>maxCoord.r)
							maxCoord.r=ri;
						if(idx>maxCoord.c)
							maxCoord.c=idx;
						var cellText=row.cells[k].text,type="s";
						if(!cellText){
							cellText="";
							type="z";
						}else if(!isNaN(Number(cellText))){
							cellText=Number(cellText);
							type="n"
						}else if(cellText.toLowerCase()==="true"||cellText.toLowerCase()==="false"){
							cellText=Boolean(cellText);
							type="b";
						}
						ws[lastRef]={v:cellText,t:type};
						if(type=="s"&&cellText[0]=="="){
							ws[lastRef].f=cellText.slice(1);
						}
						if(row.cells[k].merge!=null){
							if(ws["!merges"]==null)
								ws["!merges"]=[];
							ws["!merges"].push({s:{r:ri,c:idx},e:{r:ri+row.cells[k].merge[0],c:idx+row.cells[k].merge[1]}});
						}
					})
				}
				ws["!ref"] = minCoord ? XLSX.utils.encode_range({s:minCoord,e:maxCoord}) : "A1";
				XLSX.utils.book_append_sheet(out,ws,xws.name)});
		return out;
	}
	x_spreadsheet.locale('ru');
	const params = window.location.search.replace('?','').split('&').reduce((p,e) =>{
			const a = e.split('=');
			p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
			return p;
		},{}),
		domain = window.location.origin + '/',
		inner = document.getElementById('inner'),
		title = document.getElementById('title'),
		download = document.getElementById('download'),
		wrapper = document.querySelector('.main .wrapper'),
		spreadsheetFn = (function() {
			return function spreadsheetFn(wb) {
				let _title = wb.Props.Title ? wb.Props.Title.trim() : "";
				let data = stox(wb);
				if(_title){
					title.innerHTML = document.getElementsByTagName('title')[0].innerHTML = _title;
					download.setAttribute('download', _title);
				}
				x_spreadsheet(
					'#inner',
					{
						mode: 'read', // edit | read
						showToolbar: false,
						showGrid: true,
						showBottomBar: true,
						showContextmenu: false,
						view: {
							width: () => inner.offsetWidth,
							height: () => wrapper.offsetHeight
						},
					}
				).loadData(data);
			};
		})(),
		fl = params['file'] ? params['file'].replace(/^\/?/, '') : false;
	//inner.style.height = PTOP + 'px';
	//inner.style.overflow = 'hidden';
	if(fl) {
		const file = /^((?:http|https|ftp):\/\/)/.test(fl) ? fl : domain + fl;
		title.innerHTML = document.getElementsByTagName('title')[0].innerHTML = file.split('/').at(-1);
		fetch(file).then(function(res){
			res.arrayBuffer().then(function(ab){
				const wb = XLSX.read(ab);
				spreadsheetFn(wb);
				download.setAttribute("href", file);
			}).catch(function(e){
				console.log(e);
				document.body.classList.add('error');
			});
		}).catch(function(e){
			console.log(e);
			document.body.classList.add('error');
		});
	}
	
}());