import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.div`
  background-color: #121315;
  color: #a7a7a7;
  font-size: 16px;
`;

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
`;

const Row = styled.div`
  padding: 1em;
`;

const PrimaryRow = styled(Row)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  align-items: stretch;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2em;
  min-height: 15em;
`;

const Heading = styled.h3`
  text-align: left;
  color: white;
  font-size: 1.4em;
  white-space: nowrap;
`;

const UnorderedList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-top: 0.8em;

  &:first-child {
    margin-top: 0;
  }
`;

const ListLink = styled(Link)`
  color: #a7a7a7;
  text-decoration: none;

  &:hover {
    color: #2a8ded;
  }
`;

const AboutColumn = styled(Column)`
  p {
    text-align: justify;
    line-height: 2;
    margin: 0;
  }
`;

const Input = styled.input`
  font-size: 1em;
  padding: 1em;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const Button = styled.button`
  font-size: 1em;
  padding: 1em;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: #c7940a;
  color: #ffffff;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 2.4em;
  flex-direction: row;
  margin-top: 0.5em;
`;

const SocialIcon = styled.i`
  color: #bac6d9;
`;

const CopyrightRow = styled(Row)`
  padding: 0.3em 0;
  background-color: #25262e;
`;

const FooterMenu = styled.div`
  float: left;
  margin-top: 10px;

  a {
    color: #cfd2d6;
    padding: 6px;
    text-decoration: none;

    &:hover {
      color: #27bcda;
    }
  }
`;

const CopyrightText = styled.p`
  font-size: 0.9em;
  text-align: right;
`;

const Footer = () => {
  return (
    <FooterWrapper className="mt-5 footer">
      <FooterContainer>
        <PrimaryRow>
          <AboutColumn>
            <Heading>First Choice cloud kitchen</Heading>
            <p>
              With a passion for quality ingredients and innovative flavors,
              our team of talented chefs meticulously curates a menu that
              promises to tantalize your taste buds.
            </p>
            <SocialIcons>
              <SocialIcon className="fa-brands fa-facebook-square"></SocialIcon>
              <SocialIcon className="fa-brands fa-instagram-square"></SocialIcon>
              <SocialIcon className="fa-brands fa-twitter-square"></SocialIcon>
              <SocialIcon className="fa-brands fa-youtube-square"></SocialIcon>
              <SocialIcon className="fa-brands fa-whatsapp-square"></SocialIcon>
            </SocialIcons>
          </AboutColumn>
          <Column>
            <Heading>Services</Heading>
            <UnorderedList>
              <ListItem>
                <ListLink to="/">Cloud Kitchen Solutions</ListLink>
              </ListItem>
              <ListItem>
                <ListLink to="/">Online Food Delivery</ListLink>
              </ListItem>
              <ListItem>
                <ListLink to="/">Restaurant Technology</ListLink>
              </ListItem>
              <ListItem>
                <ListLink to="/">Menu Planning and Development</ListLink>
              </ListItem>
            </UnorderedList>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <UnorderedList>
              <ListItem>
                <ListLink to="/">Food Packaging and Delivery Solutions</ListLink>
              </ListItem>
              <ListItem>
                <ListLink to="/">Food Business Management</ListLink>
              </ListItem>
              <ListItem>
                <ListLink to="/">Culinary Consulting Services</ListLink>
              </ListItem>
              <ListItem>
                <a href="#support">Support 24*7</a>
              </ListItem>
            </UnorderedList>
          </Column>
          <Column>
            <Heading>Newsletter</Heading>
            <div>
              <Input type="email" placeholder="Your email id here" />
              <Button>Subscribe</Button>
            </div>
          </Column>
        </PrimaryRow>
        <CopyrightRow>
          <FooterMenu>
            <Link to="/">Home</Link>
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
            <Link to="/">Services</Link>
            <Link to="/">Social</Link>
          </FooterMenu>
          <CopyrightText className='text-center mt-5'>Copyright &copy; 2023 FCC</CopyrightText>
        </CopyrightRow>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
