"use client"
import { useContext, useEffect, useState } from "react"
import { Contexts } from "@/contexts/context"
import styles from '@/styles/question.module.css'
import arrow_left from '/public/assets/left_arrow.svg'
import arrow_right from '/public/assets/right_arrow.svg'
import Image from 'next/image'
import { useRouter } from "next/navigation"

interface QuestionProps {
    curr: number;
    setCurr: React.Dispatch<React.SetStateAction<number>>;
}

export default function Question({ curr, setCurr } : QuestionProps) {
    const [answers, setAnswers] = useState<any[]>([])
    const [selected, setSelected] = useState<any[]>([])
    const context = useContext(Contexts)
    const router = useRouter()

    useEffect(() => {
        let possibleAnswer = [...(context?.questions[curr].incorrect_answers || []), context?.questions[curr].correct_answer]
        let len = possibleAnswer.length
        while(--len > 0) {
            let i : number = Math.floor(Math.random() * (len+1));
            [possibleAnswer[len], possibleAnswer[i]] = [possibleAnswer[i], possibleAnswer[len]]
        }
        setAnswers(possibleAnswer)
    }, [context?.questions, curr])

    const submitAnswer = (text: string, num: number) => {
        if(context) {
            let worth = 0
            if(context.questions[curr].difficulty === "easy") {
                worth = 1
            } else if (context.questions[curr].difficulty === "medium") {
                worth = 2
            } else {
                worth = 3
            }
            let currAnswers = [...context.answers]
            let currTotal = context.total
            let currSelected = [...selected]
            if(!selected[curr]) {
                currTotal = (text === context.questions[curr].correct_answer? ++currTotal : currTotal)
                currSelected[curr] = num
                currAnswers[curr] = text
            } else if(selected[curr] !== num) {
                currAnswers[curr] = text
                currTotal = (text === context.questions[curr].correct_answer? ++currTotal : --currTotal)
                currSelected[curr] = num
            } else {
                currAnswers[curr] = null
                currTotal = (text === context.questions[curr].correct_answer? --currTotal : currTotal)
                currSelected[curr] = null
            }
            setSelected(currSelected)
            context.setAnswers([...currAnswers])
            context.setTotal(currTotal)
        }
    }
    if(context) {
        return(
            <div className={styles.questionContainer}>
                <div>
                    <hgroup className={styles.heading}>
                        <h1>Question {curr+1}: </h1>
                        <h2 className={styles.question}>{context.questions[curr].question.replaceAll('&quot;', `"`).replaceAll(/(&#039;|&apos;)/g, "'")}</h2>
                        <p className={styles.subtitle}>{context.questions[curr].category} - Difficulty: {context.questions[curr].difficulty}</p>
                    </hgroup>
                    <div className={styles.answerContainer}>
                        {answers.map((item: string, index: number) => {
                            return <div className={`${styles.answerBox} ${selected[curr] === index? styles.selectedButton : ''}`} key={index} onClick={() => submitAnswer(item, index)}>{item}</div>
                        })}
                    </div>
                </div>
                <div className={styles.buttonGroup}>
                    <button className={curr === 0? styles.disabled : styles.button} disabled={curr === 0} onClick={() => setCurr(curr-1)}>
                        <Image src={arrow_left} alt='arrow left'/>
                    </button>
                    {curr === context.questions.length-1?
                        <button className={styles.submitButton} onClick={() => router.push('/result')}>Submit</button>:
                        <button className={styles.button} onClick={() => setCurr(curr+1)}>
                            <Image src={arrow_right} alt='arrow right'/>
                        </button>
                    }
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}