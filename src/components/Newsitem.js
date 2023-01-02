import React, { Component } from 'react'

export class Newsitem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl,author,date,source} = this.props
        return (
            <div className='my-3'>
                <div className="card ">
                <span className="position-absolute top-0 start-100 badge bg-warning text-dark">{source}</span>
                    <img src={!imageUrl ? "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image@2x.png" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h6 className="card-title">{title}</h6>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
