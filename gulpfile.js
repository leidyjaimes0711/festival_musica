const {src, dest, watch} = require("gulp"); //en este archivo se pone el flujo de trabajo. workkflow
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

function css (done){

    src("src/scss/**/*.scss") //identifique el archivo .scss a compilar
    .pipe(plumber())
    .pipe(sass()) //compilelo

    .pipe(dest("build/css"))//almacenelo en el disco duro

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css)


    done();
}

exports.css = css;
exports.dev= dev;

// izq nombre con el que se llamará - der función que se llamará


//npx gulp primeraTarea