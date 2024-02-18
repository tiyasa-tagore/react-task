import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Problem2 = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('https://contact.mediusware.com/api-doc/');
                console.log(response.data); // Log the response to see its structure
                // Assuming response.data contains the schema of the contact object
                const contactSchema = response.data;
                // Create a sample contact object using the schema
                const sampleContact = {
                    id: 1,
                    phone: '1234567890'
                };
                setContacts([sampleContact]); // Setting a sample contact for demonstration
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-lg btn-outline-primary" type="button">All Contacts</button>
                        <button className="btn btn-lg btn-outline-warning" type="button">US Contacts</button>
                    </div>
                )}
                <div>
                    <h5>Contacts:</h5>
                    <ul>
                        {contacts.map(contact => (
                            <li key={contact.id}>ID: {contact.id}, Phone: {contact.phone}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Problem2;
