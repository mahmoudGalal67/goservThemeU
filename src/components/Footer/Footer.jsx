import React, { useState, useEffect } from "react";
import "./Footer.css";
import axios from "axios";

function Footer() {
  const [socialMedia, setSocialMedia] = useState([]);
  const [facebookData, setFacebookData] = useState([]);
  const [snapchatData, setSnapchatData] = useState([]);
  const [aboutUs, setAboutUs] = useState([""]);
  const [contactUs, setContactUs] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "http://goservback.sallaplus.com/public/api/website/social-media?lang=en"
  //     )
  //     .then((response) => {
  //       const data = response.data.data;
  //       setSocialMedia(data);

  //       const facebookData = data.find((item) => item.platform === "facebook");
  //       const snapchatData = data.find((item) => item.platform === "snapchat");
  //       setFacebookData(facebookData);
  //       setSnapchatData(snapchatData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "http://goservback.sallaplus.com/public/api/website/contacts?lang=en"
  //     )
  //     .then((response) => {
  //       setContactUs(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching contacts:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "http://goservback.sallaplus.com/public/api/website/about-store?lang=en"
  //     )
  //     .then((response) => {
  //       setAboutUs(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching about us:", error);
  //     });
  // }, []);

  return (
    <footer>
      <div className="top">
        <div className="apps">
          <h2>تطبيقات الجوال</h2>
          <div className="wrapper">
            <img src="/app.png" alt="" />
            <img src="/app.png" alt="" />
          </div>
        </div>
        <div className="search">
          <h2>يمكنك إلغاء الاشتراك في أي لحظة</h2>
          <form action="">
            <button>إشتراك</button>
            <input dir="rtl" type="text" placeholder="ادخل البريد الالكترونى" />
          </form>
        </div>
        <div className="email">
          <h2>الاشتراك فى النشرة البريدية</h2>
          <div className="wrapper">
            <p>انضم الآن واحصل على خصم 10٪ على مشترياتك التالية!</p>
            <img src="/filledemail.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="middle">
        <div className="socials">
          <h2>تابعنا على</h2>
          <div className="wrapper">
            {facebookData && (
              <a
                href={facebookData.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook-f"
                  className="svg-inline--fa fa-facebook-f"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  ></path>
                </svg>
              </a>
            )}
            <a href="">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="twitter"
                className="svg-inline--fa fa-twitter "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                ></path>
              </svg>
            </a>
            <a href="">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="instagram"
                className="svg-inline--fa fa-instagram "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                ></path>
              </svg>
            </a>
            {snapchatData && (
              <a
                href={snapchatData.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="snapchat"
                  className="svg-inline--fa fa-snapchat "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M496.926,366.6c-3.373-9.176-9.8-14.086-17.112-18.153-1.376-.806-2.641-1.451-3.72-1.947-2.182-1.128-4.414-2.22-6.634-3.373-22.8-12.09-40.609-27.341-52.959-45.42a102.889,102.889,0,0,1-9.089-16.12c-1.054-3.013-1-4.724-.248-6.287a10.221,10.221,0,0,1,2.914-3.038c3.918-2.591,7.96-5.22,10.7-6.993,4.885-3.162,8.754-5.667,11.246-7.44,9.362-6.547,15.909-13.5,20-21.278a42.371,42.371,0,0,0,2.1-35.191c-6.2-16.318-21.613-26.449-40.287-26.449a55.543,55.543,0,0,0-11.718,1.24c-1.029.224-2.059.459-3.063.72.174-11.16-.074-22.94-1.066-34.534-3.522-40.758-17.794-62.123-32.674-79.16A130.167,130.167,0,0,0,332.1,36.443C309.515,23.547,283.91,17,256,17S202.6,23.547,180,36.443a129.735,129.735,0,0,0-33.281,26.783c-14.88,17.038-29.152,38.44-32.673,79.161-.992,11.594-1.24,23.435-1.079,34.533-1-.26-2.021-.5-3.051-.719a55.461,55.461,0,0,0-11.717-1.24c-18.687,0-34.125,10.131-40.3,26.449a42.423,42.423,0,0,0,2.046,35.228c4.105,7.774,10.652,14.731,20.014,21.278,2.48,1.736,6.361,4.24,11.246,7.44,2.641,1.711,6.5,4.216,10.28,6.72a11.054,11.054,0,0,1,3.3,3.311c.794,1.624.818,3.373-.36,6.6a102.02,102.02,0,0,1-8.94,15.785c-12.077,17.669-29.363,32.648-51.434,44.639C32.355,348.608,20.2,352.75,15.069,366.7c-3.868,10.528-1.339,22.506,8.494,32.6a49.137,49.137,0,0,0,12.4,9.387,134.337,134.337,0,0,0,30.342,12.139,20.024,20.024,0,0,1,6.126,2.741c3.583,3.137,3.075,7.861,7.849,14.78a34.468,34.468,0,0,0,8.977,9.127c10.019,6.919,21.278,7.353,33.207,7.811,10.776.41,22.989.881,36.939,5.481,5.778,1.91,11.78,5.605,18.736,9.92C194.842,480.951,217.707,495,255.973,495s61.292-14.123,78.118-24.428c6.907-4.24,12.872-7.9,18.489-9.758,13.949-4.613,26.163-5.072,36.939-5.481,11.928-.459,23.187-.893,33.206-7.812a34.584,34.584,0,0,0,10.218-11.16c3.434-5.84,3.348-9.919,6.572-12.771a18.971,18.971,0,0,1,5.753-2.629A134.893,134.893,0,0,0,476.02,408.71a48.344,48.344,0,0,0,13.019-10.193l.124-.149C498.389,388.5,500.708,376.867,496.926,366.6Zm-34.013,18.277c-20.745,11.458-34.533,10.23-45.259,17.137-9.114,5.865-3.72,18.513-10.342,23.076-8.134,5.617-32.177-.4-63.239,9.858-25.618,8.469-41.961,32.822-88.038,32.822s-62.036-24.3-88.076-32.884c-31-10.255-55.092-4.241-63.239-9.858-6.609-4.563-1.24-17.211-10.341-23.076-10.739-6.907-24.527-5.679-45.26-17.075-13.206-7.291-5.716-11.8-1.314-13.937,75.143-36.381,87.133-92.552,87.666-96.719.645-5.046,1.364-9.014-4.191-14.148-5.369-4.96-29.189-19.7-35.8-24.316-10.937-7.638-15.748-15.264-12.2-24.638,2.48-6.485,8.531-8.928,14.879-8.928a27.643,27.643,0,0,1,5.965.67c12,2.6,23.659,8.617,30.392,10.242a10.749,10.749,0,0,0,2.48.335c3.6,0,4.86-1.811,4.612-5.927-.768-13.132-2.628-38.725-.558-62.644,2.84-32.909,13.442-49.215,26.04-63.636,6.051-6.932,34.484-36.976,88.857-36.976s82.88,29.92,88.931,36.827c12.611,14.421,23.225,30.727,26.04,63.636,2.071,23.919.285,49.525-.558,62.644-.285,4.327,1.017,5.927,4.613,5.927a10.648,10.648,0,0,0,2.48-.335c6.745-1.624,18.4-7.638,30.4-10.242a27.641,27.641,0,0,1,5.964-.67c6.386,0,12.4,2.48,14.88,8.928,3.546,9.374-1.24,17-12.189,24.639-6.609,4.612-30.429,19.343-35.8,24.315-5.568,5.134-4.836,9.1-4.191,14.149.533,4.228,12.511,60.4,87.666,96.718C468.629,373.011,476.119,377.524,462.913,384.877Z"
                  ></path>
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="links">
          <h2>تواصل معنا</h2>
          <ul>
            {contactUs.map((contact) => (
              <li key={contact.id}>
                <img src="/doublearrow.svg" alt="" />
                <a href="#">
                  {contact.contact_type}
                  <br />
                  {contact.contact_value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="links">
          <h2>روابط مهمة</h2>
          <ul>
            <li>
              <img
                src="/doublearrow.svg
              "
                alt=""
              />
              <a href="#">من نحن</a>
            </li>
            <li>
              <img
                src="/doublearrow.svg
              "
                alt=""
              />
              <a href="#">ساسية الخصوصية</a>
            </li>
            <li>
              <img
                src="/doublearrow.svg
              "
                alt=""
              />
              <a href="#">الشروط والاحكام</a>
            </li>
            <li>
              <img
                src="/doublearrow.svg
              "
                alt=""
              />
              <a href="#">الدعم الفنى</a>
            </li>
          </ul>
        </div>
        <div className="links">
          <h2>حسابى </h2>
          <ul>
            <li>
              <img
                src="/doublearrow.svg
              "
                alt=""
              />
              <a href="#">حسابى</a>
            </li>
            <li>
              <img
                src="/doublearrow.svg
              "
                alt=""
              />
              <a href="#"> طلباتى</a>
            </li>
            <li>
              <img
                src="/doublearrow.svg
              "
                alt=""
              />
              <a href="#"> سلة المشتريات</a>
            </li>
            <li>
              <img
                src="/doublearrow.svg
              "
                alt=""
              />
              <a href="#"> المفضلة</a>
            </li>
          </ul>
        </div>
        <div className="about-us">
          <h2>عن متجرنا</h2>
          <p>{aboutUs.description}</p>
        </div>
      </div>
      <div className="bootom">
        <div className="left">
          <div className="payments flex">
            <img src="/pay.png" alt="" />
            <img src="/pay2.png" alt="" />
            <img src="/pay3.png" alt="" />
            <img src="/pay4.png" alt="" />
          </div>
          <div className="tex flex">
            <span>الرقم الضريبي : 546987552</span>
            <img src="/pay5.png" alt="" />
          </div>
        </div>
        <div className="right">الحقوق محفوظة لمنصة سلة © 2024</div>
      </div>
    </footer>
  );
}

export default Footer;
