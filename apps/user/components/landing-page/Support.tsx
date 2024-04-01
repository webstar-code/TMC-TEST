import React from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

function Support() {
  const COMPANY_LOCATION = { lat: 48.2116824, lng: 17.1508761 };
  return (
    <div className="w-full h-full">
      <div className="container flex flex-col md:flex-row w-full h-full p-6">
        <div className="w-full md:w-1/2 h-full flex flex-col py-6">
          <h1 className="text-4xl font-bold mb-10"></h1>
          <div className="w-full h-full flex flex-col md:hidden mb-10">
            {/* <GoogleMap
                            mapContainerClassName="w-full h-[calc(100vh-10rem)] rounded-2xl max-h-[512px]"
                            zoom={14}
                            center={COMPANY_LOCATION}
                            options={{
                                zoomControl: false,
                                mapTypeControl: false,
                                streetViewControl: false
                            }}
                        >
                            {COMPANY_LOCATION && <MarkerF position={COMPANY_LOCATION} />}
                        </GoogleMap> */}
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-semibold uppercase">sdfasdf</h1>
              <p className="text-sm text-[#6B6B6B]">
                Mudrochova 7480/15, Bratislava, 831 06, Slovakia
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-semibold uppercase">asdfsa</h1>
              <p className="text-sm text-[#6B6B6B]">
                Mon-Fri: 08:30am - 06:00pm
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Saturday: 09:00am - 01:00pm
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-semibold uppercase">asdf</h1>
              <p className="text-sm text-[#6B6B6B]">ahoj@sportqo.com</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-semibold uppercase">asdfsafd</h1>
              {/* <div className="flex flex-row gap-6 text-xs mt-2">
                                <a href={language.code === 'sk' ? INSTA_SK : INSTA} target="_blank" rel="noreferrer">
                                    <Instagram size={16} />
                                </a>
                                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                                    <Linkedin size={16} />
                                </a>
                                <a href={language.code === 'sk' ? FACEBOOK_SK : FACEBOOK} target="_blank" rel="noreferrer">
                                    <Facebook size={16} />
                                </a>
                                <a href={TWITTER} target="_blank" rel="noreferrer">
                                    <Twitter size={16} />
                                </a>
                            </div> */}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full hidden md:flex flex-col p-6">
          {/* <GoogleMap
                        mapContainerClassName="w-full h-[calc(100vh-10rem)] rounded-2xl max-h-[512px]"
                        zoom={14}
                        center={COMPANY_LOCATION}
                        options={{
                            zoomControl: true,
                            mapTypeControl: false,
                            streetViewControl: false
                        }}
                    >
                        {COMPANY_LOCATION && <MarkerF position={COMPANY_LOCATION} />}
                    </GoogleMap> */}
        </div>
      </div>
    </div>
  );
}

export default Support;
