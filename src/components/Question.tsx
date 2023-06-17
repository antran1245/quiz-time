"use client"
import { useContext, useEffect, useState } from "react"
import { AnswerContext } from "@/contexts/answer"
import styles from '@/styles/question.module.css'
import arrow_left from '/public/assets/left_arrow.svg'
import arrow_right from '/public/assets/right_arrow.svg'
import Image from 'next/image'

interface QuestionProps {
    questions: {[key: string] : any}[];
    curr: number;
    setCurr: React.Dispatch<React.SetStateAction<number>>;
}

export default function Question({ questions, curr, setCurr } : QuestionProps) {
    const [answers, setAnswers] = useState<any[]>([])
    const context = useContext(AnswerContext)

    useEffect(() => {
        let possibleAnswer = [...(questions[curr]?.incorrect_answers || []), questions[curr]?.correct_answer]
        let len = possibleAnswer.length
        while(--len > 0) {
            let i : number = Math.floor(Math.random() * (len+1));
            [possibleAnswer[len], possibleAnswer[i]] = [possibleAnswer[i], possibleAnswer[len]]
        }
        setAnswers(possibleAnswer)
    }, [questions, curr])

    const submitAnswer = (text: string) => {
        if(context) {
            let currAnswers = [...context.answers]
            currAnswers[curr] = text === questions[curr]?.correct_answer
            context.setAnswers([...currAnswers])
            console.log(currAnswers)
        }
    }
    return(
        <div className={styles.questionContainer}>
            <div>
                <hgroup className={styles.heading}>
                    <h1>Question {curr+1}: </h1>
                    <h2 className={styles.question}>{questions[curr]?.question.replaceAll('&quot;', `"`)}</h2>
                    <p className={styles.subtitle}>{questions[curr]?.category} - Difficulty: {questions[curr]?.difficulty}</p>
                </hgroup>
                <div className={styles.answerContainer}>
                    {answers.map((item: string, index: number) => {
                        return <div className={styles.answerBox} key={index} onClick={() => submitAnswer(item)}>{item}</div>
                    })}
                </div>
            </div>
            <div className={styles.buttonGroup}>
                <button className={curr === 0? styles.disabled : styles.button} disabled={curr === 0} onClick={() => setCurr(curr-1)}>
                    <Image src={arrow_left} alt='arrow left'/>
                </button>
                {curr === questions.length-1?
                    <button className={styles.submitButton}>Submit</button>:
                    <button className={styles.button} onClick={() => setCurr(curr+1)}>
                        <Image src={arrow_right} alt='arrow right'/>
                    </button>
                }
            </div>
        </div>
    )
}