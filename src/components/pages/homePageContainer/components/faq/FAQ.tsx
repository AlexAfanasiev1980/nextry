import { faqTexts } from "./componentAndHandlers/faqTexts";
import ClientComponentFAQ from "./componentAndHandlers/ClientComponentFAQ";
import style from "./FAQ.module.scss";

const FAQ = () => {
  return (
    <article className={style.faq} id="faq">
      <section>
        <h1>FAQ</h1>
        <h2>Find the answer to your question</h2>
      </section>
      <section className={style.faq__list}>
        {faqTexts.map(({ id, question, answer }) => (
          <div className={style.faq__questionBlock} key={id}>
            <ClientComponentFAQ answer={answer} question={question}/>
          </div>
        ))}
      </section>
    </article>
  );
};

export default FAQ;
