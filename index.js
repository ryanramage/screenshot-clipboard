var fs = require('fs'),
    chokidar = require('chokidar'),
    paste = require('copy-paste'),
    nodecr = require('nodecr'),
    prefix = 'Screen Shot ',
    suffix = '.png',
    path = getUserHome() + '/Desktop',
    watcher = chokidar.watch(path, {ignored: /\/\./, persistent: true});

watcher
  .on('add', check);

function check(file) {
    if (!valid(file)) return;


    // move the file to a temp place
    var temp = path + '/' + new Date().getTime() + '.png';
    fs.renameSync(file, temp);
    nodecr.process(temp,function(err, text) {
        if(err) return console.log(err);
        fs.unlink(temp, function(err){});
        copy(text);
    });
}


function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

function valid(file) {
    if (file.indexOf(prefix) < 0) return false;
    return file.indexOf(suffix, file.length - suffix.length) !== -1;
}