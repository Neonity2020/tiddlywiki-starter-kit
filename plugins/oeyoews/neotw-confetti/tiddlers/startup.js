/*\
title: $:/plugins/oeyoews/neotw-confetti/startup.js
type: application/javascript
module-type: startup

load confetti

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'confetti-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;

  exports.startup = function () {
    // load some confetti effects
    // TODO: support params
    $tw.rootWidget.addEventListener('om-confetti-launch', () => {
      Confetti.pride();
    });
    window.Confetti = require('$:/plugins/oeyoews/neotw-confetti/example/fireworks.js');
    // startup trigger fireworks
    // Confetti.fireworks();
  };
})();
