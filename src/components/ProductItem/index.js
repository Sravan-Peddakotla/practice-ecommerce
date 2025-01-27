import { Component } from "react";
import './index.css'

class ProductItem extends Component {
    render() {
        const { item } = this.props
        const { title, image, category, id } = item
        return (
            <div className="product">
                <li key={id}>
                <div className="product-height">
                <img className='imgage' src={image} alt={title} />
                    <p>{title}</p>
                    <p>{category}</p>
                </div>
                </li>
            </div>
        )
    }
}

export default ProductItem