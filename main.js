var app      = require('app'),
    Browser  = require('browser-window'),
    shortcut = require('global-shortcut'),
    win      = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Unregister the Keyboard shortcuts
app.on('will-quit', function () {
  shortcut.unregisterAll();
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

  // Load the main html game
  win.loadUrl('file://' + __dirname + '/index.html');

  // Keyboard shortcuts
  // Reload
  shortcut.register('ctrl+r', function () {
    win.reload();
  });

  // Quit
  shortcut.register('ctrl+q', function () {
    win.close();
  });
});

