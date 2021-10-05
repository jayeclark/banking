import '../styles/OptionsNav.css';

function OptionsNav() {
    return (
      <div className="black-ribbon">
        <div className="option-nav-element">
          <div style={{display: "flex", alignItems:"center"}}>
            <div className="left-caret"></div><div><a className="option-link" href="https://jayeclark.github.io">Return to jayeclark.github.io</a></div>
          </div>
        </div>
        <div className="option-nav-element hideable" style={{flexShrink:1, flexGrow: 1, width: '100%', border:'1px solid transparent'}}></div>
        <div className="option-nav-element form-provider-toggle right-justify">
          <div style={{whiteSpace: "nowrap", fontSize: "0.8rem", padding: '5px', fontWeight: 'bold'}}>Form library: </div>
            <select className="form-select">
              <option value="formik">Formik</option>
              <option value="react-hook">React Hook Form</option>
              <option value="react-final">React Final Form</option>
            </select>
        </div>
      </div>
    )
}
export default OptionsNav