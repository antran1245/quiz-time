'use client'
import { createContext, useState, ReactNode } from "react"

interface AnswerContextInterface {
    answers: any[];
    setAnswers: React.Dispatch<React.SetStateAction<any[]>>;
}
interface AnswerInterface {
    children? : ReactNode
}
export const AnswerContext = createContext<AnswerContextInterface | null>(null)

export default function Answer({children} : AnswerInterface) {
    const [answers, setAnswers] = useState<any[]>([])
    
    return (
        <AnswerContext.Provider value={{answers, setAnswers}}>
        {children}
        </AnswerContext.Provider>
    )
}