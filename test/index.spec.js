const { transformSync } = require("@babel/core")
const devLog = require("../index")

describe('dev-log', () => {
  test('should be use default identifier "__DEBUG__"', () => {
    const rawCode = `if (__DEBUG__) { console.log(1) }`

    const { code } = transformSync(rawCode, {
      plugins: [devLog]
    })

    const expected = `if ("__DEBUG__") {
  console.log(1);
}`

    expect(code).toBe(expected)
  });

  test('should be pass parameter customIdentifier value', () => {
    const rawCode = `if (__DEV__) { console.log(1) }`

    const { code } = transformSync(rawCode, {
      plugins: [[devLog, { customIdentifier: "__DEV__" }]]
    })

    const expected = `if ("__DEV__") {
  console.log(1);
}`

    expect(code).toBe(expected)
  });
});