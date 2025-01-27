import { Component } from "react";
import ProductItem from '../ProductItem'
import './index.css'

class Products extends Component {

    state = { productsList: [], isLoading: false, selectedCategory: 'ALL' }

    componentDidMount() {
        this.callProductsApi()
    }

    callProductsApi = async () => {
        this.setState({ isLoading: true })
        const productsUrl = 'https://fakestoreapi.com/products';
        const response = await fetch(productsUrl);
        const data = await response.json()
        this.setState({ productsList: data, isLoading: false })
    }

    onChangeSelectCateogy = (event) => {
        this.setState({selectedCategory:event.target.value})
    }

    render() {
        const { productsList, isLoading, selectedCategory } = this.state;
        const filteredProducts = selectedCategory !== 'ALL' ?
         productsList.filter((item) => item.category === selectedCategory)  : productsList
         console.log(filteredProducts, 'filteredProducts')
        return (
            <div>
                <div>
                    <hr />
                    <p>{filteredProducts.length} items</p>
                    <hr />
                </div>
                {isLoading === true ? <p className="loading" >Loading...</p> :
                    <div className="productscomp">
                        <div className="filtercomp">
                            <select id="selectedOption" value={selectedCategory} onChange={this.onChangeSelectCateogy} >
                                <option value="ALL">All</option>
                                <option value="men's clothing">Men's Clothing</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="electronics">electronics</option>
                                <option value="women's clothing">Women's Clothing</option>
                            </select>
                        </div>
                        <div className="productcomp" >
                        <ul>
                            {filteredProducts.map((item) =>
                                <ProductItem item={item} key={item.id} />
                            )}
                        </ul>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default Products