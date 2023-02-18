import React from "react";
import ImageUploading from "react-images-uploading";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";

// import "./profile.css"

const ProductAdminPage = () => {
  const [images, setImages] = React.useState(null);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleFileTransform = (linkLocal, formData) => {
    console.log(formData);
    setImages({ linkLocal, formData });
  };
  const handleUploadData = () => {
    const payload = images.formData;
    fetch("/api/create-new-item", {
      method: "POST",
      body: payload,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Add product</h4>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Name</label>
                <input type="text" className="form-control" defaultValue="" />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter phone number"
                />
              </div>

              <div className="col-md-12">
                <label className="labels">Address </label>
                <input type="text" className="form-control" defaultValue />
              </div>
              <div className="col-md-12">
                <label className="labels">Gender</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12">
                <label className="labels">Birthday</label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={handleUploadData}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductAdminPage;
