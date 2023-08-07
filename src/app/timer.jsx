import { useState, useEffect } from 'react';


export default function Timer({init, onTimerExpiry, onHintTimeEvent})  {
  let [time, setTime] = useState(init);
  let [ intervalId, setIntervalId ] = useState();
  useEffect(() => {
    if(init === 0) return;
    let intervalId = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);
    console.log('timer created', intervalId);
    setIntervalId(intervalId);
    return function() {
      let r = clearInterval(intervalId);
      console.log('timerMount cleared', r, intervalId);
    };
  }, [init])

  useEffect(() => {
    //console.log('time expired', time, time < 0, intervalId);
    if(init === 0) return;
    if(time <= 20)  {
      onHintTimeEvent();
    }
    if(time <= 0) {
      let r = clearInterval(intervalId);
      console.log('timerEpired cleared', r, intervalId);
      onTimerExpiry();
    }
  }, [time])

  return (
    <div>
      <time className='timer'>{time}</time>
    </div>
  )
};
