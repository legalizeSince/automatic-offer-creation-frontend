"use client";

import { Stack, Tabs } from "@mui/material";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import ChooseCustomerOffer from "./Tabs";
import { toast } from "react-toastify";

enum EnergyTyp {
  GAS = "gas",
  STROM = "electricity",
}

export interface User {
  id?: String;
  name: String;
  email: String;
  info: EnergyTyp;
  isEnabled?: Boolean;
}

export interface Offer {
  postalCode: String;
  cityId: Number;
  cityName: String;
  productCode: String;
  campaignIdentifier: String;
  usage: Number;
  energyType: String;
}

async function newUser() {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Home() {
  const [plz, setPlz] = useState("");
  const [stadt, setStadt] = useState("");
  const [verbrauch, setVerbrauch] = useState("");
  const [kampagne, setKampagne] = useState("");

  const [anrede, setAnrede] = useState("");
  const [kundenName, setKundenName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [gasSelected, setGasSelected] = useState<boolean>(true);
  const [stromSelected, setStromSelected] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState("");

  const saveUser = async (newUser: User) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  const priceLocatorAPI = async () => {
    const newOffer: Offer = {
      campaignIdentifier: kampagne,
      cityId: 2186,
      cityName: stadt,
      energyType: gasSelected ? EnergyTyp.GAS : EnergyTyp.STROM,
      postalCode: plz,
      productCode: "G_OEKO_12",
      usage: Number(verbrauch),
    };
    debugger;
    const res = await fetch("/api/priceLocator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOffer),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  const validateInputs = () => {
    if (stadt === "") {
      setErrorMessage("Bitte Adresse eingeben");
      return false;
    } else if (verbrauch === "") {
      setErrorMessage("Bitte Verbrauch eingeben");
      return false;
    } else if (kampagne === "") {
      setErrorMessage("Bitte Kampagne zuordnen");
      return false;
    } else if (kundenName === "") {
      setErrorMessage("Bitte Kundenname eingeben");
      return false;
    } else if (email === "") {
      setErrorMessage("Bitte Email eingeben");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (errorMessage !== "") {
      toast.error(errorMessage);
      setLoading(false);
      setErrorMessage("");
    }
  }, [errorMessage]);

  const createOffer = async () => {
    setLoading(true);
    const validation = validateInputs();

    if (validation) {
      const newUser: User = {
        name: kundenName,
        email: email,
        info: gasSelected ? EnergyTyp.GAS : EnergyTyp.STROM,
        isEnabled: false,
      };
      const offer = await priceLocatorAPI();

      console.log(offer.clientPriceData);

      const success = await saveUser(newUser);

      console.log(success);
      toast.success(`Angebot an ${email} wurde versandt`);
      setLoading(false);
    }
  };

  return (
    <div className="p-24">
      <ChooseCustomerOffer
        setPlz={setPlz}
        setStadt={setStadt}
        setVerbrauch={setVerbrauch}
        setKampagne={setKampagne}
        setEmail={setEmail}
        setAnrede={setAnrede}
        setKundenName={setKundenName}
        setGasSelected={setGasSelected}
        setStromSelected={setStromSelected}
        gasSelected={gasSelected}
        stromSelected={stromSelected}
        plz={plz}
        stadt={stadt}
        verbrauch={verbrauch}
        kampagne={kampagne}
        kundenName={kundenName}
        email={email}
        loading={loading}
      ></ChooseCustomerOffer>

      <div className="w-full flex justify-center items-center">
        <Button
          color="primary"
          className="w-full"
          onClick={() => createOffer()}
          isLoading={loading}
        >
          Angebot einholen
        </Button>
      </div>
    </div>
  );
}
