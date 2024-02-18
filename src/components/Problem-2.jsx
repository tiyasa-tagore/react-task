import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProblemSolution = () => {
  const [isModalOpen, setIsModalOpen] = useState({ a: false, b: false });
  const [contacts, setContacts] = useState([]);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initially fetch all contacts
    fetchContacts();
  }, []);

  const fetchContacts = async (isUS = false) => {
    // Define the API endpoint for US contacts if it's different
    const url = isUS ? 'https://contact.mediusware.com/api/us-contacts/' : 'https://contact.mediusware.com/api/contacts/';
    try {
      const response = await axios.get(url);
      // Assuming the API response has a 'results' field containing an array of contacts
      setContacts(response.data.results || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    setOnlyEven(e.target.checked);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleModal = (modal) => {
    // Fetch US contacts when opening Modal B
    if (modal === 'b' && !isModalOpen[modal]) {
      fetchContacts(true);
    }

    // Update modal state and URL
    setIsModalOpen(current => {
      const newIsModalOpen = { ...current, [modal]: !current[modal] };
      window.history.pushState({}, '', newIsModalOpen[modal] ? `/${modal}` : '/');
      return newIsModalOpen;
    });
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      const contactName = contact.name || '';
      return (!onlyEven || contact.id % 2 === 0) && contactName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
    },
  };

  const buttonStyleA = {
    backgroundColor: '#46139f',
    color: 'white',
  };

  const buttonStyleB = {
    backgroundColor: '#f7f7f0',
    color: '#46139f',
  };

  return (
    <div className="container">
      <button style={buttonStyleA} onClick={() => toggleModal('a')}>All Contact</button>
      <button style={buttonStyleB} onClick={() => toggleModal('b')}>US Contact</button>

      <Modal isOpen={isModalOpen.a} onRequestClose={() => toggleModal('a')} style={modalStyle}>
        <h2>All Contacts</h2>
        <button style={buttonStyleB} onClick={() => { toggleModal('b'); toggleModal('a'); }}>US Contacts</button>
        <button style={buttonStyleB} onClick={() => toggleModal('a')}>Close</button>
        <input type="checkbox" checked={onlyEven} onChange={handleCheckboxChange} /> Only even
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
        <ul>
          {getFilteredContacts().map(contact => (
            <li key={contact.id}>{contact.name} - {contact.phone}</li>
          ))}
        </ul>
      </Modal>

      <Modal isOpen={isModalOpen.b} onRequestClose={() => toggleModal('b')} style={modalStyle}>
        <h2>US Contacts</h2>
        <button style={buttonStyleA} onClick={() => { toggleModal('a'); toggleModal('b'); }}>All Contacts</button>
        <button style={buttonStyleB} onClick={() => toggleModal('b')}>Close</button>
        <ul>
          {getFilteredContacts().map(contact => (
            <li key={contact.id}>{contact.name} - {contact.phone}</li>
          ))}
        </ul>
      </Modal>
      
    </div>
  );
};

export default ProblemSolution;
