import ProductItem from "../Components/ProductItem";

import "../Layouts/Styles/Product.scss";

export default function Product(props){

    return(
        props.products ? (
            <div className = "product">
                {
                    props.products.map((element, key) => <ProductItem product = {element} key = {key} />)
                }
            </div>
        ) : (<h1>Chưa có sản phẩm nào</h1>)
    )
}