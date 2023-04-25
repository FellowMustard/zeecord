import { AiFillSetting } from "react-icons/ai";
import { GetProfile, GetModal } from "../Context/userProvider";
function ProfileUser() {
  const [userProfile, setUserProfile] = GetProfile();
  const [modal, setModal] = GetModal();
  const currModal = { ...modal };

  return (
    <div className="profile-user-container">
      <div className="profile-user">
        {userProfile?.pic == "" ? (
          <div className="profile-pic-img" />
        ) : (
          <img src={userProfile?.pic ?? ""} className="profile-pic-img" />
        )}
        <div className="identity">
          <span className="name">{userProfile?.username ?? "User"}</span>
          <span>#{userProfile?.code ?? "000"}</span>
        </div>
      </div>
      <AiFillSetting className="profile-user-settings" />
    </div>
  );
}

export default ProfileUser;
