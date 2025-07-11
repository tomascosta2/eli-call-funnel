import { useState } from "react";
import OptInForm from "./optInForm";
import CalificationForm from "./calificationForm";

export default function FormWrapper() {
  const [showCalification, setShowCalification] = useState(false);
  const [optData, setOptData] = useState<{ nombre: string; email: string } | null>(null);

  return (
    <>
      {(!showCalification) && (
        <OptInForm
          onSuccess={(data) => {
            setOptData(data);
            setShowCalification(true);
          }}
        />
      )}

      {showCalification && optData && (
        <CalificationForm
				  defaultEmail={optData.email} />
      )}
    </>
  );
}
