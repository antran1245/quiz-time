import { Contexts } from '@/contexts/context';
import styles from '@/styles/sidebar.module.css'
import { useContext } from 'react';

interface SidebarProps {
    setCurr: React.Dispatch<React.SetStateAction<number>>;
}

export default function Sidebar({setCurr} : SidebarProps) {
    const context = useContext(Contexts)
    return (
        <nav className={styles.sidebarContainer}>
            <h2>Questions</h2>
            <div className={styles.questionsListing}>
                {context.questions.map((item, index) => {
                    return <p key={index} onClick={()=> setCurr(index)}>{index+1}. {item.question.replaceAll('&quot;', `"`).replaceAll(/(&#039;|&apos;)/g, "'")}</p>
                })}
            </div>
        </nav>
    )
}