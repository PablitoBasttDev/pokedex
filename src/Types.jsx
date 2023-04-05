import './Types.css'

export function Types({types, cardType}){

    const styleColor = (t) =>{
        return 'var(--'+t+')'
    }

    const handleClick = (type) => {
        cardType(type)
        window.scrollTo(0,0)
    }
    
    return(
        <>
            {types && 
                types.map((t,i)=>{
                    return(
                        <h5 
                            key={i}
                            onClick={() => handleClick(t)}
                            className='type' 
                            style={{backgroundColor: styleColor(t)}} 
                        >
                            {t.toUpperCase()}
                        </h5>
                    )
            })}
        </> 
    )
}