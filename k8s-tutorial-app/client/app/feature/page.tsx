'use client';

import { useContext } from "react";
import Button from "../_components/button";
import { AuthContext } from "../auth/_context/provider";
import { EventsContext } from "../_events/context";

function Feature() {
  const authCtx = useContext(AuthContext);
  const eventCtx = useContext(EventsContext);

  const workHandler = async () => {
    try {
      eventCtx.setLoading(true);
      await fetch('/api/job', {
        method: 'POST',
        body: JSON.stringify({
          userId: authCtx.userId,
          sessionToken: authCtx.sessionToken
        })
      });
    } catch (err) {
      console.log(err);
    }
  }

  let content: any;
  if(!eventCtx.data) {
    content = <div>No work done yet!</div>;
  } else if(eventCtx.loading) {
    content = <div>Doing work...</div>;
  } else if (eventCtx.data) {
    content = <div className="flex flex-col items-start gap-10">
      <span>{`Work done!`}</span>
      <span>{`Worker ID: ${eventCtx.data.id}`}</span>
      <span>{`Time: ${eventCtx.data.time}s`}</span>
      <span>{`User: ${authCtx.username}`}</span>
    </div>
  }

  return (
    <main className="flex flex-col gap-16 items-center justify-center w-full h-[80vh] text-xl text-center">
      {content}
      <Button text="Do Some Work!" onClick={workHandler}/>
    </main>
  );
}

export default Feature;