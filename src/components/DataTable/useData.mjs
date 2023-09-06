import { useState } from "react";

const url = new URL(window.location.href);
const client = new WebSocket(url.href.replace("http", "ws"));
// const client = new WebSocket('ws://localhost:4500');

client.onopen = () => {
  console.log('open connection');
}


const useData = () => {
    const [tableDatas, setTableDatas] = useState([]);
    const [status, setStatus] = useState({});
    const saveLogin = localStorage.getItem("Is-a-Login-User");
    const [isLogin, setIsLogin] = useState(saveLogin || false);


    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);  

        switch (task) {
          case "init-data": {
            setTableDatas(payload);
            break;
        }
          case "After-Operation": {
            setTableDatas(payload);
            break;
        }
          case "Update-Status": {
            setStatus(payload);
            break;
          }
          case "Login":{
            setIsLogin(payload);
            if(payload)
              localStorage.setItem("Is-a-Login-User", true);
            break;
          }
          default: break;
        }
      }
    
    const sendToBackend = (data) => {
        console.log(client.CLOSED)
        client.send(
        JSON.stringify(data));
    };

    const saveMany = (data) => {
        sendToBackend(["Save-Many", data]);
    };

    const saveData = (data) => {
        sendToBackend(["Save-Data", data]);
    };

    const deleteMany = (data) => {
        sendToBackend(["Delete-Many", data]);
    };

    const deleteData = (data) => {
        sendToBackend(["Delete-Data", data]);
    };

    const Login = (data)=>{
        sendToBackend(["Login", data]);
    }

    return {
        status,
        tableDatas,
        saveData,
        saveMany,
        deleteData,
        deleteMany,
        isLogin,
        Login };
}

export default useData;
