import {
  DollarCircleOutlined,
  CarOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  AndroidFilled,
  WechatFilled,
  InstagramFilled,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import React from "react";
import styles from "../Footer/Footer.module.css";

export default function FooterPage() {
  return (
    <section className="rc-footer-bottom">
      <div className={styles.site_server_box} data-site="site" data-spm="20">
        <div
          style={{ display: "flex", flexDirection: "row" }}
          className={styles.container}
        >
          <div className={styles.site_item}>
            <DollarCircleOutlined className={styles.icon} />
            <h3>Great value</h3>
            <p>We offer competitive prices on over 100 million items.</p>
          </div>
          <div className={styles.site_item}>
            <i className="icon i-delivery">&nbsp;</i>
            <CarOutlined className={styles.icon} />
            <h3>Worldwide shopping</h3>
            <p>
              We ship to over 200 countries and regions, and our site comes in
              12 languages.
            </p>
          </div>
          <div className={styles.site_item}>
            <i className="icon i-payment">&nbsp;</i>
            <CreditCardOutlined className={styles.icon} />
            <h3>Safe payment</h3>
            <p>Pay with the world’s most popular and secure payment methods.</p>
          </div>
          <div className={styles.site_item}>
            <i className="icon i-confidence">&nbsp;</i>
            <CheckCircleOutlined className={styles.icon} />
            <h3>Shop with confidence</h3>
            <p>
              Our Buyer Protection policy covers your entire purchase journey.
            </p>
          </div>
          <div className={styles.site_item}>
            <i className="icon i-help">&nbsp;</i>
            <TeamOutlined className={styles.icon} />
            <h3>Help center</h3>
            <p>Round-the-clock assistance for a smooth shopping experience.</p>
          </div>
          <div className={styles.site_item}>
            <i className="icon i-shop">&nbsp;</i>

            <AndroidFilled className={styles.icon} />

            <h3>Shop better</h3>
            <p>Our advanced mobile application is coming out soon.</p>
          </div>
        </div>
      </div>

      <div
        style={{
          color: "white",
          background: "#C0C0C0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
        }}
        className="footer-copywrite"
      >
        <div className={styles.stay_connected}>
          <div className={styles.text}> Stay connected</div>
          <div className={styles.icons_social}>
            <WechatFilled className={styles.icons} />
            <InstagramFilled className={styles.icons} />
            <TwitterOutlined className={styles.icons} />
            <FacebookFilled className={styles.icons} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <a
            style={{
              textDecoration: "none",
              color: "black",
              marginRight: "15px",
            }}
            href="https://github.com/TyamackovM"
          >
            TyamackovM
          </a>
          <a
            style={{
              textDecoration: "none",
              color: "black",
              marginRight: "15px",
            }}
            href="https://github.com/DanilaTru"
          >
            DanilaTru
          </a>
          <a
            style={{
              textDecoration: "none",
              color: "black",
              marginRight: "15px",
            }}
            href="https://github.com/StepanMogilyov"
          >
            StepanMogilyov
          </a>
          <a
            style={{
              textDecoration: "none",
              color: "black",
              marginRight: "15px",
            }}
            href="https://github.com/Aleks2580"
          >
            Aleks2580
          </a>
        </div>
      </div>
      <div
        style={{ color: "white", background: "#a622ffb9", textAlign: "center" }}
        className="footer-copywrite"
      >
        <div style={{ height: "25px" }} className="container">
          ©️2022 E-market. All rights reserved.
        </div>
      </div>
    </section>
  );
}
