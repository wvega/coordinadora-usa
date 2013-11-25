/*global module:false*/
/*jshint indent:2 */
module.exports = function(grunt) {

  // project configuration.
  grunt.initConfig({
    // metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // task configuration.

    'bower-install': {
      options: {
        directory: 'bower'
      }
    },

    copy: {
      dependencies: {
        files: [
          { cwd: 'bower/bootstrap/dist/', src: ['css/bootstrap.min.css', 'js/bootstrap.min.js', 'fonts/*'], dest: 'src/lib/bootstrap/', expand: true },
          { cwd: 'bower/jquery/', src: ['jquery.min.js', 'jquery.min.map'], dest: 'src/lib/jquery/', expand: true },
          { cwd: 'bower/requirejs/', src: 'require.js', dest: 'src/lib/', expand: true },
          { src: 'bower/underscore/underscore-min.js', dest: 'src/lib/underscore.js' },
          { src: 'bower/parse/index.js', dest: 'src/lib/parse.js' }
        ]
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['src/js/**/*.js']
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app']
      }
    }
  });

  // these plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-bower-cli');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');

  grunt.renameTask('bower', 'bower-install');

  // default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('bower', ['bower-install', 'copy:dependencies']);
};
