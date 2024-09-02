import { IoSend } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { UserContext } from "../UserAuth/UsersAuth";
import { io } from "socket.io-client";
import axios from "axios";

const Dashboard = () => {
  const { user ,logOut} = useContext(UserContext);
  const [receiver, setReceiver] = useState([]);
  const [message, setMessage] = useState([]);
  const [disName, setDisName] = useState(null);
  // const [messageText, setMessageText] = useState("");
  const [alluser, setAllUser] = useState([]);
  const [finialUser, setFinialUser] = useState([]);
  const [reciverId, setReceiverId] = useState(null);
  const [showUser, setShowUser] = useState(null);
  // const [newMessage, setNewMessage] = useState([])
  const socket = useMemo(()=> io("https://chat-application-server-k9hd.onrender.com") ,[])
  const msgText = useRef(null)
  useEffect(()=>{
    socket.on('connect', ()=>{
      socket.emit('user', user.email)
    })

    return ()=>{
      socket.disconnect();
    }
  }, [socket, user])
  useEffect(() => {
    axios.get(`https://chat-application-server-k9hd.onrender.com/getSingaluser/${user?.email}`)
    .then((res)=> setShowUser(res.data))
    .catch((err)=> console.log(err))
    axios
      .get(`https://chat-application-server-k9hd.onrender.com/findReciver/${user?.email}`)
      .then((res) => {
        setReceiver(res.data);
      });
    axios.get(`https://chat-application-server-k9hd.onrender.com/getAllUser/${user?.email}`).then((res) => {
      setAllUser(res.data);
    });
  }, [user]);

  useEffect(()=>{
    const handelmsgRun = (data)=>{
      console.log(data)
      setMessage(prev =>[...prev, data])
    }
    socket.on('addMsg', handelmsgRun)
  }, [socket])
  const handelMessage = (item) => {
    setDisName(item);
    setReceiverId(item?.user?.email)
    axios
      .get(`https://chat-application-server-k9hd.onrender.com/message/${item?.conversionid}`)
      .then((res) => {
        setMessage(res.data);
      });
  };

  const messageSend = () => {
    let textmsg = '';
    if(msgText.current){
       textmsg = msgText.current.value;
    }
    const messageDatas = {
      conversionid: disName.conversionid,
      senderId: user.email,
      reciverE : reciverId,
      message: textmsg,
    };
    socket.emit('message', messageDatas)
    axios.post("https://chat-application-server-k9hd.onrender.com/message", messageDatas).then((res) => {
      console.log(res.data);
      if(msgText.current){
         msgText.current.value = '';
     }
    });
  };
  
  useEffect(() => {

    const filteredUsers = alluser.filter(
      (user) => !receiver.some((single) => single.user.email === user.email)
    );

    setFinialUser(filteredUsers);
  }, [receiver, alluser]);

  const createConversition = (senderId, receverId) => {
    axios
      .post(`https://chat-application-server-k9hd.onrender.com/conversations`, { senderId, receverId })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          axios
            .get(`https://chat-application-server-k9hd.onrender.com/findReciver/${user?.email}`)
            .then((res) => {
              // console.log(res.data)
              setReceiver(res.data);
            });
        }
      });
  };

  console.log(message)
  return (
    <div className="flex flex-col lg:flex-row h-screen font-sans">
      {/* User Chat List */}
      <div className="w-[20%] bg-gray-100 border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <div>
            <h3 className="text-2xl font-bold">{showUser?.name}</h3>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul>
            {receiver?.map((item) => {
              return (
                <li
                  onClick={() => handelMessage(item)}
                  key={item?._id}
                  className="p-4 border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  <div className="font-semibold">{item?.user?.name}</div>
                  <div className="text-sm text-gray-600">
                    {item?.user?.email}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Chat Board */}
      <div className="w-[60%] flex flex-col bg-white">
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {disName?.user?.name || "No Name"}
          </h2>
          <button onClick={()=> logOut()} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
            Logout
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {message.length > 0 ? (
            message.map((msg) => {
              if (user.email === msg.senderId) {
                return (
                  <div key={msg._id} className="mb-4 text-right">
                    <div className="bg-blue-500 text-white p-3 rounded-lg inline-block max-w-xs">
                      {msg.message}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={msg._id} className="mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg inline-block max-w-xs">
                      {msg.message}
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div> No Messaage Is Found </div>
          )}

          {/* Add more chat messages here */}
        </div>
        <div className="p-4 border-t border-gray-300 flex items-center space-x-2">
          <input
            ref={msgText}            
            type="text"
            placeholder="Type a message..."
            className="w-full p-3 border rounded-lg"
          />
          <button
            onClick={messageSend}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 flex items-center space-x-2"
          >
            <span>
              <IoSend />
            </span>
          </button>
          <label
            htmlFor="image-upload"
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 cursor-pointer flex items-center space-x-2"
          >
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
            />
            <span>
              <IoMdAdd />
            </span>
          </label>
        </div>
      </div>
      <div className="w-[20%] p-[10px]">
        <h4 className="p-[10px] text-center text-2xl font-bold">People</h4>
        <div>
          <input
            className="w-full border focus:outline-none p-[10px] mb-[15px]"
            placeholder="Search"
            type="text"
          />
          <button className="w-full py-[12px] border bg-blue-500">
            Search
          </button>
        </div>
        <div>
          <ul>
            {finialUser?.map((item) => {
              return (
                <li
                  onClick={() => createConversition(user?.email, item?.email)}
                  key={item?._id}
                  className="p-4 border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  <div className="font-semibold">{item?.name}</div>
                  <div className="text-sm text-gray-600">{item?.email}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
