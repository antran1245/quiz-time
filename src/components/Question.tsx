"use client"
import { useEffect, useState } from "react"
import styles from '@/styles/question.module.css'
import arrow_left from '/public/assets/left_arrow.svg'
import arrow_right from '/public/assets/right_arrow.svg'
import Image from 'next/image'

interface QuestionProps {
    questions: {[key: string] : any}[]
}

export default function Question({ questions } : QuestionProps) {
    const [answers, setAnswers] = useState<any[]>([])
    const [curr, setCurr] = useState<number>(0)
    useEffect(() => {
        let possibleAnswer = [...(questions[curr]?.incorrect_answers || []), questions[curr]?.correct_answer]
        let len = possibleAnswer.length
        while(--len > 0) {
            let i : number = Math.floor(Math.random() * (len+1));
            [possibleAnswer[len], possibleAnswer[i]] = [possibleAnswer[i], possibleAnswer[len]]
        }
        setAnswers(possibleAnswer)
    }, [questions, curr])
    return(
        <div className={styles.questionContainer}>
            <hgroup className={styles.heading}>
                <h1>Question: </h1>
                <h2 className={styles.question}>{questions[curr]?.question.replaceAll('&quot;', `"`)}</h2>
                <p className={styles.subtitle}>{questions[curr]?.category} - Difficulty: {questions[curr]?.difficulty}</p>
            </hgroup>
            <div className={styles.answerContainer}>
                {answers.map((item: string, index: number) => {
                    return <div className={styles.answerBox} key={index}>{item}</div>
                })}
            </div>
            <div className={styles.buttonGroup}>
                <button className={curr === 0? styles.disabled : styles.button} disabled={curr === 0} onClick={() => setCurr(curr-1)}>
                <Image src={arrow_left} alt='arrow left'/>
                </button>
                <button className={curr === questions.length-1? styles.disabled : styles.button} disabled={curr === questions.length-1} onClick={() => setCurr(curr+1)}>
                <Image src={arrow_right} alt='arrow right'/>
                </button>
            </div>
        </div>
    )
}