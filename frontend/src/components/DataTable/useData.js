import { useState } from "react";

const client = new WebSocket('ws://localhost:4000');

client.onopen = () => {
  console.log('open connection')
}


const useData = () => {
    const [tableDatas, setTableDatas] = useState([]);
    const [status, setStatus] = useState({});


    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);  

        switch (task) {
          case "init": {
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
        //   case "After-Delete": {
        //     setStatus(payload['status']);
        //     setTableDatas(payload['datas']);
        //     break;
        // }
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
    }

    const deleteData = (data) => {
        sendToBackend(["Delete-Data", data]);
    };

    return {
        status,
        tableDatas,
        saveData,
        saveMany,
        deleteData,
        deleteMany };
}

export default useData;
