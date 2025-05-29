// import React from "react";
// import classes from "./PrivatePage.module.css";
// import ShowcaseFooter from "../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter";

// const PrivatePage = () => {
//   return (
//     <div className={classes.container}>
//       <h1>Привет, это приват</h1>
//       <ShowcaseFooter />
//     </div>
//   );
// };

// export default PrivatePage;
import React, { useState } from "react";
import classes from "./PrivatePage.module.css";
import ShowcaseFooter from "../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter";
import { motion, AnimatePresence } from "framer-motion";

type SectionKeys = "stages" | "deliveryOptions" | "whyChooseUs";

const PrivatePage = () => {
  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKeys, boolean>
  >({
    stages: true,
    deliveryOptions: true,
    whyChooseUs: true,
  });

  const toggleSection = (section: SectionKeys) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Варианты анимации
  const sectionVariants = {
    open: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 },
  };

  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <div className={classes.container}>
      <section className={classes.marqueeWrapper}>
        <div className={classes.marquee}>
          <img src="/brands/1card.png" alt="Nike" />
          <img src="/brands/card3.png" alt="Adidas" />
          <img src="/brands/card4.png" alt="Rick Owens" />
          <img src="/brands/card5.png" alt="Off-White" />
          <img src="/brands/card6.png" alt="Balenciaga" />
          <img src="/brands/card7.png" alt="Rick Owens" />
          <img src="/brands/card8.png" alt="Nike" />

          {/* Дубликат для плавности */}
          <img src="/brands/1card.png" alt="Nike" />
          <img src="/brands/card3.png" alt="Adidas" />
          <img src="/brands/card4.png" alt="Rick Owens" />
          <img src="/brands/card5.png" alt="Off-White" />
          <img src="/brands/card6.png" alt="Balenciaga" />
          <img src="/brands/card7.png" alt="Rick Owens" />
          <img src="/brands/card8.png" alt="Nike" />
        </div>
      </section>
      <h1 className={classes.title}>Как работает доставка</h1>

      <section className={classes.section}>
        <motion.h2
          onClick={() => toggleSection("stages")}
          className={classes.sectionHeader}
          whileHover={{ color: "#ccc" }}
        >
          Этапы заказа
          <motion.span
            className={classes.arrowIcon}
            variants={iconVariants}
            animate={expandedSections.stages ? "open" : "closed"}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.h2>
        <AnimatePresence>
          {expandedSections.stages && (
            <motion.div
              className={classes.textBlock}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={sectionVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className={classes.videoBackground}
              >
                <source src="/video/video2.mp4" type="video/mp4" />
              </video>
              <p>
                Мы делаем процесс покупки максимально простым и удобным для вас.
                Сначала вы выбираете интересующий товар и оставляете заявку на
                сайте или в приложении.
              </p>
              <p>
                Наш менеджер оперативно связывается с вами, чтобы уточнить
                детали и ответить на любые вопросы.
              </p>
              <p>
                После этого мы совместно обсуждаем удобный способ доставки,
                варианты оплаты, а также сроки и дополнительные услуги —
                например, сборку или упаковку.
              </p>
              <p>
                Наш менеджер сопровождает вас на всех этапах: от подтверждения
                заказа до получения товара — чтобы вы чувствовали поддержку и
                уверенность на каждом шаге.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <hr className={classes.separator} />

      <section className={classes.section}>
        <motion.h2
          onClick={() => toggleSection("deliveryOptions")}
          className={classes.sectionHeader}
          whileHover={{ color: "#ccc" }}
        >
          Варианты доставки
          <motion.span
            className={classes.arrowIcon}
            variants={iconVariants}
            animate={expandedSections.deliveryOptions ? "open" : "closed"}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.h2>

        <AnimatePresence>
          {expandedSections.deliveryOptions && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={sectionVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3>1. Самостоятельная доставка из Китая</h3>
              <div className={classes.textBlock}>
                <p>
                  Этот вариант идеально подойдет тем, кто хочет контролировать
                  процесс лично и не зависеть от посредников. Мы предоставляем
                  доступ к удобному логистическому приложению, которое поможет
                  отслеживать все этапы движения вашего заказа.
                </p>
                <p>
                  Вы самостоятельно оплачиваете товар, получаете уникальный
                  трек-код и в режиме реального времени видите, где находится
                  ваша посылка.
                </p>
                <p>
                  В случае вопросов наш менеджер всегда готов помочь и
                  консультировать 24/7, обеспечивая максимальную прозрачность и
                  безопасность.
                </p>
              </div>

              <h3>2. Мы всё делаем за вас</h3>
              <div className={classes.textBlock}>
                <p>
                  Для тех, кто предпочитает сэкономить время и силы, мы
                  предлагаем полный сервис: от закупки товара до доставки к
                  вашему порогу.
                </p>
                <p>
                  Мы самостоятельно покупаем выбранный вами товар, проверяем
                  качество, аккуратно упаковываем и организуем логистику.
                </p>
                <p>
                  Вам не придется переживать о деталях — мы предоставляем
                  фотоотчеты и своевременную информацию, а менеджер всегда на
                  связи до момента получения заказа.
                </p>
                <p>Это удобно, надежно и избавляет вас от лишних хлопот.</p>
              </div>

              <h3>3. Передача лично (Варшава или Гданьск)</h3>
              <div className={classes.textBlock}>
                <p>
                  Если вы цените личный контакт и хотите убедиться в честности
                  сделки, предлагаем вариант личной передачи товара.
                </p>
                <p>
                  Мы встречаемся с вами в удобном месте, передаем посылку лично
                  в руки, и вы оплачиваете товар на месте.
                </p>
                <p>
                  Такой подход исключает любые риски и дает максимум
                  прозрачности.
                </p>
                <p>
                  По вашему желанию мы можем сделать видеозапись передачи для
                  дополнительной безопасности.
                </p>
                <p>
                  Особенно этот вариант подойдет клиентам из Варшавы и Гданьска.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <hr className={classes.separator} />

      <section className={classes.section}>
        <motion.h2
          onClick={() => toggleSection("whyChooseUs")}
          className={classes.sectionHeader}
          whileHover={{ color: "#ccc" }}
        >
          Почему выбирают нас?
          <motion.span
            className={classes.arrowIcon}
            variants={iconVariants}
            animate={expandedSections.whyChooseUs ? "open" : "closed"}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.h2>
        <AnimatePresence>
          {expandedSections.whyChooseUs && (
            <motion.div
              className={classes.textBlock}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={sectionVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p>
                Мы работаем на рынке доставки уже более 5 лет и заслужили
                доверие тысяч клиентов.
              </p>
              <p>
                Наша команда профессионалов заботится о каждом заказе, чтобы вы
                получили именно то, что заказали — вовремя и в идеальном
                состоянии.
              </p>
              <p>
                Мы используем только проверенные каналы доставки и уделяем
                особое внимание качеству упаковки.
              </p>
              <p>
                Наша цель — сделать покупку не просто быстрой, но и приятной,
                чтобы вы с удовольствием возвращались к нам снова и снова.
              </p>
              <p>
                Благодаря прозрачности и открытому диалогу мы построили
                долгосрочные отношения с клиентами, которые ценят честность и
                надежность.
              </p>
              <p>
                Мы всегда открыты для обратной связи и стремимся улучшать
                сервис, опираясь на ваши пожелания.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className={classes.footer}>
        <div className={classes.footerContent}>
          <div className={classes.footerSection}>
            <h3 className={classes.footerTitle}>PodLuxSwegam</h3>
            <p className={classes.footerText}>
              Премиальные товары с доставкой по всему миру
            </p>
          </div>

          <div className={classes.footerSection}>
            <h4 className={classes.footerSubtitle}>Контакты</h4>
            <ul className={classes.footerList}>
              <li>Email: info@podluxswegam.com</li>
              <li>Телефон: +123 456 7890</li>
              <li>Telegram: @podluxswegam_support</li>
            </ul>
          </div>

          <div className={classes.footerSection}>
            <h4 className={classes.footerSubtitle}>Соцсети</h4>
            <div className={classes.socialIcons}>
              <a href="#" className={classes.socialLink}>
                Instagram
              </a>
              <a href="#" className={classes.socialLink}>
                Telegram
              </a>
              <a href="#" className={classes.socialLink}>
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className={classes.footerBottom}>
          <p>© {new Date().getFullYear()} PodLuxSwegam. Все права защищены.</p>
        </div>
      </footer>
      <ShowcaseFooter />
    </div>
  );
};

export default PrivatePage;
