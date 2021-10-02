function Card({image, header, content, form, className}) {

    return (

        <div className={className ? "card " + className : "card"}>
            {image ?  <img alt="" src={image} width="100%" className="card-img-top" /> : null}
            {header ?  <div className="card-header"><h4>{header}</h4></div> : null}
            <div className="card-body">
                {content ? content : null}
                {form ? form : null}
            </div>
        </div>

    )

}

export default Card;