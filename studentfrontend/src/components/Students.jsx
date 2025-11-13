import React, { useEffect, useState } from 'react';
import { Container, Paper, Button, TextField, Box, Typography, Stack } from '@mui/material';

export default function Students() {
  const wrapper = { maxWidth: 720, margin: '18px auto' };
  const panel = { padding: 12 };
  const card = { padding: 12 };

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('/student/getAll')
      .then((r) => r.json())
      .then(setStudents)
      .catch((e) => console.error(e));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { name, address };
    fetch('/student/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })
      .then(() => fetch('/student/getAll'))
      .then((r) => r.json())
      .then(setStudents)
      .catch((e) => console.error(e));
    setName('');
    setAddress('');
  };

  return (
    <Container sx={wrapper}>
      <Typography variant="h5" align="center" sx={{ fontWeight: 700, mt: 3, mb: 2 }}>
        Students
      </Typography>

      <Paper elevation={1} sx={{ ...panel, mb: 2 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField label="Name" size="small" value={name} onChange={(e) => setName(e.target.value)} sx={{ flex: 1 }} />
          <TextField label="Address" size="small" value={address} onChange={(e) => setAddress(e.target.value)} sx={{ flex: 1 }} />
          <Button type="submit" variant="contained" size="small">
            Submit
          </Button>
        </Box>
      </Paper>

      <Stack spacing={1}>
        {students.map((s) => (
          <Paper key={s.id} elevation={1} sx={{ ...card }}>
            <Typography variant="body2" color="text.secondary">Id: {s.id}</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>Name: {s.name}</Typography>
            <Typography variant="body2" color="text.secondary">Address: {s.address}</Typography>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}