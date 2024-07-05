import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  // NOTE: 테스트를 위해서 typescript-eslint/no-unused-vars도 잠시 끔!
  // NOTE: ~~~한 이유로 any타입을 사용함! 과 같이 eslint를 끌땐 명확한 이유를 남겨주세요!! 단!!! 이유가 단순히 Eslint 에러를 해결하위해서 lint를 꺼선 안됩니다!!!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [state, setState] = useState<any>(false);

  // NOTE: test를 위한 코드. 여러분들이 사용하실땐 삭제하고 사용하셔도 무방합니다!
  // NOTE: console.log, console.error 등을 남기실 땐 아래와 같은 컨벤션으로 남겨주세요!!
  useEffect(() => {
    // TODO: ~~한 이유로 console.log를 남김!
    // eslint-disable-next-line no-console
    console.log('state', state);
    console.log('dddd);
  }, [state]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main}`}>
        <div className={styles.description}>
          <p className='font-bold underline'>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <a href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app' target='_blank' rel='noopener noreferrer'>
              By <Image src='/vercel.svg' alt='Vercel Logo' className={styles.vercelLogo} width={100} height={24} priority />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image className={styles.logo} src='/next.svg' alt='Next.js Logo' width={180} height={37} priority />
        </div>

        <div className={styles.grid}>
          <a href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app' className={styles.card} target='_blank' rel='noopener noreferrer'>
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>Find in-depth information about Next.js features and&nbsp;API.</p>
          </a>

          <a href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app' className={styles.card} target='_blank' rel='noopener noreferrer'>
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
          </a>

          <a
            href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
            target='_blank'
            rel='noopener noreferrer'
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>Discover and deploy boilerplate example Next.js&nbsp;projects.</p>
          </a>

          <a href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app' className={styles.card} target='_blank' rel='noopener noreferrer'>
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.</p>
          </a>
        </div>
      </main>
    </>
  );
}
