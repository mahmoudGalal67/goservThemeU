import Info from "../../components/Info/Info";
import Nav from "../../components/nav/Nav";
import DynamicSlider from "../../components/DynamicSlider/DynamicSlider";
import Features from "../../components/Features/Features";
import StaticProducts from "../../components/StaticProducts/StaticProducts";
import StaticSlider from "../../components/StaticSlider/StaticSlider";
import SpecialProducts from "../../components/SpecialProducts/SpecialProducts";
import SPecialBanners from "../../components/SPecialBanners/SPecialBanners";
import CountdownProduct from "../../components/CountdownProduct/CountdownProduct";
import DynamicPrducts from "../../components/DynamicProducts/DynamicProducts";
import Offers from "../../components/Offers/Offers";
import Testimonials from "../../components/Testimonials/Testimonials";
import Blogs from "../../components/Blogs/Blogs";
import Brands from "../../components/Brands/Brands";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/SideBar";

import "./HomeDesign.css";
import { useLayoutEffect, useState } from "react";
import { request } from "../../components/utils/Request";

function HomeDesign() {
  const [sectionsOrder, setsectionsOrder] = useState([]);

  let section = [];

  useLayoutEffect(() => {
    const setSections = async () => {
      try {
        const { data } = await request({
          url: "/api/website/sections?lang=en",
        });
        data.map((item) => {
          if (item.name == "Sec1") {
            section.push(<DynamicSlider id={item.id} />);
          } else if (item.name == "Sec2") {
            section.push(<DynamicSlider id={item.id} />);
          } else if (item.name == "Sec3") {
            section.push(<DynamicSlider id={item.id} />);
          } else if (item.name == "Sec4") {
            section.push(<Features />);
          } else if (item.name == "Sec5") {
            section.push(<Offers />);
          } else if (item.name == "Sec6") {
            section.push(<CountdownProduct />);
          }
        });
        setsectionsOrder(section);
      } catch (error) {
        console.error("Error fetching brands data:", error);
      }
    };
    setSections();
  }, []);
  return (
    <div className="home-design">
      <Sidebar />
      <Info />
      {/* <StaticProducts /> */}
      {/* <Nav design={true} /> */}
      {sectionsOrder.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
      <Footer />
    </div>
  );
}

export default HomeDesign;
