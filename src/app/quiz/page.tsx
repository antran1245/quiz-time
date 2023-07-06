"use client"
import { useContext, useEffect, useState } from 'react'
import styles from '@/app/page.module.css'
import Question from '@/components/Question'
import Sidebar from '@/components/Sidebar'
import { Contexts } from '@/contexts/context'


export default function Home() {
  const [curr, setCurr] = useState<number>(0)
  const context = useContext(Contexts)

  useEffect(() => {
    context.setTotal(0)
  }, [])
  return (
    <main className={styles.main}>
      <Question curr={curr} setCurr={setCurr}/>
      <Sidebar setCurr={setCurr}/>
    </main>
  )
}