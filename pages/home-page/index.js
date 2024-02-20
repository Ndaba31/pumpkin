import styles from "@/styles/HomePage.module.css";
import Navbar from '@/components/Navbar/Navbar';
import Image from "next/legacy/image";
const HomePage = () => {
  return (
    <main className={styles.main}>
      <Navbar/>
      <div className={styles.main_part}>
        <div className="banner"> <Image src='/lady.webp' alt='' layout='fill' className={ styles.user_profile} /></div>
      </div>

      <div className={styles.you_may_know}>
        <h2>People you may know</h2>
        <div className={styles.people_cards}>
          <div className={styles.people_card}>
            <Image src='/females/f1.webp' alt='' layout='fill' className={ styles.user_profile} />
            <div className={styles.people_details}>
              <h3>Jane White 22</h3>
              <div className={styles.statistics}>
              <p>
                  <span>200</span> Pumpkins
                  <span className={styles.separator}>•</span>
                  <span>20</span> Hickies
              </p>
              </div>
            </div>
          </div>

          <div className={styles.people_card}>
            <Image src='/females/f2.webp' alt='' layout='fill' className={ styles.user_profile} />
            <div className={styles.people_details}>
              <h3>Andile Dlamini 22</h3>
              <div className={styles.statistics}>
              <p>
                  <span>80</span> Pumpkins
                  <span className={styles.separator}>•</span>
                  <span>30</span> Hickies
              </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.search}>
        <h1>Discover <br /> More People</h1>
        <p>Where true love meets fortune</p>
        <button>Search</button>
      </div>

      <div className={styles.you_may_know}>
        <h2>People with same interest</h2>
        <div className={styles.people_cards}>
          <div className={styles.people_card}>
            <Image src='/females/f3.webp' alt='' layout='fill' className={ styles.user_profile} />
            <div className={styles.people_details}>
              <h3>Huly Zulu 25</h3>
              <div className={styles.statistics}>
              <p>
                  <span>280</span> Pumpkins
                  <span className={styles.separator}>•</span>
                  <span>330</span> Hickies
              </p>
              </div>
            </div>
          </div>

          <div className={styles.people_card}>
            <Image src='/females/f4.webp' alt='' layout='fill' className={ styles.user_profile} />
            <div className={styles.people_details}>
              <h3>Some Shitty 18</h3>
              <div className={styles.statistics}>
              <p>
                  <span>111</span> Pumpkins
                  <span className={styles.separator}>•</span>
                  <span>22</span> Hickies
              </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default HomePage;
