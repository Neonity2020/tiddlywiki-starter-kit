/*\
title: $:/plugins/oeyoews/neotw-otime/time.js
type: application/javascript
module-type: library

time.js

\*/
// +8 timezone
function calculateTimeDiff(dateString) {
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  const timeDiff = Math.abs(targetDate.getTime() - currentDate.getTime());

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  const dayString = days > 0 ? `${days} 天 ` : '';
  const hourString = hours > 0 ? `${hours} 小时 ` : '';
  const minuteString = minutes > 0 ? `${minutes} 分钟 ` : '';
  const secondString = seconds > 0 ? `${seconds} 秒` : '';

  const timeStage =
    targetDate.getTime() > currentDate.getTime()
      ? `距离 ${targetDate.toLocaleString('zh-CN', {
          timeZone: 'Asia/Shanghai',
        })} 还有 ${dayString}${hourString}${minuteString}${secondString}。`
      : `距离 ${targetDate.toLocaleString('zh-CN', {
          timeZone: 'Asia/Shanghai',
        })} 已经过去了 ${dayString}${hourString}${minuteString}${secondString}。`;

  return timeStage;
}

module.exports = {
  calculateTimeDiff,
};
