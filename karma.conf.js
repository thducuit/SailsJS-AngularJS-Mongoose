// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath : '',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks : ['jasmine'],

		// list of files / patterns to load in the browser
		files : [
			'client/bower_components/jquery/dist/jquery.js',
			'client/bower_components/angular/angular.js',
			'client/bower_components/angular-mocks/angular-mocks.js',
			'client/bower_components/angular-resource/angular-resource.js',
			'client/bower_components/angular-cookies/angular-cookies.js',
			'client/bower_components/angular-sanitize/angular-sanitize.js',
			'client/bower_components/angular-route/angular-route.js',
			'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'client/bower_components/lodash/dist/lodash.compat.js',
			'client/bower_components/angular-animate/angular-animate.js',
			'client/bower_components/angular-aria/angular-aria.js',
			'client/bower_components/angular-material/angular-material.js',
			'client/app/scripts/app.js',
			'client/tests/*.js',
			'client/tests/**/*.js',
			'client/app/**/*.js',
			'client/components/**/*.js',
			'client/app/**/*.html',
			'client/components/**/*.html'
		],

		ngHtml2JsPreprocessor : {
			stripPrefix : 'client/'
		},

		// list of files / patterns to exclude
		exclude : [],

		// web server port
		port : 8080,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel : config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch : false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers : ['PhantomJS'],

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun : false,

		// Code coverage report
		reporters : ['progress', 'coverage'],
		preprocessors : {
			'**/*.html' : 'html2js',
			'client/app/scripts/**/*.js' : ['coverage']
		},
		coverageReporter : {
			type : 'html',
			dir : 'coverage/client'
		},

		// Don't forget to add 'karma-coverage' to your list of plugins
		plugins : [
      'karma-html2js-preprocessor',
      'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-coverage'
		]
	});
};
