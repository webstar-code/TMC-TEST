"use client";
import React from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  IcFacebook,
  IcHomeFilled,
  IcInstagram,
  IcLinkedIn,
  IcX,
} from "assets/icons";
import Image from "next/image";
import { FACEBOOK, INSTA, LINKEDIN, TWITTER } from "utils";

function Support() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_apiKey!,
  });
  const COMPANY_LOCATION = { lat: 43.212594, lng: -80.239171 };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="w-full h-full py-24">
      <div className="container flex flex-col md:flex-row w-full h-full p-6">
        <div className="w-full md:w-1/2 h-full flex flex-col py-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">CONTACT US!</h1>
          <p className="text-sm text-[#868686] mb-10">
            Feel free to reach out to our dedicated team for any inquiries,
            feedback, or assistance. We&apos;re here to help you make the most
            of your TrackMyCare experience.
          </p>
          <div className="w-full h-full flex flex-col md:hidden mb-10">
            <GoogleMap
              mapContainerClassName="w-full h-[calc(100vh-10rem)] rounded-2xl max-h-[512px]"
              zoom={14}
              center={COMPANY_LOCATION}
              options={{
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
              }}>
              {COMPANY_LOCATION && (
                <MarkerF position={COMPANY_LOCATION} icon={IcHomeFilled} />
              )}
            </GoogleMap>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-semibold uppercase">
                CUSTOMER SERVICE/SUPPORT HOURS
              </h1>
              <p className="text-sm text-[#868686]">
                Mon-Fri: 08:30am - 06:00pm{" "}
              </p>
              <p className="text-sm text-[#868686]">
                Saturday: 09:00am - 01:00pm
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-semibold uppercase">PHONE NO.</h1>
              <p className="text-sm text-[#868686]">Canada: XXX-XXX-XXXX </p>
              <p className="text-sm text-[#868686]">USA: XXX-XXX-XXXX</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-semibold uppercase">EMAIL</h1>
              <p className="text-sm text-[#868686]">info@trackmycare.com </p>
              <p className="text-sm text-[#868686]">support@trackmycare.com </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-semibold uppercase">FOLLOW US</h1>
              <div className="flex flex-row gap-6 text-xs mt-2">
                <a href={INSTA} target="_blank" rel="noreferrer">
                  <Image
                    src={IcInstagram}
                    alt="instagram"
                    width={24}
                    height={24}
                  />
                </a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  <Image
                    src={IcLinkedIn}
                    alt="linkedin"
                    width={24}
                    height={24}
                  />
                </a>
                <a href={FACEBOOK} target="_blank" rel="noreferrer">
                  <Image
                    src={IcFacebook}
                    alt="facebook"
                    width={24}
                    height={24}
                  />
                </a>
                <a href={TWITTER} target="_blank" rel="noreferrer">
                  <Image src={IcX} alt="x" width={24} height={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full hidden md:flex flex-col p-6">
          <GoogleMap
            mapContainerClassName="w-full h-[calc(100vh-10rem)] rounded-2xl max-h-[512px]"
            zoom={14}
            center={COMPANY_LOCATION}
            options={{
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
            }}>
            {COMPANY_LOCATION && (
              <MarkerF position={COMPANY_LOCATION} icon={IcHomeFilled} />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

export default Support;
