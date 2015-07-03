
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['*.js', '!gruntFile*.js'],
            options: {
                'curly': true,
                'eqnull': true,
                'eqeqeq': true,
                'undef': true,
                'globals': {
                    'jQuery': true
                },
                'browser': true
            }
        },

        less: {
            all: {
                options: {

                },
                files: {
                    './styles.css': './styles.less'
                }
            }
        },

        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'less', 'watch']);

};
