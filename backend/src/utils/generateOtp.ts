import otpGenerator from 'otp-generator';

export const generateOTP = (): string => {
  return otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
}
export default generateOTP;