'use client'
import { AnswerContext } from "@/contexts/answer"
import { useContext } from "react"
import styles from '../page.module.css'

export default function Result() {
    const context = useContext(AnswerContext)
    return (
        <main className={styles.main}>
            <h1>Score: {context?.total}</h1>
        </main>
    )
}