"use client"
import { FormEvent, useContext } from 'react'
import styles from './page.module.css'
import { Contexts } from '@/contexts/context'
import { useRouter } from 'next/navigation'


export default function Home() {
  const context = useContext(Contexts)
  const router = useRouter()

  const generateQuiz = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formElements = form.elements as typeof form.elements & {
      numberOfQuestions: HTMLInputElement;
      category: HTMLSelectElement;
      difficulty: HTMLSelectElement;
      type: HTMLSelectElement;
    }
    let url = "https://opentdb.com/api.php?"
    url += "amount="+formElements.numberOfQuestions.value.toString()
    if(formElements.category.value !== "any") {
      url += "&category="+formElements.category.value.toString()
    }
    if(formElements.difficulty.value !== "any") {
      url += "&difficulty="+formElements.difficulty.value.toString()
    }
    if(formElements.type.value !== "any") {
      url += "&type="+formElements.type.value.toString()
    }
    
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      context?.setAnswers(new Array(data.results.length))
      context?.setQuestions(data.results)
      router.push('/quiz')
    })
    .catch(err => console.log(err))
  }

  return (
    <main className={`${styles.main} ${styles.homepage}`}>
      <section>
        <h2>Scoreboard</h2>
      </section>
      <form className={styles.optionForm} onSubmit={(e) => generateQuiz(e)}>
        <div className={styles.formGroup}>
          <label htmlFor="numberOfQuestions">Number of Questions:</label>
          <input id='numberOfQuestions' type='number' max={20} min={1} placeholder='Default: 1, Max: 20' defaultValue={1}/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">Select Category</label>
          <select id="category">
            <option value="any">Any Category</option>
            <option value={9}>General Knowledge</option>
            <option value={10}>Entertainment: Books</option>
            <option value={11}>Entertainment: Film</option>
            <option value={12}>Entertainment: Music</option>
            <option value={13}>Entertainment: Musicals & Theatres</option>
            <option value={14}>Entertainment: Television</option>
            <option value={15}>Entertainment: Video Games</option>
            <option value={16}>Entertainment: Board Games</option>
            <option value={17}>Science & Nature</option>
            <option value={18}>Science: Computers</option>
            <option value={19}>Science: Mathematics</option>
            <option value={20}>Mythology</option>
            <option value={21}>Sports</option>
            <option value={22}>Geography</option>
            <option value={23}>History</option>
            <option value={24}>Politics</option>
            <option value={25}>Art</option>
            <option value={26}>Celebrities</option>
            <option value={27}>Animals</option>
            <option value={28}>Vehicles</option>
            <option value={29}>Entertainment: Comics</option>
            <option value={30}>Science: Gadgets</option>
            <option value={31}>Entertainment: Japanese Anime & Manga</option>
            <option value={32}>Entertainment: Cartoon & Animations</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="difficulty">Select Difficulty</label>
          <select id="difficulty">
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="type">Select Type</label>
          <select id="type">
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
        <button type='submit'>Generate Quiz</button>
      </form>
      <section>
        <h2>Information</h2>
        <h4>Point by question difficulty</h4>
        <ul>
          <li>Easy : 1 point</li>
          <li>Medium : 2 points</li>
          <li>Hard : 3 points</li>
        </ul>
      </section>
    </main>
  )
}
