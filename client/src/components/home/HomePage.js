import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 10px;
`;

const SubTitle = styled.h2`
  font-size: 1.25rem;
  color: #495057;
  margin-bottom: 20px;
  text-align: center;
`;

const Card = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  overflow: hidden; /* Ensures the header and body align perfectly */
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const CardHeader = styled.h5`
  font-size: 1.25rem;
  margin: 0; /* Removes default margin */
  color: #fff;
  background: #007bff;
  padding: 10px;
`;

const CardBody = styled.div`
  padding: 15px; /* Adds padding for the body content */
  color: #495057;

  h6 {
    font-size: 1.15rem;
    margin-bottom: 8px;
    color: #007bff;
  }

  p {
    font-size: 1rem;
    color: #6c757d;
  }
`;

export default function HomePage() {
    const cardData = [
        {
            header: "Manage Your Pets",
            title: "Organize Your Pet Profiles",
            text: "Add, edit, and track pet details effortlessly. Access all your pet data in one place on the 'Pets' page.",
        },
        {
            header: "Plan Your Day",
            title: "Effortless Scheduling",
            text: "Schedule appointments, track progress, and manage your day. Use the 'Today' page to stay on top of tasks and create invoices on completion.",
        },
        {
            header: "Streamline Finances",
            title: "Your Financial Dashboard",
            text: "Monitor unpaid invoices, log additional incomes, and track yearly earnings with ease on the 'Finance' page.",
        },
    ];

    return (
        <Container>
            <Title>Pocket Walks</Title>
            <SubTitle>
                A free and powerful tool for independent dog walkers to simplify pet care services.
            </SubTitle>
            {cardData.map((card, index) => (
                <Card key={index}>
                    <CardHeader>{card.header}</CardHeader>
                    <CardBody>
                        <h6>{card.title}</h6>
                        <p>{card.text}</p>
                    </CardBody>
                </Card>
            ))}
        </Container>
    );
}