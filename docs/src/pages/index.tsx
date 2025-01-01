// import styles from './index.module.css';
import { Redirect } from '@docusaurus/router';

// function HomepageHeader() {
//   const { siteConfig } = useDocusaurusContext();
//   return (
//     <main className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro"
//           >
//             Wits docs intro
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }

export default function Home(): JSX.Element {
  // const { siteConfig } = useDocusaurusContext();
  return (
    <Redirect to="/intro" />
    // <Layout
    //   title={`Hello from ${siteConfig.title}`}
    //   description="Description will go into a meta tag in <head />"
    // >
    //   <HomepageHeader />
    //   <main></main>
    // </Layout>
  );
}
