"use client"
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Question from '@/components/Question'
import arrow_left from '/public/assets/left_arrow.svg'
import arrow_right from '/public/assets/right_arrow.svg'
import Image from 'next/image'


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
      <div>
        <Image src={arrow_left} alt='arrow left'/>
        <Image src={arrow_right} alt='arrow right'/>
      </div>
    </main>
  )
}
