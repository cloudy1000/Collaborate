import React, { useEffect, useState, useRef } from 'react';
import BasicModal from './basicModal';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Docs({ database }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  // create a collection docsData
  const collectionRef = collection(database, 'docsData');
  
  const [title, setTitle] = useState('');
  
  const handleClose = () => setOpen(false);
  
  const addData = () => {
    // add a document to the collection
    addDoc(collectionRef, {
        title: title,
        docsDesc: ""
    }).then(() => {
        alert('Data Added')
        handleClose()
    }).catch(() => {
        alert('Cannot add data')
    })
  }

  // docsData is an array of documents (to be displayed on the screen)
  const [docsData, setDocsData] = useState([]);
  const getData = () => {
    // querySnapshot contains all the documents in the collection,
    // has a property docs that is an array of objects representing a single document in the collection
    onSnapshot(collectionRef, (querySnapshot) => {
        // sets docsData to contain an array of documents (all documents of the collection)
        setDocsData(querySnapshot.docs.map((doc) => {
            // each document (doc) has data() function
            return {...doc.data(), id: doc.id}
        }))
    })
  }

  // useRef is undefined since we didn't initialize/pass in a value for useRef
  const isMounted = useRef()
  // isMounted ensures the useEffect only runs once (empty dependency) in development mode so we getData only on the first render
  // useEffect runs once after the initial render if dependency array is empty
  useEffect(() => {
    if (isMounted.current) {
        return
    }
    isMounted.current = true;
    getData()
  }, [])
  
  
  let navigate = useNavigate();
  const getId = (id) => {
    // pass unique id of firebase document in as the url that navigates to its edit docs page
    navigate(`/editDocs/${id}`)
  }

  return (
    <div className='docs-main'>
        <h1>Collaborate</h1>
        <button className='add-docs' onClick={handleOpen}>Add a Document</button>
        <BasicModal open={open} setOpen={setOpen} title={title} setTitle={setTitle} addData={addData}/>
        <div className='grid-main'>
            {/* for each document, display the title */}
            {docsData.map((doc => {
                return (
                    // getId function passes in the unique id of document and navigates to the edit doc page for that document
                    <div className='grid-child' onClick={() => getId(doc.id)}>
                        <p>{doc.title}</p>
                    </div>
                )
            }))}
        </div>
    </div>
  )
}

export default Docs