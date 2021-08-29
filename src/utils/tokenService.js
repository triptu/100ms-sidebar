
export async function getToken(
  {tokenEndpoint,
  name,
  role,
  roomId}
) {
  if (tokenEndpoint.includes("100ms.live") && !tokenEndpoint.endsWith("api/token")) {
    const endSlash = tokenEndpoint.endsWith("/");
    if (!endSlash) {
      tokenEndpoint += "/";
    }
    tokenEndpoint += "api/token";
  }

  const response = await fetch(`${tokenEndpoint}`, {
    method: "POST",
    body: JSON.stringify({
      role,
      room_id: roomId,
      user_id: name,
    }),
  });

  const { token } = await response.json();

  return token;
}