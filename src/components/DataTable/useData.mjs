import { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";


const url = new URL(window.location.href);
const client = new WebSocket(url.href.replace("http", "ws"));
// const client = new WebSocket('ws://localhost:4500');

client.onopen = ()=>{
  setInterval(()=>{client.send(JSON.stringify(['ping', true]));
  }, 10000);
};


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
      };
    
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
    };

    const saveAll = ()=>{
          const ws = XLSX.utils.json_to_sheet(tableDatas);
          const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
          const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
          const data = new Blob([excelBuffer], { type: "xlsx"});
          const timeElapsed = Date.now();
          const today = new Date(timeElapsed);
          FileSaver.saveAs(data, `datas_${today.toLocaleDateString()}.xlsx`);
    };

    const deleteAll = ()=>{
        sendToBackend(["Delete-All", '']);
    };

    return {
        status,
        tableDatas,
        saveData,
        saveMany,
        deleteData,
        deleteMany,
        isLogin,
        Login,
        saveAll,
        deleteAll };
}

export default useData;
