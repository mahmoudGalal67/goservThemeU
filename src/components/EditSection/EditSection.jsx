import { useEffect, useRef, useState } from "react";
import { Modal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";
import "./EditSection.css";
import { request } from "../utils/Request";

function EditSection({ setModalShow, modalShow, activeModal }) {
  const [loading, setloading] = useState(false);
  const onCloseModal = () => setModalShow(false);
  const [sectionData, setsectionData] = useState(null);

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

  useEffect(() => {
    const getAllBrands = async () => {
      try {
        const { data } = await request({
          url: `/api/dashboard/get-banner/${activeModal.id}`,
        });
        setsectionData(data.data.items);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAllBrands();
  }, [activeModal]);

  const handleInputChange = (e, i) => {
    setsectionData((prev) =>
      prev.map((el, index) => {
        if (index == i) {
          return {
            ...el,
            [e.target.name]: e.target.value,
          };
        } else {
          return el;
        }
      })
    );
  };

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
    const newData = sectionData.map((item) => {
      if (item.file) {
        return { ...item, logo: item.file };
      } else {
        return item;
      }
    });
    try {
      setloading(true);
      const { data } = await request({
        url: "/api/dashboard/update-banner",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // withCredentials: true,
        data: {
          brands: {
            ...newData,
            banner_id: activeModal.id,
            name: activeModal.title,
          },
        },
        // Authorization: `Bearer ${cookies?.user}`,
      });
      setloading(false);

      onCloseModal();
    } catch (err) {
      setloading(false);
      console.log(err);
    }
  };
  console.log(sectionData);
  if (!sectionData || !activeModal) {
    return;
  }
  // return;

  return (
    <div className="edit-section">
      <div>
        <Modal open={modalShow} onClose={onCloseModal} center>
          <form onSubmit={submit}>
            <div>
              {" "}
              <h2>{activeModal?.title}</h2>
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
                  {section.file ? (
                    <img
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      src={URL.createObjectURL(section.file)}
                    />
                  ) : section.photo ? (
                    <img
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                      }}
                      src={`https://goservback.alyoumsa.com/public/storage/${section.photo}`}
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
                  value={section.title}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="description"
                  required
                  onChange={(e) => handleInputChange(e, i)}
                  value={section.description}
                />
              </div>
            ))}
            <button className="add" onClick={add}>
              اضافة +
            </button>
            <button className="submit" type="submit" disabled={loading}>
              {loading ? "loading ..." : "حفظ التغيرات"}
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default EditSection;
