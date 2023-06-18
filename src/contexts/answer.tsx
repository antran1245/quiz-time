'use client'
import { createContext, useState, ReactNode } from "react"

interface AnswerContextInterface {
    answers: any[];
    setAnswers: React.Dispatch<React.SetStateAction<any[]>>;
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
}
interface AnswerInterface {
    children? : ReactNode
}
export const AnswerContext = createContext<AnswerContextInterface | null>(null)

export default function Answer({children} : AnswerInterface) {
    const [answers, setAnswers] = useState<any[]>([])
    const [total, setTotal] = useState<number>(0)
    return (
        <AnswerContext.Provider value={{answers, setAnswers, total, setTotal}}>
        {children}
        </AnswerContext.Provider>
    )
}