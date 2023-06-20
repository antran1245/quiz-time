"use client"
import { useContext, useEffect, useState } from "react"
import { Contexts } from "@/contexts/context"
import styles from '@/styles/question.module.css'
import arrow_left from '/public/assets/left_arrow.svg'
import arrow_right from '/public/assets/right_arrow.svg'
import Image from 'next/image'
import { useRouter } from "next/navigation"

interface QuestionProps {
    questions: {[key: string] : any}[];
    curr: number;
    setCurr: React.Dispatch<React.SetStateAction<number>>;
}

export default function Question({ questions, curr, setCurr } : QuestionProps) {
    const [answers, setAnswers] = useState<any[]>([])
    const [selected, setSelected] = useState<number | null>(null)
    const context = useContext(Contexts)
    const router = useRouter()

    useEffect(() => {
        let possibleAnswer = [...(questions[curr]?.incorrect_answers || []), questions[curr]?.correct_answer]
        let len = possibleAnswer.length
        while(--len > 0) {
            let i : number = Math.floor(Math.random() * (len+1));
            [possibleAnswer[len], possibleAnswer[i]] = [possibleAnswer[i], possibleAnswer[len]]
        }
        setAnswers(possibleAnswer)
    }, [questions, curr])

    const submitAnswer = (text: string, num: number) => {
        if(context) {
            let currAnswers = [...context.answers]
            let currTotal = context.total
            if(num !== selected) {
                currAnswers[curr] = text
                currTotal = (text === questions[curr]?.correct_answer? ++currTotal : currTotal)
                setSelected(num)
            } else {
                currAnswers[curr] = null
                currTotal = (text === questions[curr]?.correct_answer? --currTotal : currTotal)
                setSelected(null)
            }
            context.setAnswers([...currAnswers])
            context.setTotal(currTotal)
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
                        return <div className={`${styles.answerBox} ${selected === index? styles.selectedButton : ''}`} key={index} onClick={() => submitAnswer(item, index)}>{item}</div>
                    })}
                </div>
            </div>
            <div className={styles.buttonGroup}>
                <button className={curr === 0? styles.disabled : styles.button} disabled={curr === 0} onClick={() => setCurr(curr-1)}>
                    <Image src={arrow_left} alt='arrow left'/>
                </button>
                {curr === questions.length-1?
                    <button className={styles.submitButton} onClick={() => router.push('/result')}>Submit</button>:
                    <button className={styles.button} onClick={() => setCurr(curr+1)}>
                        <Image src={arrow_right} alt='arrow right'/>
                    </button>
                }
            </div>
        </div>
    )
}