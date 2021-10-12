import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function FormInit() {
	const [nit, setNit] = useState("");

	const verifyNIT = (e) => {
		e.preventDefault();
		axios.get(`${process.env.REACT_APP_SERVER_URL}/nits/${nit}`).then((res) => {
			if (res.status !== 200) {
				Swal.fire({
				  title: "Ooops!",
				  icon: "warning",
				  text: `La identificación de la empresa no esta registrada.`,
				  button: "OK",
				});
			} else {
				if (res.data.response === "Succes") {
					window.location.href = `${process.env.REACT_APP_BASE_URL}/GeneralInfo?nit=${nit}`;
				} else if (res.data.response === "Denied") {
					Swal.fire({
					  title: "Ooops!",
					  icon: "warning",
					  text: `El NIT ingresado tiene acceso denegado`,
					  button: "OK",
					});
				}
			}
		});
	};

	return (
		<form>
			<div className="body-container">
				<label htmlFor="nit" className="form-label">
					Ingrese el NIT de la persona natural o júridica para la que realizará
					el trámite, sin incluir el digito de verificación. Luego seleccione
					<strong> Continuar</strong> para completar tu solicitud.
					<br />
					N.I.T.
				</label>
				<input
					type="text"
					id="nit"
					name="nit"
					value={nit}
					className="inpt form-control"
					onChange={(e) => setNit(e.target.value)}
				/>
				<p className="input-error">El NIT solo puede contener números.</p>
			</div>
			<div className="button-container">
				<button
					type="submit"
					className="btn btn-danger"
					disabled={nit === ""}
					onClick={(e) => verifyNIT(e)}
				>
					{"Continuar >"}
				</button>
			</div>
		</form>
	);
}

export default FormInit;
