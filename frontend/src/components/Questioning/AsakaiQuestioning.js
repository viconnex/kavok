import React, { useEffect, useState } from 'react'
import { Question } from 'components/Question'
import { fetchRequest } from 'utils/helpers'
import { ASAKAI_MODE, ASAKAI_QUESTION_COUNT } from 'utils/constants/questionConstants'
import { useSnackbar } from 'notistack'
import { Alterodo } from 'components/Alterodo'
import { fetchRequestResponse } from 'services/api'
import { getUserId } from 'services/jwtDecode'
import EmailSnackbar from 'components/EmailSnackbar/EmailSnackbar'
import { CircularProgress } from '@material-ui/core'
import useStyle from './style'

const AsakaiQuestioning = () => {
  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [asakaiChoices, setAsakaiChoices] = useState({})
  const [alterodos, setAlterodos] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const fetchAndSetQuestions = async (newSet) => {
    setIsLoading(true)
    const response = await fetchRequestResponse(
      {
        uri: `/questions/${ASAKAI_MODE}?maxNumber=${ASAKAI_QUESTION_COUNT}${newSet ? '&newSet=true' : ''}`,
        method: 'GET',
      },
      200,
      { enqueueSnackbar },
    )
    if (!response) {
      setIsLoading(false)
      return
    }
    const data = await response.json()
    setIsLoading(false)
    setQuestions(data)
    setQuestionIndex(0)
  }

  useEffect(() => {
    fetchAndSetQuestions(false)
    // eslint-disable-next-line
  }, [])

  const resetQuestioning = () => {
    setAlterodos(null)
    setAsakaiChoices({})
    setQuestionIndex(0)
  }

  const changeAsakaiSet = () => {
    resetQuestioning()
    fetchAndSetQuestions(true)
  }

  const changeQuestion = (increment) => {
    let index = questionIndex + increment
    if (index < 0) {
      index = 0
    }
    if (index < questions.length && index >= 0) {
      setQuestionIndex(index)
    }
  }

  const handleAsakaiFinish = async () => {
    let response
    const excludedUserId = getUserId()
    setIsLoading(true)
    try {
      response = await fetchRequest({
        uri: '/user_to_question_choices/asakai',
        method: 'POST',
        body: { asakaiChoices, excludedUserId },
      })
    } catch {
      setIsLoading(false)
      return enqueueSnackbar('Problème de connexion', { variant: 'error' })
    }
    if (response.status !== 201) {
      setIsLoading(false)
      return enqueueSnackbar("Une erreur s'est produite", { variant: 'error' })
    }
    const data = await response.json()
    setIsLoading(false)
    setAlterodos(data)
  }

  const chose = async (questionId, choice) => {
    const choices = asakaiChoices
    choices[questionId] = choice
    setAsakaiChoices(choices)
    if (questionIndex === questions.length - 1) {
      handleAsakaiFinish()
    }
    changeQuestion(1)
  }
  const question = questions[questionIndex]

  const classes = useStyle()

  const QuestionContent = () => {
    if (isLoading) {
      return <CircularProgress color="secondary" />
    }
    if (question && !alterodos) {
      return (
        <React.Fragment>
          <Question question={question} chose={chose} plusOneEnabled />
          <div className={classes.asakaibrowser}>
            <div className={classes.counter}>{`${questionIndex + 1} / ${questions.length}`}</div>
          </div>
        </React.Fragment>
      )
    }
    if (alterodos) {
      return (
        <React.Fragment>
          <div className={classes.email}>
            <EmailSnackbar asakaiChoices={asakaiChoices} alterodoUserId={alterodos?.alterodo.userId} />
          </div>
          <Alterodo className={classes.alterodo} alterodos={alterodos} resetQuestioning={resetQuestioning} isAsakai />
        </React.Fragment>
      )
    }
    return <CircularProgress color="secondary" />
  }

  return (
    <div className={classes.questioningContainer}>
      <div className={classes.asakaiSubtitle}>
        <div>Le set du jour</div>
        <div className={classes.asakaiNewSetButton} onClick={changeAsakaiSet}>
          Changer le set du jour
        </div>
      </div>
      <div className={classes.questioningContent}>
        <QuestionContent />
      </div>
    </div>
  )
}

export default AsakaiQuestioning
