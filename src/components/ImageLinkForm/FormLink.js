import "./imageform.css";

const FormLink = ({ onInputChange , onSubmitClick }) =>{
    return(
        <div>
            <p className="f2 black center underline">
                {'A smart brain website that will detect the faces from an Image. Paste a URL and try for yourself!!'}
            </p>
            <div className='center'>
                <div className='form center pa3 br5 shadow-5'>
                    <input 
                        className='f4 pa2 w-70 center' type={Text} placeholder="Paste URL here!" onChange={onInputChange}/>
                    <button 
                        className='w-30 grow f3 link ph3 pv2 dib white bg-light-purple'
                        onClick={onSubmitClick}>DETECT</button>
                </div>
            </div>
        </div>
        );
}
export default FormLink;