import { logoutUrl, axios } from "../api/fetchLinks";
import { useNavigate } from "react-router-dom";
import {
  GetToken,
  GetProfile,
  GetGroupChat,
  GetLogout,
} from "../Context/userProvider";

function Logout({ currModal, modalState }) {
  const Navigate = useNavigate();
  const [logout, setLogout] = GetLogout();
  const [modal, setModal] = modalState;

  const handleExitModal = () => {
    currModal.modalLogout = false;
    setModal(currModal);
  };
  const handleLogout = async () => {
    const { data } = await axios.post(logoutUrl);
    if (data) {
      setLogout(true);
      handleExitModal();
      Navigate("/");
    }
  };
  return (
    <main className="modal-bg " onClick={() => handleExitModal()}>
      <div className="modal-box vertical">
        <div className="modal-box-title ">
          <div>Exit Confirmation</div>
        </div>
        <div className="modal-box-content">
          Do you want to logout from this account?
        </div>
        <div className="button-container">
          <button onClick={() => handleExitModal()}>Cancel</button>
          <button className="logout" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

export default Logout;
