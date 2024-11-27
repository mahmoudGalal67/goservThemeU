import Info from "../../components/Info/Info";
import Nav from "../../components/nav/Nav";
import TabsReact from "../../components/Tabs/TabsReact";
import DynamicPrducts from "../../components/DynamicProducts/DynamicProducts";
import Footer from "../../components/Footer/Footer";

import { useEffect, useState } from "react";
import { request } from "../../components/utils/Request";

import {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "../../pages/Redux/CartSlice";
import { addFavorite, removeFavorite } from "../../pages/Redux/FavoriteSlice";

import Accordion from "react-bootstrap/Accordion";

import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { products } from "../../components/StaticProducts/dummyProducts";

function ProductDetails() {
  const [ProductDetails, setProductDetails] = useState(null);
  const [ProductColorID, setProductColorID] = useState(0);
  const [SizeId, setSizeId] = useState(0);
  const [randint, setrandint] = useState(null);
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();

  const [count, setcount] = useState(ProductDetails?.quantity || 1);

  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const { id } = useParams();

  const setFirstPhoto = (i) => {
    setProductDetails((prev) => ({
      ...prev,
      firstPhoto: ProductDetails.photos[i],
    }));
  };

  const handleSizeChange = (e) => {
    setSizeId(Number(e.target.value));
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await request({
          url: `/api/website/products/${id}`,
        });
        setProductDetails(data.data);
      } catch (error) {
        setErr(error);
      }
    };
    getProductDetails();
  }, []);

  useEffect(() => {
    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    setrandint(randomIntFromInterval(100, 300));
  }, []);

  const handleAddToCart = (product) => {
    if (isProductInCart(product.id)) {
      dispatch(removeItemFromCart(product));
    } else {
      dispatch(addItemToCart(product));
    }
  };

  const handleFavoriteClick = (product) => {
    if (isProductFavorite(product.id)) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const isProductInCart = (product) => {
    return cartItems.some((item) => item.id === product.id);
  };

  const isProductFavorite = (productId) => {
    return favoriteItems.some((item) => item.id === productId);
  };

  const handleUpdateQuantity = (ProductDetails) => {
    dispatch(
      updateItemQuantity({
        ...ProductDetails,
        quantity: count,
        price:
          ProductDetails.product_colors[ProductColorID].product_color_sizes
            .price[SizeId],
      })
    );
  };

  if (err) {
    console.error(err);
    return <span className="error">error</span>;
  }

  if (!ProductDetails) {
    return <div> loading ...</div>;
  }

  return (
    <div className="product-details">
      <Info />
      <Nav />
      <div className="container">
        <div className="left">
          <h2>{ProductDetails.name.en}</h2>
          <div className="extra-info">
            مرة <span style={{ color: "#60f4d4" }}>250</span> تم شرائها
            <img src="/fire.svg" alt="" />
            وحدة
            <span style={{ color: "#60f4d4" }}>16</span>
            المتبقي
            <img src="/bag.svg" alt="" />
          </div>
          <div className="options">
            مشاركة المنتج
            <img src="/share.svg" style={{ width: "15px" }} alt="" />
            أضف للمفضلة
            <img src="/heart1.svg" style={{ width: "15px" }} alt="" />
            <div className="rating flex">
              <span>( 10 ) تقييمات</span>
              <img src="/outlineStar.svg" alt="" />
              <img src="/filledStar.svg" alt="" />
              <img src="/filledStar.svg" alt="" />
              <img src="/filledStar.svg" alt="" />
              <img src="/filledStar.svg" alt="" />
            </div>
          </div>
          <div className="views">
            يشاهد المنتج الان{" "}
            <span style={{ color: "#60f4d4" }}>{randint}</span> شخص
          </div>
          <p>{ProductDetails.description.en}</p>
          <Accordion defaultActiveKey="0">
            <Accordion.Item>
              <Accordion.Header>
                {" "}
                <img
                  style={{ width: "30px", margin: "0 48px" }}
                  src="/edit.svg"
                  alt=""
                />
                تخصيص المنتج{" "}
              </Accordion.Header>
              <Accordion.Body className="details">
                <div className="images">
                  <h3>صور المنتج</h3>
                  <div className="wrapper flex justify-content-end">
                    {ProductDetails.product_colors[ProductColorID].photos.map(
                      (img, i) => (
                        <img
                          key={i}
                          src={`https://goservback.alyoumsa.com/public/storage/${img}`}
                          style={{
                            width: "120px",
                            height: "120px ",
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="colors">
                  <h3>الألوان المتاحة</h3>
                  <div className="wrapper flex">
                    {ProductDetails.product_colors.map((item, i) => (
                      <div
                        key={i}
                        className={i == ProductColorID ? "active" : ""}
                        onClick={() => setProductColorID(Number(i))}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: item.hex_code,
                          cursor: "pointer",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                {" "}
                <img
                  style={{ width: "30px", margin: "0 48px" }}
                  src="/home.svg"
                  alt=""
                />{" "}
                التوفر في المعارض
              </Accordion.Header>
              <Accordion.Body>
                لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي
                الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان
                لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر
                عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها
                من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة
                قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً
                وبشكله الأصلي في الطباعة والتنضيد الإلكتروني.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                {" "}
                <img
                  style={{ width: "30px", margin: "0 48px" }}
                  src="/weight.svg"
                  alt=""
                />{" "}
                وزن المنتج
              </Accordion.Header>
              <Accordion.Body>
                لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي
                الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان
                لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر
                عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها
                من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة
                قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً
                وبشكله الأصلي في الطباعة والتنضيد الإلكتروني.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="choose-size flex w-100 justify-content-between gap-3 p-4">
            <select
              onChange={(e) => handleSizeChange(e)}
              className="w-75 p-2 bg-light rounded-2 border-1 border-black-50 text-black-50"
            >
              {ProductDetails.product_colors[
                ProductColorID
              ].product_color_sizes.size.map((size, i) => (
                <option value={i}>{size}</option>
              ))}
            </select>
            <div className="fs-6 fw-bold">اختر المقاس</div>
          </div>
          <div className="count">
            <div className="price">
              {
                ProductDetails.product_colors[ProductColorID]
                  .product_color_sizes.price[SizeId]
              }
            </div>
            <div className="counter">
              <div onClick={() => setcount((prev) => prev + 1)}>+</div>
              <div>{count}</div>
              <div
                onClick={() => setcount((prev) => (prev > 1 ? prev - 1 : prev))}
              >
                -
              </div>
            </div>
            <span>حدد الكمية</span>
          </div>
          <div className="links flex">
            <button
              className="custom-link-ouline"
              onClick={() => handleUpdateQuantity(ProductDetails)}
            >
              <img src="/cartcolored.svg" alt="" />
              {isProductInCart(ProductDetails)
                ? " Update "
                : "Add to cart"}{" "}
            </button>
            <button
              className="custom-link-filled"
              onClick={() => {
                handleFavoriteClick(ProductDetails);
              }}
              style={{
                backgroundColor: isProductFavorite(ProductDetails.id)
                  ? "yellow"
                  : "",
              }}
            >
              <img src="/heart.svg" alt="Favorite icon" />
              اضافة الي المفضلة
            </button>
          </div>
        </div>
        <div className="right">
          <div className="wrapper flex">
            <div className="main-img">
              <img
                src={
                  `https://goservback.alyoumsa.com/public/storage/${
                    ProductDetails.firstPhoto != undefined
                      ? ProductDetails?.firstPhoto
                      : ProductDetails?.photos[0]
                  }` || "image-two.dd7d3cfc16bf56c43f01.png"
                }
                alt=""
              />
            </div>
            <div className="side-images">
              {ProductDetails?.photos.map((img, i) => (
                <div
                  className={
                    img == ProductDetails.firstPhoto
                      ? "side-img active"
                      : "side-img"
                  }
                  style={{ cursor: "pointer" }}
                  key={i}
                  onClick={() => setFirstPhoto(i)}
                >
                  <img
                    src={`https://goservback.alyoumsa.com/public/storage/${img}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="tabs">
        <TabsReact />
      </div>
      <DynamicPrducts />
      <Footer />
    </div>
  );
}

export default ProductDetails;
