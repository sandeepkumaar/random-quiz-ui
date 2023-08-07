import { useState, useEffect } from 'react';


export default function Timer({init, onTimerExpiry, onHintTimeEvent, errorMessage})  {
  let [time, setTime] = useState(init);
  let [ intervalId, setIntervalId ] = useState();
  useEffect(() => {
    if(init === 0) return;
    let intervalId = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);
    console.log('setInterval', intervalId);
    setIntervalId(intervalId);
    return function() {
      let r = clearInterval(intervalId);
      console.log('clearInterval unMount', r, intervalId);
    };
  }, [init])

  useEffect(() => {
    //console.log('time expired', time, time < 0, intervalId);
    if(init === 0) return;
    if(time <= 20)  {
      onHintTimeEvent();
    }
    if(time <= 0) {
      clearInterval(intervalId);
      console.log('clearInterval TimerExpired', intervalId);
      onTimerExpiry();
    }
  }, [time])

  useEffect(() => {
    if(!errorMessage) return;
    console.log('clearInterval on Error',intervalId);
    clearInterval(intervalId);
  }, [errorMessage])

  return (
    <div>
      <time className='timer'>{time}</time>
    </div>
  )
};
