import { useState, useEffect } from 'react';
import { firestore, projectStorage, timestamp } from '../config/firebase-config';

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url,setUrl] = useState(null);

    useEffect(() => {
        const storageRef = projectStorage.ref(file.name);
        const colelctionRef = firestore.collection('images');
    
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDowloadURL();
            const createdAt = timestamp();
            await colelctionRef.add({ url, createdAt });
            setUrl(url);
        });
    }, [file]);

    return { progress, url, error };
}

export default useStorage;