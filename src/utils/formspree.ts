export const submitToFormspree = async (
  endpoint: string,
  data: { email?: string; message: string; noteNumber: number; timestamp: string }
) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit response');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting to Formspree:', error);
    throw error;
  }
};