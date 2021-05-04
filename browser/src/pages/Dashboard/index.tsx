import React from 'react';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div>
      <h1>Seja muito bem vindo {user.name}</h1>
      <button type="button" onClick={() => signOut()}>
        Sair
      </button>
    </div>
  );
};

export default Dashboard;
