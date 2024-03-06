"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Spinner,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { AddressAutofill } from "@mapbox/search-js-react";

const campaignIdentifier = [
  {
    label: "WEBSITEGAS",
    value: "WEBSITEGAS",
  },
  {
    label: "TARIFWECHSELWAERME",
    value: "TARIFWECHSELWAERME",
  },
  {
    label: "4MOTIONS",
    value: "4MOTIONS",
  },
  {
    label: "STROMKREIS",
    value: "STROMKREIS",
  },
];

const anredeUser = [
  {
    label: "Herr",
    value: "Herr",
  },
  {
    label: "Frau",
    value: "Frau",
  },
];

type Props = {
  setPlz: (value: string) => void;
  setStadt: (value: string) => void;
  setVerbrauch: (value: string) => void;
  setKampagne: (value: string) => void;
  setAnrede: (value: string) => void;
  setKundenName: (value: string) => void;
  setEmail: (value: string) => void;
  setGasSelected: (value: boolean) => void;
  setStromSelected: (value: boolean) => void;
  gasSelected: Boolean;
  stromSelected: Boolean;
  plz: String;
  stadt: String;
  verbrauch: String;
  kampagne: String;
  kundenName: String;
  email: String;
  loading: Boolean;
};

export default function ChooseCustomerOffer({
  setPlz,
  setStadt,
  setVerbrauch,
  setKampagne,
  setAnrede,
  setKundenName,
  setEmail,
  setGasSelected,
  setStromSelected,
  gasSelected,
  stromSelected,
  plz,
  stadt,
  verbrauch,
  kampagne,
  kundenName,
  email,
  loading,
}: Props) {
  const handlerEnergyTyp = (energy: String) => {
    if (energy === "gas") {
      setGasSelected(true);
      setStromSelected(false);
    } else {
      setStromSelected(true);
      setGasSelected(false);
    }
  };

  return (
    <div>
      <Tabs aria-label="Auswahl Angebot|Kunde">
        <Tab key="angebot" title="Angebot">
          <Card>
            <CardBody>
              <div className=" flex lg:flex-row flex-col items-center justify-center space-y-4 lg:space-y-0 lg:space-x-3 py-4">
                <form className="flex w-full lg:flex-row flex-col items-center justify-center space-y-4 lg:space-y-0 lg:space-x-3 py-4">
                  <div className="lg:flex-grow lg:w-2/3 w-full">
                    {/* @ts-expect-error Server Component */}
                    <AddressAutofill
                      accessToken={
                        "pk.eyJ1IjoiYmtvdWJpazg4IiwiYSI6ImNsNmczcTZkYjA4eGUzaW52b3owZWM1bzEifQ.71zIyJgMvXMOR2P1ArtB4w"
                      }
                    >
                      <Input
                        name="address"
                        isRequired
                        type="text"
                        label="Adresse"
                        onChange={(e) => setStadt(e.target.value)}
                        value={stadt as string}
                        disabled={loading as boolean}
                        isDisabled={loading as boolean}
                        autoComplete="address-line1"
                      />
                    </AddressAutofill>
                  </div>
                  <Input
                    isReadOnly={true}
                    className="lg:w-1/3"
                    name="postcode"
                    isRequired
                    type="text"
                    label="PLZ"
                    onChange={(e) => setPlz(e.target.value)}
                    value={plz as string}
                    disabled={loading as boolean}
                    isDisabled={true}
                    autoComplete="postal-code"
                  />

                  <Input
                    isRequired
                    type="text"
                    label="Verbrauch"
                    onChange={(e) => setVerbrauch(e.target.value)}
                    value={verbrauch as string}
                    disabled={loading as boolean}
                    isDisabled={loading as boolean}
                  />
                </form>
                <Select
                  items={campaignIdentifier}
                  label="Kampagne"
                  placeholder="Kampagne"
                  className="lg:w-1/2"
                  onChange={(e) => setKampagne(e.target.value)}
                  value={kampagne as string}
                  disabled={loading as boolean}
                  isDisabled={loading as boolean}
                >
                  {(campaignIdentifier) => (
                    <SelectItem key={campaignIdentifier.value}>
                      {campaignIdentifier.label}
                    </SelectItem>
                  )}
                </Select>
                <div className="h-7 w-3 bg-gray-100 hidden lg:block"></div>
                <div className="flex justify-center  flex-row space-x-2 lg:space-x-0">
                  <Checkbox
                    value="gas"
                    size="md"
                    color="primary"
                    onChange={() => handlerEnergyTyp("gas")}
                    isSelected={gasSelected as boolean}
                    disabled={loading as boolean}
                    isDisabled={loading as boolean}
                  >
                    Gas
                  </Checkbox>

                  <Checkbox
                    value="strom"
                    size="md"
                    color="primary"
                    onChange={() => handlerEnergyTyp("strom")}
                    isSelected={stromSelected as boolean}
                    disabled={loading as boolean}
                    isDisabled={loading as boolean}
                  >
                    Strom
                  </Checkbox>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="kunde" title="Kunde">
          <Card>
            <CardBody>
              <div className="w-full flex lg:flex-row flex-col items-center justify-center space-y-4 lg:space-y-0 lg:space-x-3 py-4">
                <Select
                  className="lg:w-1/2"
                  items={anredeUser}
                  label="Anrede"
                  placeholder="Anrede"
                  onChange={(e) => setAnrede(e.target.value)}
                  value={kampagne as string}
                  disabled={loading as boolean}
                  isDisabled={loading as boolean}
                >
                  {(anredeUser) => (
                    <SelectItem key={anredeUser.value}>
                      {anredeUser.label}
                    </SelectItem>
                  )}
                </Select>

                <Input
                  isRequired
                  type="text"
                  label="Name"
                  onChange={(e) => setKundenName(e.target.value)}
                  value={kundenName as string}
                  disabled={loading as boolean}
                  isDisabled={loading as boolean}
                />

                <Input
                  isRequired
                  type="text"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email as string}
                  disabled={loading as boolean}
                  isDisabled={loading as boolean}
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
