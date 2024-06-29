import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const useUploadPhoto = () => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [uploadedImage, setUploadedImage] = useState<string>();

    const upload = async (e: any): Promise<string> => {
        setUploading(true);
        const file = e.target.files[0];
        const name = file.name.split('.')[0];
        const format = file.name.split('.')[1];
        const fileName = `${name}.${format}`;

        const storageRef = ref(storage, `/files/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    setProgress(percent);
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
                        console.log(url);
                        setUploadedImage(url);
                        setUploading(false);
                        onPhotoUploaded(url);
                        resolve(url);
                    });
                }
            );
        })
    };

    const onPhotoUploaded = (url: string) => url;

    return { upload, onPhotoUploaded, progress, uploading, uploadedImage };
};