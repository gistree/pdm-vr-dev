module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        version: grunt.config.set('version', '<%= pkg.version%>'),
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'app/style',
                    src: ['*.css', '!*.min.css'],
                    dest: 'app/style/min',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                separator: '',
            },
            dist: {
                src: [
                    'app/style/min/ui.fancytree.min.css',
                    'app/style/min/bootstrap.min.css',
                    'app/style/min/ol.min.css',
                    'app/style/min/selectize.min.css',
                    'app/style/min/select.min.css',
                    'app/style/min/ngDialog.min.css',
                    'app/style/min/ngDialog-theme-default.min.css'
                ],
                dest: 'public/style/vendor.css',
            },
        },
        copy: {
            css: {
                expand: true,
                cwd: 'app/style/min/',
                src: 'style.min.css',
                dest: 'public/style/',
            },
            modules: {
                expand: true,
                cwd: 'app/modules/',
                src: '**/*.html',
                dest: 'public/app/templates/',
                flatten: true,
                filter: 'isFile',
            }
        },
        uglify: {
            fancytree: {
                files: {
                    'public/vendor/fancytree-build.min.js': [
                        'app/vendor/fancytree/jquery.fancytree.min.js',
                        'app/vendor/fancytree/jquery.fancytree.edit.js',
                        'app/vendor/fancytree/jquery.fancytree.glyph.js',
                        'app/vendor/fancytree/jquery.fancytree.wide.js'
                    ]
                }
            },
            map: {
                files: {
                    'app/modules/Map/build/build.js': [
                        'app/modules/Map/*.js',
                        'app/modules/Map/services/*.js',
                        'app/modules/Map/factories/*.js',
                        'app/modules/Map/controllers/*.js',
                        'app/modules/Map/directives/*.js'
                    ]
                }
            },
            mapInteractions: {
                files: {
                    'app/modules/MapInteractions/build/build.js': [
                        'app/modules/MapInteractions/*.js',
                        'app/modules/MapInteractions/services/*.js',
                        'app/modules/MapInteractions/filters/*.js',
                        'app/modules/MapInteractions/controllers/*.js',
                        'app/modules/MapInteractions/directives/*.js'
                    ]
                }
            },
            drawing: {
                files: {
                    'app/modules/Drawing/build/build.js': [
                        'app/modules/Drawing/*.js',
                        'app/modules/Drawing/controllers/*.js',
                        'app/modules/Drawing/directives/*.js'
                    ]
                }
            },
            legends: {
                files: {
                    'app/modules/Legends/build/build.js': [
                        'app/modules/Legends/*.js',
                        'app/modules/Legends/services/*.js',
                        'app/modules/Legends/controllers/*.js',
                        'app/modules/Legends/directives/*.js'
                    ]
                }
            },
            printing: {
                files: {
                    'app/modules/Printing/build/build.js': [
                        'app/modules/Printing/*.js',
                        'app/modules/Printing/services/*.js',
                        'app/modules/Printing/controllers/*.js',
                        'app/modules/Printing/directives/*.js'
                    ]
                }
            },
            searchlocation: {
                files: {
                    'app/modules/SearchLocation/build/build.js': [
                        'app/modules/SearchLocation/*.js',
                        'app/modules/SearchLocation/services/*.js',
                        'app/modules/SearchLocation/filters/*.js',
                        'app/modules/SearchLocation/controllers/*.js',
                        'app/modules/SearchLocation/directives/*.js'
                    ]
                }
            },
            basedocumental: {
                files: {
                    'app/modules/BaseDocumental/build/build.js': [
                        'app/modules/BaseDocumental/*.js',
                        'app/modules/BaseDocumental/services/*.js',
                        'app/modules/BaseDocumental/filters/*.js',
                        'app/modules/BaseDocumental/controllers/*.js',
                        'app/modules/BaseDocumental/directives/*.js'
                    ]
                }
            },
            authentication: {
                files: {
                    'app/modules/Authentication/build/build.js': [
                        'app/modules/Authentication/*.js',
                        'app/modules/Authentication/services/*.js',
                        'app/modules/Authentication/filters/*.js',
                        'app/modules/Authentication/controllers/*.js',
                        'app/modules/Authentication/directives/*.js'
                    ]
                }
            },
            modules: {
                files: {
                    'public/app/app-<%=version%>.js': [
                        'app/app.js',
                        'app/modules/*/build/build.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build-css', ['cssmin', 'concat', 'copy:css']);
    grunt.registerTask('fancytree_min', ['uglify:fancytree']);
    grunt.registerTask('angular-modules', ['uglify:map', 'uglify:mapInteractions', 'uglify:drawing', 'uglify:legends', 'uglify:printing', 'uglify:searchlocation', 'uglify:basedocumental', 'uglify:authentication', 'copy:modules']);
    grunt.registerTask('angular-build', ['uglify:modules']);

    grunt.registerTask('build', ['build-css', 'angular-modules', 'angular-build']);
    grunt.registerTask('default', []);

};