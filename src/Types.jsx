import './Types.css'

export function Types({types}){
    
    const styleColor = (t) =>{
        return 'var(--'+t+')'
    }


    return(
        <>
            {types && types.map(t=>{
                return(
                    <h5 
                        className={'type'} 
                        style={{backgroundColor: styleColor(t)}} 
                    >
                        {t.toUpperCase()}
                    </h5>
                )
            })}
        </> 
    )
}