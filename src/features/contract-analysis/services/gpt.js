export const requestOpenAI = async (instructions, sendData) => {
  try {
    const response = await fetch(import.meta.env.VITE_OPEN_AI_ADDR, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'user', content: instructions },
          { role: 'user', content: JSON.stringify(sendData) },
        ],
        temperature: 0.2,
        max_tokens: 10000,
      }),
    })

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error.message)
    }

    if (!data.choices || !data.choices.length) {
      throw new Error('No choices returned from API')
    }

    const raw = data.choices[0].message.content
    const parsed = JSON.parse(raw)
    return parsed
  } catch (error) {
    console.error(error)
    return null
  }
}
