import { Mail, Send } from "lucide-react";

export function ContactSection({
  email = "tatikorostyleva2194@gmail.com",
  telegram = "https://t.me/tiana_koro",
}: {
  email?: string | undefined;
  telegram?: string | undefined;
}) {
  const telegramLabel = telegram.match(/t\.me\/([^/?#]+)/)?.[1];
  return (
    <section
      id="contact"
      className="site-container home-contact"
      aria-labelledby="contact-title"
      data-reveal
    >
      <div>
        <h2 id="contact-title">Let’s talk.</h2>
        <p>
          Have a product challenge in mind, or want to hear more about a project? I’d be happy to
          connect.
        </p>
        <small className="contact-copyright-desktop">© 2026 Tatiana Kapkaeva</small>
      </div>
      <div className="home-contact-links">
        <a href={"mailto:" + email}>
          <Mail size={21} strokeWidth={1.6} aria-hidden="true" />
          <span>{email}</span>
        </a>
        <a href={telegram} target="_blank" rel="noopener noreferrer">
          <Send size={21} strokeWidth={1.6} aria-hidden="true" />
          <span>{telegramLabel ? "@" + telegramLabel : "Telegram"}</span>
        </a>
      </div>
      <small className="contact-copyright-mobile">© 2026 Tatiana Kapkaeva</small>
    </section>
  );
}
