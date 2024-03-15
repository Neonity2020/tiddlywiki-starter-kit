/*\
title: $:/plugins/oeyoews/vue-tomato/app.js
type: application/javascript
module-type: library

\*/

const { ref, watch, onBeforeUnmount } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const app = () => {
  const component = {
    setup() {
      const defaultMinutes = 25;
      const minutes = ref(defaultMinutes);
      const seconds = ref(0);
      const isRunning = ref(false);
      let timerInterval = null;

      const startTimer = () => {
        if (!isRunning.value) {
          isRunning.value = true;
          timerInterval = setInterval(() => {
            if (seconds.value > 0) {
              seconds.value--;
            } else if (minutes.value > 0) {
              seconds.value = 59;
              minutes.value--;
            } else {
              clearInterval(timerInterval);
              isRunning.value = false;
              alert('番茄钟完成！');
            }
          }, 1000);
        }
      };

      const pauseTimer = () => {
        clearInterval(timerInterval);
        isRunning.value = false;
      };

      const resetTimer = () => {
        clearInterval(timerInterval);
        minutes.value = defaultMinutes;
        seconds.value = 0;
        isRunning.value = false;
      };

      const adjustTime = (minutesToAdd) => {
        if (!isRunning.value) {
          minutes.value += minutesToAdd;
          if (minutes.value < 0) {
            minutes.value = 0;
          }
        }
      };

      watch(isRunning, (newValue) => {
        if (!newValue && timerInterval) {
          clearInterval(timerInterval);
        }
      });

      onBeforeUnmount(() => {
        clearInterval(timerInterval);
      });

      return {
        minutes,
        seconds,
        isRunning,
        startTimer,
        pauseTimer,
        resetTimer,
        adjustTime
      };
    },

    template: getTemplate('$:/plugins/oeyoews/vue-tomato/templates/app.vue'),

    components: {
      Button: require('./components/Button.js')
    }
  };

  return component;
};

module.exports = app;
