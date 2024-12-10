import React from 'react'
import './widgets.scss'
const Widgets = ({ type, value }) => {
    console.log("type", value)
    let amount = 28;
    let data;
    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                amount: value,
            };
            break;
        case "order":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "View all Earnings",
                amount: 300,
            };
            break;
        case "earning":
            data = {
                title: "CONFIRM ORDERS",
                isMoney: false,
                link: "View all Confirm Orders",
                amount: value,
            };
            break;
        case "balance":
            data = {
                title: "PENDING ORDERS",
                isMoney: false,
                link: "View all Pending Orders",
                amount: 6,
            };
            break;
        default:
            break;
    }
    return (
        <div className='widget'>
            <div className='left'>
                <span className='title'>{data.title}</span>
                <span className='counter'>{data.isMoney && "$"} {data.amount}</span>
                <span className='link'>{data.link}</span>
            </div>

        </div>
    )

}

export default Widgets