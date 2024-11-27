import { useEffect, useRef, useState } from "react";
import { Modal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";
import "../EditSection/EditSection.css";
import { request } from "../utils/Request";

function AddtSection({ setModalShow, modalShow, activeModal }) {
  const onCloseModal = () => setModalShow(false);
  const [sectionData, setsectionData] = useState([
    {
      name: "",
      description: "",
    },
  ]);

  const add = () => {
    setsectionData((prev) => [
      ...prev,
      {
        name: "",
        description: "",
      },
    ]);
  };

  const deleteSection = (e, i) => {
    setsectionData(sectionData.filter((item, index) => index !== i));
  };

  const handleInputChange = (e, i) => {
    setsectionData((prev) =>
      prev.map((el, index) => {
        if (index == i) {
          return {
            ...el,
            [e.target.name]: { en: e.target.value, ar: e.target.value },
          };
        } else {
          return el;
        }
      })
    );
  };

  console.log(sectionData);

  const handleFileChange = (e, i) => {
    setsectionData((prev) =>
      prev.map((el, index) => {
        if (index == i) {
          return {
            ...el,
            file: e.target.files[0],
          };
        } else {
          return el;
        }
      })
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    onCloseModal();
    try {
      const { data } = await request({
        url: "/api/dashboard/brands",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // withCredentials: true,
        data: { brands: sectionData },
        // Authorization: `Bearer ${cookies?.user}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!sectionData) {
    return;
  }

  return (
    <div className="edit-section">
      <div>
        <Modal open={modalShow} onClose={onCloseModal} center>
          <form onSubmit={submit}>
            <div>
              {" "}
              <h2>{activeModal}</h2>
            </div>
            {sectionData.map((section, i) => (
              <div className="wrapper" key={i}>
                <h4>
                  {sectionData.length == 1 ? null : (
                    <img
                      style={{ width: "25px", cursor: "pointer" }}
                      src="delete.svg"
                      alt=""
                      onClick={(e) => deleteSection(e, i)}
                    />
                  )}
                  {i + 1} صورة رقم{" "}
                </h4>
                <p>*صورة البنر</p>
                <span>* المقاس المناسب للصورة هو 1108×428 بكسل</span>
                <label htmlFor={`file ${i}`}>
                  {sectionData[i].file ? (
                    <img
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      src={URL.createObjectURL(sectionData[i].file)}
                    />
                  ) : sectionData[i].logo ? (
                    <img
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      src={`https://goservback.alyoumsa.com/public/storage/${sectionData[i].logo}`}
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
                  type="file"
                  required
                  id={`file ${i}`}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, i)}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  required
                  onChange={(e) => handleInputChange(e, i)}
                  value={sectionData[i].name.en}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="description"
                  required
                  onChange={(e) => handleInputChange(e, i)}
                  value={sectionData[i].description.en}
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
        </Modal>
      </div>
    </div>
  );
}

export default AddtSection;
