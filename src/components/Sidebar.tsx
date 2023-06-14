import styles from '@/styles/sidebar.module.css'
interface SidebarProps {
    questions: {[key: string] : any}[]
}

export default function Sidebar({questions} : SidebarProps) {
    return (
        <nav className={styles.sidebarContainer}>
            <h2>Questions</h2>
            <div className={styles.questionsListing}>
                {questions.map((item, index) => {
                    return <p key={index}>{index+1}. {item.question}</p>
                })}
            </div>
        </nav>
    )
}