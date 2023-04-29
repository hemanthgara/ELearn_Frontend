import React, { useEffect, useState } from "react";

import { RxCrossCircled } from 'react-icons/rx'
import { toast } from "react-toastify";

import { getApi, postApi } from "../helper/apiHelper";

import "../style/quiz.css";

const Quize = (props) => {

  const [fetchingQuize, setFetchingQuize] = useState(true);
  const [question, setQuestion] = useState([])
  const [quizeIds, setQuizeIds] = useState([])
  const [questionNo, setQuestionNO] = useState(0)
  const [result, setResult] = useState({});
  const [isQuiz, setIsQuize] = useState(true);

  const [totalAnswers, setTotalAnswers] = useState({
    video_id: props.id,
    answers: [{
      question_id: '',
      answer: ""
    }]
  })


  const handleNextQuestion = () => {
    setQuestionNO(questionNo + 1)

  }

  const handlePreviousQuestion = () => {
    setQuestionNO(questionNo - 1)
  }

  const handleChange = (e) => {
    setTotalAnswers({
      ...totalAnswers, answers: totalAnswers.answers.map((obj) => {
        if (e.target.name === obj.question_id) {
          return {
            ...obj,
            answer: e.target.value
          }
        } else {
          return obj;
        }
      })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < totalAnswers.answers.length; i++) {
      if (totalAnswers.answers[i].answer === "") {
        toast.error("Please select all answers!!!");
        return;
      }
    }
    const response = await postApi('/api/answers', { ...totalAnswers }, { "Content-Type": "application/json" });
    if (response.status === 201) {

      setResult({ ...response.data });

      setTimeout(() => {
        setResult({});
        props.setShowQuiz(false);
      }, 3000);

      toast.success('Answers submitted');
    }
  }

  useEffect(() => {
    if (quizeIds.length !== 0) {
      setTotalAnswers({
        ...totalAnswers, answers: question.map((data) => {
          return {
            question_id: data._id,
            answer: ""
          }
        })
      })
    }
  }, [question])



  useEffect(() => {
    if (props.id) {
      setFetchingQuize(true)
      getApi(`/api/questions/${props.id}`).then((res) => {
        if (res.status === 200) {
          if (res.data.data.length === 0) {
            setIsQuize(false)
          } else {
            const ids = res.data.data.map((quize) => {
              return quize._id;
            })
            if (ids.length > 0) {
              setQuestionNO(1);
            }
            setQuizeIds(ids)
            setQuestion(res.data.data)
          }
        }
        setFetchingQuize(false)

      })
    }
  }, [props.id]);


  // show spinner if quize is fetching 
  if (fetchingQuize) {
    return (<div className="quize-fetching"><img src="/load.gif" alt="loading" width="300" /></div>)
  }


  return (
    <>
      <div className=" quiz-container ">
        <div onClick={(e) => e.stopPropagation()} className="quiz-popup bg-light m-auto">
          <div className="fs-4 fw-bold border-bottom border-primary p-3 d-flex justify-content-between fs-3" style={{ color: 'white', background: '#6363e6', borderRadius: '15px' }}>
            <span>Your quiz</span>
            {Object.keys(result).length === 0 && quizeIds.length > 0 && <span>{questionNo}/{quizeIds.length}</span>}
            <RxCrossCircled className="fw-bold" role='button' onClick={() => props.setShowQuiz(false)} />
          </div>

          {Object.keys(result).length === 0 ? quizeIds.length !== 0 ? <form onSubmit={handleSubmit} className="question-container-form p-3">

            {question.map((data) => {

              if (data._id === quizeIds[questionNo - 1])
                return <div key={data._id}>
                  <h4 className="fw-bold">
                    <span className="px-2">{questionNo}.</span>{data.question}
                  </h4>

                  <div className="options fs-3 py-3 px-3 d-flex align-items-center">
                    <input className="fs-3" type="radio" name={data._id} id={`option1-${data._id}`} value="option1" onChange={handleChange} checked={totalAnswers.answers[questionNo - 1].answer === "option1"} />
                    <label className="px-3" htmlFor={`option1-${data._id}`}  >
                      {data.option1}
                    </label>
                  </div>

                  <div className="options fs-3 py-3 px-3 d-flex align-items-center">
                    <input className="fs-3" type="radio" name={data._id} id={`option2-${data._id}`} value="option2" onChange={handleChange} checked={totalAnswers.answers[questionNo - 1].answer === "option2"} />
                    <label className="px-3" htmlFor={`option2-${data._id}`}>
                      {data.option2}
                    </label>
                  </div>

                  <div className="options fs-3 py-3 px-3 d-flex align-items-center">
                    <input className="fs-3" type="radio" name={data._id} id={`option3-${data._id}`} value="option3" onChange={handleChange} checked={totalAnswers.answers[questionNo - 1].answer === "option3"} />
                    <label className="px-3" htmlFor={`option3-${data._id}`}>
                      {data.option3}
                    </label>
                  </div>

                  <div className="options fs-3 py-3 px-3 d-flex align-items-center">
                    <input className="fs-3" type="radio" name={data._id} id={`option4-${data._id}`} value="option4" onChange={handleChange} checked={totalAnswers.answers[questionNo - 1].answer === "option4"} />
                    <label className="px-3" htmlFor={`option4-${data._id}`}>
                      {data.option4}
                    </label>
                  </div>
                </div>
            })}

            {questionNo > 1 && <button className="btn btn-secondary float-start" onClick={handlePreviousQuestion} type="button">Privious</button>}

            {questionNo < quizeIds.length && <button className="btn btn-secondary float-end" onClick={handleNextQuestion} type="button">Next</button>}

            {questionNo === quizeIds.length && <button className="btn btn-primary float-end" type="submit">Submit</button>}

          </form>
            : isQuiz ? <div className="py-5 d-flex justify-content-center align-items-center fw-bold fs-2">
              <span> Quiz already submitted!!!</span>
            </div>
              : <div className="py-5 d-flex justify-content-center align-items-center fw-bold fs-2">
                <span> No quize available!!!</span>
              </div>
            :
            <div className="py-5 d-flex flex-column justify-content-center align-items-center fw-bold fs-2">
              <span> Thank you!!!</span>
              <span className="fs-4 py-3">Your score is {result.score} of {result.total_question} </span>
            </div>
          }



        </div>
      </div>
    </>
  );
};

export default Quize;
