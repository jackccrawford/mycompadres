import fetch from 'node-fetch';

describe('Netlify Contact Function Contract', () => {
  const endpoint = 'http://localhost:9999/.netlify/functions/contact';

  it('should succeed with a valid payload', async () => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'AI Assessment Request',
        message: 'Requesting AI Assessment',
      }),
    });
    expect(res.status).toBeLessThan(300);
  });

  it('should fail with missing name', async () => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        name: '',
        message: 'Requesting AI Assessment',
      }),
    });
    expect(res.status).toBe(400);
  });

  it('should fail with missing email', async () => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: '',
        name: 'AI Assessment Request',
        message: 'Requesting AI Assessment',
      }),
    });
    expect(res.status).toBe(400);
  });

  it('should fail with missing message', async () => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'AI Assessment Request',
        message: '',
      }),
    });
    expect(res.status).toBe(400);
  });
});
