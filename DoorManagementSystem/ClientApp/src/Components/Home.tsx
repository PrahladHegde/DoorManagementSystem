import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Constants } from '../Constants';


interface IDoor {

    doors: Doors[];
    value: '';
}

export class Doors {
     id?: string;
     label?: string;
     isOpen?: boolean;
     isLocked?: boolean;
     error?: string;
}

export class Home extends React.Component<RouteComponentProps<{}>, IDoor> {
    constructor(props) {
        super(props);
        this.state = { doors: [], value: '' };
        this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
        fetch(`${Constants.doorApi}`)
            .then(response => response.json() as Promise<Doors[]>)
            .then(data => {
                this.setState({ doors: data });
            });
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
        }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        var id: string = "1";
        fetch(`${Constants.doorApi}/` + id + this.state.value, {
                method: 'put'
            }).then(data => {
                this.setState(
                    {
                        doors: this.state.doors.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        event.preventDefault();
    }
    public render() {
        let contents = this.renderDoorsTable(this.state.doors);
        return <div> {contents}
        </div>
    }
    private renderDoorsTable(doors: Doors[]) {
        return <form onSubmit={this.handleSubmit}>
            <table className="table" >
                <thead>
                    <tr>
                        <th>Door Id</th>
                        <th>Door Lable</th>
                        <th>Is Opened</th>
                        <th>Is Locked</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {doors.map(dr =>
                        <tr key={dr.id}>
                            <td>{dr.id}</td>
                            <td contentEditable='true'><input type='text' name='label' contentEditable='true' defaultValue={dr.label} onChange={this.handleChange}></input></td>
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
                            <td><input type="submit" value="Submit" /></td>
                        </tr>)}
                </tbody>

            </table>
        </form>

    }

}