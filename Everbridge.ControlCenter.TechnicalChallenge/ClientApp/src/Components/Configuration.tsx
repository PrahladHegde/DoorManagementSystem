import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Constants } from '../Constants';
import { Link } from 'react-router-dom';


interface IDoor {

    doors: Doors[];
}

export class Doors {
    id: string ="";
    label?: string;
    isOpen?: boolean;
    isLocked?: boolean;
    error?: string;
}

export class Configuration extends React.Component<RouteComponentProps<{}>, IDoor> {
    constructor(props) {
        super(props);
        this.state = { doors: [] };
        fetch(`${Constants.doorApi}`)
            .then(response => response.json() as Promise<Doors[]>)
            .then(data => {
                this.setState({ doors: data });
            });

        this.handleDelete = this.handleDelete.bind(this);
    }


    public render() {
        let contents = this.renderDoorsTable(this.state.doors);
        return <div>
            <h1>Door Data</h1>
            <p>This component demonstrates fetching Door data from the server.</p>
            <p>
                <Link to="/addDoor">Create New</Link>
            </p>
            {contents}
        </div>
    }

    private handleDelete(id: string) {
        if (!window.confirm("Do you want to delete this Door with Id: " + id))
            return;
        else {
            fetch(`${Constants.doorApi}/` + id, {
                method: 'delete'
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
    private renderDoorsTable(doors: Doors[]) {
        return <table className="table" >
            <thead>
                <tr>
                    <th>Door Id</th>
                    <th>Door Lable</th>
                    <th>Is Opened</th>
                    <th>Is Locked</th>
                </tr>
            </thead>
            <tbody>
                {doors.map(dr =>
                    <tr key={dr.id}>
                        <td>{dr.id}</td>
                        <td>{dr.label}</td>
                        <td>
                            {dr.isOpen && <span>
                                Opened
                                    </span>}
                            {!dr.isOpen && <span>
                                Closed
                                    </span>}
                        </td>
                        <td>
                            {dr.isLocked && <span>
                                Locked
                                    </span>}
                            {!dr.isLocked && <span>
                                Locked
                                    </span>}
                        </td>
                        <td>
                            <a className="action" onClick={(id) => this.handleDelete(dr.id)}>Delete</a>
                        </td>

                    </tr>)}
            </tbody>

        </table>;
    }
}

