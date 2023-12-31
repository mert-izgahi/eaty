import React from "react";
import { useAppSelector } from "../redux/store";

import { Container } from "@mantine/core";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Container size="xl">
      {user && (
        <div>
          <h1>Profile</h1>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
      )}
    </Container>
  );
};

export default ProfilePage;
