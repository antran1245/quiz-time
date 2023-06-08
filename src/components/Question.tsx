"use client"
import { useEffect, useState } from "react"

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
        <div>
            <h2>Question</h2>
            <h3>{question?.question}</h3>
            <p>{question?.category} - Difficulty: {question?.difficulty}</p>
            <p>{answers}</p>
        </div>
    )
}