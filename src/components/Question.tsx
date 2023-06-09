"use client"
import { useEffect, useState } from "react"
import styles from '@/styles/question.module.css'

interface QuestionProps {
    question: {[key: string] : any}
}

export default function Question({ question } : QuestionProps) {
    const [answers, setAnswers] = useState<any[]>([])
    useEffect(() => {
        let possibleAnswer = [...(question?.incorrect_answers || []), question?.correct_answer]
        let len = possibleAnswer.length
        while(--len > 0) {
            let i : number = Math.floor(Math.random() * (len+1));
            [possibleAnswer[len], possibleAnswer[i]] = [possibleAnswer[i], possibleAnswer[len]]
        }
        setAnswers(possibleAnswer)
    }, [question])
    return(
        <div className={styles.questionContainer}>
            <hgroup className={styles.heading}>
                <h1>Question: </h1>
                <h2 className={styles.question}>{question?.question.replaceAll('&quot;', `"`)}</h2>
                <p className={styles.subtitle}>{question?.category} - Difficulty: {question?.difficulty}</p>
            </hgroup>
            <div className={styles.answerContainer}>
                {answers.map((item: string, index: number) => {
                    return <div className={styles.answerBox} key={index}>{item}</div>
                })}
            </div>
        </div>
    )
}