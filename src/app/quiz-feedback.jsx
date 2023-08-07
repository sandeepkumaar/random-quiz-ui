import {useState} from 'react'
import Timer from './timer.jsx'
import classnames from 'classnames';

export default function QuizFeedback({id, hint, onTimerExpiry}) {
  let initialTimer = 30;
  let [feedbackDetail, setFeedbackDetail ] = useState({
    message: 'Choose an option',
    class: 'color-blue'
  });
  let handleTimerExpiry = function() {
    setFeedbackDetail({
      message: 'Time Expired!! Auto Submitting...',
      class: 'color-red'
    });
    onTimerExpiry();
  };

  let handleHintTimeEvent = function() {
    setFeedbackDetail({
      message: `Hint: ${hint}`,
      class: 'color-blue'
    });
  };

  let className = classnames('h6', 'flex-max', {
    "color-blue": feedbackDetail.class === 'color-blue',
    "color-red": feedbackDetail.class === 'color-red',

  })


  return (
    <section className='feedback flex mb-2 mt-4'>
      <h6 className={className}>{ feedbackDetail.message}</h6>
      <Timer 
        key={id} 
        init={initialTimer} 
        onTimerExpiry={handleTimerExpiry} 
        onHintTimeEvent={handleHintTimeEvent}
      />
    </section>
  )

}

//<Feedback hintMessage={hintMessage} expiredMessage={expiredMessage} responseMessage={responseMessage}/>
/*
<section className='feedback flex mb-2 mt-4'>
  <Feedback hintMessage={hintMessage} expiredMessage={expiredMessage} responseMessage={responseMessage}/>
  <Timer key={id} init={initialTimer} onTimerExpiry={handleTimerExpiry} onHintTimeEvent={handleHintTimeEvent}/>
</section>

{ overrideMessage ? (
  <h6 className='h6 flex-max color-blue'>{ overrideMessage}</h6>
) : (

)}
*/
