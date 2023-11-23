import LinksBlock from "./components/linksBlock/LinksBlock";
import FormBlock from "./components/formBlock/FormBlock";
import style from "./Contact.module.scss";

const Contact = () => {
  return (
    <article className={style.contact} id="contact">
      <h1>CONTACT US</h1>
      <section className={style.contact__content}>
        <LinksBlock />
        <div className={style.contact__address}>
          {/* <p>CY: Spyrou Kyprianou Ave 5, 4001, Limassol</p>
          <p>US: 155 E 56th St, 10022, New York</p> */}
        </div>
        <FormBlock />
      </section>
    </article>
  );
};

export default Contact;
