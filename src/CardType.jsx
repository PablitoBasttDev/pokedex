import './CardType.css'
import { Types } from './Types.jsx'

export function CardType({cardType, dataCardType, buttonClose}){

    function colorSection(data){
        const color = {backgroundColor: 'var(--'+data.name+')'}
        return color
    }

    function colorHeader(data) {
        const color = data && 'var(--'+data.name+')'
        const styleHeader = 
        data&&
            {backgroundColor: color, filter: 'brightness(1.1)'}
        return styleHeader
    }

    function closeCardType() {
        buttonClose()
    }

    return(
        <>
            {dataCardType && 
                <section 
                    className='card card-type'
                    style={colorSection(dataCardType)}
                >
                    <header 
                        className='header-card header-card-type'
                        style={colorHeader(dataCardType)}
                    >
                        <Types 
                            types={dataCardType.name}
                            cardType={cardType}
                        />
                        <button 
                            className='cerrar-card-type'
                            onClick={closeCardType}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                            </svg>
                        </button>
                    </header>
                    <main className='card-type-content'>
                        <table className='tabla'>
                                <tr>
                                    <td className='datos-categoria'>Recibe daño X2 de:</td>
                                    <td className='datos-tipos'>
                                        <Types 
                                            types={dataCardType.doubleDamageFrom}
                                            cardType={cardType}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='datos-categoria'>Hace daño X2 a:</td>
                                    <td className='datos-tipos'>
                                        <Types 
                                            types={dataCardType.doubleDamageTo}
                                            cardType={cardType}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='datos-categoria'>Recibe daño 1/2 de:</td>
                                    <td className='datos-tipos'>
                                        <Types 
                                            types={dataCardType.halfDamageFrom}
                                            cardType={cardType}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='datos-categoria'>Hace daño 1/2 a:</td>
                                    <td className='datos-tipos'>
                                        <Types 
                                            types={dataCardType.halfDamageTo}
                                            cardType={cardType}    
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='datos-categoria'>No recibe daño de:</td>
                                    <td className='datos-tipos'>
                                        <Types 
                                            types={dataCardType.noDamageFrom}
                                            cardType={cardType}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='datos-categoria'>No hace daño a:</td>
                                    <td className='datos-tipos'>
                                        <Types 
                                            types={dataCardType.noDamageTo}
                                            cardType={cardType}    
                                        />
                                    </td>
                                </tr>
                        </table>
                    </main>
                </section>
            }
        </>
    )
}