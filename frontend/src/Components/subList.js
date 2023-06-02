import { useEffect, useRef, useState } from "react";
import { GetGroupChat, GetToken, GetLogout } from "../Context/userProvider";
import ProfileUser from "./profileUser";
import { useNavigate, useParams } from "react-router-dom";
import secureAxios from "../api/secureLinks";
import { fetchGroupDetailUrl } from "../api/fetchLinks";

function SubList() {
  const Navigate = useNavigate();
  const [token, setToken] = GetToken();
  const [logout, setLogout] = GetLogout();
  const { channelName } = useParams();
  const [groupChatList, setGroupChatList] = GetGroupChat();
  const [currGroupDetails, setCurrGroupDetails] = useState();
  const containerRef = useRef(null);

  useEffect(() => {
    if (channelName == "@me") {
      return;
    }
    if (groupChatList) {
      const currentGroup = groupChatList.find(
        (chat) => chat.link === channelName
      );
      setCurrGroupDetails(currentGroup);
      if (!currentGroup) {
        fetchData();
      }
    }
  }, [groupChatList, channelName]);

  const fetchData = async () => {
    await secureAxios(token)
      .get(fetchGroupDetailUrl + "/" + channelName)
      .then((updateResponse) => {
        if (!updateResponse.data.joined) {
          throw new Error();
        }
        setToken(updateResponse.token);
        const groupDataList = [...groupChatList, updateResponse.data.groupChat];
        setGroupChatList(groupDataList);
        Navigate("/channel/" + channelName);
      })
      .catch((error) => {
        if (!error.response) {
          Navigate("/channel/@me");
          return;
        }
        if (error.response.status === 401) {
          setLogout(true);
          const state = { forbidden: true };
          Navigate("/", { state });
        }
        if (error.response.status === 400) {
          Navigate("/channel/@me");
        }
      });
  };

  const handleMemberClick = (event) => {
    const button = event.target;
    const buttonRect = button.getBoundingClientRect();

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    const buttonPosition = buttonRect.top - containerRect.top;
    const containerHeight = containerRect.height;
    const percentagePosition = (buttonPosition / containerHeight) * 100;

    console.log(`Button position: ${percentagePosition}%`);
  };
  return (
    <div className="sublist-container">
      <div className="sublist-head">
        {channelName == "@me" ? (
          <button className="find-conversation">
            Find or start a conversation
          </button>
        ) : (
          <span className="server-name">{currGroupDetails?.chatName}</span>
        )}
      </div>
      <div className="sublist-content" ref={containerRef}>
        {channelName == "@me" ? (
          ""
        ) : (
          <>
            <span className="members-span">
              MEMBERS-{currGroupDetails?.users.length}
            </span>
            <div className="member-list">
              {currGroupDetails?.users.map((member) => {
                return (
                  <button
                    onClick={(e) => handleMemberClick(e)}
                    className="member-button"
                    id={member.user._id}
                    key={member.user._id}
                  >
                    <div className="friend-pic">
                      <img src={member.user.pic}></img>
                    </div>
                    <span>{member.user.username}</span>
                  </button>
                );
              })}
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
              <button
                onClick={(e) => handleMemberClick(e)}
                className="member-button"
              ></button>
            </div>
          </>
        )}
      </div>
      <div className="sublist-footer">
        <ProfileUser />
      </div>
    </div>
  );
}

export default SubList;
