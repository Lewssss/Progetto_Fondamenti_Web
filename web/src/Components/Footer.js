import React from 'react';
import {useState} from 'react';
import {CirclePlus} from 'lucide-react'
import './Footer.css'
import PostCreate from './Post_create'
import Modal from './Modal'
function Footer() {
    const [create, setCreate] = useState(false);
    return (
        <>
            <div className="footer">
                <CirclePlus onClick={() => setCreate(true)}/>
            </div>
            <Modal open={create} onClose={() =>setCreate(false)} content={<PostCreate onClose={() => setCreate(false)}/>}/>
        </>
    )
}
export default Footer;