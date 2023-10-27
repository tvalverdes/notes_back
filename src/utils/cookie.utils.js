import cookieParser from 'cookie-parser'

export const setCookie = (res, token) => {
  try {
    res.cookie('token', token, {
      expires: new Date(Date.now() + 3600000),
    })
  } catch (err) {
    console.log(err)
  }
}
