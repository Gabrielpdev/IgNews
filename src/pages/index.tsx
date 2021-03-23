import Head from 'next/head';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio | Ig.News</title>
      </Head>
      <div className={styles.title} >
        Hello World
      </div>
    </>
  )
}
