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
});