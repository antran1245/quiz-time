"use client"
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Question from '@/components/Question'
import Sidebar from '@/components/Sidebar'


export default function Home() {
  const [questions, setQuestions] = useState<any[]>([])
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
      <Question questions={questions}/>
      <Sidebar questions={questions}/>
    </main>
  )
}
