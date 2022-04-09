import React from 'react';
import AnswerList from './AnswerList.jsx';
import PropTypes from 'prop-types';

const Question = ({
  question,
  onShowMoreAnswersClick,
  onCollapseAnswersClick,
  allAnswersDisplayed,
  onHelpfulClick,
  onReport
}) => {

  const onMoreAnswersClick = () => {
    onShowMoreAnswersClick(question.question_id);
  }

  const onLessAnswersClick = () => {
    onCollapseAnswersClick(question.question_id);
  }

  const onQuestionLike = () => {
    onHelpfulClick('questions', question.question_id)
  }

  let answers;
  let buttonText;
  let displayButton;

  if (allAnswersDisplayed.includes(question.question_id)) {
    answers = question.answers;
    buttonText = 'COLLAPSE ANSWERS';
    displayButton = true;
  } else if (Object.keys(question.answers).length <= 2) {
    answers = question.answers;
    displayButton = false;
  } else if (Object.keys(question.answers).length > 2) {
    answers = Object.fromEntries(Object.entries(question.answers).slice(0, 2));
    buttonText = 'LOAD MORE ANSWERS';
    displayButton = true;
  }

  return (
    <div className="question">
      <div className="question-header">
        <p className="question-text">Q: {question.question_body}</p>
        <div className="reaction-buttons">
          <p> Helpful? <span className="helpful-button" onClick={onQuestionLike}>Yes</span> ({question.question_helpfulness})</p>
          <p className="reaction-button-break">|</p>
          <p> Add Answer</p>
        </div>
      </div>
      <div className="question-body">
        <p className="answer-icon">A: </p>
        <AnswerList answers={answers} onHelpfulClick={onHelpfulClick} onReport={onReport}/>
      </div>
      <div className="question-footer">
        {displayButton
          && <p onClick={buttonText === 'LOAD MORE ANSWERS' ? onMoreAnswersClick : onLessAnswersClick}>{buttonText}</p>}
      </div>
    </div>
  )
};
{/* <p onClick={onLessAnswersClick}>COLLAPSE ANSWERS</p> */}
Question.propTypes = {
  question: PropTypes.object.isRequired,
  onShowMoreAnswersClick: PropTypes.func.isRequired,
  allAnswersDisplayed: PropTypes.array.isRequired,
  onCollapseAnswersClick: PropTypes.func.isRequired,
  onHelpfulClick: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired
};

export default Question;