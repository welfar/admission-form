import InfoForm from "../components/InfoForm"

import "../styles/GeneralInfo.css"

function GeneralInfo() {
  return (
    <>
      <strong>
        <h3><label className="modal-header">Datos de la persona natural o jurídica que solicita el servicio de trámites virtuales:</label></h3>
      </strong>
      <InfoForm />
    </>
  )
}

export default GeneralInfo