
export const kdTrans = (kd) => {
  switch (true) {
    case (Number(kd) < 16):
      return `低檔鈍化`
    case (Number(kd) < 31):
      return `區間盤整`
    case (Number(kd) < 46):
      return `買盤進駐`
    case (Number(kd) < 61):
      return `起漲中`
    case (Number(kd) < 80):
      return `漲幅滿足`
    default:
      return `高檔鈍化`
  }
}
