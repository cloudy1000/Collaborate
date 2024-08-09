import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditDocs({database}) {
    const [documentTitle, setDocumentTitle] = useState('')
    // useParams() returns a json of key-value pairs
    // where the keys correspond to the names of the dynamic parts of the URL (parameters)
    // and the values correspond to the actual values in the current URL
    // we only have a single dynamic part of URL 'id' so only a single key-value pair
    let params = useParams();
    
    // docsDesc is the content of the document (along with title)
    const [docsDesc, setDocsDesc] = useState("");
    
    
    // getQuillData is called before updateDocsData to update docsDesc in firestore
    const getQuillData = (value) => {
        setDocsDesc(value); // `value` is provided by React Quill
    }

    const collectionRef = collection(database, 'docsData');
    
    // useEffect runs whenever state changes (dependency array specify the state docsDesc
    useEffect(() => {
        // time delay (1 second) to call updateDocsData ensures state changes are synched before updating to firebase, ensures getQuillData is called before updateDocsData
        // debouncing using timer (function updateDocsData does not run unless user halts typing for 1 second, timer resets if user continues to type before 1 second is up)
        // debouncing allows document to save automatically to firebase
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id);
            // call updateDoc prebuilt function from firebase to update docsDesc of document with the new value
            updateDoc(document, {
                docsDesc: docsDesc
            }).then(() => {
                toast.success('Document Saved', {
                    autoClose: 2000
                })
            }).catch(() => {
                toast.error('Cannot Save Document', {
                    autoClose: 2000
                })
            })
        }, 1000)

        return () => clearTimeout(updateDocsData)
    }, [docsDesc])
    
    
    
    
    // display data from firestore onto the screen when edit page is first opened
    const getData = () => {
        const document = doc(collectionRef, params.id);
        onSnapshot(document, (doc) => {
            setDocumentTitle(doc.data().title);
            setDocsDesc(doc.data().docsDesc);
        })
    }
    // useRef is undefined since we didn't initialize/pass in a value for useRef
    // useEffect runs once after the initial render if dependency array is empty
    const isMounted = useRef()
    useEffect(() => {
        if (isMounted.current) {
            return
        }
        isMounted.current = true;
        getData()
    }, [])

    return (
        <div className='editDocs-main'>
            <ToastContainer/>
            <h1>{documentTitle}</h1>
            <ReactQuill className='react-quill' value={docsDesc} onChange={getQuillData}/>
        </div>
    )
}

export default EditDocs