import { useForm } from "react-hook-form";
import { useEffect } from "react";

const PREGUNTAS = {
	persuasiva: {
		label: "[¿Pregunta persuasiva?]",
		opciones: [
			{ value: "opcion-1", label: "Opción 1" },
			{ value: "opcion-2", label: "Opción 2" },
			{ value: "opcion-3", label: "Opción 3" },
			{ value: "opcion-4", label: "Opción 4" },
		],
	},
	interes: {
		label: "[¿Pregunta de interés?]",
		opciones: [
			{ value: "sin-interes", label: "[Sin interés]" },
			{ value: "interes-bajo", label: "[Interés bajo]" },
			{ value: "interes-intermedio", label: "[Interés intermedio]" },
			{ value: "interes-alto", label: "[Interés alto]" },
		],
	},
	presupuesto: {
		label: "[¿Pregunta de presupuesto?]",
		opciones: [
			{ value: "sin-presupuesto", label: "[Sin presupuesto]" },
			{ value: "presupuesto-bajo", label: "[Presupuesto bajo]" },
			{ value: "presupuesto-intermedio", label: "[Presupuesto intermedio]" },
			{ value: "presupuesto-alto", label: "[Presupuesto alto]" },
		],
	},
	autoridad: {
		label: "[¿Pregunta de autoridad?]",
		opciones: [
			{ value: "sin-autoridad", label: "[Sin autoridad]" },
			{ value: "autoridad-baja", label: "[Autoridad baja]" },
			{ value: "autoridad-intermedia", label: "[Autoridad intermedia]" },
			{ value: "autoridad-alta", label: "[Autoridad alta]" },
		],
	},
	urgencia: {
		label: "[¿Pregunta de urgencia?]",
		opciones: [
			{ value: "sin-urgencia", label: "[Sin urgencia]" },
			{ value: "urgencia-baja", label: "[Urgencia baja]" },
			{ value: "urgencia-intermedia", label: "[Urgencia intermedia]" },
			{ value: "urgencia-alta", label: "[Urgencia alta]" },
		],
	},
};

interface Props {
	defaultEmail: string;
}

export default function CalificationForm({ defaultEmail }: Props) {
	const { register, handleSubmit, formState: { errors }, reset } = useForm({
		defaultValues: { email: defaultEmail },
	});

	// Si defaultEmail cambia, sincronizalo en el formulario
	useEffect(() => reset({ email: defaultEmail }), [defaultEmail, reset]);

	const onSubmit = async (data: any) => {
		console.log("Calificación enviada:", data);


		try {

			// Enviamos los datos al Google Sheets
			const payload = {
				...data,
				etapa: "calification",
			}
			const sendedData = await fetch(`https://hook.us2.make.com/6x87i3dqt339j40cdxttqmmdx2gqnfu7`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([payload]),
			});

			// Enviamos a Meta solo si esta calificado
			if ((data.interes === 'interes-intermedio' || data.interes === 'interes-alto') &&
				(data.presupuesto === 'presupuesto-intermedio' || data.interes === 'presupuesto-alto') &&
				(data.presupuesto === 'autoridad-intermedia' || data.interes === 'autoridad-alta') &&
				(data.presupuesto === 'urgencia-intermedia' || data.interes === 'urgencia-alta')
			) {
				try {
					await fetch("/api/track/lead", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email: data.email }),
					});
				} catch (error) {
					alert("Hubo un problema al enviar los datos a Facebook.");
				}
			}

			console.log("Calificación enviada:", sendedData);

			window.location.href = '/free-guide';

		} catch (e) {
			console.log("Error: ", e)
		}


	};

	const body = document.querySelector('body');
	body?.classList.add('overflow-hidden')

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="border border-white/20 rounded-[20px] py-[55px] px-[65px] bg-[#111] max-w-[500px] max-h-[calc(100vh-80px)] overflow-y-auto">
				<p className="mb-2">¡Último paso!</p>
				<h2 className="mb-4 font-bold text-[24px]">OBTENÉ EL MÉTODO Y [LOGRO]</h2>

				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Email pre-cargado */}
					<label className="text-white block">
						Correo electrónico:
						<input
							type="email"
							{...register("email", { required: "Campo requerido" })}
							className="bg-white py-2 px-4 rounded-lg block w-full mt-2 text-[#111]/80"							
						/>
					</label>

					{/* Radios dinámicos */}
					{Object.entries(PREGUNTAS).map(([key, pregunta]) => {
						return (<div key={key} className="mt-6">
							<p className="text-white font-medium mb-2">{pregunta.label}</p>
							{pregunta.opciones.map((op) => (
								<label key={op.value} className="flex items-center gap-2 mb-1">
									<input
										type="radio"
										value={op.value}
										{...register(key, { required: "Campo requerido" })}
										className="accent-[#3B4FFF]"
									/>
									<span className="text-white text-[15px]">{op.label}</span>
								</label>
							))}
							{errors[key] && (
								<span className="text-red-500 text-sm">
									{(errors as any)[key].message}
								</span>
							)}
						</div>)
					})}

					<button type="submit" className="mt-8 cf-btn">CTA</button>
					<p className="text-white/80 mt-4">PD: Manejar objeción principal</p>
				</form>
			</div>
		</div>
	);
}
