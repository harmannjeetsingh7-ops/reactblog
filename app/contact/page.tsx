'use client';

import React, { useState } from "react";

export default function Contact() {
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [confirmation, setConfirmation] = useState<string>('');

    // change event handler for textbox
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        // update state var with current value of textbox
        setName(event.target.value);
    }
    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }
    const handleSubmit = () => {
        setConfirmation(`Your name: ${name} - Your message: ${message}`);
    }

    return (
        <main>
            <h1>Contact Us</h1>
            <input type="text" placeholder="Your Name" value={name} onChange={handleChange} />
            <input
                type="text"
                placeholder="Your message"
                value={message}
                onChange={handleMessageChange}
            />
            <button onClick={handleSubmit}> Send Message </button>

            <p>{confirmation}</p>

        </main>
    );
}