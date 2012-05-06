/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*!\n' +
				' * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
				' * <%= pkg.homepage %>\n' +
				' * \n' +
				' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %>\n' +
				' * This content is released under the <%= _.pluck(pkg.licenses, "type").join(", ") %> license<%= pkg.licenses.length === 1 ? "" : "s" %>\n' +
				' * <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
				' */',
			microbanner: '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> | Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %> | <%= pkg.homepage %> | <%= _.pluck(pkg.licenses, "url").join(", ") %> */'
		},
		lint: {
			files: ['grunt.js', 'test/**/*.js', 'src/**/*.js']
		},
		qunit: {
      files: ['test/**/*.html']
    },
		concat: {
			dist: {
				src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
				dest: '<%= pkg.name %>.js'
			}
		},
		min: {
			dist: {
				src: ['<banner:meta.microbanner>', '<config:concat.dist.dest>'],
				dest: '<%= pkg.name %>.min.js'
			}
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'lint qunit'
		},
		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				browser: true
			},
			globals: {
				jQuery: true
			}
		},
		uglify: {}
	});

	// Default task.
	grunt.registerTask('default', 'lint qunit concat min');

};
