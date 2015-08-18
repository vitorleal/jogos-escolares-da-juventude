var app     = require('app'),
    Browser = require('browser-window'),
    win     = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// App on ready
app.on('ready', function () {
  // Main window
  win = new Browser({
    kiosk     : true,
    fullscreen: true
  });

  // On window close
  win.on('closed', function () {
    win = null;
  });

  win.loadUrl('file://' + __dirname + '/index.html');
});

