import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';

    if (currentPassword === storedPassword) {
      if (newPassword === confirmNewPassword) {
        localStorage.setItem('adminPassword', newPassword);
        alert('Passwort erfolgreich geändert!');
      } else {
        alert('Passwörter stimmen nicht überein.');
      }
    } else {
      alert('Aktuelles Passwort ist falsch.');
    }
  };

  return (
    <form onSubmit={handleChangePassword} className="p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Passwort ändern</h2>
      <input
        type="password"
        placeholder="Aktuelles Passwort"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        required
      />
      <input
        type="password"
        placeholder="Neues Passwort"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        required
      />
      <input
        type="password"
        placeholder="Neues Passwort bestätigen"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        required
      />
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
        Passwort ändern
      </button>
    </form>
  );
};

export default ChangePassword;
