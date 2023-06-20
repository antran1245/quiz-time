'use client'
import { Contexts } from "@/contexts/context"
import { useContext } from "react"
import styles from '../page.module.css'

export default function Result() {
    const context = useContext(Contexts)
    return (
        <main className={styles.main}>
            <h1>Score: {context?.total}</h1>
        </main>
    )
}