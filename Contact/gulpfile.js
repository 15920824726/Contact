/**
 * Created by yar on 7/15/2016.
 */
(function () {
    'use strict';

    var gulp = require('gulp'),
        uglify = require('gulp-uglify'),
    //clean = require('gulp-clean'),
        rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
        concat = require('gulp-concat'),
    //uglify = require('gulp-uglify'),
        inject = require('gulp-inject'),
        watch = require('gulp-watch'),
    //inject = require('gulp-inject'),
        minifyCss = require('gulp-minify-css'),
        ngMin = require('gulp-ngmin');

//sass的编译 gulp-ruby-sass
//自动添加css前缀 gulp-autoprefixer
//压缩css  gulp-minify-css
//js代码校验 gulp-jshint
//合并js代码 gulp-concat
//压缩js代码 gulp-uglify
//压缩图片 gulp-imagemin
//自动刷新页面 gulp-livereload
//图片缓存，只有图片替换了才压缩gulp-cache
//更改提醒 gulp-notify
//清除文件 del

    var rootPath = '';

    var cachePath = [
        rootPath + 'common/content/css/cache.appcache'
    ];

    gulp.task('appCache', function () {
        return gulp.src(cachePath)
            .pipe(gulp.dest(rootPath + 'build/common/content/css'));
    });
    //1 copy all the fonts into on directory
    var fontsPath = [
        rootPath + 'common/content/fonts/*.*',
        rootPath + 'lib/ionic/fonts/*.*',
        rootPath + 'setting/content/fonts/*.*',
        rootPath + 'contacts/content/fonts/*.*',
        rootPath + 'company-role/content/fonts/*.*'
    ];

    gulp.task('01_copyFonts', function () {
        return gulp.src(fontsPath)
            .pipe(gulp.dest(rootPath + 'build/content/fonts'));
    });

    //2 copy all the img into on directory
    var imgPath = [
        rootPath + 'business-partner/content/img/*.*',
        rootPath + 'common/content/img/*.*',
        rootPath + 'company-role/content/img/*.*'
    ];

    gulp.task('02_copyImg', function () {
        return gulp.src(imgPath)
            .pipe(gulp.dest(rootPath + 'build/content/img'));
    });


    //3 remove all css files into one directory
    var cssPath = [
        rootPath + 'lib/ionic/css/ionic.css',
        rootPath + 'lib/network-tips/network-tips.css',
        rootPath + 'lib/status-bar-overlay/status-bar-overlay.css',
        rootPath + 'contacts/content/css/common.css',
        rootPath + 'contacts/content/css/contacts-list.css',
        rootPath + 'contacts/content/css/contacts-detail.css',
        rootPath + 'user-info/content/css/user-info.css',
        rootPath + 'company-role/content/css/common.css',
        rootPath + 'company-role/content/css/company-role.css',
        rootPath + 'business-partner/content/css/businessPartnerDetail.css',
        rootPath + 'business-partner/content/css/businessPartner.css',
        rootPath + 'business-partner/content/css/bpContactDetail.css',
        rootPath + 'contacts/content/css/contacts-list.css',
        rootPath + 'desktop/content/css/desktop.css',
        rootPath + 'common/content/css/common.css',
        rootPath + 'common/content/css/style.css',
        rootPath + 'project/content/css/project-list.css',
        rootPath + 'project/content/css/project-contact.css',
        rootPath + 'project/content/css/project-contact-message.css',
        rootPath + 'project/content/css/project-details.css',
        rootPath + 'favorite/content/css/favorite.css',
        rootPath + 'setting/content/css/setting.css',
        rootPath + 'setting/content/css/setting-list.css',
        rootPath + 'user-info/content/css/login.css',
        rootPath + 'favorite/content/css/favorite.css',
        rootPath + 'favorite/content/css/favorite-detail.css'
    ];

    gulp.task('03_minCss', function () {
        return gulp.src(cssPath)
            .pipe(minifyCss())
            .pipe(concat('contact.min.css'))
            .pipe(gulp.dest(rootPath + 'build/content/css'));
    });

    //4 min lib js
    var libPath = [
        rootPath + 'lib/01_jquery/jquery-2.1.0.js',
        rootPath + 'lib/20_libs/accounting.js',
        rootPath + 'lib/20_libs/lodash.js',
        rootPath + 'lib/20_libs/math.js',
        rootPath + 'lib/20_libs/moment-with-locales.js',
        rootPath + 'lib/utils/utils.js',
        rootPath + 'lib/linq/linq.min.js'
    ];

    gulp.task('04_libJs', function () {
        return gulp.src(libPath)
            .pipe(uglify())
            .pipe(concat('lib.min.js'))
            .pipe(gulp.dest(rootPath + 'build/lib'));
    });

    var libNgPath = [
        //rootPath + 'lib/ionic/js/ionic.bundle.js',
        rootPath + 'lib/IOS9_Patch/angular-ios9-uiwebview.patch.js',
        rootPath + 'lib/21_libs-angular/angular-translate.js',
        rootPath + 'lib/ngCordova/dist/ng-cordova.js',
        rootPath + 'lib/21_libs-angular/translate-addons/angular-translate-handler-log.js',
        rootPath + 'lib/21_libs-angular/translate-addons/angular-translate-loader-partial.js',
        //rootPath + 'lib/30_platform/authentication.js',
        rootPath + 'lib/network-tips/network-tips.js',
        rootPath + 'lib/status-bar-overlay/status-bar-overlay.js'
    ];

    //min angular js
    gulp.task('04_libNgJs', function () {
        return gulp.src(libNgPath)
            .pipe(ngMin({dynamic: true}))
            .pipe(uglify())
            .pipe(concat('lib.ng.min.js'))
            .pipe(gulp.dest(rootPath + 'build/lib'));
    });


    //5 module js
    var modulePath = [
        rootPath + 'platform/platform.js',
        rootPath + 'common/module.js',
        rootPath + 'setting/module.js',
        rootPath + 'user-info/module.js',
        rootPath + 'company-role/module.js',
        rootPath + 'desktop/module.js',
        rootPath + 'contacts/module.js',
        rootPath + 'favorite/module.js',
        rootPath + 'project/modules.js',
        rootPath + 'business-partner/module.js'
    ];

    gulp.task('05_moduleJs', function () {
        return gulp.src(modulePath)
           // .pipe(ngMin({dynamic: true}))
            .pipe(uglify())
            .pipe(concat('module.min.js'))
            .pipe(gulp.dest(rootPath + 'build/js'));
    });

    var subModulePath = [
        rootPath + 'platform/*/*.js',
        rootPath + 'common/*/*.js',
        rootPath + 'business-partner/*/*.js',
        rootPath + 'user-info/*/*.js',
        rootPath + 'company-role/*/*.js',
        rootPath + 'desktop/*/*.js',
        rootPath + 'contacts/*/*.js',
        rootPath + 'favorite/*/*.js',
        rootPath + 'project/*/*.js',
        rootPath + 'setting/*/*.js'
    ];

    gulp.task('05_submoduleJs', function () {
        return gulp.src(subModulePath)
            //.pipe(ngMin({dynamic: true}))
            .pipe(uglify())
            .pipe(concat('submodule.min.js'))
            .pipe(gulp.dest(rootPath + 'build/js'));
    });

    gulp.task('clean', function () {
        return gulp.src([rootPath + 'build/js/*.js'], {read: false})
            .pipe(rimraf({force: true}));
    });

    var allPaths = [
        rootPath + 'build/js/lib.min.js',
        rootPath + 'build/js/module.min.js',
        rootPath + 'build/js/submodule.min.js'
    ];

    gulp.task('all.min', function () {
        return gulp.src(allPaths)
            .pipe(ngMin({dynamic: true}))
            .pipe(uglify())
            .pipe(concat('all.min.js'))
            .pipe(gulp.dest(rootPath + 'build/js'));
    });
    //copy files
    var start = [
        [
            rootPath + 'app.js',
            rootPath + 'checkconnectforContact.js',
            rootPath + 'favicon.ico'
        ],
        //1
        [rootPath + 'business-partner/content/i18n/*.*'],
        //2
        [rootPath + 'business-partner/partials/*.*'],
        //3
        [rootPath + 'business-partner/templates/*.*'],

        //4
        [rootPath + 'common/content/i18n/*.*'],
        //5
        [rootPath + 'common/partials/*.*'],

        //6
        [rootPath + 'company-role/content/i18n/*.*'],
        //7
        [rootPath + 'company-role/templates/*.*'],

        //8
        [rootPath + 'contacts/content/i18n/*.*'],
        //9
        [rootPath + 'contacts/templates/*.*'],

        //10
        [rootPath + 'desktop/content/i18n/*.*'],
        //11
        [rootPath + 'desktop/partials/*.*'],

        //12
        [rootPath + 'favorite/content/i18n/*.*'],
        //13
        [rootPath + 'favorite/templates/*.*'],

        //14
        [rootPath + 'lib/30_platform/authentication.js'],
        //15
        [rootPath + 'lib/android/*.*'],
        //16
        [rootPath + 'lib/ionic/js/ionic.bundle.js'],

        //17
        [rootPath + 'project/content/i18n/*.*'],
        //18
        [rootPath + 'project/templates/*.*'],

        //19
        [rootPath + 'setting/content/img/*.*'],
        //20
        [rootPath + 'business-partner/content/img/*.*'],
        //21
        [rootPath + 'setting/content/i18n/*.*'],
        //22
        [rootPath + 'setting/partials/*.*'],
        //23
        [rootPath + 'setting/templates/*.*'],

        //24
        [rootPath + 'user-info/content/i18n/*.*'],
        //25
        [rootPath + 'user-info/templates/*.*'],
        //26
        [rootPath + 'platform/global.js'],
        //27
        [
            rootPath + 'release.html'
        ]
    ];
    gulp.task('copy', function() {
        gulp.src(start[0])
            .pipe(gulp.dest(rootPath + 'build/'));

        gulp.src(start[1])
            .pipe(gulp.dest(rootPath + 'build/business-partner/content/i18n'));
        gulp.src(start[2])
            .pipe(gulp.dest(rootPath + 'build/business-partner/partials'));
        gulp.src(start[3])
            .pipe(gulp.dest(rootPath + 'build/business-partner/templates'));
        gulp.src(start[4])
            .pipe(gulp.dest(rootPath + 'build/common/content/i18n'));
        gulp.src(start[5])
            .pipe(gulp.dest(rootPath + 'build/common/partials'));
        gulp.src(start[6])
            .pipe(gulp.dest(rootPath + 'build/company-role/content/i18n'));
        gulp.src(start[7])
            .pipe(gulp.dest(rootPath + 'build/company-role/templates'));
        gulp.src(start[8])
            .pipe(gulp.dest(rootPath + 'build/contacts/content/i18n'));
        gulp.src(start[9])
            .pipe(gulp.dest(rootPath + 'build/contacts/templates'));
        gulp.src(start[10])
            .pipe(gulp.dest(rootPath + 'build/desktop/content/i18n'));
        gulp.src(start[11])
            .pipe(gulp.dest(rootPath + 'build/desktop/partials'));
        gulp.src(start[12])
            .pipe(gulp.dest(rootPath + 'build/favorite/content/i18n'));
        gulp.src(start[13])
            .pipe(gulp.dest(rootPath + 'build/favorite/templates'));
        gulp.src(start[14])
            .pipe(gulp.dest(rootPath + 'build/lib/30_platform'));
        gulp.src(start[15])
            .pipe(gulp.dest(rootPath + 'build/lib/android'));
        gulp.src(start[16])
            .pipe(gulp.dest(rootPath + 'build/lib'));
        gulp.src(start[17])
            .pipe(gulp.dest(rootPath + 'build/project/content/i18n'));
        gulp.src(start[18])
            .pipe(gulp.dest(rootPath + 'build/project/templates'));
        gulp.src(start[19])
            .pipe(gulp.dest(rootPath + 'build/setting/content/img'));
        gulp.src(start[20])
            .pipe(gulp.dest(rootPath + 'build/business-partner/content/img'));
        gulp.src(start[21])
            .pipe(gulp.dest(rootPath + 'build/setting/content/i18n'));
        gulp.src(start[22])
            .pipe(gulp.dest(rootPath + 'build/setting/partials'));
        gulp.src(start[23])
            .pipe(gulp.dest(rootPath + 'build/setting/templates'));
        gulp.src(start[24])
            .pipe(gulp.dest(rootPath + 'build/user-info/content/i18n'));
        gulp.src(start[25])
            .pipe(gulp.dest(rootPath + 'build/user-info/templates'));
        gulp.src(start[26])
            .pipe(gulp.dest(rootPath + 'build/platform'));
        //index
        gulp.src(start[27])
            .pipe(rename(function(path){
                path.basename='index';
            })).pipe(
            gulp.dest(rootPath + 'build')
           );
    });

    gulp.task('default', ['appCache','copy','01_copyFonts', '02_copyImg', '03_minCss',
        '04_libJs', '04_libNgJs', '05_moduleJs', '05_submoduleJs']);

})();