'use client'
import { createContext, useState, ReactNode } from "react"

interface ContextInterface {
    answers: any[];
    setAnswers: React.Dispatch<React.SetStateAction<any[]>>;
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    questions: any[];
    setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}
interface AnswerInterface {
    children? : ReactNode
}

const defaultContext = {answers: [], setAnswers: () => {}, total: 0, setTotal: () => {}, questions: [], setQuestions: () => {}}
export const Contexts = createContext<ContextInterface>(defaultContext)

export default function Context({children} : AnswerInterface) {
    const [answers, setAnswers] = useState<any[]>([])
    const [questions, setQuestions] = useState<any[]>([])
    const [total, setTotal] = useState<number>(0)
    return (
        <Contexts.Provider value={{answers, setAnswers, total, setTotal, questions, setQuestions}}>
        {children}
        </Contexts.Provider>
    )
}