import { homeCalendarThemes } from "@common/styles/calendar";
import { RecordType } from "@common/types";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { useTailwind } from "tailwind-rn/dist";

const HomeCalendar: React.FC<Props> = ({monthlyRecord, navigation}) => {
  const tailwind = useTailwind()
  const markedDates = monthlyRecord.reduce((prevObj, record) => (
    {...prevObj, [record.executedOn]: {selected: true}}
  ), {})
  // const markedDates = monthlyRecord.reduce((prevObj, record) => (
  //   {...prevObj, [getSplitTime(record.executedOn, 'yyyy-MM-dd')]: {selected: true}}
  // ), {})

  const handleClickDate = (date: DateData) => {
    navigation.navigate('TrainingIndex', { date: date.dateString })
  }

  return (
    <Calendar
      hideArrows
      disableMonthChange
      // 今月以外の日付のタッチイベントを無効化
      disableAllTouchEventsForDisabledDays
      // ヘッダー消去
      renderHeader={() => null}
      showSixWeeks
      style={tailwind('w-80 h-80 rounded-3xl bg-transp-gray')}
      theme={homeCalendarThemes}
      // 最初の曜日を動かせる デザインの変更で使用する可能性あり
      // firstDay={1}
      markedDates={markedDates}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={handleClickDate}
    />
  )
}

LocaleConfig.locales.jp = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';

type Props = {
  monthlyRecord: RecordType[]
  navigation: any
}

export default HomeCalendar