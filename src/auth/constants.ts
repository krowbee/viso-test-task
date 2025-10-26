export const accessTokenOptions = {
  secret: process.env.ACCESS_SECRET,
  expiresIn: '5m' as const,
};
export const refreshTokenOptions = {
  secret: process.env.REFRESH_SECRET,
  expiresIn: '7d' as const,
};
