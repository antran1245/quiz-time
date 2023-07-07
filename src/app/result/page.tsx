'use client'
import { Contexts } from "@/contexts/context"
import { useContext } from "react"
import styles from '@/styles/result.module.css'
import { useRouter } from "next/navigation"

export default function Result() {
    const context = useContext(Contexts)
    const router = useRouter()
    
    return (
        <main className={`${styles.main} ${styles.result}`}>
            <h1>Score: {context.total}</h1>
            <div>
                {context.questions.map((item : {[key: string] : any}, index : number) => {
                    return <div className={styles.questionBox} key={index}>
                            <p><b>Question {index+1}:</b> {item.question.replaceAll('&quot;', `"`).replaceAll(/(&#039;|&apos;)/g, "'")}</p>
                            <p><b>Correct Answer:</b> {item.correct_answer}</p>
                            <p><b>Your Answer:</b> {context.answers[index] || 'Did not answer'}</p>
                        </div>
                })}
            </div>
            <div className={styles.buttonGroup}>
                <button onClick={() => router.push('/quiz')}>Try Again</button>
                <button onClick={() => router.push('/')}>New Quiz</button>
            </div>
        </main>
    )
}