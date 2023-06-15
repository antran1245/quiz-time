"use client"
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Question from '@/components/Question'
import Sidebar from '@/components/Sidebar'


export default function Home() {
  const [questions, setQuestions] = useState<any[]>([])
  const [curr, setCurr] = useState<number>(0)

  useEffect(() => {
    if(questions.length === 0) {
      fetch('/api/question')
      .then(resp => resp.json())
      .then(data => setQuestions(data.data.results))
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
