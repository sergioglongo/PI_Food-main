
import './searchbarshow.css'

export default function SearchBarShow({ dietsAll, handledOnClick, onChange, inputsClear }) {
    return (
        <div>
            <div className='input-container'>
                <input type="text" id="buscar" placeholder="Buscar" onChange={(e) => { onChange(e) }} />
            </div>
            <div className='filters-container'>

                <div className='combos'>
                    <span>
                    Dietas:
                    </span>
                    <select name="dietas" id="selDietas" onChange={(e) => handledOnClick(e)}>
                        <option key="0" value="ALL">Todas</option>
                        {
                            dietsAll.map((element, i) => (
                                <option key={element.id} value={element.name}>{element.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='combos'>
                    <span>
                    Ordenar por:
                    </span>
                    <select name="ordenarPor" id="ordenarPor" onChange={(e) => handledOnClick(e)}>
                        <option key="0" value="SIN">Sin ordenar</option>
                        <option key="1" value="TIT">Titulo Receta</option>
                        <option key="2" value="SCO">Nivel saludable</option>
                    </select>
                </div>
                <div className='combos'>
                    <span>
                    Orden:
                    </span>
                    <select name="AscDes" id="AscDes" onChange={(e) => handledOnClick(e)}  >
                        <option key="1" value="1">Ascendente</option>
                        <option key="0" value="0">Descendente</option>
                    </select>
                </div>
                <div className='combos'>
                    <span>
                    Origen:
                    </span>
                    <select name="origen" id="selOrigen" onChange={(e) => handledOnClick(e)}>
                        <option key="0" value="ALL">Ambos</option>
                        <option key="1" value="API">API</option>
                        <option key="2" value="DB">Base Datos</option>
                    </select>
                </div>
                <div className='combos'>
                    <span>.</span>
                    <button name="reset" value="resetear" onClick={() => { inputsClear() }}>Resetear</button>
                </div>
            </div>
        </div>
    )
}