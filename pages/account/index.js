import styles from "@/styles/Account.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/legacy/image";
const HomePage = () => {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.profile}>
        <div className={styles.profile_picture}>
          <div className={styles.profile_image}>
            <Image
              src="/females/f1.webp"
              alt=""
              layout="fill"
              className={styles.post_image}
            />
          </div>
        </div>
        <div className="">
          <h2>Justin Bhembe, 27</h2>
          <p>@caveman_bh</p>
        </div>
      </div>
      <div className={styles.statistics_section}>
        <div className={styles.statistics}>
          <p>
            <span>200</span> Post
            <span className={styles.separator}>•</span>
            <span>20</span> Pumpkins
            <span className={styles.separator}>•</span>
            <span>20</span> Hickies
          </p>
        </div>
        <div className="">
          <h3>Edit Profile</h3>
        </div>
      </div>
      <div className={styles.bio}>
        <h3>Bio</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          et quos tempore excepturi voluptas impedit assumenda voluptatum ipsa
          alias, laborum ratione id? Earum, sunt veniam voluptatibus praesentium
          similique voluptas dolore.
        </p>
      </div>
      <div className={styles.post_something}>
        <h3>More About Justin</h3>
        <button>Post</button>
      </div>
      <div className={styles.user_post}>
        <h3>Posts</h3>
        <h4>2</h4>
        <div className={styles.posts}>
          <div className={styles.post_card}>
            <Image
              src="/females/f1.webp"
              alt=""
              layout="fill"
              className={styles.post_image}
            />
          </div>
          <div className={styles.post_card}>
            <Image
              src="/females/f2.webp"
              alt=""
              layout="fill"
              className={styles.post_image}
            />
          </div>
          <div className={styles.post_card}>
            <Image
              src="/females/f3.webp"
              alt=""
              layout="fill"
              className={styles.post_image}
            />
          </div>
          <div className={styles.post_card}>
            <Image
              src="/females/f4.webp"
              alt=""
              layout="fill"
              className={styles.post_image}
            />
          </div>
          <div className={styles.post_card}>
            <Image
              src="/females/f5.webp"
              alt=""
              layout="fill"
              className={styles.post_image}
            />
          </div>
          <div className={styles.post_card}>
            <Image
              src="/females/f6.webp"
              alt=""
              layout="fill"
              className={styles.post_image}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
