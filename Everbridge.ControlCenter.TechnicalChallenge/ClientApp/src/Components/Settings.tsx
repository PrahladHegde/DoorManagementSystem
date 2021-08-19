
import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Constants } from '../Constants';


export class Settings extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = { opendoors: [] , closeddoors:[], lockeddoors: [], unlockeddoors: []}
    }

    getData() {
        fetch(`${Constants.doorApi}/open`)
            .then(response => response.json())
            .then(data => {
                this.setState({ opendoors: data });
            });
        fetch(`${Constants.doorApi}/closed`)
            .then(response => response.json())
            .then(data => {
                this.setState({ closeddoors: data });
            });
        fetch(`${Constants.doorApi}/locked`)
            .then(response => response.json())
            .then(data => {
                this.setState({ lockeddoors: data });
            });
        fetch(`${Constants.doorApi}/unlocked`)
            .then(response => response.json())
            .then(data => {
                this.setState({ unlockeddoors: data });
            });

    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {
        this.getData();
    }

    handleClose(id: string) {
        if (!window.confirm("Do you want to close this Door ?"))
            return;
        else {
            fetch(`${Constants.doorApi}/close/` + id, {
                method: 'put'
            }).then(data => {
                this.setState(
                    {
                        doors: this.state.doors.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }
    handleOpen(id: string) {
        if (!window.confirm("Do you want to open this Door ?"))
            return;
        else {
            fetch(`${Constants.doorApi}/open/` + id, {
                method: 'put'
            }).then(data => {
                this.setState(
                    {
                        doors: this.state.doors.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }
    handleLock(id: string) {
        if (!window.confirm("Do you want to Lock this Door ?"))
            return;
        else {
            fetch(`${Constants.doorApi}/lock/` + id, {
                method: 'put'
            }).then(data => {
                this.setState(
                    {
                        doors: this.state.doors.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }
    handleUnlock(id: string) {
        if (!window.confirm("Do you want to unlock this Door ?"))
            return;
        else {
            fetch(`${Constants.doorApi}/unlock/` + id, {
                method: 'put'
            }).then(data => {
                this.setState(
                    {
                        doors: this.state.doors.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }

    render()
    {
       

    const { opendoors, closeddoors, lockeddoors, unlockeddoors } = this.state;

        return (

            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Door Name</th>
                            <th>select to close</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opendoors.map(dr =>
                            <tr key={dr.id}>
                                <td>{dr.label}</td>
                                <td>
                                    <a className="action" onClick={(id) => this.handleClose(dr.id)}>Close</a>
                                </td>
                            </tr>)}
                    </tbody>

                </Table>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Door Name</th>
                            <th>select to open</th>
                        </tr>
                    </thead>
                    <tbody>
                        {closeddoors.map(dr =>
                            <tr key={dr.id}>
                                <td>{dr.label}</td>
                                <td>
                                    <a className="action" onClick={(id) => this.handleOpen(dr.id)}>Open</a>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Door Name</th>
                            <th>select to Lock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unlockeddoors.map(dr =>
                            <tr key={dr.id}>
                                <td>{dr.label}</td>
                                <td>
                                    <a className="action" onClick={(id) => this.handleLock(dr.id)}>Open</a>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Door Name</th>
                            <th>select to Unlock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lockeddoors.map(dr =>
                            <tr key={dr.id}>
                                <td>{dr.label}</td>
                                <td>
                                    <a className="action" onClick={(id) => this.handleUnlock(dr.id)}>Open</a>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
            )
    }
}