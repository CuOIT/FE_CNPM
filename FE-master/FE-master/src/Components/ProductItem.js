import "../Components/Styles/ProductItem.scss";

export default function ProductItem(props){

    return(
        props.product ? (
            <div className = "product-item">
                <img src={props.product.src} alt="product-img" />
                <h3>{props.product.name}</h3>
                <p>{props.product.content}</p>
                <p>{props.product.price}</p>
                <button>Thêm vào giỏ hàng</button>
            </div>
        ) : null
    )
};