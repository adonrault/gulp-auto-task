// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')();

// Variables de chemins
var source = './src'; //dossier de travail
var destination = './dist'; //dossier à livrer

// Variables BrowserSync
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;