module.exports = function(grunt) {
	var fs = require('fs'),
		chalk = require('chalk'),
		uniqid = function () {
			var md5 = require('md5');
			result = md5((new Date()).getTime()).toString();
			grunt.verbose.writeln("Generate hash: " + chalk.cyan(result) + " >>> OK");
			return result;
		};
	
	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};
	const NpmImportPlugin = require("less-plugin-npm-import");
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	var gc = {
		assets: "dist/viewer/pdf_viewer"
	}
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: "\n",
			},
			//main: {
			//	src: [
			//		'src/js/main.js'
			//	],
			//	dest: 'test/js/main.js'
			//},
			/**
			 * App.js
			 */
			app: {
				src: [
					'bower_components/jquery/dist/jquery.js',
					'bower_components/fancybox/dist/jquery.fancybox.js',
					'src/all/js/app.js'
				],
				dest: 'dist/app.js'
			},
			/**
			 * pdf_viewer
			 */
			pdf_viewer: {
				src: [
					'src/all/js/textversion.js',
					'src/pdf_viewer/js/pdf.js'
				],
				dest: 'dist/viewer/pdf_viewer/pdf_viewer.js'
			},
			/**
			 * docx_viewer
			 */
			docx_viewer: {
				src: [
					'src/docx_viewer/js/core-js-bundle.js',
					'src/docx_viewer/js/jszip.js',
					'bower_components/docxjs/dist/docx-preview.js',
					'src/all/js/textversion.js',
					'src/docx_viewer/js/docx.js'
				],
				dest: 'dist/viewer/docx_viewer/docx_viewer.js'
			},
			/**
			 * xlsx_viewer
			 */
			main: {
				src: [
					'bower_components/js-xlsx/dist/shim.min.js',
					'bower_components/js-xlsx/dist/xlsx.full.min.js',
					'bower_components/x-spreadsheet/dist/xspreadsheet.js',
					'src/all/js/textversion.js',
					'src/xlsx_viewer/js/locale/ru.js',
					'src/xlsx_viewer/js/xlsx.js'
				],
				dest: 'dist/viewer/xlsx_viewer/xlsx_viewer.js'
			},
		},
		uglify: {
			options: {
				sourceMap: false,
				compress: {
					drop_console: false
	  			}
			},
			app: {
				files: [
					/**
					 * App.js
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'dist/app.js'
						],
						dest: 'dist',
						filter: 'isFile',
						rename: function (dst, src) {
							return dst + '/' + 'appjs.min.js';
						}
					},
					/**
					 * docx_viewer
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'dist/viewer/docx_viewer/docx_viewer.js'
						],
						dest: 'dist/viewer/docx_viewer/',
						filter: 'isFile',
						rename: function (dst, src) {
							return dst + '/' + src.replace('.js', '.min.js');
						}
					},
					/**
					 * xlsx_viewer
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'dist/viewer/xlsx_viewer/xlsx_viewer.js'
						],
						dest: 'dist/viewer/xlsx_viewer/',
						filter: 'isFile',
						rename: function (dst, src) {
							return dst + '/' + src.replace('.js', '.min.js');
						}
					},
				]
			}
		},
		less: {
			app: {
				options : {
					compress: false,
					ieCompat: false,
					plugins: [
						new NpmImportPlugin({prefix: '~'})
					],
					modifyVars: {
						'hashes': '\'' + uniqid() + '\''
					}
				},
				files : {
					/**
					 * pdf_viewer
					 */
					'test/css/pdf_main.css' : [
						'src/pdf_viewer/less/pdf.css',
						'src/pdf_viewer/less/pdf_main.less'
					],
					/**
					 * docx_viewer
					 */
					'test/css/docx_main.css' : [
						'src/docx_viewer/less/docx.less'
					],
					/**
					 * xlsx_viewer
					 */
					'test/css/xlsx_main.css' : [
						'src/xlsx_viewer/less/xlsx.less'
					],
					/**
					 * all.less
					 */
					'test/css/app.css' : [
						'bower_components/fancybox/dist/jquery.fancybox.css',
						'src/all/less/all.less'
					]
				}
			}
		},
		autoprefixer:{
			options: {
				browsers: [
					"last 4 version"
				],
				cascade: true
			},
			app: {
				files: {
					/**
					 * pdf_viewer
					 */
					'test/css/pdf/pdf_main.css' : [
						'test/css/pdf_main.css'
					],
					/**
					 * docx_viewer
					 */
					'test/css/docx/prefix.docx_main.css' : [
						'test/css/docx_main.css'
					],
					/**
					 * xlsx_viewer
					 */
					'test/css/xlsx/prefix.xlsx_main.css' : [
						'test/css/xlsx_main.css'
					],
					/**
					 * All style sheet 
					 */
					'test/css/prefix.app.css' : [
						'test/css/app.css'
					]
				}
			}
		},
		group_css_media_queries: {
			app: {
				files: {
					/**
					 * docx_viewer
					 */
					'test/css/media/docx_main.css': [
						'test/css/docx/prefix.docx_main.css'
					],
					/**
					 * xlsx_viewer
					 */
					'test/css/media/xlsx_main.css': [
						'test/css/xlsx/prefix.xlsx_main.css'
					],
					/**
					 * All style sheet 
					 */
					'test/css/media/app.css': ['test/css/prefix.app.css']
				}
			}
		},
		replace: {
			app: {
				options: {
					patterns: [
						{
							match: /\/\*.+?\*\//gs,
							replacement: ''
						},
						{
							match: /\r?\n\s+\r?\n/g,
							replacement: '\n'
						}
					]
				},
				files: [
					/**
					 * pdf_viewer
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/pdf/pdf_main.css'
						],
						dest: 'test/css/replace/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/pdf/pdf_main.css'
						],
						dest: 'dist/viewer/pdf_viewer/',
						filter: 'isFile'
					},
					/**
					 * docx_viewer
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/docx_main.css'
						],
						dest: 'test/css/replace/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/docx_main.css'
						],
						dest: 'dist/viewer/docx_viewer/',
						filter: 'isFile'
					},
					/**
					 * xlsx_viewer
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/xlsx_main.css'
						],
						dest: 'test/css/replace/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/xlsx_main.css'
						],
						dest: 'dist/viewer/xlsx_viewer/',
						filter: 'isFile'
					},
					/**
					 * All style sheet 
					 */
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/app.css'
						],
						dest: 'test/css/replace/',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten : true,
						src: [
							'test/css/media/app.css'
						],
						dest: 'dist/',
						filter: 'isFile'
					}
				]
			}
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			app: {
				files: {
					/**
					 * pdf_viewer
					 */
					'dist/viewer/pdf_viewer/pdf_main.min.css': [
						'test/css/replace/pdf_main.css'
					],
					/**
					 * docx_viewer
					 */
					'dist/viewer/docx_viewer/docx_main.min.css': [
						'test/css/replace/docx_main.css'
					],
					/**
					 * xlsx_viewer
					 */
					'dist/viewer/xlsx_viewer/xlsx_main.min.css': [
						'test/css/replace/xlsx_main.css'
					],
					/**
					 * All style sheet 
					 */
					'dist/app.min.css' : [
						'dist/app.css'
					],
				}
			}
		},
		pug: {
			app: {
				options: {
					doctype: 'html',
					client: false,
					pretty: '\t',
					separator:  '\n',
					data: function(dest, src) {
						return {
							"hash": uniqid()
						}
					}
				},
				files: [
					/**
					 * All pug to html, php
					 */
					{
						expand: true,
						cwd: __dirname + '/src/all/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/dist/',
						ext: '.html'
					},
					{
						expand: true,
						cwd: __dirname + '/src/all/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/dist/',
						ext: '.php'
					},
					/**
					 * pdf_viewer
					 */
					{
						expand: true,
						cwd: __dirname + '/src/pdf_viewer/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/dist/viewer/pdf_viewer/',
						ext: '.html'
					},
					{
						expand: true,
						cwd: __dirname + '/src/pdf_viewer/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/dist/viewer/pdf_viewer/',
						ext: '.php'
					},
					/**
					 * xlsx_viewer
					 */
					{
						expand: true,
						cwd: __dirname + '/src/xlsx_viewer/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/dist/viewer/xlsx_viewer/',
						ext: '.html'
					},
					{
						expand: true,
						cwd: __dirname + '/src/xlsx_viewer/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/dist/viewer/xlsx_viewer/',
						ext: '.php'
					},
					/**
					 * docx_viewer
					 */
					{
						expand: true,
						cwd: __dirname + '/src/docx_viewer/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/dist/viewer/docx_viewer/',
						ext: '.html'
					},
					{
						expand: true,
						cwd: __dirname + '/src/docx_viewer/pug/',
						src: [ '*.pug' ],
						dest: __dirname + '/dist/viewer/docx_viewer/',
						ext: '.php'
					},
				]
			},
		},
		copy: {
			main: {
				expand: true,
				cwd: 'src/pdf_viewer/pdf.js',
				src: '**',
				dest: 'dist/viewer/pdf_viewer/pdf.js/',
			},
			images: {
				expand: true,
				cwd: 'src/pdf_viewer/images',
				src: '**',
				dest: 'dist/viewer/pdf_viewer/pdf.js/web/images/',
			},
			assets: {
				expand: true,
				cwd: 'src/assets',
				src: '**',
				dest: 'dist/assets/',
			}
		},
		clean: {
			app: [
				'dist/**/*'
			],
			pdf_viewer: [
				'dist/viewer/pdf_viewer/pdf.js/web/debugger.css',
				'dist/viewer/pdf_viewer/pdf.js/web/debugger.js',
				'dist/viewer/pdf_viewer/pdf.js/web/viewer.css',
				'dist/viewer/pdf_viewer/pdf.js/web/viewer.js',
				'dist/viewer/pdf_viewer/pdf.js/web/viewer.html',
				'dist/viewer/pdf_viewer/pdf.js/web/viewer.js.map'
			]
		},
	});
	grunt.registerTask('default', [
		'clean:app',
		'copy',
		'concat',
		'uglify',
		'less',
		'autoprefixer',
		'group_css_media_queries',
		'replace',
		'cssmin',
		'pug',
		'clean:pdf_viewer'
	]);
}