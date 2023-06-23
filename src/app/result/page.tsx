'use client'
import { Contexts } from "@/contexts/context"
import { useContext } from "react"
import styles from '../page.module.css'

export default function Result() {
    const context = useContext(Contexts)
    return (
        <main className={`${styles.main} ${styles.result}`}>
            <h1>Score: {context?.total}</h1>
            <div>
                {context?.questions.map((item : {[key: string] : any}, index : number) => {
                    return <div key={index}>
                            <p>Question {index+1}: {item.question.replaceAll('&quot;', `"`)}</p>
                            <p>Correct Answer: {item.correct_answer}</p>
                            <p>Your Answer: {context?.answers[index]}</p>
                        </div>
                })}
            </div>
        </main>
    )
}