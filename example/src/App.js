import React, { useState } from 'react';
import uuidv1 from 'uuid/v1';
import { Calendar } from 'react-day-tripper';

import './styles.css';

const dbEvents = [
  {
    id: uuidv1(),
    start: new Date(2019, 4, 22, 0, 30),
    end: new Date(2019, 4, 22, 2, 45),
    description: 'The Event of the Day'
  }
];

function App() {
  const [events, setEvents] = useState(dbEvents);

  const saveEvent = (eventToSave: any) => {
    setEvents(savedEvents => {
      const modifiedEvent = savedEvents.find(
        event => event.id === eventToSave.id
      );

      /*
        If we have a match, it means we're modifying an existing event, so let's replace it.
        Otherwise, let's save the new one.
      */
      return modifiedEvent
        ? savedEvents.map(event =>
          event.id === modifiedEvent.id ? eventToSave : event
        )
        : savedEvents.concat({ ...eventToSave, id: uuidv1() });
    });
  };

  return (
    <div className='App'>
      <Calendar events={events} saveEvent={saveEvent} />
    </div>
  );
}

export default App;
