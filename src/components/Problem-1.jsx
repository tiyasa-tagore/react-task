import React, { useState } from 'react';

const Problem1 = () => {
    const [show, setShow] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [statusInput, setStatusInput] = useState('');

    const handleClick = (val) => {
        setShow(val);
    };

    const handleNameChange = (e) => {
        setNameInput(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nameInput || !statusInput) {
            alert('Please fill in both name and status');
            return;
        }
        const newTask = { name: nameInput, status: statusInput };
        setTasks([...tasks, newTask]);
        setNameInput('');
        setStatusInput('');
    };

    const getFilteredTasks = () => {
        let filteredTasks = tasks;
        if (show !== 'all') {
            filteredTasks = tasks.filter(task => task.status === show);
        }
        // Sort the tasks based on the status
        return filteredTasks.sort((a, b) => {
            if (a.status === 'Active' && b.status !== 'Active') return -1;
            if (b.status === 'Active' && a.status !== 'Active') return 1;
            if (a.status === 'Completed' && b.status !== 'Completed') return -1;
            if (b.status === 'Completed' && a.status !== 'Completed') return 1;
            return 0;
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={nameInput}
                                onChange={handleNameChange}
                                name="name"
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                value={statusInput}
                                onChange={handleStatusChange}
                                name="status"
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' ? 'active' : ''}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' ? 'active' : ''}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' ? 'active' : ''}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getFilteredTasks().map((task, index) => (
                                <tr key={index}>
                                    <td>{task.name}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
