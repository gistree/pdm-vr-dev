module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                    'app/style/ol.css'
                ],
                dest: 'public/style/vendor.css',
            },
        },
        copy: {
            css: {
                expand: true,
                cwd: 'app/style/min/',
                src: 'app/style.min.css',
                dest: 'public/style/',
            },
        },
        uglify: {
            fancytree: {
                files: {
                    'public/vendor/fancytree-build.min.js': [
                        'app/vendor/fancytree/jquery.fancytree.min.js',
                        'app/vendor/fancytree/jquery.fancytree.edit.js',
                        'app/vendor/fancytree/jquery.fancytree.glyph.js',
                        'app/vendor/fancytree/jquery.fancytree.wide.js',
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('CSS_Minify', ['cssmin', 'concat', 'copy:css']);
    grunt.registerTask('fancytree_min', ['uglify:fancytree']);
    grunt.registerTask('default', []);

};