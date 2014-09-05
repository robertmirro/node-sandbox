module.exports = function (grunt) {
	grunt.initConfig({
		uglify: {
			dist: {
				files: {
					'calculator.min.js': 'calculator/*.js'
				},
				/* NOTES:
					- footer seems to have no effect
					- sourceMaps seem to be broken
				*/
				options: {
					banner: '/* This is my minified app, built <%= grunt.template.today() %> */\n' ,
					footer: '\n/* footer... */\n' ,
					compress: {
						/* none of the options below are working: http://stackoverflow.com/a/21020309 */
						/* drop_console: true */
						/* dropConsole: true */
						/* pure_funcs: ['console.log'] */
					} ,
					beautify: false ,
					preserveComments: false ,
					
					/* this is NOT working as expected:
					sourceMap: true ,
					sourceMapName: 'calculator.map'
					*/
					sourceMap: 'calculator.map'
				}
			},
			addsub: {
				files: {
					'addsub.js': ['calculator/add.js', 'calculator/subtract.js']
				}
			}
		},
		watch: {
			files: ['calculator/*.js'],
			tasks: ['uglify:dist']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'uglify'
	]);
};