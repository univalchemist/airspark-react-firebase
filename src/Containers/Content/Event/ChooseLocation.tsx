import { makeStyles } from "@material-ui/styles";
import { DistanceMatrixService } from "@react-google-maps/api";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import Geosuggest from "react-geosuggest";

const useStyles = makeStyles((theme) => ({
  placeholderInput: {
    border: "1px solid rgb(0,0,0,.12)",
    padding: 10,
    outlineColor: "#f8a8c9",
    backgroundColor: "#fdfdfd",
    borderRadius: 3,
  },
  suggests: {
    backgroundColor: "white",
    zIndex: 1001,
    listStyleType: "none",
    width: "100%",
    padding: 0,
    margin: 0,
    maxHeight: 200,
    overflow: "auto",
  },
  suggestItem: {
    padding: 10,
    borderBottom: "1px solid rgb(0,0,0,0.12)",
    width: "100%",
    overflowWrap: "anywhere",
    whiteSpace: "pre-line",
  },
}));

interface IProps {
  setTravelDetails: (arg0: any) => void;
  address: string;
  city: string;
}

interface IAddress {
  address: string;
  url?: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ address, city, setTravelDetails }: IProps) => {
  const classes = useStyles();
  const ref = useRef<Geosuggest>();
  const [selectedAddress, setSelectedAddress] = useState<IAddress>({
    address,
    url: undefined,
  });

  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    if (address) {
      (ref.current as any)?.update(address);
    } else {
      (ref.current as any)?.update("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const onFinal = (props: any) => {
    setSelectedAddress({
      address: props?.gmaps?.formatted_address,
      url: props?.gmaps?.url,
    });
    return (ref.current as any).blur();
  };
  return (
    <>
      {selectedAddress && (
        <DistanceMatrixService
          options={{
            destinations: [selectedAddress.address],
            origins: [`${city}, New Zealand`],
            travelMode: window?.google?.maps?.TravelMode.DRIVING,
          }}
          callback={(response) => {
            if (selectedAddress.address === address) {
              return;
            }
            if (response?.rows?.[0]?.elements?.[0]?.status === "OK") {
              // onSelect(selectedAddress, selectedUrl!);
              setTravelDetails({
                ...response?.rows?.[0]?.elements?.[0],
                address: selectedAddress.address,
                locationUrl: selectedAddress.url,
              });
            }
          }}
        />
      )}
      <Geosuggest
        ref={ref as LegacyRef<Geosuggest>}
        placeholder={"Start typing your event address here..."}
        inputClassName={classes.placeholderInput}
        className="geosuggest-custom"
        country="nz"
        value={search}
        onChange={(e: any) => setSearch(e.target ? e.target.value : "")}
        onSuggestSelect={(props: any) => {
          if (props) {
            onFinal(props);
          }
        }}
        style={{
          input: {
            width: "100%",
            fontFamily: ["Montserrat", "sans-serif"].join(","),
          },
        }}
        suggestsClassName={classes.suggests}
        suggestItemClassName={["hoverable", classes.suggestItem].join(" ")}
        maxFixtures={5}
      />
    </>
  );
};
