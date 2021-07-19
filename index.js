import React from "react";
import ReactDOM from "react-dom";

function ContactList(props) {
    return (
        <table>
            <th>Name</th>
            <th>Phone</th>
            {props.contacts.map((item, index) => (
                <Item key={index} name={item.name} phone={item.phone} />
            ))}
        </table>
    );
}

function Item(props) {
    return (
        <tr key={props.id}>
            <td>{props.name}</td>
            <td>{props.phone}</td>
        </tr>
    );
}

const list = [
    { id: 1, name: "Bruce Wayne", phone: "1234567" },
    { id: 2, name: "Anthony Stark", phone: "7654321" }
];

ReactDOM.render(
    <ContactList contacts={list} />,
    document.getElementById("root")
);

