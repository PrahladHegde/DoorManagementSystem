
import { Constants } from '../Constants';
import { Doors } from '../Components/Home';
import React, { Component } from 'react';
import { Col, Modal, Row, Form, Button } from 'react-bootstrap';

export class AddDoor extends React.Component<any, any> {
    constructor(props) {
        super(props);

            this.handleSave = this.handleSave.bind(this);
            this.handleCancel = this.handleCancel.bind(this);
        }

    handleSave(event) {

        fetch('https://localhost:44365/api/Door', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: event.target.id.value,
                Label: event.target.doorName.value,
                IsOpen: false,
                IsLocked: true
            })

        }).then(res => res.json())
            .then((responseJson) => {
                this.props.history.push("/Configuration");
            })
        event.preventdefault();
    }

    private handleCancel(e) {
            e.preventDefault();
    }


    render() {
            return (
                <div className="container">
               
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSave}>
                                    <Form.Group controlId="id">
                                        <Form.Label>EmployeeName</Form.Label>
                                        <Form.Control type="text" name="id" required
                                            placeholder="Door Id" />
                                    </Form.Group>
                                    <Form.Group controlId="DoorName">
                                        <Form.Label>EmployeeName</Form.Label>
                                        <Form.Control type="text" name="doorName" required
                                            placeholder="Door Name" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Door
                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                </div>
                )
        }
    }
