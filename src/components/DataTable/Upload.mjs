import { UploadOutlined } from '@ant-design/icons';
import React, {useState, useRef} from 'react';
import { Button, Space, Upload, message } from 'antd';
import * as XLSX from 'xlsx';


const App = ({saveMany}) => {
    const [files, setFiles] = useState([]);
    const [fileLists, setFileLists] = useState([]);
    const [uploading, setUploading] = useState(false);
    const uploadRef = useRef(null);
    
    const saveFile = async () => {
        setUploading(true);
        for(let i = 0; i < files.length; i++){
            await saveMany(files[i]);
            console.log(files[i]);
        }
        setUploading(false);
        setFileLists([]);
        setFiles([]);
        message.success('Upload successfully.');
    }

    const fileRemoved = (e) => {
        message.error(`Delete file ${e.name}`);
        const newFiles = files.filter((item) => item.name !== e.name);
        setFiles(newFiles);
    }

    const readFile = (file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => { // evt = on_file_select event
            /* Parse data */
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type : 'binary'
            });

            var result = {};
            // console.log(workbook);
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                result['name'] = file.name;
                if (roa.length > 0) {
                    result['datas'] = roa;
                }
            });
            const newFiles = [...files, result];
            console.log(newFiles);
            setFiles(newFiles);
            message.success(`Upload file ${workbook.SheetNames[0]}`);
        };
        
        return false;
    }

    const handleChange = (info) => {
        let newFileList = [...info.fileList];
        setFileLists(newFileList);
    };

    return (
        <>
    <Space style={{width: '100%', justifyContent: 'right'}}>
        <Upload
            ref={uploadRef}
            name="file"
            showUploadList={{ showRemoveIcon: true }}
            accept=".xls, .xlsx"
            beforeUpload={file => readFile(file)}
            multiple={false}
            fileList={fileLists}
            onChange={e => handleChange(e)}
            onRemove={e => fileRemoved(e)}
        >
            <Button icon={<UploadOutlined />}>Click to Choose a file</Button>
        </Upload>
    </Space>
    <Space style={{width: '100%', justifyContent: 'right'}}>
        <Button onClick={saveFile}
                disabled={fileLists.length === 0}
                loading={uploading}>{uploading ? 'Uploading' : 'Start Upload'}</Button>
    </Space>
        </>

);
};

export default App;