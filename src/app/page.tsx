"use client"
import { useContext, useEffect, useState } from 'react'
import styles from './page.module.css'
import Question from '@/components/Question'
import Sidebar from '@/components/Sidebar'
import { Contexts } from '@/contexts/context'


export default function Home() {
  const [questions, setQuestions] = useState<any[]>([])
  const [curr, setCurr] = useState<number>(0)
  const answer = useContext(Contexts)

  useEffect(() => {
    if(questions.length === 0) {
      fetch("https://opentdb.com/api.php?amount=2")
      .then(resp => resp.json())
      .then(data => {
        answer?.setAnswers(new Array(data.results.length))
        setQuestions(data.results)
      })
      .catch(err => console.log(err))
    }
  }, [])

  return (
    <main className={styles.main}>
      <Question questions={questions} curr={curr} setCurr={setCurr}/>
      <Sidebar questions={questions} setCurr={setCurr}/>
    </main>
  )
}
