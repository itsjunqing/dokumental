import React, { useState } from "react";
import { useTransition, useSpring, animated, useTrail } from "react-spring";
import { PageWrapper } from "../SharedStyles";

const Details = () => {
  const [on, toggle] = useState(false);

  const springs = useTrail(2, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { duration: 1000 },
  });

  return (
    <div>
      {springs.map((animation, index) => (
        <animated.div style={animation} key={index}>
          Hello World
        </animated.div>
      ))}

      <button onClick={() => toggle(!on)}>Change</button>
    </div>
  );
};

export default Details;
