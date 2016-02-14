/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
  https://github.com/vigetlabs/gulp-starter/
*/

var 
requireDir = require('require-dir'), 
gulp = require('gulp');

// Specify the init task, just to make life easier for subsequent tasks
gulp.task('init', [], function() {
    console.log('Default init (NOOP)');
});

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

