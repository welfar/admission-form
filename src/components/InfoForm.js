import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { municipalityList } from "../assets/data/MunicipalityList";
import axios from "axios";
import Swal from "sweetalert2";

const getParameterByName = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const fields = {
	dni: false,
	nameCompany: false,
	firstName: false,
	secondName: false,
	firstLastName: false,
	secondLastName: false,
	correo: false,
	way: false,
	num1: false,
	ltr1: false,
	num2: false,
	ltr2: false,
	compl: false,
	municipality: false,
	cellPhone: false,
};

const expressions = {
	dni: /^\d{0,15}$/,
	nameCompany: /^[a-zA-ZÀ-ÿ\s]{0,50}$/,
	firstName: /^[a-zA-ZÀ-ÿ]{0,15}$/,
	secondName: /^[a-zA-ZÀ-ÿ]{0,15}$/,
	firstLastName: /^[a-zA-ZÀ-ÿ]{0,15}$/,
	secondLastName: /^[a-zA-ZÀ-ÿ]{0,15}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	way: /^[a-zA-Z]{0,15}$/,
	num1: /^\d{0,3}$/,
	ltr1: /^[a-zA-Z]{0,2}$/,
	num2: /^\d{0,3}$/,
	ltr2: /^[a-zA-Z]{0,2}$/,
	compl: /^[a-zA-Z0-9\s]{0,10}$/,
	municipality: /^[a-zA-Z]{0,15}$/,
	cellPhone: /^\d{0,10}$/,
};

function InfoForm() {
	const [dataForm, setDataForm] = useState({
		dniType: "",
		dni: "",
		nameCompany: "",
		firstName: "",
		secondName: "",
		firstLastName: "",
		secondLastName: "",
		email: "",
		way: "",
		num1: "",
		ltr1: "",
		num2: "",
		ltr2: "",
		compl: "",
		address: "",
		municipality: "",
		cellPhone: "",
	});

	const sendDataForm = (e) => {
		e.preventDefault();

		const message = document.getElementById("authMessage");
		const mail = document.getElementById("authEmail");
		if (
			dataForm.dni !== "" &&
			fields.email &&
			fields.cellPhone &&
			message.checked &&
			mail.checked
		) {
			document
				.getElementById("successful-message")
				.classList.add("successful-message-active");
			setTimeout(() => {
				document
					.getElementById("successful-message")
					.classList.remove("successful-message-active");
			}, 5000);

      document.querySelectorAll(".form-group-correct").forEach((icono) => {
				icono.classList.remove("form-group-correct");
			});

      axios.put(`${process.env.REACT_APP_SERVER_URL}/nits/${getParameterByName("nit")}`, {
        id: `getParameterByName("nit")`,
        response: "Succes",
        data: dataForm
      }).then(res => {
        Swal.fire({
				  title: "Gracias!",
				  icon: "success",
				  text: `La información se envió correctamente.`,
				  button: "OK",
				}).then(function() {
          window.location.href = `${process.env.REACT_APP_BASE_URL}`;
      });
      }) 

		} else {
      document
					.getElementById("warning-message")
					.classList.add("message-container-active");
			setTimeout(() => {
				document
					.getElementById("warning-message")
					.classList.remove("message-container-active");
			}, 5000);
		}
	};

	const validInput = (event) => {
		if (expressions[event.target.id].test(event.target.value)) {
			document
				.getElementById(`group-${event.target.id}`)
				.classList.remove("form-group-incorrect");
			document
				.getElementById(`group-${event.target.id}`)
				.classList.add("form-group-correct");
			document
				.getElementById(`msg-group-${event.target.id}`)
				.classList.remove("input-error-active");
			setDataForm({ ...dataForm, [event.target.id]: event.target.value });
			fields[event.target.id] = true;
		} else {
			document
				.getElementById(`group-${event.target.id}`)
				.classList.add("form-group-incorrect");
			document
				.getElementById(`group-${event.target.id}`)
				.classList.remove("form-group-correct");
			document
				.getElementById(`msg-group-${event.target.id}`)
				.classList.add("input-error-active");
			fields[event.target.id] = false;
		}
	};

  useEffect(() => {
    if (getParameterByName("nit") !== undefined && getParameterByName("nit") !== "") {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/nits/${getParameterByName("nit")}`).then((res) => {
        setDataForm({ ...dataForm, ...res.data.data })
      })
    } 
  }, [])

	return (
		<form id="form">
			<div className="id-container">
				<div className="dnType">
					<label htmlFor="dniType" className="form-label">
						<strong> Tipo de Identificación: </strong>
					</label>
					<select
						id="dniType"
						name="dniType"
						value={dataForm.dniType}
						className="dnt-container form-select form-select-sm"
						aria-label=".form-select-sm example"
						onChange={(e) =>
							setDataForm({ ...dataForm, [e.target.id]: e.target.value })
						}
					>
						<option selected>Selecciona...</option>
						<option value="NIT">NIT</option>
						<option value="CC">CC</option>
						<option value="CE">CE</option>
						<option value="PP">PP</option>
					</select>
				</div>
				<div className="form-group dni" id="group-dni">
					<label htmlFor="dni" className="form-label">
						<strong> Número de Identificación: * </strong>
					</label>
					<div className="input-group">
						<input
							type="text"
							id="dni"
							name="dni"
							value={dataForm.dni}
							className="dni-container form-control"
							onChange={(e) => validInput(e)}
							required
						/>
					</div>
					<p id="msg-group-dni" className="input-error">
						Este campo solo puede contener números.
					</p>
				</div>
			</div>
			{(dataForm.dniType === "NIT" || dataForm.dniType === "CE") && (
				<div className="form-group" id="group-nameCompany">
					<label htmlFor="nameCompany" className="form-label">
						<strong> Nombre de la empresa: </strong>
					</label>
					<div className="input-group">
						<input
							type="text"
							id="nameCompany"
							name="nameCompany"
							value={dataForm.nameCompany}
							className="company-container form-control"
							onChange={(e) => validInput(e)}
						/>
					</div>
					<p id="msg-group-nameCompany" className="input-error">
						Este campo solo puede contener letras.
					</p>
				</div>
			)}
			{(dataForm.dniType === "CC" || dataForm.dniType === "PP") && (
				<>
					<div className="name-container">
						<div className="form-group frtName-container" id="group-firstName">
							<label htmlFor="firstName" className="form-label">
								<strong> Primer nombre: </strong>
							</label>
							<div className="input-group">
								<input
									type="text"
									id="firstName"
									name="firstName"
									value={dataForm.firstName}
									className="form-control"
									onChange={(e) => validInput(e)}
								/>
							</div>
							<p id="msg-group-firstName" className="input-error">
								Este campo solo puede contener letras.
							</p>
						</div>
						<div className="form-group" id="group-secondName">
							<label htmlFor="secondName" className="form-label">
								<strong> Segundo nombre: </strong>
							</label>
							<div className="input-group">
								<input
									type="text"
									id="secondName"
									name="secondName"
									value={dataForm.secondName}
									className="form-control"
									onChange={(e) => validInput(e)}
								/>
							</div>
							<p id="msg-group-secondName" className="input-error">
								Este campo solo puede contener letras.
							</p>
						</div>
					</div>
					<div className="lastName-container">
						<div
							className="form-group frtLastName-container"
							id="group-firstLastName"
						>
							<label htmlFor="firstLastName" className="form-label">
								<strong> Primer apellido: </strong>
							</label>
							<div className="input-group">
								<input
									type="text"
									id="firstLastName"
									name="firstLastName"
									value={dataForm.firstLastName}
									className="form-control"
									onChange={(e) => validInput(e)}
								/>
							</div>
							<p id="msg-group-firstLastName" className="input-error">
								Este campo solo puede contener letras.
							</p>
						</div>
						<div className="form-group" id="group-secondLastName">
							<label htmlFor="secondLastName" className="form-label">
								<strong> Segundo apellido: </strong>
							</label>
							<div className="input-group">
								<input
									type="text"
									id="secondLastName"
									name="secondLastName"
									value={dataForm.secondLastName}
									className="form-control"
									onChange={(e) => validInput(e)}
								/>
							</div>
							<p id="msg-group-secondLastName" className="input-error">
								Este campo solo puede contener letras.
							</p>
						</div>
					</div>
				</>
			)}
			<div className="form-group" id="group-email">
				<label htmlFor="email" className="form-label">
					<strong> Email: * </strong>
				</label>
				<div className="input-group">
					<input
						type="text"
						id="email"
						name="email"
						placeholder="email@correo.com"
						value={dataForm.email}
						className="email-container form-control"
						onChange={(e) => {
							setDataForm({ ...dataForm, [e.target.id]: e.target.value });
							validInput(e);
						}}
						required
					/>
				</div>
				<p id="msg-group-email" className="input-error">
					El correo solo puede contener letras, numeros, puntos, guiones y guion
					bajo. Ejemplo: email@correo.com.
				</p>
			</div>
			<div className="address-container">
				<div className="form-group" id="group-way">
					<label htmlFor="way" className="form-label">
						<strong> Vía </strong>
					</label>
					<div className="input-group">
						<input
							type="text"
							id="way"
							name="way"
							value={dataForm.way}
							className="form-control"
							onChange={(e) => validInput(e)}
						/>
					</div>
					<p id="msg-group-way" className="input-error">
						Este campo solo puede contener letras.
					</p>
				</div>
				<div className="form-group" id="group-num1">
					<label htmlFor="num1" className="form-label">
						<strong> Nro </strong>
					</label>
					<div className="input-group">
						<input
							type="text"
							id="num1"
							name="num1"
							value={dataForm.num1}
							className="size1 form-control"
							onChange={(e) => validInput(e)}
						/>
					</div>
					<p id="msg-group-num1" className="input-error">
						Este campo solo puede contener números.
					</p>
				</div>
				<div className="form-group" id="group-ltr1">
					<label htmlFor="ltr1" className="form-label">
						<strong> Letra </strong>
					</label>
					<div className="input-group">
						<input
							type="text"
							id="ltr1"
							name="ltr1"
							value={dataForm.ltr1}
							className="size1 form-control"
							onChange={(e) => validInput(e)}
						/>
					</div>
					<p id="msg-group-ltr1" className="input-error">
						Este campo solo puede contener letras.
					</p>
				</div>
				<div className="form-group" id="group-num2">
					<label htmlFor="num2" className="form-label">
						<strong> Nro * </strong>
					</label>
					<div className="input-group">
						<input
							type="text"
							id="num2"
							name="num2"
							value={dataForm.num2}
							className="size1 form-control"
							onChange={(e) => validInput(e)}
						/>
					</div>
					<p id="msg-group-num2" className="input-error">
						Este campo solo puede contener números.
					</p>
				</div>
				<div className="form-group" id="group-ltr2">
					<label htmlFor="ltr2" className="form-label">
						<strong> Letra </strong>
					</label>
					<div className="input-group">
						<input
							type="text"
							id="ltr2"
							name="ltr2"
							value={dataForm.ltr2}
							className="size1 form-control"
							onChange={(e) => validInput(e)}
						/>
					</div>
					<p id="msg-group-ltr2" className="input-error">
						Este campo solo puede contener letras.
					</p>
				</div>
				<div className="form-group" id="group-compl">
					<label htmlFor="compl" className="form-label">
						<strong> Nro y complementos </strong>
					</label>
					<div className="input-group">
						<input
							type="text"
							id="compl"
							name="compl"
							value={dataForm.compl}
							className="size2 form-control"
							onChange={(e) => validInput(e)}
						/>
					</div>
					<p id="msg-group-compl" className="input-error">
						Este campo solo puede contener letras y números.
					</p>
				</div>
			</div>
			<>
				<label htmlFor="address" className="form-label">
					<strong> Dirección </strong>
				</label>
				<input
					type="text"
					id="address"
					name="address"
					value={dataForm.address.concat(
						dataForm.way +
							" " +
							dataForm.num1 +
							" " +
							dataForm.ltr1 +
							" " +
							dataForm.num2 +
							" " +
							dataForm.ltr2 +
							" " +
							dataForm.compl
					)}
					className="form-control"
					onChange={(e) => validInput(e)}
					readOnly
				/>
			</>
			<div className="form-group" id="group-municipality">
				<label htmlFor="municipality" className="form-label">
					<strong> Municipio </strong>
				</label>
				<div className="input-group">
					<input
						type="text"
						id="municipality"
						name="municipality"
						list="municipalityList"
						value={dataForm.municipality}
						className="form-control"
						onChange={(e) => validInput(e)}
					/>
					<datalist id="municipalityList" name="municipalityList">
						{municipalityList.map((city, index) => {
							return <option key={index} value={city} />;
						})}
					</datalist>
				</div>
				<p id="msg-group-municipality" className="input-error">
					Este campo solo puede contener letras.
				</p>
			</div>
			<div className="form-group" id="group-cellPhone">
				<label htmlFor="cellPhone" className="form-label">
					<strong> Celular * </strong>
				</label>
				<div className="input-group">
					<input
						type="text"
						id="cellPhone"
						name="cellPhone"
						value={dataForm.cellPhone}
						className="cell-container form-control"
						onChange={(e) => validInput(e)}
						required
					/>
				</div>
				<p id="msg-group-cellPhone" className="input-error">
					El celular solo puede contener números y un tamaño de 10 dígitos.
				</p>
			</div>
			<div className="check-container">
				<div className="form-check">
					<input
						className="form-check-input"
						type="checkbox"
						id="authMessage"
						name="authMessage"
						required
					/>
					<label className="form-check-label" htmlFor="authMessage">
						Autorizo el envío de mensajes al número de celular. *
					</label>
				</div>
				<div className="form-check">
					<input
						className="form-check-input"
						type="checkbox"
						id="authEmail"
						name="authEmail"
						required
					/>
					<label className="form-check-label" htmlFor="authEmail">
						Autorizo los mensajes que se enviarán a la dirección de correo
						electrónico. *
					</label>
				</div>
			</div>
			<div className="message-container" id="warning-message">
				<p>
					<FontAwesomeIcon icon={faExclamationTriangle} /> <b>Error:</b> Por
					favor rellena el formulario correctamente. Como mínimo debes completar
					los campos con *.
				</p>
			</div>
			<div className="button-container">
				<button
					type="submit"
					className="form-btn btn btn-danger"
					onClick={(e) => sendDataForm(e)}
					disabled={
						dataForm.dni === "" ||
						dataForm.email === "" ||
						dataForm.cellPhone === ""
					}
				>
					{"Continuar >"}
				</button>
				<Link to="/" type="button" className="form-btn btn btn-dark">
					{"< Regresar"}
				</Link>
			</div>
			<p className="successful-message" id="successful-message">
				Formulario enviado exitosamente!
			</p>
		</form>
	);
}

export default InfoForm;
