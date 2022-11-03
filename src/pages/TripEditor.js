import { useState } from "react";
import styled from "styled-components";

import * as API from "../api";
import useApi from "../api/useApi";

import Itinerary from "../components/Itinerary";
import Experiences from "../components/Experiences";
import Map from "../components/Map/Test";

const TripEditor = () => {
  const [coords, setCoords] = useState({
    center: { lat: 37.7749, lng: -122.4194 },
    northEast: null,
    southWest: null,
  });

  const [keywords, setKeywords] = useState([]);

  const {
    data: experiences,
    pending,
    error,
  } = useApi(API.getExperiences, [], { coords, keywords });

  const [itinerary, setItinerary] = useState({ name: "", experiences: [] });

  const addExperienceToItinerary = (experience) =>
    setItinerary({
      ...itinerary,
      experiences: [...itinerary.experiences, experience],
    });

  return (
    <Container>
      <Sidebar>
        <Itinerary itinerary={itinerary} setItinerary={setItinerary} />
        <Experiences
          pending={pending}
          experiences={experiences}
          addExperienceToItinerary={addExperienceToItinerary}
          keywords={keywords}
          setKeywords={setKeywords}
        />
      </Sidebar>
      <Main>
        <Map
          pending={pending}
          experiences={experiences}
          coords={coords}
          setCoords={setCoords}
        />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 840px 1fr;
`;

const Sidebar = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 320px 520px;
`;

const Main = styled.div`
  position: relative;
`;

export default TripEditor;
