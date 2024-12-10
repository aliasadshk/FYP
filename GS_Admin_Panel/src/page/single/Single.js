import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './single.scss'
import Charts from '../../components/charts/Charts'
import List from '../../components/table/Table'
const Single = () => {
    return (
        <div className='single'>
            <Sidebar />
            <div className='singleContainer'>
                <Navbar />
                <div className='top'>
                    <div className='left'>
                        <div className='editButton'>Edit</div>
                        <h1 className='title'>Information</h1>
                        <div className='item'>
                            <img
                                src="https://res.cloudinary.com/v3solution/image/upload/v1639459008/mubeen_typography_sqbauo.png"
                                alt=''
                                className='itemImg'
                            />
                            <div className="details">
                                <h2 className="itemTitle">Muhammad Mubeen Yasin</h2>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">muhammadmubeenyasin@gmail.com</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">+92 343 2275634</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">
                                        Faisalabad, Punjab, Pakistan
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">Pakistan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right'>
                        <Charts aspect={3 / 1} title="User Spending ( Last 7 Months)" />
                    </div>
                </div>
                <div className='bottom'>
                    <h1 className="title">Last Transactions</h1>
                    <List />
                </div>
            </div>
        </div>
    )
}

export default Single