
export default function RecipeCreateShow({dietsAll,onChange,onSubmit,onClickAdd,onClickQuit}) {

    return(
        <div>
            Formulario de Creacion de Receta 
            <form id="formCreate"onSubmit={(e)=>{onSubmit(e)}}>
            <div>
            Titulo:
                <input name="title" id="title" type="text"  onChange={(e)=>onChange(e)} />
            </div>
            <div>
            Descripcion:
                <input id="summary" name="summary" type="text" onChange={(e)=>onChange(e)} />
            </div>
            <div>
            Nivel Saludable:
                <input id="healtScore" placeholder="80" step="1" min="0" max="100" name="healtScore" type="number" onChange={(e)=>onChange(e)} />
            </div>
            <div>
            URL de imagen:
                <input id="image" name="image" type="text" onChange={(e)=>onChange(e)} />
            </div>
            <div>
                    <p>Dietas:</p>
                    <select id="dietasAll" name="dietasAll"  >
                    {
                        dietsAll.map((element, i) => (
                            <option key={element.id} value={element.name}>{element.name}</option>
                        ))
                    }
                    </select>
            <div>
            <div>

                    <input type="button" value="Agregar" onClick={(e)=>{onClickAdd(e)}}/>
                    <input type="button" value="Quitar" onClick={(e)=>{onClickQuit(e)}}/>
            </div>
            <div>
            <p>Seleccion:</p>
                    <select id="dietasSel" name="dietasSel" multiple="multiple">
                    </select>
            </div>
            </div>
                        
                <input type="submit" value="Crear" />
            </div>
            </form>
        </div>
    )
}