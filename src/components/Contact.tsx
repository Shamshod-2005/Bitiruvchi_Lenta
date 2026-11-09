import { motion } from "motion/react";
import {
  Phone,
  Instagram,
  Send,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const contactInfo = [
    {
      id: "c-1",
      icon: <Phone className="w-5 h-5 text-gold" />,
      title: t("contact.phoneTitle"),
      value: "+998 94 011 52 44",
      sub: t("contact.phoneSub"),
      href: "tel:+998940115244",
    },
    {
      id: "c-2",
      icon: <Send className="w-5 h-5 text-gold" />,
      title: t("contact.telegramTitle"),
      value: "@Angrenlenti",
      sub: t("contact.telegramSub"),
      href: "https://t.me/Angrenlenti",
    },
    {
      id: "c-3",
      icon: <Instagram className="w-5 h-5 text-gold" />,
      title: t("contact.instagramTitle"),
      value: "@angren.lenti",
      sub: t("contact.instagramSub"),
      href: "https://instagram.com/angren.lenti",
    },
    {
      id: "c-4",
      icon: <Clock className="w-5 h-5 text-gold" />,
      title: t("contact.hoursTitle"),
      value: t("contact.hoursValue"),
      sub: t("contact.hoursSub"),
      href: null,
    },
  ];

  return (
    <section id="kontakt" className="py-12 sm:py-20 bg-white dark:bg-editorial-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold text-xs uppercase tracking-widest">
            {t("contact.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-editorial-dark dark:text-gray-100 mt-2 transition-colors duration-300">
            {t("contact.title")}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed font-light text-sm sm:text-base transition-colors duration-300">
            {t("contact.description")}
          </p>
        </div>

        {/* Info Grid + Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-editorial-dark dark:text-gray-100 mb-6 flex items-center gap-2 transition-colors duration-300">
                <span className="text-gold">📍</span>{" "}
                {t("contact.detailsTitle")}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.id}
                    className="p-5 rounded-3xl border border-gold/10 bg-warm-bg/25 dark:bg-white/5 flex gap-4 items-start hover:border-gold/30 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0 border border-gold/10">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        {info.title}
                      </h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-bold text-editorial-dark dark:text-gray-100 hover:text-gold mt-1 flex items-center gap-1 cursor-pointer transition-colors duration-300"
                        >
                          {info.value}{" "}
                          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                        </a>
                      ) : (
                        <p className="text-base font-bold text-editorial-dark dark:text-gray-100 mt-1 transition-colors duration-300">
                          {info.value}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed font-light transition-colors duration-300">
                        {info.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Info */}
            <div className="p-6 rounded-3xl bg-gold/5 border border-gold/20 flex items-start gap-4 mt-6">
              <div className="p-3 bg-gold text-white rounded-2xl shrink-0 shadow-md shadow-gold/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-editorial-dark dark:text-gray-100 text-sm transition-colors duration-300">
                  {t("contact.addressTitle")}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light mt-1 transition-colors duration-300">
                  {t("contact.address")}
                </p>
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-7 flex flex-col min-h-[350px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full h-full rounded-4xl overflow-hidden border border-gold/15 shadow-lg flex flex-col relative"
              id="maps-wrapper"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.5026383321!2d69.13928122971295!3d41.28251253775195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b20a5d676b1%3A0xca0a6da7d06a2138!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, flex: 1, minHeight: "380px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("contact.mapTitle")}
                id="gmaps-iframe"
              />
              <div className="absolute top-4 left-4 bg-white/95 dark:bg-editorial-dark/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gold/10 text-[10px] text-gold font-bold uppercase tracking-widest pointer-events-none">
                {t("contact.mapBadge")}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
