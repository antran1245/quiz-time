import styles from '@/styles/sidebar.module.css'

interface SidebarProps {
    questions: {[key: string] : any}[];
    setCurr: React.Dispatch<React.SetStateAction<number>>;
}

export default function Sidebar({questions, setCurr} : SidebarProps) {
    return (
        <nav className={styles.sidebarContainer}>
            <h2>Questions</h2>
            <div className={styles.questionsListing}>
                {questions.map((item, index) => {
                    return <p key={index} onClick={()=> setCurr(index)}>{index+1}. {item.question.replaceAll('&quot;', `"`).replaceAll(/(&#039;|&apos;)/g, "'")}</p>
                })}
            </div>
        </nav>
    )
}