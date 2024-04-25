export const errorConfigMap = {
  200: {
    header: 'Success!',
    msg: 'Email has been successfully verified.',
    type: 'success'
  },
  403: {
    header: 'Token is expired',
    msg: 'Please click button to re-send token',
    showResendBtn: true,
    type: 'warning'
  },
  422: {
    header: 'Verified',
    msg: 'You have already verified your account.',
    type: 'warning'
  },
  default: {
    header: 'Error',
    msg: 'Oops, something went wrong.'
  }
}
