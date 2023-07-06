'use client'
import { Contexts } from "@/contexts/context"
import { useContext, useEffect } from "react"
import styles from '@/styles/result.module.css'

export default function Result() {
    const context = useContext(Contexts)
    useEffect(()=> {
        console.log(context?.answers)
    }, [])
    return (
        <main className={`${styles.main} ${styles.result}`}>
            <h1>Score: {context?.total}</h1>
            <div>
                {context?.questions.map((item : {[key: string] : any}, index : number) => {
                    return <div className={styles.questionBox} key={index}>
                            <p><b>Question {index+1}:</b> {item.question.replaceAll('&quot;', `"`).replaceAll(/(&#039;|&apos;)/g, "'")}</p>
                            <p><b>Correct Answer:</b> {item.correct_answer}</p>
                            <p><b>Your Answer:</b> {context?.answers[index] || 'Did not answer'}</p>
                        </div>
                })}
            </div>
        </main>
    )
}