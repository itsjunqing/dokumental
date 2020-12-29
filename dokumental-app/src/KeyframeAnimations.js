import { keyframes } from "styled-components";

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const wiggle = keyframes`
  0%{ transform: rotate(0) }
  33% { transform: rotate(20deg) }
  66% { transform: rotate(-20deg) }
  100% { transform: rotate(0) }
`;

export const heartbeat = keyframes`
  0%{ transform: scale(1) }
  30%{ transform: scale(0.8) }
  40% { transform: scale(1.2) }
  100% { transform: scale(1) }
`;
