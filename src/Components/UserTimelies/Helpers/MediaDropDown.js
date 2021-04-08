import React from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { Grid, Typography } from '@material-ui/core'
import { ImageSearch } from "@material-ui/icons";

const MyUploader = ({ picture, setPicture }) => {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const addIntoState = async (file) => {
        // await toBase64(file)
        setPicture(file)
    }
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
        console.log(status)
        if (status === "done") {
            addIntoState(file)
        }
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    return (
        <Grid container lg="12" xs="12" sm="12" justify="center">
            <Grid item lg="12" xs="12" sm="12">
                <Dropzone
                    inputContent={() =>
                        <div style={{ fontSize: 50 }} >
                            <ImageSearch fontSize='inherit' color='primary' />
                        </div>
                    }
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    // onSubmit={handleSubmit}
                    accept="image/*"
                    maxFiles='1'
                    styles={{ dropzone: { backgroundColor: 'rgba(71,72,110, 0.3)', borderWidth: 2, borderColor: 'rgb(71,72,110)', borderStyle: 'dashed' } }}
                />
            </Grid>
        </Grid>
    )
}

export default MyUploader