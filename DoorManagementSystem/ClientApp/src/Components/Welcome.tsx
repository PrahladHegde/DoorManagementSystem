import React, { Component } from 'react';

export class Welcome extends Component {

    render() {
        return (
            <div>
                <h1> Welcome to door Management system </h1>
                <p> A user friendly interface to view, manage and update the doors.</p>
                <li> Home - Display all doors available, door open status, locked status and with option to edit door labels </li>
                <li> Configure - Configuring capabilities like removal or addition of Door</li>
                <li> Settings - Options to update Door open / lock status.</li>

            </div>
        )
    }
}