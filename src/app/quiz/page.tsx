"use client"
import { useState } from 'react'
import styles from '@/app/page.module.css'
import Question from '@/components/Question'
import Sidebar from '@/components/Sidebar'


export default function Home() {
  const [curr, setCurr] = useState<number>(0)

  return (
    <main className={styles.main}>
      <Question curr={curr} setCurr={setCurr}/>
      <Sidebar setCurr={setCurr}/>
    </main>
  )
}