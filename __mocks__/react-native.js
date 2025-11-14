// Use actual react-native to avoid overriding critical props
const RN = jest.requireActual('react-native');
module.exports = RN;
