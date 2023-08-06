import { useState, useEffect } from 'react';


export default function Timer({init, onTimerExpiry, onHintTimeEvent})  {
  let [time, setTime] = useState(init);
  let [ intervalId, setIntervalId ] = useState();
  useEffect(() => {
    if(init === 0) return;
    let intervalId = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);
    setIntervalId(intervalId);
    return function() {
      clearInterval(intervalId);
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
      onTimerExpiry();
    }
  }, [time])

  return (
    <div>
      <time className='timer'>{time}</time>
    </div>
  )
};