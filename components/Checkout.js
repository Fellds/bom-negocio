function Checkout() {

    return (
        <>
            <a onClick={(e) => {
                e.preventDefault();
                createClassified();
            }} className="button" href="#">
                Pagar
            </a>
        </>
    )
}

export default Checkout