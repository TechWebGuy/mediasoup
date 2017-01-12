'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const replace = require('gulp-replace');
const touch = require('gulp-touch-cmd');
const shell = require('gulp-shell');

let tests =
[
	'test/test_mediasoup.js',
	// 'test/test_Server.js',
	// 'test/test_Room.js',
	// 'test/test_Peer.js',
	// 'test/test_Transport.js',
	// 'test/test_RtpReceiver.js',
	// 'test/test_extra.js'
	// NOTE: Disable this test until fixed
	// 'test/test_scene_1.js'
];

gulp.task('lint', () =>
{
	let src =
	[
		'.eslintrc.js',
		'gulpfile.js',
		'lib/**/*.js',
		'data/**/*.js',
		'test/**/*.js'
	];

	return gulp.src(src)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('rtpcapabilities', () =>
{
	let supportedRtpCapabilities = require('./lib/supportedRtpCapabilities');

	return gulp.src('worker/src/RTC/Room.cpp')
		.pipe(replace(/(const std::string supportedRtpCapabilities =).*/, `$1 R"(${JSON.stringify(supportedRtpCapabilities)})";`))
		.pipe(gulp.dest('worker/src/RTC/'))
		.pipe(touch());
});

gulp.task('test-api', shell.task(
	[
		'if type make &> /dev/null; then make; fi',
		`tap --bail --color --reporter=spec ${tests.join(' ')}`
	],
	{
		verbose : true,
		env     : { DEBUG: '*ABORT*' }
	}
));

gulp.task('test-worker', shell.task(
	[
		'if type make &> /dev/null; then make test; fi',
		'worker/out/Debug/mediasoup-worker-test'
	],
	{
		verbose : true
	}
));
