const UPLOAD_FOLDER_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_API_URL}/uploads/`
    : "http://localhost:5000/uploads/";

const stables = { UPLOAD_FOLDER_BASE_URL };

export default stables;
