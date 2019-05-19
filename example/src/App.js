import React, { useState } from 'react';
import uuidv1 from 'uuid/v1';
import { Calendar } from 'react-day-tripper';

import './styles.css';

const dbEvents = [
  {
    id: uuidv1(),
    start: new Date(2019, 4, 17, 0, 30),
    end: new Date(2019, 4, 17, 2, 45),
    description: 'A new event!'
  }
];

function App() {
  const [events, setEvents] = useState(dbEvents);

  const saveEvent = (event: any) => {
    setEvents(events => events.concat({ ...event, id: uuidv1() }));
  };

  const modifyEvent = (event: any) => {
    setEvents(events => events.filter(ev => ev.id !== event.id));
  };

  return (
    <div className='App'>
      <Calendar
        events={events}
        saveEvent={saveEvent}
        modifyEvent={modifyEvent}
      />
    </div>
  );
}

export default App;
