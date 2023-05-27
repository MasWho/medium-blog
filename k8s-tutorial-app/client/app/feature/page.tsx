'use client';

import Button from "../_components/button";

function Feature() {
  const workHandler = async () => {
    try {
      const res = await fetch('/api/job', {
        method: 'POST',
        body: JSON.stringify({
          jobDetails: 'Do some work!'
        })
      });
      
      const {jobId} = await res.json();
      console.log(jobId);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="flex items-center justify-center w-full h-[80vh] text-xl text-center">
      <Button text="Do Some Work!" onClick={workHandler}/>
    </main>
  );
}

export default Feature;