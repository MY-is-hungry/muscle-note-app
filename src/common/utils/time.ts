import { TimeFormat } from "@common/types"

export const currentYear = new Date().getFullYear()
export const currentMonth = new Date().getMonth()

export const getSplitTime = (strDate: string, format: TimeFormat): string => {
  const date = new Date(strDate)

  // dateの有無をgetDateがInvalid Dateの場合NaNを返すことを利用し判定
  const isInvalidDate = (date: any) => Number.isNaN(date.getDate())

  if(!isInvalidDate(date)){
    // 日付や時間を0詰めする関数
    const toDoubleDigits = (num: any) => {
      num += ""
      if (num.length === 1) {
        num = "0" + num
      }
    return num
    }

    const year = date.getFullYear()
    const month = toDoubleDigits(date.getMonth() + 1)
    const day = toDoubleDigits(date.getDate())
    const hour = toDoubleDigits(date.getHours())
    const minute = toDoubleDigits(date.getMinutes())
    const second = toDoubleDigits(date.getSeconds())

    switch (format) {
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`
      case 'yyyy-MM-ddThh:mm':
        return `${year}-${month}-${day}T${hour}:${minute}`
      case 'yyyy/MM/dd hh:mm':
        return `${year}/${month}/${day} ${hour}:${minute}`
      case 'yyyy/MM/dd hh:mm:ss':
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`
      case 'yyyy年MM月dd日':
        // const formatedTime = `${year}年${month}月${day}日`
        return `${year}年${month}月${day}日`
    }
  }
  return ''
}

export const getYearList = () => {
  const yearList = [...Array(10)].map((_, i) => {
    return currentYear + i
  })
  return yearList
}

export const getMonthList = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// 閏年かどうか判定
export const isLeapYear = (year: any) => (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)

export const getDateList = (year: number, month: number) => {
  // 閏年かどうかで2月の日数を決定
  const datesOfFebruary = isLeapYear(year) ? 29 : 28
  // 月毎の日数
  const datesOfYear= [31, datesOfFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const dates = datesOfYear[month - 1]
  const dateList = [...Array(dates)].map((_, i) => {
    return i + 1
  })
  return dateList 
}

export const getCurrentMonthFirst = () => {
  // const firstDate = new Date(getCurrentYear(), getCurrentMonth(), 1)
  const firstDateString =`${currentYear}/${currentMonth}/1 00:00:00`
  return getSplitTime(firstDateString, 'yyyy-MM-ddThh:mm')
}

export const getCurrentMonthLast = () => {
  const lastDate = getDateList(currentYear, currentMonth).slice(-1)[0]
  const lastDateString = `${currentYear}/${currentMonth}/${lastDate} 00:00:00`

  return getSplitTime(lastDateString, 'yyyy-MM-ddThh:mm')
}
