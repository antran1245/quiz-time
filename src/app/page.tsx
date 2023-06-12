"use client"
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Question from '@/components/Question'


export default function Home() {
  const [questions, setQuestions] = useState<any[]>([])
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=2")
    .then(resp => resp.json())
    .then(data => {
      setQuestions(data.results)
      console.log(data.results)
    })
    .catch(err => console.error(err))
  }, [])
  return (
    <main className={styles.main}>
      <Question question={questions[0]}/>
    </main>
  )
}
