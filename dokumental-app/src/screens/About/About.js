import React from "react";
import styled, { css, keyframes } from "styled-components";
import { useTrail, animated } from "react-spring";
import { PageWrapper } from "../SharedStyles";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import BgImage1 from "../../res/images/react.png";
import BgImage2 from "../../res/images/flask.png";
import BgImage3 from "../../res/images/python.png";
import ProfileImg1 from "../../res/images/alfons.PNG";
import { wiggle } from "../../KeyframeAnimations";

const members = [
  {
    fullName: "Alfons Fernaldy",
    position: "Front end Lead",
    profile: ProfileImg1,
    background: BgImage1,
    linkedin: "https://www.linkedin.com/in/alfons-fernaldy/",
    github: "https://github.com/ReduxLX",
  },
  {
    fullName: "Jun Qing Lim",
    position: "Back end Lead",
    profile: ProfileImg1,
    background: BgImage2,
    linkedin: "https://www.linkedin.com/in/itsjunqing/",
    github: "https://github.com/itsjunqing",
  },
  {
    fullName: "Yin Cheng Chang",
    position: "Neural Network Lead",
    profile: ProfileImg1,
    background: BgImage3,
    linkedin: "https://www.linkedin.com/in/yin-cheng-chang-7552881a3/",
    github: "https://github.com/ycha0059",
  },
];

const About = () => {
  const trail = useTrail(members.length, {
    from: { opacity: 0, transform: "scale(0)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 40, friction: 6, clamp: true },
  });
  return (
    <PageWrapper>
      <div>
        <h1>Our Team</h1>
      </div>
      <CardGroup>
        {trail.map((animation, index) => {
          const {
            fullName,
            position,
            profile,
            background,
            linkedin,
            github,
          } = members[index];
          return (
            <Card style={animation} key={index}>
              <PhotoFrame src={profile} />
              <TextGroup>
                <h1>{fullName}</h1>
                <p>{position}</p>
              </TextGroup>
              <SkillLogo src={background} alt="" />
              <ButtonGroup>
                <SocialLink
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialButton color="#2867B2">
                    <FaLinkedinIn style={{ width: "30px", height: "30px" }} />
                  </SocialButton>
                </SocialLink>
                <SocialLink
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialButton color="#2DBA4E">
                    <FaGithub style={{ width: "30px", height: "30px" }} />
                  </SocialButton>
                </SocialLink>
              </ButtonGroup>
            </Card>
          );
        })}
      </CardGroup>
    </PageWrapper>
  );
};

const CardGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 50px 0;
`;

const SkillLogo = styled.img`
  width: 60px;
  height: 60px;
  transition: 0.3s;
`;

const Card = styled(animated.div)`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme: { colors } }) => colors.elevated};
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  padding: 90px 10px 10px;
  margin: 50px 10px;
  width: 250px;
  border-top: ${({ theme: { colors } }) => `2px solid ${colors.dark_main}`};
  & > * {
    margin: 20px 0;
  }
  transition: 0.3s;
  &:hover {
    box-shadow: 13px 13px 4px rgba(0, 0, 0, 0.25);
  }
  &:hover ${SkillLogo} {
    animation: ${wiggle} 1s ease-in-out infinite;
  }
`;

const PhotoFrame = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: white;
`;

const TextGroup = styled.div`
  h1 {
    font-size: 28px;
  }
  p {
    font-size: 18px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 60%;
  & > * {
    margin: 0 10px;
  }
`;

const SocialLink = styled.a`
  display: flex;
  width: 40%;
`;

const SocialButton = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  transition: 0.3s;
  &:hover {
    opacity: 0.5;
  }
`;

export default About;
