import LinksBlock from "./components/linksBlock/LinksBlock";
import FormBlock from "./components/formBlock/FormBlock";
import style from "./Contact.module.scss";

const Contact = () => {
  return (
    <section className={style.contact__wrapper}>
      <article className={style.contact} id="contact">
        <div className={style.contact__feedback}>
          <div className={style.contact__titleContainer}>
            <h1 className={style.contact__title}>Have questions?</h1>
            <p className={style.contact__text}>Use the feedback form</p>
          </div>
          <FormBlock />
        </div>
        <div className={style.contact__content}>
          <LinksBlock />
          {/* <div className={style.contact__address}>
          <p>CY: Spyrou Kyprianou Ave 5, 4001, Limassol</p>
          <p>US: 155 E 56th St, 10022, New York</p> 
        </div> */}
        </div>
      </article>
    </section>
  );
};

export default Contact;
