const {src, dest, watch, parallel} = require('gulp'); //en este archivo se pone el flujo de trabajo. workkflow

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
const webp = require('gulp-webp');
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');

function css (done){

    src('src/scss/**/*.scss') //identifique el archivo .scss a compilar
    .pipe(plumber())
    .pipe(sass()) //compilar
    .pipe(dest('build/css'))//almacenelo en el disco duro
    done();
}

function imagenes (done){
    const opciones = {

        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done();


}

function versionWebp (done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))
    done();
}

function versionAvif (done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    done();
}

function javascript (done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'));
    done();
}


function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.dev= parallel(imagenes, versionWebp, versionAvif,javascript, dev); //ejecuta varias tareas en paralelo


// izq nombre con el que se llamará - der función que se llamará





//npx gulp primeraTarea