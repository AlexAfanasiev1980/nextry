import Link from "next/link";
import style from "./disclaimer.module.scss";

export default function Disclaimer() {
  return (
    <div className={style.offer}>
      <h1 className={style.offer__title}>Disclaimer</h1>
      <p className={style.offer__updated}>Updated at 2023-10-31</p>

      <p>
        nextry.app hereby grants you access to http://nextry.app (&ldquo;the Website&rdquo;)
        and invites you to purchase the services offered here.
      </p>

      <h1 className={style.offer__title}>Definitions and key terms</h1>
      <p>
        To help explain things as clearly as possible in this Disclaimer, every
        time any of these terms are referenced, are strictly defined as:
      </p>
      <ul className={style.offer__list}>
        <li>
          Cookie: small amount of data generated by a website and saved by your
          web browser. It is used to identify your browser, provide analytics,
          remember information about you such as your language preference or
          login information.
        </li>
        <li>
          Company: when this policy mentions &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our,&rdquo; it
          refers to NexTry LTD , Ketokivenkaari 20 Helsinki Finland 00710 that
          is responsible for your information under this Disclaimer.
        </li>
        <li>
          Service: refers to the service provided by nextry.app as described in
          the relative terms (if available) and on this platform.
        </li>
        <li>
          Website: site, which can be accessed via this URL: http://nextry.app
        </li>
        <li>
          You: a person or entity that is registered with nextry.app to use the
          Services.
        </li>
      </ul>
      <p>
        This Disclaimer was created with{" "}
        <a href="https://termify.io" target="_blank">
          Termify
        </a>
        .
      </p>

      <h1 className={style.offer__title}>Limited liability</h1>
      <p>
        nextry.app endeavours to update and/or supplement the content of the
        website/app on a regular basis. Despite our care and attention, content
        may be incomplete and/or incorrect.
      </p>
      <p>
        The materials offered on the website/app are offered without any form of
        guarantee or claim to their correctness. These materials can be changed
        at any time without prior notice from nextry.app.
      </p>
      <p>
        Particularly, all prices on the website/app are stated subject to typing
        and programming errors. No liability is assumed for the implications of
        such errors. No agreement is concluded on the basis of such errors.
      </p>
      <p>
        nextry.app shall not bear any liability for hyperlinks to websites or
        services of third parties included on the website/app. From our
        website/app, you can visit other websites by following hyperlinks to
        such external sites. While we strive to provide only quality links to
        useful and ethical websites, we have no control over the content and
        nature of these sites. These links to other websites do not imply a
        recommendation for all the content found on these sites. Site owners and
        content may change without notice and may occur before we have the
        opportunity to remove a link which may have gone ‘bad’.
      </p>
      <p>
        Please be also aware that when you leave our website/app, other sites
        may have different privacy policies and terms which are beyond our
        control. Please be sure to check the Privacy Policies of these sites as
        well as their &quot;Terms of Service&quot; before engaging in any business or
        uploading any information.
      </p>
      <h1 className={style.offer__title}>Links to Other Websites Disclaimer</h1>
      <p>
        This Disclaimer applies only to the Services. The Services may contain
        links to other websites not operated or controlled by nextry.app. We are
        not responsible for the content, accuracy or opinions expressed in such
        websites, and such websites are not investigated, monitored or checked
        for accuracy or completeness by us. Please remember that when you use a
        link to go from the Services to another website, our Privacy Policy is
        no longer in effect. Your browsing and interaction on any other website,
        including those that have a link on our platform, is subject to that
        website’s own rules and policies. Such third parties may use their own
        cookies or other methods to collect information about you. If You click
        on a third party link, You will be directed to that third party&apos;s site.
        We strongly advise You to review the Privacy Policy and Terms of every
        site You visit.
      </p>
      <p>
        We have no control over and assume no responsibility for the content,
        privacy policies or practices of any third party sites or services.
      </p>
      <h1 className={style.offer__title}>Errors and Omissions Disclaimer</h1>
      <p>
        nextry.app is not responsible for any content, code or any other
        imprecision.
      </p>
      <p>nextry.app does not provide warranties or guarantees.</p>
      <p>
        In no event shall nextry.app be liable for any special, direct,
        indirect, consequential, or incidental damages or any damages
        whatsoever, whether in an action of contract, negligence or other tort,
        arising out of or in connection with the use of the Service or the
        contents of the Service. nextry.app reserves the right to make
        additions, deletions, or modifications to the contents on the Service at
        any time without prior notice.
      </p>

      <h1 className={style.offer__title}>General Disclaimer</h1>
      <p>
        The nextry.app Service and its contents are provided &quot;as is&quot; and &quot;as
        available&quot; without any warranty or representations of any kind, whether
        express or implied. nextry.app is a distributor and not a publisher of
        the content supplied by third parties; as such, nextry.app exercises no
        editorial control over such content and makes no warranty or
        representation as to the accuracy, reliability or currency of any
        information, content, service or merchandise provided through or
        accessible via the nextry.app Service. Without limiting the foregoing,
        nextry.app specifically disclaims all warranties and representations in
        any content transmitted on or in connection with the nextry.app Service
        or on sites that may appear as links on the nextry.app Service, or in
        the products provided as a part of, or otherwise in connection with, the
        nextry.app Service, including without limitation any warranties of
        merchantability, fitness for a particular purpose or non-infringement of
        third party rights. No oral advice or written information given by
        nextry.app or any of its affiliates, employees, officers, directors,
        agents, or the like will create a warranty. Price and availability
        information is subject to change without notice. Without limiting the
        foregoing, nextry.app does not warrant that the nextry.app Service will
        be uninterrupted, uncorrupted, timely, or error-free.
      </p>
      <h1 className={style.offer__title}>Copyright Disclaimer</h1>
      <p>
        All intellectual property rights concerning these materials are vested
        in nextry.app. Copying, distribution and any other use of these
        materials is not permitted without the written permission of nextry.app,
        except and only to the extent otherwise provided in regulations of
        mandatory law (such as the right to quote), unless otherwise stated for
        certain materials.
      </p>
      <h1 className={style.offer__title}>Affiliate Links Disclosure</h1>
      <p>
        nextry.app has affiliate links and in this section of the Disclaimer we
        will address how we use those affiliate links from other
        websites/companies and products. These &ldquo;affiliate links&rdquo; are specific
        URLs that contain the affiliate&apos;s ID or username.
      </p>
      <p>
        In compliance with the FTC guidelines, please assume the following about
        links and posts on this site:
      </p>
      <ul className={style.offer__list}>
        <li>
          Any/all of the links on nextry.app are affiliate links of which we
          receive a small commission from sales of certain items, but the price
          is the same for you. As nextry.app has grown, so have costs associated
          with running and maintaining it, and affiliate links are a way we help
          offset these costs.
        </li>
        <li>
          If we post an affiliate link to a product, it is something that we
          personally use, support and would recommend without an affiliate link.
        </li>
        <li>
          Unless otherwise noted, all reviews are of items we have purchased and
          we are not paid or compensated in any way.
        </li>
      </ul>
      <p>We might participate in affiliate programs such as:</p>

      <ul className={style.offer__list}>
        <li>Amazon Associates Program</li>
        <li>ShareASale</li>
        <li>Ebay Partner Network</li>
        <li>Others</li>
      </ul>
      <h1 className={style.offer__title}>Advertising Disclosure</h1>
      <p>
        This website/app may contain third party advertisements and links to
        third party sites. nextry.app does not make any representation as to the
        accuracy or suitability of any of the information contained in those
        advertisements or sites and does not accept any responsibility or
        liability for the conduct or content of those advertisements and sites
        and the offerings made by the third parties.
      </p>
      <p>
        Advertising keeps nextry.app and many of the websites and services you
        use free of charge. We work hard to make sure that ads are safe,
        unobtrusive, and as relevant as possible.
      </p>
      <p>
        Third party advertisements and links to other sites where goods or
        services are advertised are not endorsements or recommendations by
        nextry.app of the third party sites, goods or services. nextry.app takes
        no responsibility for the content of any of the ads, promises made, or
        the quality/reliability of the products or services offered in all
        advertisements.
      </p>
      <h1 className={style.offer__title}>Testimonials Disclosure</h1>
      <p>
        Any testimonials provided on this platform are opinions of those
        providing them. The information provided in the testimonials is not to
        be relied upon to predict results in your specific situation. The
        results you experience will be dependent on many factors including but
        not limited to your level of personal responsibility, commitment, and
        abilities, in addition to those factors that you and/or nextry.app may
        not be able to anticipate.
      </p>
      <p>
        We will give honest testimonials to our visitors regardless of any
        discount. Any product or service that we test are individual
        experiences, reflecting real life experiences. The testimonials could be
        displayed on audio, text or video and are not necessarily representative
        of all of those who will use our products and/or services.
      </p>
      <p>
        nextry.app does not guarantee the same results as the testimonials given
        on our platform. Testimonials presented on nextry.app are applicable to
        the individuals writing them, and may not be indicative of future
        success of any other individuals.
      </p>
      <p>
        Please don’t hesitate to contact us if you would like to know more about
        testimonials, discounts, or any of the products/services that we review.
      </p>
      <h1>Your Consent</h1>
      <p>
        We&apos;ve updated our Disclaimer to provide you with complete transparency
        into what is being set when you visit our site and how it&apos;s being used.
        By using our website/app, registering an account, or making a purchase,
        you hereby consent to our Disclaimer and agree to its terms.
      </p>

      <h1 className={style.offer__title}>Changes To Our Disclaimer</h1>
      <p>
        Should we update, amend or make any changes to this document so that
        they accurately reflect our Service and policies. Unless otherwise
        required by law, those changes will be prominently posted here. Then, if
        you continue to use the Service, you will be bound by the updated
        Disclaimer. If you do not want to agree to this or any updated
        Disclaimer, you can delete your account.
      </p>
      <h1 className={style.offer__title}>Contact Us</h1>
      <p>
        Don&apos;t hesitate to contact us if you have any questions regarding this
        Disclaimer.
      </p>
      <ul className={style.offer__list}>
        <li>
          Via Email:{" "}
          <Link href="mailto:bussiness@nextry.ai">bussiness@nextry.ai</Link>
        </li>
        <li>
          Via this Link:{" "}
          <Link href={"https://nextry.app"}>http://nextry.app</Link>
        </li>
      </ul>
    </div>
  );
}
