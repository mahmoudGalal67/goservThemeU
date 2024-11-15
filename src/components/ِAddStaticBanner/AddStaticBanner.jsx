import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";

import "./AddStaticBanner.css";

function AddStaticBanner({ activeEditSection, setactiveEditSection }) {
  const [files, setfiles] = useState({});
  const [bannersNumber, setbannersNumber] = useState([Math.random()]);
  const [bannersData, setbannersData] = useState([{ title: null, desc: null }]);

  const formElements = useRef(null);

  function MyVerticallyCenteredModal(props) {
    const add = () => {
      const id = Math.random();
      setbannersNumber((prev) => [...prev, id]);
      const values = Array.from(
        formElements.current.getElementsByClassName("banner-body")
      ).map((el) => {
        return { title: el.children[4].value, desc: el.children[5].value };
      });
      setbannersData((prev) => [...values, { title: null, desc: null }]);
      console.log(values);
    };

    const deleteBanner = (e, el) => {
      setbannersNumber(bannersNumber.filter((element) => element != el));
    };

    const handleFileChange = (e, ele) => {
      setfiles((prev) => ({ ...prev, [ele]: e.target.files[0] }));
    };

    const submit = (e) => {
      bannersNumber.map((el, i) =>
        setbannersData((prev) => [
          ...prev,
          {
            img: files[el],
            title: e.target[i * 3].value,
            link: e.target[i * 3 + 1].value,
          },
        ])
      );
    };
    console.log(bannersData);

    useEffect(() => {
      const wait = setTimeout(function () {
        document.body.classList.add("stop");
      }, 3000);
      return () => {
        clearTimeout(wait);
      };
    }, []);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="add"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {activeEditSection}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref={formElements} onSubmit={submit}>
            {bannersNumber.map((el, i) => (
              <div className="banner-body" key={i}>
                <h4>
                  {bannersNumber.length == 1 ? null : (
                    <img
                      style={{ width: "25px", cursor: "pointer" }}
                      src="delete.svg"
                      alt=""
                      onClick={(e) => deleteBanner(e, el)}
                    />
                  )}
                  {i + 1}
                  {"  "} صورة رقم
                </h4>
                <span> *صورة البنر </span>
                <p>* المقاس المناسب للصورة هو 1108×428 بكسل</p>

                <label htmlFor={el}>
                  {files[el] ? (
                    <img
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      src={URL.createObjectURL(files[el])}
                      alt=""
                    />
                  ) : (
                    <>
                      <img
                        style={{ width: "60px" }}
                        src="/landscape-placeholder-svgrepo-com.svg"
                        alt=""
                      />
                      <span>ارفع صورة (jpg, jpeg, gif, png)</span>
                    </>
                  )}
                </label>
                <input
                  type="text"
                  className="title"
                  name="title"
                  placeholder="title"
                  required
                  value={bannersData[i]?.title}
                  disabled={bannersData[i]?.title ? true : false}
                />
                <input
                  type="text"
                  className="desc"
                  name="link"
                  placeholder="Link"
                  required
                  value={bannersData[i]?.desc}
                  disabled={bannersData[i]?.desc ? true : false}
                />
                <input
                  id={el}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, el)}
                />
              </div>
            ))}

            <button className="add" onClick={add}>
              اضافة +
            </button>
            <button className="submit" type="submit">
              حفظ التغيرات
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <div className="edit-section">
      <MyVerticallyCenteredModal
        show={activeEditSection}
        onHide={() => setactiveEditSection(false)}
      />
    </div>
  );
}

export default AddStaticBanner;
