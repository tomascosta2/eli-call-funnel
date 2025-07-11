import { useForm } from "react-hook-form";

interface OptInData {
  nombre: string;
  email: string;
}
interface Props {
  onSuccess: (data: OptInData) => void;   // ← pasamos el payload
}

export default function OptInForm({ onSuccess }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<OptInData>();

  const onSubmit = async (data: OptInData) => {

    try {
      const payload = {
        ...data,
        etapa: "opt-in",
      }
      const sendedData = await fetch(`https://hook.us2.make.com/6x87i3dqt339j40cdxttqmmdx2gqnfu7`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([payload]),
      });

      console.log("Opt-in enviado:", payload);
      onSuccess(data);
    } catch(e) {
      console.log("Error: ", e)
    }
  };

  return (
    <div className="border border-white/20 rounded-[20px] py-[55px] px-8 md:px-[65px]">
      <h2 className="mb-4 font-bold text-[24px] leading-[110%]">
        OBTENÉ EL MÉTODO Y [LOGRO]
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre */}
        <label className="text-white block">
          Nombre:
          <input
            {...register("nombre", { required: "Campo requerido" })}
            placeholder="Tu nombre"
            type="text"
            className="bg-white py-2 px-4 rounded-lg block w-full mt-2 text-[#111]/80"
          />
          {errors.nombre && (
            <span className="text-red-500 text-sm">{errors.nombre.message}</span>
          )}
        </label>

        {/* Email */}
        <label className="text-white mt-4 block">
          Correo electrónico:
          <input
            {...register("email", {
              required: "Campo requerido",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Email inválido" },
            })}
            placeholder="Tu correo electrónico"
            type="email"
            className="bg-white py-2 px-4 rounded-lg block w-full mt-2 text-[#111]/80"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </label>

        <button type="submit" className="mt-8 cf-btn">CTA</button>
        <p className="text-white/80 mt-4">PD: Manejar objeción principal</p>
      </form>
    </div>
  );
}
