import { Link } from 'react-router-dom';

const PostOne = () => {
  return (
    <div className="post-one">
      <p>
        Good Morning!
        <br />
        <br />
        I'm excited to launch this blog as a space to document my journey
        through the world of programming, share my thoughts on computer science,
        and even indulge in a few rants about the ups and downs of the tech
        world. While my <Link to="/about">About</Link> page offers a snapshot of
        who I am, here I get to dive deep into my experiences and insights.
        <br />
        <br />
        Let me start by introducing myself a bit further. My name is Nathaniel
        but pretty much everyone calls me Nate for short. I mainly use React as
        my framework of choice which was how I came up with my name:{' '}
        <span>Nate.jsx</span>, clever huh? Although it should really be{' '}
        <span>Nate.tsx</span> since I've pretty much swtiched entirely over to
        TypeScript. I only write in JS when I have too. As you might have
        gathered from my website, I'm someone who prefers to stay out of the
        camera, not the biggest fan of putting my face out there. There's a
        certain confidence I gain by typing away behind a screen. This blog
        gives me the freedom to express myself without the pressure of being in
        front of a camera, and I hope that authenticity resonates with you.
        <br />
        <br />
        My coding journey began in eighth grade when I took a computer
        programming course on Khan Academy, inspired by watching The Avengers in
        2012. I remember my very first program, a simple watch that, despite its
        humble beginnings, filled me with pride enough to show my dad. Although
        I didn't revisit code for a couple of years, that initial spark never
        truly faded. Fast forward to my sophomore year of high school, I
        enrolled in AP Computer Science Principles. The class was an intense
        introduction to programming, and while it challenged me, it also
        solidified my passion for code. Shortly thereafter, the world changed
        with the onset of COVID-19. During quarantine, I turned to{' '}
        <a
          href="https://www.freecodecamp.org/learn/2022/responsive-web-design/"
          target="_blank"
        >
          FreeCodeCamp
        </a>{' '}
        and dove into an "Intro to HTML" course. It was during this period that
        I built my first website, a local host displaying a stylish “Hello
        World” in VS Code, and I immediately fell in love with web development.
        In the months that followed, I immersed myself in HTML and CSS,
        practicing relentlessly and watching my skills grow. By the middle of my
        junior year, I had started learning JavaScript and refining my craft
        further. My progress took an exciting turn when I applied to join
        Digital Crafts. After gaining acceptance, I embarked on a journey that
        deepened my technical expertise and broadened my perspective, until I
        eventually moved on from that chapter.
        <br />
        <br />
        College marked a turning point in my programming journey. During my
        freshman year, I took an “Intro to Programming” course where I learned
        Python. That year was filled with memorable projects, including a
        team-based number guessing game built with PyGame, which remains one of
        my proudest achievements of that time. Sophomore year pushed me even
        further: I began building more sophisticated websites, embraced version
        control through GitHub, and started exploring additional technologies
        such as React, Node.js, C++, NPM, and SASS to name a few. My involvement
        on campus expanded as I joined the Computer Science club, where I not
        only honed my skills by working on various web development projects but
        also found my passion for teaching. In the second semester of my
        sophomore year, I had the honor of serving as President of the Computer
        Science club and working as a Supplementary Instructor (SI) for
        introductory programming courses. Giving lectures, both in class and
        during club meetings, helped me solidify my understanding and build
        confidence in my ability to mentor others.
        <br />
        <br />
        Today, I'm proud to say that I've built a personal portfolio site and
        this very blog post as a testament to my progress. Among my most notable
        projects are a custom web browser called{' '}
        <a href="https://github.com/Simpleboi/Neutron" target="_blank">
          Neutron
        </a>
        , a JavaScript component library named{' '}
        <a href="https://firespark.netlify.app/" target="_blank">
          FireSpark
        </a>
        , a CSS preprocessor known as{' '}
        <a href="https://sparkcss.org/" target="_blank">
          SparkCSS
        </a>
        , a general-purpose, web-focused programming language called{' '}
        <a href="https://github.com/Simpleboi/Genesis">Genesis</a>, and a math &
        science learning platform called{' '}
        <a href="https://github.com/Simpleboi/SimplyPi" target="_blank">
          SimplyPi
        </a>
        . As I prepare to start my junior year of college this fall, I'm more
        excited than ever about the future. I look back on the days when I could
        barely write HTML, and now I'm developing complex full-stack
        applications. If you're feeling discouraged or overwhelmed by the
        learning process, remember that growth comes from consistency and
        perseverance. Keep pushing, stay curious, and trust that every line of
        code brings you closer to your goals.
        <br />
        <br />
        <hr />
        <br />
        Outside of programming, my life consists of spending quality time with
        my two beloved cats: August & Winter, and my close friends whenever I
        can carve out the time. I also find joy in unwinding through video
        games. I'm a big fan of shooters like Call of Duty and Apex Legends, but
        I also enjoy the games like Minecraft and Geometry Dash from time to
        time. Ironically, I don't have a big social battery and don't like to
        hang around people I'm not familiar with. By writing and sharing my
        thoughts here allows me to connect and express myself in a way that
        feels natural and fulfilling. Welcome to my journey, here's to learning,
        creating, and thriving! Have a blessed day!
      </p>
    </div>
  );
};

export default PostOne;
